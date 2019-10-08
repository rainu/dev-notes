<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" flat>
      <v-toolbar-title>{{$t('note.help.first-steps.title', textArgs)}}</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>

    <v-card-text>
      <vue-markdown :source="$t('note.help.first-steps.preamble', textArgs)" />
      <div v-for="type of types" :key="type.name">
        <h3>
          <v-icon>{{type.icon}}</v-icon>
          {{$t(`note.${type.name}.title`, textArgs)}}
        </h3>
        <vue-markdown :source="$t(`note.${type.name}.help`, textArgs)" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  import VueMarkdown from 'vue-markdown'

  export default {
    name: "HelpFirstSteps",
    components: {
      'vue-markdown': VueMarkdown,
    },
    data(){
      return{
        types: [{
          name: 'text',
          icon: 'notes'
        }, {
          name: 'credentials',
          icon: 'fingerprint'
        }, {
          name: 'picture',
          icon: 'photo'
        }, {
          name: 'camera',
          icon: 'camera'
        }, {
          name: 'template',
          icon: 'ballot'
        }]
      }
    },
    computed: {
      textArgs(){
        return {
          appName: process.env.appName,
        }
      },
    }
  }
</script>

<style scoped>

</style>
