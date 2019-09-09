<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex xs12 sm8 md6>

      <v-dialog v-model="note.dialog.open" persistent>
        <v-card v-if="note.dialog.type">
          <v-card-title>
            <span class="headline">{{$t(note.dialog.type.text)}}</span>
          </v-card-title>
          <v-card-text>
            <NoteText v-if="note.dialog.type.id === 'text'"></NoteText>
            <NotePicture v-if="note.dialog.type.id === 'picture'"></NotePicture>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="error" @click="note.dialog.open = false">Close</v-btn>
            <v-btn color="primary" @click="note.dialog.open = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-footer app class="pa-0">
        <v-toolbar dense>
          <div class="flex-grow-1"></div>

          <v-toolbar-items>
            <v-menu offset-y top>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                  <v-icon>add_circle</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="type in note.types" :key="type.id">
                  <v-btn block @click="onNewNote(type)">
                    <v-icon>{{type.icon}}</v-icon>
                    {{$t(type.text)}}
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar-items>
        </v-toolbar>
      </v-footer>
    </v-flex>
  </v-layout>
</template>

<script>
import NoteText from "../components/note/Text";
import NotePicture from "../components/note/Text";

export default {
  components: {
    NoteText, NotePicture
  },
  data(){
    return {
      note: {
        dialog: {
          open: false,
          type: null
        },
        data: {},
        types: [
          { id: 'picture', icon: 'photo', text: 'note.type.picture' },
          { id: 'text', icon: 'notes', text: 'note.type.text' },
        ]
      }
    }
  },
  methods: {
    onNewNote(type) {
      this.note.dialog.open = true
      this.note.dialog.type = type
    }
  }
}
</script>
