<template>
  <v-card class="elevation-12">
    <v-toolbar flat>
      <v-toolbar-title>{{$t('backup.encryption.title')}}</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>

    <v-card-text>
      <v-form v-model="valid" @change="onChange" ref="encryption-enable">
        <v-row align="center">

          <v-col cols="12" sm="2" align-self="center">
            <v-switch v-model="enable"
                      :label="$t('backup.encryption.enable')"
                      color="primary"/>
          </v-col>

          <template v-if="enable">
            <v-col cols="12" sm="4">
              <v-text-field type="password"
                            :label="$t('backup.encryption.password.1st')"
                            :rules="password1Rules"
                            v-model="password[0]"
                            @change="validateChange"
                            required />
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field type="password"
                            :label="$t('backup.encryption.password.2nd')"
                            :rules="password2Rules"
                            v-model="password[1]"
                            @change="validateChange"
                            required />
            </v-col>

            <v-col cols="12" sm="2" align-self="center">
              <v-switch v-model="persistent"
                        :label="$t('backup.encryption.persistent')"
                        :disabled="!valid"
                        @change="onPersistPassword"
                        color="primary"/>
            </v-col>
          </template>

        </v-row>
      </v-form>

      <v-row v-if="enable && persistent && !isEncrypted">
        <v-col cols="12">
          <v-alert type="warning" dense dismissible>{{$t('backup.encryption.insecure')}}</v-alert>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <slot></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex';

  export default {
    name: "BackupEncryption",
    data(){
      return {
        valid: false,
        enable: false,
        persistent: false,
        password: [null, null]
      }
    },
    computed: {
      ...mapGetters({
        persistedPassword: 'secrets/getBackupPassword',
      }),
      ...mapState({
        isEncrypted: state => state.settings.encrypted
      }),
      password1Rules(){
        return [
          v => !!v || this.$t('common.form.validation.required')
        ]
      },
      password2Rules(){
        return [
          v => !!v || this.$t('backup.encryption.password.different'),
          v => this.password[0] === this.password[1] || this.$t('backup.encryption.password.different')
        ]
      },
    },
    methods: {
      ...mapActions({
        savePersistentPassword: 'secrets/setBackupPassword',
        deletePersistentPassword: 'secrets/removeBackupPassword',
      }),
      validateChange(){
        this.$refs['encryption-enable'].validate()
      },
      onPersistPassword(){
        if(this.persistent) {
          this.savePersistentPassword(this.password[0])
        }else{
          this.deletePersistentPassword()
        }
      },
      onChange(){
        if(!this.enable) {
          this.$emit("onPasswordChange", null)
        }else if(this.valid) {
          this.$emit("onPasswordChange", this.password[0])
        }
      }
    },
    watch: {
      valid(){
        this.onChange()
      },
      enable(){
        if(!this.enable) {
          this.password[0] = null
          this.password[1] = null
        }

        this.onChange()
      }
    },
    mounted() {
      if(this.persistedPassword) {
        this.enable = true
        this.persistent = true
        this.password[0] = this.persistedPassword
        this.password[1] = this.persistedPassword
      }
    }
  }
</script>

<style scoped>

</style>
