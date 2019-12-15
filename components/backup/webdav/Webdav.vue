<template>
  <v-card class="elevation-12">
    <v-card-text>
      <v-row v-if="!isEncrypted">
        <v-col cols="12">
          <v-alert type="warning" dense dismissible>{{$t('backup.webdav.settings.warn.decrypted')}}</v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="webdav.url"
            :label="$t('backup.webdav.settings.url')"
            :placeholder="$t('backup.webdav.settings.url-example')"
            @change="onSettingsChange"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="webdav.user"
            :label="$t('backup.webdav.settings.user')"
            @change="onSettingsChange"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            v-model="webdav.password"
            :label="$t('backup.webdav.settings.password')"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            @click:append="showPassword = !showPassword"
            @change="onSettingsChange"
            />
        </v-col>
      </v-row>
      <v-row v-if="webdav.url">
        <v-col cols="12" sm="8">
          <v-text-field
            v-model="directory"
            :label="$t('backup.webdav.settings.directory')"
            @change="onSettingsChange"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="filename"
            :label="$t('backup.webdav.settings.filename')"
            @change="onSettingsChange"
          />
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions v-show="isValid">
      <v-row align="center">
        <v-col cols="12" sm="6">
          <WebdavExport :filepath.sync="filePath" :password="password" />
        </v-col>
        <v-col cols="12" sm="6">
          <WebdavImport :filepath.sync="filePath" />
        </v-col>
      </v-row>
    </v-card-actions>

  </v-card>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';
  import WebdavExport from "./WebdavExport";
  import WebdavImport from "./WebdavImport";

  export default {
    name: "BackupWebdav",
    components: {WebdavImport, WebdavExport},
    props: {
      defaultDirectory: {
        required: false,
        default: '/'
      },
      defaultFilename: {
        required: false,
        default: 'dev_notes_backup.json'
      },
      password: {
        required: false,
      }
    },
    data(){
      return{
        showPassword: false,
        webdav: {
          url: null,
          user: null,
          password: null,
        },
        directory: this.defaultDirectory,
        filename: this.defaultFilename,
      }
    },
    computed: {
      ...mapGetters({
        webdavSettings: 'secrets/getWebdavSettings',
      }),
      ...mapState({
        isEncrypted: state => state.settings.encrypted
      }),
      filePath(){
        return `${this.directory}/${this.filename}`.replace("//", "/")
      },
      isValid(){
        return this.webdav.url && this.webdav.user && this.webdav.password
      }
    },
    methods:{
      ...mapActions({
        saveWebdavSettings: 'secrets/setWebdavSettings',
      }),
      onSettingsChange() {
        this.saveWebdavSettings({
          url: this.webdav.url,
          username: this.webdav.user,
          password: this.webdav.password,
          directory: this.directory ? this.directory : this.defaultDirectory,
          filename: this.filename ? this.filename : this.defaultFilename
        })
      }
    },
    mounted(){
      if(this.webdavSettings) {
        this.webdav.url = this.webdavSettings.url
        this.webdav.user = this.webdavSettings.username
        this.webdav.password = this.webdavSettings.password
        this.directory = this.webdavSettings.directory ? this.webdavSettings.directory : this.defaultDirectory
        this.filename = this.webdavSettings.filename ? this.webdavSettings.filename : this.defaultFilename
      }
    },
  }
</script>

<style scoped>

</style>
