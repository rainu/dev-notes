<template>
  <div>
    <v-btn block color="primary" @click="onUploadFile" >
      <v-icon left>cloud_download</v-icon>
      {{$t('backup.dropbox.import.title')}}
    </v-btn>

    <BackupUnlock :show.sync="unlock.show" :providePassword.sync="unlock.providePasswordCallback" />

    <v-dialog v-model="loading" persistent width="300">
      <v-card color="primary">
        <v-card-text>
          {{$t('backup.dropbox.import.loading')}}
          <v-progress-linear indeterminate color="white" class="mb-0" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.error" color="error" class="text-center" :timeout="5000">
      {{$t('backup.dropbox.import.error.general', { err: downloadError })}}
      <v-btn text @click="snackbar.error = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar.success" color="success" class="text-center" :timeout="5000">
      {{$t('backup.dropbox.import.success')}}
      <v-btn text @click="snackbar.success = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { importAll } from "../../../common/importExport";
  import BackupUnlock from "../Unlock";
  import { Dropbox } from 'dropbox'

  export default {
    name: "DropboxImport",
    components: {BackupUnlock},
    props: {
      filepath: {
        required: false,
        default: '/dev_notes_backup.json'
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
        dropboxAuth: 'secrets/getDropboxAuth',
      }),
    },
    methods:{
      ...mapActions({
        setBoardOrder: 'board/setBoardOrder',
        addBoard: 'board/addBoard',
        clearBoards: 'board/clearBoards',
        setNoteOrder: 'note/setNoteOrder',
        addNote: 'note/addNote',
        clearNotes: 'note/clearNotes',
      }),
      onUploadFile(){
        this.downloadError = null
        this.loading = true

        let dbx = new Dropbox({
          fetch: fetch,
          accessToken: this.dropboxAuth.access_token,
          clientId: process.env.dropbox.clientId,
        })

        dbx.filesDownload({ path: this.filepath })
          .then(content => {
            const reader = new FileReader();

            const pwCallback = new Promise((resolve, reject) => {
              this.unlock.providePasswordCallback = resolve
              this.unlock.show = true
            })

            reader.addEventListener('loadend', (e) => {
              this.loading = false

              importAll(e.target.result, pwCallback).then(importResult => {
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
            });

            reader.readAsText(content.fileBlob);
          })
          .catch(err => {
            this.loading = false
            this.downloadError = err.error
            this.snackbar.error = true
          })
      }
    }
  }
</script>

<style scoped>

</style>
