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

        <v-img :src="note.content.url"></v-img>

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

    <div :class="viewClass">
      <v-img :src="note.content.url" ></v-img>
    </div>

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
  import { mapState } from 'vuex';

  export default {
    name: "NoteCardPicture",
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
    computed: {
      ...mapState({
        noteSettings: state => state.settings.notes,
      }),
      viewClass(){
        if(!this.noteSettings.fixed) return ""
        return `card-view-${this.noteSettings.size}`
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
        this.$emit('onCopy', this.note.content.url)
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
</style>
