<template>
  <div>
    <v-btn block color="primary" @click="onUploadFile" >
      <v-icon left>cloud_download</v-icon>
      {{$t('backup.gist.import.title')}}
    </v-btn>

    <BackupUnlock v-if="unlock.show" :providePassword.sync="unlock.providePasswordCallback" />

    <v-dialog v-model="loading" persistent width="300">
      <v-card color="primary">
        <v-card-text>
          {{$t('backup.gist.import.loading')}}
          <v-progress-linear indeterminate color="white" class="mb-0" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.error" color="error" class="text-center" :timeout="5000">
      {{$t('backup.gist.import.error.general', { err: downloadError })}}
      <v-btn text @click="snackbar.error = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar.success" color="success" class="text-center" :timeout="5000">
      {{$t('backup.gist.import.success')}}
      <v-btn text @click="snackbar.success = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';
  import { importAll } from "../../../common/importExport";
  import BackupUnlock from "../Unlock";
  import { newGistClient } from '../../../common/gist'

  export default {
    name: "GistImport",
    components: {BackupUnlock},
    props: {
      filename: {
        required: false,
        default: 'dev_notes_backup.json'
      }
    },
    data(){
      return {
        downloadError: null,
        unlock: {
          show: false,
          providePasswordCallback: null
        },
        loading: false,
        snackbar: {
          error: false,
          success: false,
        }
      }
    },
    computed: {
      ...mapGetters({
        gistSettings: 'secrets/getGistSettings',
      }),
    },
    methods:{
      ...mapMutations({
        clearNotes: 'note/clearNotes',
        clearBoards: 'board/clearBoards',
        addNote: 'note/addNote',
        setNoteOrder: 'note/setNoteOrder',
        addBoard: 'board/addBoard',
        setBoardOrder: 'board/setBoardOrder',
      }),
      onUploadFile(){
        this.downloadError = null
        this.loading = true

        let client = newGistClient(this.gistSettings.token)
        client.getFile(this.gistSettings.gist, this.filename)
          .then(content => {
            this.loading = false

            const pwCallback = new Promise((resolve, reject) => {
              this.unlock.providePasswordCallback = resolve
              this.unlock.show = true
            })

            importAll(content, pwCallback).then(importResult => {
              if(importResult instanceof Error) {
                this.downloadError = importResult
                this.snackbar.error = true
                return
              }

              this.clearNotes()
              this.clearBoards()

              for(let note of importResult.notes) {
                this.addNote(note)
              }
              this.setNoteOrder(importResult.noteOrder)

              for(let board of importResult.boards) {
                this.addBoard(board)
              }
              this.setBoardOrder(importResult.boardOrder)

              this.unlock.show = false
              this.unlock.providePasswordCallback = null
              this.snackbar.success = true
            }).catch(e => {
              //at the moment this is called if the provided password is wrong!

              this.unlock.show = false
              this.unlock.providePasswordCallback = null
              this.downloadError = this.$t('backup.encryption.password.invalid')
              this.snackbar.error = true
            })
          })
          .catch(err => {
            this.loading = false
            this.downloadError = err
            this.snackbar.error = true
          })
      }
    }
  }
</script>

<style scoped>

</style>
