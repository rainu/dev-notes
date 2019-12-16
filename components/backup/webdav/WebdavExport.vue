<template>
  <div>
    <v-btn block @click="onDownloadFile">
      <v-icon left>cloud_upload</v-icon>
      {{$t('backup.webdav.export.title')}}
    </v-btn>

    <v-dialog v-model="loading" persistent width="300">
      <v-card color="primary">
        <v-card-text>
          {{$t('backup.webdav.export.loading')}}
          <v-progress-linear indeterminate color="white" class="mb-0" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.fail.show" color="error" class="text-center" :timeout="5000">
      {{$t('backup.webdav.export.error.general', { err: snackbar.fail.error })}}
      <v-btn text @click="snackbar.fail.show = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar.success.show" color="success" class="text-center" :timeout="5000">
      {{$t('backup.webdav.export.success')}}
      <v-btn text @click="snackbar.success.show = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import { exportAll } from "../../../common/importExport";
  import webdav from 'webdav'

  export default {
    name: "WebdavExport",
    props: {
      filepath: {
        required: false,
        default: '/dev_notes_backup.json'
      },
      password: {
        required: false,
      }
    },
    data(){
      return {
        loading: false,
        snackbar: {
          fail: {
            show: false,
            error: null
          },
          success: {
            show: false,
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        webdavSettings: 'secrets/getWebdavSettings',
      }),
      ...mapState({
        notes: state => state.note.notes,
        boards: state => state.board.boards,
        boardOrder: state => state.board.boardOrder,
        noteOrder: state => state.note.noteOrder,
      }),
    },
    methods:{
      onDownloadFile(){
        let exportData = exportAll(this.password, this.notes, this.boards, this.boardOrder, this.noteOrder)
        let client = webdav.createClient(this.webdavSettings.url, {
          username: this.webdavSettings.username,
          password: this.webdavSettings.password,
        })

        this.loading = true
        client.putFileContents(this.filepath, JSON.stringify(exportData))
          .then(() => {
            this.loading = false
            this.snackbar.success.show = true
          }).catch(err => {
            this.snackbar.fail.error = err
            if(err && err.response) {
              if(err.response.status === 401) {
                this.snackbar.fail.error = this.$t('backup.webdav.export.error.invalid')
              }
            }

            this.snackbar.fail.show = true
            this.loading = false
          })
      }
    }
  }
</script>

<style scoped>

</style>
