<template>
  <div>
    <v-dialog :value="show" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">{{$t('backup.encryption.unlock')}}</span>
        </v-card-title>

        <v-card-text>
          <v-form @submit.prevent="onUnlock">
            <v-text-field :type="showPassword ? 'text' : 'password'"
                          :label="$t('backup.encryption.password.1st')"
                          v-model="password"
                          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                          @click:append="showPassword = !showPassword"/>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn type="submit" form="login-form" :disabled="!password" @click="onUnlock">{{$t('backup.encryption.actions.unlock')}}</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: "BackupUnlock",
    props: {
      show: {
        type: Boolean,
        required: false,
        default: true,
      },
      providePassword: {
        type: Function,
        required: false,
        default: () => {},
      },
    },
    data(){
      return {
        showPassword: false,
        password: null
      }
    },
    methods: {
      onUnlock(){
        this.providePassword(this.password)
      }
    }
  }
</script>

<style scoped>

</style>
