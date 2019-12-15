<template>
  <v-container fluid>
    <v-layout column justify-center>
      <!-- Password -->
      <v-dialog v-model="dialog.encryption.open">
        <BackupEncryption @onPasswordChange="onPasswordChange">
          <div class="flex-grow-1"></div>
          <v-btn color="primary" @click="dialog.encryption.open = false">{{$t('common.confirmation.close')}}</v-btn>
        </BackupEncryption>
      </v-dialog>

      <!-- FILE  -->

      <v-row align="center">
        <v-col cols="12">
          <v-expansion-panels v-model="panel" accordion>

            <v-expansion-panel>
              <v-expansion-panel-header>{{$t('backup.file.title')}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <BackupFile :password.sync="password" />
              </v-expansion-panel-content>
            </v-expansion-panel>

            <!-- WebDAV  -->
            <v-expansion-panel>
              <v-expansion-panel-header>{{$t('backup.webdav.title')}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <BackupWebdav :password.sync="password" />
              </v-expansion-panel-content>
            </v-expansion-panel>

          <!-- Gist  -->
          <v-expansion-panel>
            <v-expansion-panel-header>{{$t('backup.gist.title')}}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <BackupGist :password.sync="password" />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- AWS S3 -->
          <v-expansion-panel>
            <v-expansion-panel-header>{{$t('backup.aws.s3.title')}}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <BackupS3 :password.sync="password" />
            </v-expansion-panel-content>
          </v-expansion-panel>

            <!-- Dropbox -->
            <v-expansion-panel>
              <v-expansion-panel-header>{{$t('backup.dropbox.title')}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <BackupDropbox :password.sync="password" />
              </v-expansion-panel-content>
            </v-expansion-panel>


          </v-expansion-panels>

        </v-col>
      </v-row>

    </v-layout>

    <v-footer app class="pa-0">
      <v-toolbar dense color="footer">
        <div class="flex-grow-1"></div>
        <v-toolbar-items >
          <v-btn @click="dialog.encryption.open = true" :color="password ? 'primary' : ''">
            <v-icon left>{{password ? 'lock' : 'lock_open'}}</v-icon>
            {{$t('backup.encryption.title')}}
          </v-btn>
        </v-toolbar-items>

      </v-toolbar>
    </v-footer>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import BackupS3 from "../../components/backup/aws/S3";
  import BackupEncryption from "../../components/backup/Encryption";
  import BackupFile from "../../components/backup/file/File";
  import BackupGist from "../../components/backup/gist/Gist";
  import BackupDropbox from "../../components/backup/dropbox/Dropbox";
  import BackupWebdav from "../../components/backup/webdav/Webdav";

  export default {
    components: {BackupWebdav, BackupGist, BackupEncryption, BackupFile, BackupS3, BackupDropbox},
    data(){
      return {
        password: null,
        dialog: {
          encryption: {
            open: false
          }
        },
        panel: 0
      }
    },
    computed: {
      ...mapGetters({
        persistedPassword: 'secrets/getBackupPassword',
      }),
    },
    methods: {
      onPasswordChange(password){
        this.password = password
      }
    },
    mounted() {
      if(this.persistedPassword) {
        this.password = this.persistedPassword
      }
    }
  }
</script>

<style scoped>

</style>
