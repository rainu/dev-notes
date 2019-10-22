<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" flat>
      <v-toolbar-title>{{$t('backup.dropbox.title')}}</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon @click="showHelp = true">
        <v-icon>help</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text>
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
          <v-col cols="12" >
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

    <v-card-actions>
      <v-row align="center">
        <v-col cols="12" sm="6">
          test
        </v-col>
        <v-col cols="12" sm="6">
          test2
        </v-col>
      </v-row>
    </v-card-actions>

  </v-card>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';
  import { Dropbox } from 'dropbox'

  export default {
    name: "BackupDropbox",
    components: {},
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
        valid: false
      }
    },
    computed: {
      ...mapGetters({
        dropboxAuth: 'secrets/getDropboxAuth',
        dropboxUser: 'secrets/getDropboxUser',
        dropboxSettings: 'secrets/getDropboxSettings',
      }),
      isAuthenticated(){
        return this.dropboxAuth && this.dropboxAuth.access_token && this.dropboxUser && this.dropboxUser.name
      },
      authenticationUrl(){
        let dbx = new Dropbox({
          clientId: process.env.dropbox.clientId,
        })
        return dbx.getAuthenticationUrl(`${window.location.origin}${process.env.dropbox.redirectUrl}`)
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
