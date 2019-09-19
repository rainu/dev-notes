<template>
  <div>
    <v-btn block color="primary" @click="onDownloadFile">
      <v-icon>cloud_download</v-icon>
      {{$t('backup.export.file')}}
    </v-btn>
    <a hidden ref="downloadLink"></a>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { exportAll } from "../../common/importExport";

  export default {
    name: "FileExport",
    data(){
      return {

      }
    },
    computed: {
      ...mapState({
        notes: state => state.note.notes,
        boards: state => state.board.boards,
      }),
    },
    methods:{
      onDownloadFile(){
        let exportData = exportAll(this.notes, this.boards)
        let blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'text/json' } );
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
