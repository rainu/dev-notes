<template>
  <div>
    <v-btn block color="primary" @click="onUploadFile" >
      <v-icon left>cloud_download</v-icon>
      {{$t('backup.webdav.import.title')}}
    </v-btn>

    <BackupUnlock :show.sync="unlock.show" :providePassword.sync="unlock.providePasswordCallback" />

    <v-dialog v-model="loading" persistent width="300">
      <v-card color="primary">
        <v-card-text>
          {{$t('backup.webdav.import.loading')}}
          <v-progress-linear indeterminate color="white" class="mb-0" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.error" color="error" class="text-center" :timeout="5000">
      {{$t('backup.webdav.import.error.general', { err: downloadError })}}
      <v-btn text @click="snackbar.error = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar.success" color="success" class="text-center" :timeout="5000">
      {{$t('backup.webdav.import.success')}}
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
  import webdav from 'webdav'

  export default {
    name: "WebdavImport",
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
        webdavSettings: 'secrets/getWebdavSettings',
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

        let client = webdav.createClient(this.webdavSettings.url, {
          username: this.webdavSettings.username,
          password: this.webdavSettings.password,
        })

        client.getFileContents(this.filepath, { format: "text" })
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
            if(err && err.response) {
              if(err.response.status === 401) {
                this.downloadError = this.$t('backup.webdav.import.error.invalid')
              } else if(err.response.status === 404) {
                this.downloadError = this.$t('backup.webdav.import.error.not-found')
              }
            }
            this.snackbar.error = true
          })
      }
    }
  }
</script>

<style scoped>

</style>
