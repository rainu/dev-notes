<template>
  <v-container fluid>
    <v-layout column justify-center>
      <v-row align="center">
        <v-col cols="12">
          <v-card class="elevation-12">
            <v-toolbar color="primary" flat>
              <v-toolbar-title>{{$t('backup.title')}}</v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>

            <v-card-actions>
              <v-row align="center">
                <v-col md12 lg6>
                  <FileExport />
                </v-col>
                <v-col md12 lg6>
                  <FileImport />
                </v-col>
              </v-row>
            </v-card-actions>

          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
  import FileExport from "../../components/backup/FileExport";
  import FileImport from "../../components/backup/FileImport";
  export default {
    components: {FileImport, FileExport},
  }
</script>

<style scoped>

</style>
