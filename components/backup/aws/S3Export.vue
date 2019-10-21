<template>
  <div>
    <v-btn block color="primary" @click="onDownloadFile">
      <v-icon>cloud_upload</v-icon>
      {{$t('backup.aws.s3.export.title')}}
    </v-btn>

    <v-dialog v-model="loading" persistent width="300">
      <v-card color="primary">
        <v-card-text>
          {{$t('backup.aws.s3.export.loading')}}
          <v-progress-linear indeterminate color="white" class="mb-0" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.fail.show" color="error" class="text-center" :timeout="5000">
      {{$t('backup.aws.s3.export.error.general', { err: snackbar.fail.error })}}
      <v-btn text @click="snackbar.fail.show = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar.success.show" color="success" class="text-center" :timeout="5000">
      {{$t('backup.aws.s3.export.success')}}
      <v-btn text @click="snackbar.success.show = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import S3 from 'aws-sdk/clients/s3'
  import { exportAll } from "../../../common/importExport";

  export default {
    name: "S3Export",
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
        s3Settings: 'secrets/getAWSS3Settings',
      }),
      ...mapState({
        notes: state => state.note.notes,
        boards: state => state.board.boards,
        boardOrder: state => state.board.boardOrder,
      }),
    },
    methods:{
      onDownloadFile(){
        this.loading = true

        let exportData = exportAll(this.password, this.notes, this.boards, this.boardOrder)
        let blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'text/json;charset=UTF-8' } );
        let s3 = new S3({
          apiVersion: '2006-03-01',
          accessKeyId: this.s3Settings.accessKey,
          secretAccessKey: this.s3Settings.secret,
          region: this.s3Settings.region,
        })

        s3.putObject({
          Body: blob,
          Key: this.filename,
          Bucket: this.s3Settings.bucket
        }, (err, data) => {
          this.loading = false

          if(err) {
            switch (err.code) {
              case 'InvalidAccessKeyId':
                this.snackbar.fail.error = this.$t('backup.aws.s3.export.error.invalid')
                break
              case 'Forbidden':
                this.snackbar.fail.error = this.$t('backup.aws.s3.export.error.forbidden')
                break
              default:
                this.snackbar.fail.error = err.message
                break
            }
            this.snackbar.fail.show = true
            return
          }

          this.snackbar.success.show = true
        })

      }
    }
  }
</script>

<style scoped>

</style>
