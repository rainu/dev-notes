<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" flat>
      <v-toolbar-title>{{$t('backup.aws.s3.help.title')}}</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>

    <v-card-text class="pt-4">
      <div>
        <vue-markdown :source="$t('backup.aws.s3.help.content', contentArgs)" />
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
    name: "HelpAWSS3",
    components: {
      'vue-markdown': VueMarkdown,
    },
    computed:{
      contentArgs(){
        return {
          corsOrigin: window.location.origin
        }
      }
    }
  }
</script>

<style scoped>

</style>
