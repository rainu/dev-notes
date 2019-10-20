<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" flat>
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
            <v-col cols="12" sm="5">
              <v-text-field type="password"
                            :label="$t('backup.encryption.password.1st')"
                            :rules="password1Rules"
                            v-model="password[0]"
                            @change="validateChange"
                            required />
            </v-col>
            <v-col cols="12" sm="5">
              <v-text-field type="password"
                            :label="$t('backup.encryption.password.2nd')"
                            :rules="password2Rules"
                            v-model="password[1]"
                            @change="validateChange"
                            required />
            </v-col>
          </template>

        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "BackupEncryption",
    data(){
      return {
        valid: false,
        enable: false,
        password: [null, null]
      }
    },
    computed: {
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
      validateChange(){
        this.$refs['encryption-enable'].validate()
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
    }
  }
</script>

<style scoped>

</style>
