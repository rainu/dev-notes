<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="12" sm="6" md="3" v-for="note of deletedNotes" :key="note.id">

        <NoteCardText v-if="note.type === 'text'" :note="note" :editable="false" :restorable="true"
                      :show-tags="showTags"
                      @onCopy="onCopyNote"
                      @onRestore="onRestore(note.id)"
                      @onDelete="onDeleteRequest(note.id)" />
        <NoteCardReminder v-if="note.type === 'reminder'" :note="note" :editable="false" :restorable="true"
                      :show-tags="showTags"
                      @onCopy="onCopyNote"
                      @onRestore="onRestore(note.id)"
                      @onDelete="onDeleteRequest(note.id)" />
        <NoteCardCredentials v-if="note.type === 'credentials'" :note="note" :editable="false" :restorable="true"
                      :show-tags="showTags"
                      @onCopy="onCopyNote"
                      @onRestore="onRestore(note.id)"
                      @onDelete="onDeleteRequest(note.id)" />
        <NoteCardPicture v-if="note.type === 'picture'" :note="note" :editable="false" :restorable="true"
                         :show-tags="showTags"
                         @onCopy="onCopyNote"
                         @onRestore="onRestore(note.id)"
                         @onDelete="onDeleteRequest(note.id)" />
        <NoteCardCamera v-if="note.type === 'camera'" :note="note" :editable="false" :restorable="true"
                         :show-tags="showTags"
                         @onCopy="onCopyNote"
                         @onRestore="onRestore(note.id)"
                         @onDelete="onDeleteRequest(note.id)" />
        <NoteCardTemplate v-if="note.type === 'template'" :note="note" :editable="false" :restorable="true"
                          :show-tags="showTags"
                          @onCopy="onCopyNote"
                          @onRestore="onRestore(note.id)"
                          @onDelete="onDeleteRequest(note.id)" />

      </v-col>
    </v-row>

    <v-dialog v-model="dialog.delete.open" max-width="290">
      <v-card>
        <v-card-title class="headline">{{$t('common.confirmation.title')}}</v-card-title>
        <v-card-text>{{$t('note.delete.confirmation')}}</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error" @click="onDeleteNote()">
            {{$t('common.confirmation.agree')}}
          </v-btn>
          <v-btn color="primary" @click="dialog.delete.open = false">
            {{$t('common.confirmation.disagree')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.deleteAll.open" max-width="290">
      <v-card>
        <v-card-title class="headline">{{$t('common.confirmation.title')}}</v-card-title>
        <v-card-text>{{$t('note.delete.all.confirmation')}}</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error" @click="onDeleteAllNotes()">
            {{$t('common.confirmation.agree')}}
          </v-btn>
          <v-btn color="primary" @click="dialog.deleteAll.open = false">
            {{$t('common.confirmation.disagree')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.restored" color="success" class="text-center" :timeout="1000">
      {{$t('note.restored.successful')}}
      <v-btn text @click="snackbar.restored = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar.copied" color="success" class="text-center" :timeout="1000">
      {{$t('note.copy.successful')}}
      <v-btn text @click="snackbar.copied = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

    <v-footer app class="pa-0">
      <v-toolbar dense color="footer">
        <v-toolbar-items>
          <v-btn @click="onDeleteAllRequest" color="error">
            <v-icon >delete_forever</v-icon>
            {{$t('note.delete.all.action')}}
          </v-btn>
        </v-toolbar-items>
        <div class="flex-grow-1"></div>

        <v-toolbar-items>
          <v-btn @click="showTags = !showTags">
            <v-icon :color="showTags ? 'primary' : ''">flag</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-footer>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import copy from 'copy-to-clipboard';
import NoteCardText from "../../components/note/card/Text";
import NoteCardPicture from "../../components/note/card/Picture";
import NoteCardTemplate from "../../components/note/card/Template";
import NoteCardCredentials from "../../components/note/card/Credentials";
import NoteCardCamera from "../../components/note/card/Camera";
import NoteCardReminder from "../../components/note/card/Reminder";

export default {
  components: {
    NoteCardReminder,
    NoteCardTemplate,
    NoteCardText,
    NoteCardPicture,
    NoteCardCredentials,
    NoteCardCamera,
  },
  data(){
    return {
      dialog: {
        delete: {
          open: false,
          noteId: null
        },
        deleteAll: {
          open: false,
        }
      },

      showTags: false,

      snackbar: {
        restored: false,
        copied: false,
      },

    }
  },
  computed: {
    ...mapState({
      deletedNotes: state => state.note.deletedNotes,
    }),
  },
  methods: {
    ...mapMutations({
      deleteNote: 'note/deleteNote',
      deleteAllNotes: 'note/clearDeletedNotes',
      restoreNote: 'note/restoreDeletedNote',
    }),
    onDeleteRequest(id) {
      this.dialog.delete.open = true
      this.dialog.delete.noteId = id
    },
    onDeleteNote() {
      this.deleteNote(this.dialog.delete.noteId)
      this.dialog.delete.open = false
      this.dialog.delete.noteId = null
    },
    onDeleteAllRequest(){
      this.dialog.deleteAll.open = true
    },
    onDeleteAllNotes(){
      this.deleteAllNotes()
      this.dialog.deleteAll.open = false
    },
    onRestore(id) {
      this.restoreNote(id)
      this.snackbar.restored = true
    },
    onCopyNote(content) {
      this.snackbar.copied = false
      copy(content)
      this.snackbar.copied = true
    },
  },
}
</script>
