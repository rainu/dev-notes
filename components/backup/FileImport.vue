<template>
  <div>
    <v-btn block color="primary" @click="$refs.fileInput.click()">
      <v-icon>cloud_upload</v-icon>
      {{$t('backup.import.file')}}

      <input hidden ref="fileInput" type="file" @change="onUploadFile" />
    </v-btn>

    <v-snackbar v-model="snackbar.error" color="error" class="text-center" :timeout="5000">
      {{$t('backup.import.failed', { err: uploadError })}}
      <v-btn text @click="snackbar.error = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar.success" color="success" class="text-center" :timeout="5000">
      {{$t('backup.import.success')}}
      <v-btn text @click="snackbar.success = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import { importAll } from "../../common/importExport";

  export default {
    name: "FileImport",
    data(){
      return {
        uploadError: null,
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
        addBoard: 'board/addBoard',
      }),
      onUploadFile(){
        this.uploadError = null

        let fileReader = new FileReader()
        fileReader.readAsBinaryString(this.$refs.fileInput.files[0])

        fileReader.addEventListener('load', (e) => {
          let importResult = importAll(e.target.result)

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
          for(let board of importResult.boards) {
            this.addBoard(board)
          }
          this.snackbar.success = true
        });
      }
    }
  }
</script>

<style scoped>

</style>
