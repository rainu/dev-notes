<template>
  <v-container fill-height>

    <v-row align="center" justify="center">
      <v-col>
        <v-card>
          <v-card-title>
            <span class="headline">{{$t('encryption.unlock')}}</span>
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="onUnlock">
              <v-text-field :type="showPassword ? 'text' : 'password'"
                            autofocus
                            :label="$t('encryption.password')"
                            v-model="password"
                            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                            @click:append="showPassword = !showPassword"/>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" type="submit" form="login-form" :disabled="!password" @click="onUnlock">{{$t('encryption.actions.unlock')}}</v-btn>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-snackbar v-model="snackbar" color="error" class="text-center" :timeout="5000">
          {{$t('encryption.invalid')}}
          <v-btn text @click="snackbar = false" >
            <v-icon>close</v-icon>
          </v-btn>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data(){
      return {
        showPassword: false,
        snackbar: false,
        password: null
      }
    },
    methods: {
      ...mapActions({
        checkSecret: 'settings/checkSecret',
        setupCrypto: 'settings/setupCrypto',
        initBoards: 'board/init',
        initNotes: 'note/init',
        initSecrets: 'secrets/init',
      }),
      onUnlock(){
        this.checkSecret(this.password)
          .then(() => {
            this.setupCrypto(this.password)
              .then(() => Promise.all([this.initBoards(), this.initNotes(), this.initSecrets()]))
              .then(() => this.$router.push(this.$route.query.from ? this.$route.query.from : "/"))
          })
          .catch(() => this.snackbar = true)
      }
    },
  }
</script>

<style scoped>

</style>
