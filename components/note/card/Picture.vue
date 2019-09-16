<template>
  <v-card class="elevation-6">
    <v-toolbar color="primary" flat>
      <v-toolbar-title>{{note.title}}</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>

    <v-dialog v-model="fullscreen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-card-actions>
          <v-card-title >{{note.title}}</v-card-title>
          <div class="flex-grow-1"></div>
          <v-btn icon class="error" @click="onDelete()">
            <v-icon>delete</v-icon>
          </v-btn>
          <v-btn icon class="primary" @click="onEdit()">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn icon @click="onCopy()">
            <v-icon>file_copy</v-icon>
          </v-btn>
          <v-btn icon @click="fullscreen = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-actions>

        <v-img :src="note.content.url"></v-img>
      </v-card>
    </v-dialog>

    <div class="card-view">
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
  .card-view {
    height: 250px;
    overflow: auto;
  }
</style>
