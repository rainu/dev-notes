<template>
  <v-card class="elevation-6">
    <v-toolbar :color="titleColor" flat>
      <v-toolbar-title>
        <ClickToEdit :value="note.title" @input="onTitleChange" />
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon class="handle">
        <v-icon>drag_indicator</v-icon>
      </v-btn>
    </v-toolbar>

    <v-dialog v-model="fullscreen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar :color="titleColor" flat>
          <v-toolbar-title>{{note.title}}</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-btn icon @click="fullscreen = false">
            <v-icon>fullscreen_exit</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="pa-4">
          <h2>
            <v-row no-gutters justify="center">
              <v-col cols="11" align-self="center" class="text-right pr-3">{{formattedDate}}</v-col>
              <v-col cols="1">
                <v-icon :color="alarmColor">alarm</v-icon>
              </v-col>
            </v-row>
          </h2>
          <v-divider class="my-3" />

          <vue-markdown v-if="note.content.markdown" :source="note.content.markdown"></vue-markdown>
          <pre v-if="note.content.text">{{note.content.text}}</pre>
        </v-card-text>

        <v-card-actions>
          <v-btn icon class="error" @click="onDelete()">
            <v-icon>delete</v-icon>
          </v-btn>
          <v-btn icon class="primary" @click="onEdit()">
            <v-icon>edit</v-icon>
          </v-btn>
          <div class="flex-grow-1"></div>
          <v-btn icon @click="onCopy()">
            <v-icon>file_copy</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card-text :class="viewClass">
      <h2>
        <v-row no-gutters justify="center">
          <v-col cols="11" align-self="center" class="text-right pr-3">{{formattedDate}}</v-col>
          <v-col cols="1">
            <v-icon :color="alarmColor">alarm</v-icon>
          </v-col>
        </v-row>
      </h2>
      <v-divider class="my-3" />

      <vue-markdown v-if="note.content.markdown" :source="note.content.markdown"></vue-markdown>
      <pre v-if="note.content.text">{{note.content.text}}</pre>
    </v-card-text>

    <div class="text-center pt-2 px-2" v-show="showTags">
      <v-chip v-for="tag of note.tags" :key="tag" class="ma-1">{{tag}}</v-chip>
    </div>

    <v-card-actions>
      <v-btn icon class="error" @click="onDelete()">
        <v-icon>delete</v-icon>
      </v-btn>
      <v-btn icon class="primary" @click="onEdit()" v-if="editable">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn icon class="primary" @click="onRestore()" v-if="restorable">
        <v-icon>restore_from_trash</v-icon>
      </v-btn>

      <div class="flex-grow-1"></div>

      <v-btn icon :color="showTags ? 'primary' : ''" @click="showTags = !showTags">
        <v-icon>flag</v-icon>
      </v-btn>
      <v-btn icon @click="fullscreen = true">
        <v-icon>fullscreen</v-icon>
      </v-btn>
      <v-btn icon @click="onCopy()">
        <v-icon>file_copy</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex';
  import VueMarkdown from 'vue-markdown'
  import * as dateFN from 'date-fns'

  export default {
    components: {
      'vue-markdown': VueMarkdown,
    },
    name: "NoteCardReminder",
    props: {
      note: {
        type: Object,
        required: true,
      },
      showTags: {
        type: Boolean,
        required: false,
        default: false
      },
      editable: {
        type: Boolean,
        required: false,
        default: true
      },
      restorable: {
        type: Boolean,
        required: false,
        default: false
      },
    },
    data(){
      return {
        fullscreen: false
      }
    },
    computed: {
      ...mapState({
        noteSettings: state => state.settings.notes,
      }),
      viewClass(){
        if(!this.noteSettings.fixed) return ""
        return `card-view-${this.noteSettings.size}`
      },
      alarmColor(){
        let diff = dateFN.differenceInMinutes(this.note.content.date, new Date())

        if(diff <= 0) return 'error'
        if(diff <= 5) return 'secondary'
        return 'primary'
      },
      titleColor(){
        return this.note.color || 'primary'
      },
      formattedDate(){
        return dateFN.format(this.note.content.date, this.$t('common.datetime.format.datetime'))
      }
    },
    methods: {
      onTitleChange(value){
        this.$emit('onTitleChange', value)
      },
      onEdit(){
        this.$emit('onEdit')
      },
      onRestore(){
        this.$emit('onRestore')
      },
      onDelete(){
        this.$emit('onDelete')
      },
      onCopy(){
        const content = this.note.content.text ? this.note.content.text : this.note.content.markdown
        this.$emit('onCopy', content)
      }
    }
  }
</script>

<style scoped>
  .card-view-small {
    height: 150px;
    overflow: auto;
  }
  .card-view-medium {
    height: 250px;
    overflow: auto;
  }
  .card-view-large {
    height: 350px;
    overflow: auto;
  }
  pre {
    font-family:Roboto, sans-serif;
  }
</style>
