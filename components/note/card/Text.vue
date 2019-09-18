<template>
  <v-card class="elevation-6">
    <v-toolbar color="primary" flat>
      <v-toolbar-title>{{note.title}}</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>

    <v-dialog v-model="fullscreen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar color="primary" flat>
          <v-toolbar-title>{{note.title}}</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-btn icon @click="fullscreen = false">
            <v-icon>fullscreen_exit</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="pa-4">
          <vue-markdown v-if="note.content.markdown" :source="note.content.markdown"></vue-markdown>
          <template v-if="note.content.text">{{note.content.text}}</template>
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

    <v-card-text class="card-view">
      <vue-markdown v-if="note.content.markdown" :source="note.content.markdown"></vue-markdown>
      <template v-if="note.content.text">{{note.content.text}}</template>
    </v-card-text>

    <v-card-actions>
      <v-btn icon class="error" @click="onDelete()">
        <v-icon>delete</v-icon>
      </v-btn>
      <v-btn icon class="primary" @click="onEdit()">
        <v-icon>edit</v-icon>
      </v-btn>

      <div class="flex-grow-1"></div>

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
  import VueMarkdown from 'vue-markdown'

  export default {
    components: {
      'vue-markdown': VueMarkdown,
    },
    name: "NoteCardText",
    props: {
      note: {
        type: Object,
        required: true,
      }
    },
    data(){
      return {
        fullscreen: false
      }
    },
    methods: {
      onEdit(){
        this.$emit('onEdit')
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
  .card-view {
    height: 250px;
    overflow: auto;
  }
</style>
