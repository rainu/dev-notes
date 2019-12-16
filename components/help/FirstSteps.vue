<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" flat>
      <v-toolbar-title>{{$t('note.help.first-steps.title', textArgs)}}</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>

    <v-card-text>
      <vue-markdown :source="$t('note.help.first-steps.preamble', textArgs)" />


      <v-expansion-panels >
        <v-expansion-panel>
          <v-expansion-panel-header><vue-markdown :source="$t('note.help.first-steps.preamble2', textArgs)" /></v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-for="type of types" :key="type.name">
                <v-icon>{{type.icon}}</v-icon>
                {{$t(`note.${type.name}.title`, textArgs)}}
              <vue-markdown :source="$t(`note.${type.name}.help`, textArgs)" />
            </div>        </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>


    </v-card-text>
  </v-card>
</template>

<script>

  import { mapState, mapGetters } from 'vuex';
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
      ...mapGetters({
        hasDeletedNotes: 'note/hasDeletedNotes',
      }),
      ...mapState({
        notes: state => state.note.notes,
      }),
    }
  }
</script>

<style scoped>

</style>
