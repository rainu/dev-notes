<template>
  <div>
    <v-card class="elevation-12">
      <v-toolbar flat>
        <v-toolbar-title>{{$t('settings.encryption.title')}}</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="showHelp = true">
          <v-icon>help</v-icon>
        </v-btn>
      </v-toolbar>

      <template v-if="isEncrypted">
        <v-card-text>
          <v-row>

            <!-- Change password -->
            <v-col cols="12">
              <v-card>
                <v-card-text>
                  <v-form v-model="passwordChange.valid" @submit.prevent="onPasswordChange" ref="password-change">
                    <v-row>
                      <v-col cols="12" sm="3">
                        <v-text-field :type="passwordChange.showPassword ? 'text' : 'password'"
                                      :append-icon="passwordChange.showPassword ? 'visibility' : 'visibility_off'"
                                      @click:append="passwordChange.showPassword = !passwordChange.showPassword"
                                      v-model="passwordChange.current"
                                      :rules="changePasswordCurrentRules"
                                      :label="$t('settings.encryption.password.current')"
                                      @change="validatePasswordChange"
                                      required />
                      </v-col>
                      <v-col cols="12" sm="3">
                        <v-text-field type="password"
                                      v-model="passwordChange.password[0]"
                                      :rules="changePassword1Rules"
                                      :label="$t('settings.encryption.password.1st')"
                                      @change="validatePasswordChange"
                                      required />
                      </v-col>
                      <v-col cols="12" sm="3">
                        <v-text-field type="password"
                                      v-model="passwordChange.password[1]"
                                      :rules="changePassword2Rules"
                                      :label="$t('settings.encryption.password.2nd')"
                                      @change="validatePasswordChange"
                                      required />
                      </v-col>
                      <v-col cols="12" sm="3" align-self="center">
                        <v-btn block color="primary" @click="onPasswordChange" :disabled="!passwordChange.valid">
                          <v-icon>compare_arrows</v-icon>
                          {{$t('settings.encryption.actions.change')}}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- disable encryption -->
            <v-col cols="12">
              <v-card>
                <v-card-text>
                  <v-form v-model="decryption.valid" @submit.prevent="onDecrypt" ref="encryption-disable">
                    <v-row>
                      <v-col cols="12" sm="3">
                        <v-text-field :type="decryption.showPassword ? 'text' : 'password'"
                                      :append-icon="decryption.showPassword ? 'visibility' : 'visibility_off'"
                                      @click:append="decryption.showPassword = !decryption.showPassword"
                                      v-model="decryption.password"
                                      :label="$t('settings.encryption.password.current')"
                                      required />
                      </v-col>
                      <v-col cols="12" sm="3" align-self="center">
                        <v-btn block color="primary" @click="onDecrypt" :disabled="!decryption.valid">
                          <v-icon>lock_open</v-icon>
                          {{$t('settings.encryption.actions.decrypt')}}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>

          </v-row>

        </v-card-text>
      </template>
      <template v-else>
        <v-card-text>
          <v-form v-model="encryption.valid" @submit.prevent="onEncrypt" ref="encryption-enable">
            <v-row>

              <v-col cols="12" sm="4">
                <v-text-field type="password"
                              :label="$t('settings.encryption.password.1st')"
                              v-model="encryption.password[0]"
                              :rules="encryptionPassword1Rules"
                              @change="validateEncryptionChange"
                              required />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field type="password"
                              :label="$t('settings.encryption.password.2nd')"
                              v-model="encryption.password[1]"
                              :rules="encryptionPassword2Rules"
                              @change="validateEncryptionChange"
                              required />
              </v-col>
              <v-col cols="12" sm="4" align-self="center">
                <v-btn block color="primary" @click="onEncrypt" :disabled="!encryption.valid">
                  <v-icon>lock</v-icon>
                  {{$t('settings.encryption.actions.encrypt')}}
                </v-btn>
              </v-col>

            </v-row>
          </v-form>
        </v-card-text>
      </template>

    </v-card>

    <v-dialog v-model="showHelp" scrollable>
      <HelpEncryption>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" @click="showHelp = false">
          {{$t('common.confirmation.close')}}
        </v-btn>
      </HelpEncryption>
    </v-dialog>

    <v-snackbar v-model="snackbar.change.failed" color="error" class="text-center" :timeout="5000">
      {{$t('encryption.invalid')}}
      <v-btn text @click="snackbar.change.failed = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar.change.success" color="success" class="text-center" :timeout="5000">
      {{$t('settings.encryption.change.successful')}}
      <v-btn text @click="snackbar.change.success = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import HelpEncryption from "../help/Encryption";

  export default {
    name: "SettingsEncryption",
    components: {HelpEncryption},
    data: () => ({
      showHelp: false,
      encryption: {
        valid: false,
        password: ["", ""],
      },
      decryption: {
        valid: false,
        showPassword: false,
        password: "",
      },
      passwordChange: {
        valid: false,
        showPassword: false,
        current: null,
        password: ["", ""],
      },
      snackbar: {
        change: {
          success: false,
          failed: false,
        }
      }
    }),
    computed: {
      ...mapState({
        isEncrypted: state => state.settings.encrypted,
      }),
      encryptionPassword1Rules(){
        return [
          v => !!v || this.$t('common.form.validation.required')
        ]
      },
      encryptionPassword2Rules(){
        return [
          v => !!v || this.$t('settings.encryption.password.different'),
          v => this.encryption.password[0] === this.encryption.password[1] || this.$t('settings.encryption.password.different')
        ]
      },
      changePasswordCurrentRules(){
        return [
          v => !!v || this.$t('common.form.validation.required')
        ]
      },
      changePassword1Rules(){
        return [
          v => !!v || this.$t('settings.encryption.password.different'),
        ]
      },
      changePassword2Rules(){
        return [
          v => !!v || this.$t('settings.encryption.password.different'),
          v => this.passwordChange.password[0] === this.passwordChange.password[1] || this.$t('settings.encryption.password.different')
        ]
      },

    },
    methods: {
      ...mapActions({
        checkSecret: 'settings/checkSecret',
        enableEncryption: 'settings/enableEncryption',
        disableEncryption: 'settings/disableEncryption'
      }),
      onEncrypt(){
        if(!this.encryption.valid) return

        let secret = this.encryption.password[0]
        this.$refs['encryption-enable'].reset()
        this.enableEncryption(secret)
      },
      validateEncryptionChange(){
        this.$refs['encryption-enable'].validate()
      },
      onPasswordChange(){
        if(!this.passwordChange.valid) return

        this.checkSecret(this.passwordChange.current)
        .then(() => {
          this.enableEncryption(this.passwordChange.password[0])
          this.$refs['password-change'].reset()

          this.snackbar.change.success = true
        })
        .catch(() => this.snackbar.change.failed = true)
      },
      validatePasswordChange(){
        this.$refs['password-change'].validate()
      },
      onDecrypt(){
        if(!this.decryption.valid) return

        this.checkSecret(this.decryption.password)
        .then(() => {
          this.$refs['encryption-disable'].reset()
        })
        .then(() => this.disableEncryption())
        .catch(() => this.snackbar.change.failed = true)
      },
    }
  }
</script>

<style scoped>

</style>
