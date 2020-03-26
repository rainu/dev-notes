<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" flat>
      <v-toolbar-title>{{$t('note.help.first-steps.title', textArgs)}}</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>

    <v-card-text>
      <vue-markdown :source="$t('note.help.first-steps.preamble', textArgs)" />
      <div v-for="type of types" :key="type.id">
        <h3>
          <v-icon>{{type.icon}}</v-icon>
          {{$t(`note.${type.id}.title`, textArgs)}}
        </h3>
        <vue-markdown :source="$t(`note.${type.id}.help`, textArgs)" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  import noteTypes from '../../components/note/types'

  export default {
    name: "HelpFirstSteps",
    components: {
      'vue-markdown': VueMarkdown,
    },
    data(){
      return{
        types: noteTypes
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
