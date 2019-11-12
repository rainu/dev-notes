<template>
  <v-dialog v-model="dialog.show" fullscreen>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on">
        <v-icon>low_priority</v-icon>
      </v-btn>
    </template>

    <v-card class="elevation-6">
      <v-toolbar color="primary" flat>
        <v-toolbar-title>{{$t('note.order.title')}}</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="dialog.show = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>


      <draggable v-model="noteOrder">
        <v-card-text v-for="noteId of noteOrder" :key="noteId" class="pa-2">

          <v-card class="handle">
            <v-card-text class="pa-2">
              <v-icon class="pb-1">drag_indicator</v-icon>
              {{noteMap[noteId].title}}
            </v-card-text>

          </v-card>

        </v-card-text>
      </draggable>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex';
  import draggable from 'vuedraggable'

  export default {
    name: "NoteOrderConfig",
    components: {draggable},
    data() {
      return {
        dialog: {
          show: false,
        }
      }
    },
    computed: {
      ...mapState({
        notes: state => state.note.notes,
      }),
      noteOrder: {
        get() {
          return this.$store.state.note.noteOrder
        },
        set(value) {
          this.$store.commit('note/setNoteOrder', value)
        }
      },
      noteMap(){
        let map = {}

        for(let note of this.notes) {
          map[note.id] = note
        }

        return map
      }
    },
  }
</script>

<style scoped>
  .handle {
    cursor: grab;
  }
</style>
