<template>
  <div>
    <v-btn block color="primary" @click="onUploadFile" >
      <v-icon left>cloud_download</v-icon>
      {{$t('backup.aws.s3.import.title')}}
    </v-btn>

    <BackupUnlock v-if="unlock.show" :providePassword.sync="unlock.providePasswordCallback" />

    <v-dialog v-model="loading" persistent width="300">
      <v-card color="primary">
        <v-card-text>
          {{$t('backup.aws.s3.import.loading')}}
          <v-progress-linear indeterminate color="white" class="mb-0" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.error" color="error" class="text-center" :timeout="5000">
      {{$t('backup.aws.s3.import.error.general', { err: uploadError })}}
      <v-btn text @click="snackbar.error = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar.success" color="success" class="text-center" :timeout="5000">
      {{$t('backup.aws.s3.import.success')}}
      <v-btn text @click="snackbar.success = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';
  import S3 from 'aws-sdk/clients/s3'
  import { importAll } from "../../../common/importExport";
  import BackupUnlock from "../Unlock";

  export default {
    name: "S3Import",
    components: {BackupUnlock},
    props: {
      filename: {
        required: false,
        default: 'dev_notes_backup.json'
      }
    },
    data(){
      return {
        uploadError: null,
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
        s3Settings: 'secrets/getAWSS3Settings',
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
        this.uploadError = null
        this.loading = true

        let s3 = new S3({
          apiVersion: '2006-03-01',
          accessKeyId: this.s3Settings.accessKey,
          secretAccessKey: this.s3Settings.secret,
          region: this.s3Settings.region,
        })

        s3.getObject({
          Key: this.filename,
          Bucket: this.s3Settings.bucket
        }, (err, data) => {
          this.loading = false

          if(err) {
            switch (err.code) {
              case 'InvalidAccessKeyId':
                this.uploadError = this.$t('backup.aws.s3.export.error.invalid')
                break
              case 'Forbidden':
                this.uploadError = this.$t('backup.aws.s3.export.error.forbidden')
                break
              default:
                this.uploadError = err.message
                break
            }
            this.snackbar.error = true
            return
          }

          const pwCallback = new Promise((resolve, reject) => {
            this.unlock.providePasswordCallback = resolve
            this.unlock.show = true
          })

          importAll(data.Body, pwCallback).then(importResult => {
            if(importResult instanceof Error) {
              this.uploadError = importResult
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
            this.uploadError = this.$t('backup.encryption.password.invalid')
            this.snackbar.error = true
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
