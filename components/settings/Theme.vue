<template>
  <v-card>
    <v-card-text>
      <v-switch v-model="darkModeSwitch" :label="$t('settings.theme.dark')" color="primary"></v-switch>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: "SettingsTheme",
    data(){
      return {
        darkModeSwitch: false
      }
    },
    computed: {
      ...mapState({
        darkMode: state => state.settings.theme.dark,
      })
    },
    methods: {
      ...mapActions({
        applyDarkMode: 'settings/applyThemeDark'
      })
    },
    watch: {
      darkModeSwitch(value){
        this.applyDarkMode(value)
      }
    },
    mounted() {
      this.darkModeSwitch = this.darkMode
    }
  }
</script>

<style scoped>

</style>
