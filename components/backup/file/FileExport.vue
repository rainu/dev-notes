<template>
  <div>
    <v-btn block color="primary" @click="onDownloadFile">
      <v-icon>cloud_upload</v-icon>
      {{$t('backup.file.export.title')}}
    </v-btn>
    <a hidden ref="downloadLink"></a>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { exportAll } from "../../../common/importExport";

  export default {
    name: "FileExport",
    props: ['password'],
    data(){
      return {

      }
    },
    computed: {
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
        let blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'text/json;charset=UTF-8' } );
        let link = this.$refs['downloadLink'];
        link.href = window.URL.createObjectURL(blob);
        link.download = `dev_notes_backup.json`;
        link.click();
      }
    }
  }
</script>

<style scoped>

</style>
