<template>
  <v-container fill-height>
    <v-row align="center"
           justify="center">
        <v-progress-circular
          :size="250"
          :width="10"
          color="primary"
          indeterminate
          class="text-center"
        >
          {{$t('recall.progress')}}
        </v-progress-circular>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    computed: {
      recall(){
        return this.$route.query.recall
      }
    },
    methods:{
      ...mapActions({
        setDropboxAuth: 'secrets/setDropboxAuth',
        refreshDropboxToken: 'secrets/refreshDropboxToken',
      }),
      handleDropbox(){
        //dropbox use a oath2 auth workflow. that means the user will be redirected
        //to the dropbox' login masked and after the login was successfully dropbox
        //redirects the user back to our web-app

        //this middleware is responsible for reading the dropbox auth token and store
        //them into our store

        let hashParams = new URLSearchParams(this.$route.hash.substring(2))
        let authParams = {}
        for(let [key, value] of hashParams.entries()) {
          authParams[key] = value
        }

        this.setDropboxAuth(authParams)
          .then(() => this.refreshDropboxToken())
          .then(() => this.$router.replace(`/backup?selected=4`)) //the 4th panel is dropbox
      }
    },
    mounted() {
      switch (this.recall) {
        case 'dropbox': this.handleDropbox(); return
        default: {
          console.error("Unknown recall!")
          this.$router.replace('/') //goto home!
        }
      }
    }
  }
</script>

<style scoped>

</style>
