<template>
  <div>
    <v-btn block color="primary" @click="onDownloadFile">
      <v-icon>cloud_upload</v-icon>
      {{$t('backup.dropbox.export.title')}}
    </v-btn>

    <v-dialog v-model="loading" persistent width="300">
      <v-card color="primary">
        <v-card-text>
          {{$t('backup.dropbox.export.loading')}}
          <v-progress-linear indeterminate color="white" class="mb-0" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.fail.show" color="error" class="text-center" :timeout="5000">
      {{$t('backup.dropbox.export.error.general', { err: snackbar.fail.error })}}
      <v-btn text @click="snackbar.fail.show = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar.success.show" color="success" class="text-center" :timeout="5000">
      {{$t('backup.dropbox.export.success')}}
      <v-btn text @click="snackbar.success.show = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import { exportAll } from "../../../common/importExport";
  import { Dropbox } from 'dropbox'

  export default {
    name: "DropboxExport",
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
        dropboxAuth: 'secrets/getDropboxAuth',
      }),
      ...mapState({
        notes: state => state.note.notes,
        boards: state => state.board.boards,
        boardOrder: state => state.board.boardOrder,
        noteOrder: state => state.board.noteOrder,
      }),
    },
    methods:{
      onDownloadFile(){
        let exportData = exportAll(this.password, this.notes, this.boards, this.boardOrder, this.noteOrder)
        let dbx = new Dropbox({
          fetch: fetch,
          accessToken: this.dropboxAuth.access_token,
          clientId: process.env.dropbox.clientId,
        })

        this.loading = true
        dbx.filesUpload({
          path: this.filepath,
          contents: JSON.stringify(exportData),
          mode: {
            ".tag": "overwrite"
          }
        }).then(() => {
          this.loading = false
          this.snackbar.success.show = true
        }).catch(err => {
          this.snackbar.fail.error = err.error.error_summary
          this.snackbar.fail.show = true
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
