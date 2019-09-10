<template>
  <v-container fluid>
    <v-layout column justify-center>
      <v-flex xs12 sm8 md6>

        <v-card class="elevation-12">
          <v-toolbar color="primary" flat>
            <v-toolbar-title>{{$t('settings.others.title')}}</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
          <v-card-text>
            <v-select
              :items="localeOptions"
              :value="locale"
              item-text="label"
              item-value="value"
              prepend-icon="language"
              :label="$t('settings.others.language.title')"
              @change="onLanguageChange"
            ></v-select>
          </v-card-text>
        </v-card>

      </v-flex>

      <v-footer app class="pa-0">
        <v-toolbar dense>
          <div class="flex-grow-1"></div>

          <v-toolbar-items>
            <v-btn block color="primary" type="submit" @click="onSave">
              <v-icon>save</v-icon>
              {{$t('settings.save')}}
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-footer>

      <v-snackbar v-model="saved" color="success" class="text-center">
        {{$t('settings.saved')}}
        <v-btn text @click="saved = false" >
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
  import i18n from '../../locales'
  import { mapActions, mapState } from 'vuex';

  export default {
    data: () => ({
      language: null,
      saved: false
    }),
    computed: {
      ...mapState({
        locale: state => state.i18n.locale,
        locales: state => state.i18n.locales,
      }),
      localeOptions(){
        return this.locales.map(l => ({value: l, label: i18n.localeMappings[l].meta.language.code}))
      }
    },
    methods: {
      ...mapActions({
        applyLanguage: 'i18n/applyLanguage'
      }),
      onLanguageChange(lang){
        this.language = lang
      },
      onSave(){
        this.saved = false
        this.applyLanguage(this.language)
        this.saved = true
      }
    },
  }
</script>

<style scoped>

</style>
