<template>
  <v-container fluid>
    <v-layout column justify-center>
      <!-- Password -->
      <v-row align="center">
        <v-col cols="12">
          <BackupEncryption @onPasswordChange="onPasswordChange"/>
        </v-col>
      </v-row>

      <!-- FILE  -->
      <v-row align="center">
        <v-col cols="12">
          <BackupFile :password.sync="password" />
        </v-col>
      </v-row>

      <!-- Gist  -->
      <v-row align="center">
        <v-col cols="12">
          <BackupGist :password.sync="password" />
        </v-col>
      </v-row>

      <!-- AWS S3 -->
      <v-row align="center">
        <v-col cols="12">
          <S3 :password.sync="password" />
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
  import S3 from "../../components/backup/aws/S3";
  import BackupEncryption from "../../components/backup/Encryption";
  import BackupFile from "../../components/backup/file/File";
  import BackupGist from "../../components/backup/gist/Gist";

  export default {
    components: {BackupGist, BackupEncryption, BackupFile, S3},
    data(){
      return {
        password: null,
      }
    },
    methods: {
      onPasswordChange(password){
        this.password = password
      }
    }
  }
</script>

<style scoped>

</style>
