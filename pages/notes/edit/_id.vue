<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <span class="headline">{{$t('note.edit.title')}}</span>
      </v-card-title>
      <v-card-text>
        <NoteFormText form-id="note-edit-form" v-if="note.type === 'text'" :data="note" @onSubmit="onSaveNote" ></NoteFormText>
        <NoteFormReminder form-id="note-edit-form" v-if="note.type === 'reminder'" :data="note" @onSubmit="onSaveNote" ></NoteFormReminder>
        <NoteFormPicture form-id="note-edit-form" v-if="note.type === 'picture'" :data="note" @onSubmit="onSaveNote" ></NoteFormPicture>
        <NoteFormTemplate form-id="note-edit-form" v-if="note.type === 'template'" :data="note" @onSubmit="onSaveNote" ></NoteFormTemplate>
        <NoteFormCredentials form-id="note-edit-form" v-if="note.type === 'credentials'" :data="note" @onSubmit="onSaveNote" ></NoteFormCredentials>
        <NoteFormCamera form-id="note-edit-form" v-if="note.type === 'camera'" :data="note" @onSubmit="onSaveNote" ></NoteFormCamera>
        <NoteFormRecord form-id="note-edit-form" v-if="note.type === 'record'" :data="note" @onSubmit="onSaveNote" ></NoteFormRecord>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="error" @click="onAbort" v-shortkey="['esc']" @shortkey="onAbort">{{$t('note.actions.abort')}}</v-btn>
        <v-btn color="primary" type="submit" form="note-edit-form">{{$t('note.actions.save')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

import NoteFormText from "../../../components/note/form/Text";
import NoteFormPicture from "../../../components/note/form/Picture";
import NoteFormTemplate from "../../../components/note/form/Template";
import HelpFirstSteps from "../../../components/help/FirstSteps";
import NoteFormCredentials from "../../../components/note/form/Credentials";
import NoteFormCamera from "../../../components/note/form/Camera";
import NoteFormReminder from "../../../components/note/form/Reminder";
import NoteFormRecord from "../../../components/note/form/Record";

export default {
  components: {
    NoteFormReminder,
    HelpFirstSteps,
    NoteFormTemplate,
    NoteFormText,
    NoteFormPicture,
    NoteFormCredentials,
    NoteFormCamera,
    NoteFormRecord
  },
  data(){
    return {
      snackbar: {
        saved: false,
      },
    }
  },
  computed: {
    note(){
      return this.$store.getters['note/getNoteById'](this.$route.params.id)
    },
  },
  methods: {
    ...mapActions({
      editNote: 'note/editNote',
    }),
    onAbort(){
      this.$router.back()
    },
    onSaveNote(note) {
      this.editNote({
        id: this.note.id,
        type: this.note.type,
        ...note,
      })
      this.$router.back()
    }
  }
}
</script>
