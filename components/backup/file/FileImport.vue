<template>
  <div>
    <v-btn block color="primary" @click="$refs.fileInput.click()">
      <v-icon>cloud_download</v-icon>
      {{$t('backup.file.import.title')}}

      <input hidden ref="fileInput" type="file" @change="onUploadFile" />
    </v-btn>

    <BackupUnlock v-if="unlock.show" :providePassword.sync="unlock.providePasswordCallback" />

    <v-snackbar v-model="snackbar.error" color="error" class="text-center" :timeout="5000">
      {{$t('backup.file.import.failed', { err: uploadError })}}
      <v-btn text @click="snackbar.error = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar.success" color="success" class="text-center" :timeout="5000">
      {{$t('backup.file.import.success')}}
      <v-btn text @click="snackbar.success = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import { importAll } from "../../../common/importExport";
  import BackupUnlock from "../Unlock";

  export default {
    name: "FileImport",
    components: {BackupUnlock},
    data(){
      return {
        uploadError: null,
        unlock: {
          show: false,
          providePasswordCallback: null
        },
        snackbar: {
          error: false,
          success: false,
        }
      }
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
        if(!this.$refs.fileInput.files[0]) return
        this.uploadError = null

        let fileReader = new FileReader()
        fileReader.readAsText(this.$refs.fileInput.files[0], 'UTF-8')

        fileReader.addEventListener('load', (e) => {
          const pwCallback = new Promise((resolve, reject) => {
            this.unlock.providePasswordCallback = resolve
            this.unlock.show = true
          })

          importAll(e.target.result, pwCallback).then(importResult => {
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
            this.$refs.fileInput.value = ''
          }).catch(e => {
            //at the moment this is called if the provided password is wrong!

            this.unlock.show = false
            this.unlock.providePasswordCallback = null
            this.uploadError = this.$t('backup.encryption.password.invalid')
            this.snackbar.error = true
            this.$refs.fileInput.value = ''
          })
        });
      }
    }
  }
</script>

<style scoped>

</style>
