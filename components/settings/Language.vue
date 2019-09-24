<template>
  <v-card>
    <v-card-text>
      <v-select
        :items="localeOptions"
        :value="locale"
        item-text="label"
        item-value="value"
        prepend-icon="language"
        :label="$t('settings.language.title')"
        @change="onLanguageChange"
      ></v-select>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import i18n from '../../locales'

  export default {
    name: "SettingsLanguage",
    computed: {
      ...mapState({
        locale: state => state.settings.locale,
        locales: state => state.settings.locales,
      }),
      localeOptions(){
        return this.locales.map(l => ({value: l, label: i18n.localeMappings[l].meta.language.code}))
      },
    },
    methods: {
      ...mapActions({
        applyLanguage: 'settings/applyLanguage',
      }),
      onLanguageChange(lang){
        this.applyLanguage(lang)
      },
    }
  }
</script>

<style scoped>

</style>
