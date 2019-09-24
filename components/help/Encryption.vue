<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" flat>
      <v-toolbar-title>{{$t('encryption.help.title')}}</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>

    <v-card-text class="pt-4">
      <div>
        <vue-markdown :source="$t('encryption.help.content')" />
      </div>
    </v-card-text>

    <v-card-actions>
      <slot></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
  import VueMarkdown from 'vue-markdown'

  export default {
    name: "HelpEncryption",
    components: {
      'vue-markdown': VueMarkdown,
    },
  }
</script>

<style scoped>

</style>
