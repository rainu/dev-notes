<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" flat>
      <v-toolbar-title>{{$t('backup.gist.title')}}</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon @click="showHelp = true">
        <v-icon>help</v-icon>
      </v-btn>
    </v-toolbar>

    <v-dialog v-model="showHelp" scrollable>
      <HelpGist>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" @click="showHelp = false">
          {{$t('common.confirmation.close')}}
        </v-btn>
      </HelpGist>
    </v-dialog>

    <v-card-text>
      <v-row v-if="!isEncrypted">
        <v-col cols="12">
          <v-alert type="warning" dense dismissible>{{$t('backup.gist.settings.warn.decrypted')}}</v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field
            :type="showToken ? 'text' : 'password'"
            v-model="token"
            :label="$t('backup.gist.settings.token')"
            :append-icon="showToken ? 'visibility' : 'visibility_off'"
            @click:append="showToken = !showToken"
            @change="onTokenChange" />
        </v-col>
      </v-row>
      <v-row v-if="token">
        <v-col cols="12" sm="4" align-self="end">
          <v-text-field
            v-model="gist.user"
            :label="$t('backup.gist.settings.user.title')"
            :placeholder="$t('backup.gist.settings.user.default')"
            @change="refreshAvailableGists"
            />
        </v-col>
        <v-col cols="12" sm="4">
          <v-autocomplete
            v-model="gist.id"
            :label="$t('backup.gist.settings.gist')"
            :items="availableGists"
            item-text="description"
            item-value="id"
            :loading="gist.loading"
            @change="onSettingsChange">

            <template v-slot:selection="data">
              <v-chip>
                <v-avatar left>
                  <v-img :src="data.item.owner.avatar_url" :alt="data.item.owner.login"></v-img>
                </v-avatar>
                {{data.item.id.substring(0, 16)}}
                <v-avatar right>
                  <v-icon v-if="data.item.public">lock_open</v-icon>
                  <v-icon v-else>lock</v-icon>
                </v-avatar>
              </v-chip>
            </template>

            <template v-slot:item="data">
              <v-list-item-avatar>
                <v-img :src="data.item.owner.avatar_url" :alt="data.item.owner.login" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon v-if="data.item.public">lock_open</v-icon>
                  <v-icon v-else>lock</v-icon>
                  {{data.item.id}}
                </v-list-item-title>
                <v-list-item-subtitle>{{data.item.description ? data.item.description : $t('backup.gist.no-description')}}</v-list-item-subtitle>
              </v-list-item-content>
            </template>

            <template v-slot:prepend-item>
                <v-list-item @click="onCreateNew(true)">
                  <v-list-item-avatar>
                    <v-icon>lock_open</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{$t('backup.gist.create-new-public')}}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="onCreateNew(false)">
                  <v-list-item-avatar>
                    <v-icon>lock</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{$t('backup.gist.create-new-private')}}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider />
            </template>

          </v-autocomplete>
        </v-col>
        <v-col cols="12" sm="4" align-self="end">
          <v-text-field
            v-model="filename"
            :label="$t('backup.gist.settings.filename')"
            @change="onSettingsChange" />
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions v-show="isValid">
      <v-row align="center">
        <v-col cols="12" sm="6">
          <GistExport :filename.sync="filename" :password="password" />
        </v-col>
        <v-col cols="12" sm="6">
          <GistImport :filename.sync="filename" />
        </v-col>
      </v-row>
    </v-card-actions>

  </v-card>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';
  import { newGistClient } from '../../../common/gist'
  import GistExport from "./GistExport";
  import GistImport from "./GistImport";
  import HelpGist from "../../help/Gist";

  export default {
    name: "BackupGist",
    components: {HelpGist, GistImport, GistExport},
    props: {
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
        showHelp: false,
        showToken: false,
        clientId: null,
        token: null,
        gist: {
          loading: false,
          user: null,
          id: null
        },
        availableGists: [],
        filename: this.defaultFilename,
      }
    },
    computed: {
      ...mapGetters({
        gistSettings: 'secrets/getGistSettings',
      }),
      ...mapState({
        isEncrypted: state => state.settings.encrypted
      }),
      isValid(){
        return this.token && this.gist.id
      }
    },
    methods:{
      ...mapActions({
        saveGistSettings: 'secrets/setGistSettings',
      }),
      refreshAvailableGists(){
        let gistClient = newGistClient(this.token)
        this.gist.loading = true

        let p = this.gist.user ? gistClient.list(this.gist.user) : gistClient.getAll()
        p.then(gists => {
          this.availableGists = gists
          this.gist.loading = false
        }).catch(err => {
          console.error("Could not load gists!", err)
          this.gist.loading = false
        })
      },
      onCreateNew(isPublic){
        this.gist.loading = true

        newGistClient(this.token)
          .createNew(isPublic, this.filename)
          .then(gist => {
            this.availableGists.splice(0, 0, gist)
            this.gist.id = gist.id
            this.onSettingsChange()
            this.gist.loading = false
          }).catch(err => {
            console.error("Could not create gist!", err)
            this.gist.loading = false
          })
      },
      onTokenChange(){
        this.refreshAvailableGists()
        this.onSettingsChange()
      },
      onSettingsChange() {
        this.saveGistSettings({
          token: this.token,
          gist: this.gist.id,
          filename: this.filename ? this.filename : this.defaultFilename
        })
      }
    },
    mounted(){
      if(this.gistSettings) {
        this.token = this.gistSettings.token
        this.gist.id = this.gistSettings.gist
        this.filename = this.gistSettings.filename ? this.gistSettings.filename : this.defaultFilename

        this.refreshAvailableGists()
      }
    },
  }
</script>

<style scoped>

</style>
