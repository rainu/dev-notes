<template>
  <div>
    <v-btn block color="primary" @click="onDownloadFile">
      <v-icon left>cloud_upload</v-icon>
      {{$t('backup.gist.export.title')}}
    </v-btn>

    <v-dialog v-model="loading" persistent width="300">
      <v-card color="primary">
        <v-card-text>
          {{$t('backup.gist.export.loading')}}
          <v-progress-linear indeterminate color="white" class="mb-0" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.fail.show" color="error" class="text-center" :timeout="5000">
      {{$t('backup.gist.export.error.general', { err: snackbar.fail.error })}}
      <v-btn text @click="snackbar.fail.show = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar.success.show" color="success" class="text-center" :timeout="5000">
      {{$t('backup.gist.export.success')}}
      <v-btn text @click="snackbar.success.show = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import { exportAll } from "../../../common/importExport";
  import { newGistClient } from '../../../common/gist'

  export default {
    name: "GistExport",
    props: {
      filename: {
        required: false,
        default: 'dev_notes_backup.json'
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
        gistSettings: 'secrets/getGistSettings',
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
        let client = newGistClient(this.gistSettings.token)

        this.loading = true
        client.saveFile(this.gistSettings.gist, this.filename, JSON.stringify(exportData))
          .then(() => {
            this.loading = false
            this.snackbar.success.show = true
          }).catch(err => {
            this.snackbar.fail.error = err
            if(err && err.response) {
              if(err.response.status === 401) {
                this.snackbar.fail.error = this.$t('backup.gist.export.error.invalid')
              } else if (err.response.status === 403) {
                this.snackbar.fail.error = this.$t('backup.gist.export.error.forbidden')
              }
            }

            this.snackbar.fail.show = true
            this.loading = false
          })


        // let p = client.saveFiles(this.gistSettings.gist, {
        //   'meta.json': JSON.stringify({
        //     version: exportData.version,
        //     encryption: exportData.encryption,
        //   }),
        //   'order_notes.json': JSON.stringify(exportData.noteOrder ? exportData.noteOrder : []),
        //   'order_boards.json': JSON.stringify(exportData.boardOrder ? exportData.boardOrder : [])
        // })
        //
        // for(let noteId of Object.keys(exportData.notes)) {
        //   p = p.then(() => client.saveFile(this.gistSettings.gist, `note_${noteId}.json`, JSON.stringify(exportData.notes[noteId])))
        // }
        // for(let boardId of Object.keys(exportData.boards)) {
        //   p = p.then(() => client.saveFile(this.gistSettings.gist, `board_${boardId}.json`, JSON.stringify(exportData.boards[boardId])))
        // }
      }
    }
  }
</script>

<style scoped>

</style>
