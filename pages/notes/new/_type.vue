<template>
  <v-container fluid>

    <v-card>

      <v-card-text>
        <NoteFormText form-id="note-new-form" v-if="noteType === 'text'" @onSubmit="onSaveNewNote" ></NoteFormText>
        <NoteFormReminder form-id="note-new-form" v-if="noteType === 'reminder'" @onSubmit="onSaveNewNote" ></NoteFormReminder>
        <NoteFormPicture form-id="note-new-form" v-if="noteType === 'picture'" @onSubmit="onSaveNewNote" ></NoteFormPicture>
        <NoteFormTemplate form-id="note-new-form" v-if="noteType === 'template'" @onSubmit="onSaveNewNote" ></NoteFormTemplate>
        <NoteFormCredentials form-id="note-new-form" v-if="noteType === 'credentials'" @onSubmit="onSaveNewNote" ></NoteFormCredentials>
        <NoteFormCamera form-id="note-new-form" v-if="noteType === 'camera'" @onSubmit="onSaveNewNote" ></NoteFormCamera>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="error" @click="onAbort">{{$t('note.actions.abort')}}</v-btn>
        <v-btn color="primary" type="submit" form="note-new-form">{{$t('note.actions.save')}}</v-btn>
      </v-card-actions>
    </v-card>

  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';
import uuid4 from 'uuid4';

import NoteCardText from "../../../components/note/card/Text";
import NoteCardPicture from "../../../components/note/card/Picture";
import NoteFormText from "../../../components/note/form/Text";
import NoteFormPicture from "../../../components/note/form/Picture";
import NoteFormTemplate from "../../../components/note/form/Template";
import NoteCardTemplate from "../../../components/note/card/Template";
import HelpFirstSteps from "../../../components/help/FirstSteps";
import NoteOrderConfig from "../../../components/note/OrderConfig";
import NoteFormCredentials from "../../../components/note/form/Credentials";
import NoteCardCredentials from "../../../components/note/card/Credentials";
import NoteFormCamera from "../../../components/note/form/Camera";
import NoteCardCamera from "../../../components/note/card/Camera";
import NoteFormReminder from "../../../components/note/form/Reminder";
import NoteCardReminder from "../../../components/note/card/Reminder";

export default {
  components: {
    NoteCardReminder,
    NoteFormReminder,
    NoteOrderConfig,
    HelpFirstSteps,
    NoteCardTemplate,
    NoteFormTemplate,
    NoteCardText,
    NoteFormText,
    NoteCardPicture,
    NoteFormPicture,
    NoteCardCredentials,
    NoteFormCredentials,
    NoteCardCamera,
    NoteFormCamera
  },
  data(){
    return {}
  },
  computed: {
    noteType(){
      return this.$route.params.type
    },
  },
  methods: {
    ...mapMutations({
      addNote: 'note/addNote',
    }),
    onAbort(){
      this.$router.back()
    },
    onSaveNewNote(note){
      this.addNote({
        id: uuid4(),
        type: this.noteType,
        ...note
      })
      this.$router.back()
    },
  }
}
</script>
