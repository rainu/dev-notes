<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" flat>
      <v-toolbar-title>{{$t('backup.file.title')}}</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>

    <v-card-actions>
      <v-row align="center">
        <v-col md12 lg6>
          <FileExport :password.sync="password" />
        </v-col>
        <v-col md12 lg6>
          <FileImport />
        </v-col>
      </v-row>
    </v-card-actions>

  </v-card>
</template>

<script>
  import FileExport from "./FileExport";
  import FileImport from "./FileImport";

  export default {
    name: "BackupFile",
    components: {FileImport, FileExport},
    props: ['password']
  }
</script>

<style scoped>

</style>
