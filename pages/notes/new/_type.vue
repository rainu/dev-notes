<template>
  <v-container fluid>

    <v-card>
      <v-card-text>
        <v-select
          :items="noteTypes"
          :item-text="getNoteTypeLabel"
          item-value="id"
          :value="noteType"
          @change="onNewNote"
          solo
        >
        </v-select>

        <NoteFormText form-id="note-new-form" v-if="noteType === 'text'" @onSubmit="onSaveNewNote" :initial-color="initialColor" :initial-tags="initialTags"></NoteFormText>
        <NoteFormReminder form-id="note-new-form" v-if="noteType === 'reminder'" @onSubmit="onSaveNewNote" :initial-color="initialColor" :initial-tags="initialTags"></NoteFormReminder>
        <NoteFormPicture form-id="note-new-form" v-if="noteType === 'picture'" @onSubmit="onSaveNewNote" :initial-color="initialColor" :initial-tags="initialTags"></NoteFormPicture>
        <NoteFormTemplate form-id="note-new-form" v-if="noteType === 'template'" @onSubmit="onSaveNewNote" :initial-color="initialColor" :initial-tags="initialTags"></NoteFormTemplate>
        <NoteFormCredentials form-id="note-new-form" v-if="noteType === 'credentials'" @onSubmit="onSaveNewNote" :initial-color="initialColor" :initial-tags="initialTags"></NoteFormCredentials>
        <NoteFormCamera form-id="note-new-form" v-if="noteType === 'camera'" @onSubmit="onSaveNewNote" :initial-color="initialColor" :initial-tags="initialTags"></NoteFormCamera>
        <NoteFormRecord form-id="note-new-form" v-if="noteType === 'record'" @onSubmit="onSaveNewNote" :initial-color="initialColor" :initial-tags="initialTags"></NoteFormRecord>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="error" @click="onAbort" v-shortkey="['esc']" @shortkey="onAbort">{{$t('note.actions.abort')}}</v-btn>
        <v-btn color="primary" type="submit" form="note-new-form">{{$t('note.actions.save')}}</v-btn>
      </v-card-actions>
    </v-card>

  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import { readBoardQuery } from '../../../common/boardQuery';
import uuid4 from 'uuid4';

import NoteFormText from "../../../components/note/form/Text";
import NoteFormPicture from "../../../components/note/form/Picture";
import NoteFormTemplate from "../../../components/note/form/Template";
import HelpFirstSteps from "../../../components/help/FirstSteps";
import NoteFormCredentials from "../../../components/note/form/Credentials";
import NoteFormCamera from "../../../components/note/form/Camera";
import NoteFormRecord from "../../../components/note/form/Record";
import NoteFormReminder from "../../../components/note/form/Reminder";
import noteTypes from "../../../components/note/types";

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
      noteTypes: noteTypes
    }
  },
  computed: {
    noteType(){
      return this.$route.params.type
    },
    initialTags(){
      const boardInfo = readBoardQuery(this.$route.query)
      let activeTags = []
      for(let tagName in boardInfo.tags) {
        if(boardInfo.tags[tagName] === true) {
          activeTags.push(tagName)
        }
      }
      return activeTags
    },
    initialColor(){
      const boardInfo = readBoardQuery(this.$route.query)
      return boardInfo.color
    }
  },
  methods: {
    ...mapActions({
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
    getNoteTypeLabel(item){
      return this.$t(`note.${item.id}.title`)
    },
    onNewNote(type) {
      this.$router.replace("/notes/new/" + type)
    },
  }
}
</script>

<style>
  div.v-menu__content.menuable__content__active {
    max-height: 400px !important;
  }
</style>
