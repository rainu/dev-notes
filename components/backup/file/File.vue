<template>
  <v-card class="elevation-12">

    <v-card-actions>
      <v-row align="center">
        <v-col md="6">
          <FileExport :password.sync="password" />
        </v-col>
        <v-col md="6">
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
