<template>
  <v-card>
    <v-card-text>
      <v-text-field
        :label="$t('settings.tags.delimiter')"
        :value="delimiter"
        @change="onDelimiterChange"
        />
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: "SettingsTagDelimiter",
    computed: {
      ...mapState({
        delimiter: state => state.settings.tag.delimiter,
      })
    },
    methods: {
      ...mapActions({
        setTagDelimiter: 'settings/setTagDelimiter'
      }),
      onDelimiterChange(delimiter){
        this.setTagDelimiter(delimiter)
      },
    },
  }
</script>

<style scoped>

</style>
