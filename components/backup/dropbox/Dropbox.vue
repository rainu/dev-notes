<template>
  <v-card class="elevation-12">
    <v-card-text>
      <v-row v-if="!isEncrypted">
        <v-col cols="12">
          <v-alert type="warning" dense dismissible>{{$t('backup.dropbox.settings.warn.decrypted')}}</v-alert>
        </v-col>
      </v-row>
      <v-row>
        <template v-if="isAuthenticated">
          <v-col cols="4" sm="4" align-self="center">
            <v-label>{{$t('backup.dropbox.user')}}:</v-label>
          </v-col>
          <v-col cols="8" sm="4" align-self="center">
            <v-chip >
              <v-icon left>account_circle</v-icon>
              {{dropboxUser.name.display_name}}
            </v-chip>
          </v-col>
          <v-col cols="12" sm="4" align-self="end">
            <v-btn block @click="logout" color="error">
              {{$t('backup.dropbox.logout')}}
            </v-btn>
          </v-col>
        </template>
        <template v-else>
          <v-col cols="12" sm="6">
            <v-btn :href="authenticationUrl" block color="primary">
              {{$t('backup.dropbox.login')}}
            </v-btn>
          </v-col>
        </template>
      </v-row>
      <v-row v-if="isAuthenticated">
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="directory"
            :label="$t('backup.dropbox.settings.directory')"
            @change="onSettingsChange" />
        </v-col>
        <v-col cols="12" sm="4" align-self="end">
          <v-text-field
            v-model="filename"
            :label="$t('backup.dropbox.settings.filename')"
            @change="onSettingsChange" />
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions v-show="isValid">
      <v-row align="center">
        <v-col cols="12" sm="6">
          <DropboxExport :filepath.sync="filePath" :password="password" />
        </v-col>
        <v-col cols="12" sm="6">
          <DropboxImport :filepath.sync="filePath" />
        </v-col>
      </v-row>
    </v-card-actions>

  </v-card>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';
  import DropboxExport from "./DropboxExport";
  import DropboxImport from "./DropboxImport";
  import { Dropbox } from 'dropbox'

  export default {
    name: "BackupDropbox",
    components: {DropboxImport, DropboxExport},
    props: {
      defaultFilename: {
        required: false,
        default: 'dev_notes_backup.json'
      },
      defaultDirectory: {
        required: false,
        default: '/'
      },
      password: {
        required: false,
      }
    },
    data(){
      return{
        showHelp: false,
        showToken: false,
        filename: this.defaultFilename,
        directory: this.defaultDirectory,
      }
    },
    computed: {
      ...mapGetters({
        dropboxAuth: 'secrets/getDropboxAuth',
        dropboxUser: 'secrets/getDropboxUser',
        dropboxSettings: 'secrets/getDropboxSettings',
      }),
      ...mapState({
        isEncrypted: state => state.settings.encrypted
      }),
      isAuthenticated(){
        return this.dropboxAuth && this.dropboxAuth.access_token && this.dropboxUser && this.dropboxUser.name
      },
      authenticationUrl(){
        let dbx = new Dropbox({
          clientId: process.env.dropbox.clientId,
        })
        return dbx.getAuthenticationUrl(`${window.location.origin}${process.env.dropbox.redirectUrl}`)
      },
      filePath(){
        return `${this.directory}/${this.filename}`.replace("//", "/")
      },
      isValid(){
        return this.isAuthenticated && this.directory && this.filename
      }
    },
    methods:{
      ...mapActions({
        logoutDropbox: 'secrets/removeDropboxAuth',
        saveDropboxSettings: 'secrets/setDropboxSettings',
      }),
      logout(){
        let dbx = new Dropbox({
          fetch: fetch,
          accessToken: this.dropboxAuth.access_token,
          clientId: process.env.dropbox.clientId,
        })

        dbx.authTokenRevoke()
          .then(() => {
            this.logoutDropbox()
          })
      },
      onSettingsChange() {
        this.saveDropboxSettings({
          directory: this.directory ? this.directory : this.defaultDirectory,
          filename: this.filename ? this.filename : this.defaultFilename
        })
      }
    },
    mounted(){
      if(this.dropboxSettings) {
        this.directory = this.dropboxSettings.directory ? this.dropboxSettings.directory : this.defaultDirectory
        this.filename = this.dropboxSettings.filename ? this.dropboxSettings.filename : this.defaultFilename
      }
    },
  }
</script>

<style scoped>

</style>
