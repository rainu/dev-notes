<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="12" sm="6" md="3" v-for="note of filteredNotes" :key="note.id">

        <NoteCardText v-if="note.type === 'text'" :note="note"
                      @onCopy="onCopyNote"
                      @onEdit="onEditRequest(note)"
                      @onDelete="onDeleteRequest(note.id)" />
        <NoteCardPicture v-if="note.type === 'picture'" :note="note"
                      @onCopy="onCopyNote"
                      @onEdit="onEditRequest(note)"
                      @onDelete="onDeleteRequest(note.id)" />

      </v-col>
    </v-row>

    <v-dialog v-model="dialog.new.open" persistent>
      <v-card v-if="dialog.new.type">
        <v-card-title>
          <span class="headline">{{$t(dialog.new.type.text)}}</span>
        </v-card-title>
        <v-card-text>
          <NoteFormText form-id="note-new-form" v-if="dialog.new.type.id === 'text'" @onSubmit="onSaveNewNote"></NoteFormText>
          <NoteFormPicture form-id="note-new-form" v-if="dialog.new.type.id === 'picture'" @onSubmit="onSaveNewNote"></NoteFormPicture>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error" @click="dialog.new.open = false">{{$t('note.actions.abort')}}</v-btn>
          <v-btn color="primary" type="submit" form="note-new-form">{{$t('note.actions.save')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.edit.open" persistent>
      <v-card v-if="dialog.edit.note">
        <v-card-title>
          <span class="headline">{{$t('note.edit.title')}}</span>
        </v-card-title>
        <v-card-text>
          <NoteFormText form-id="note-edit-form" v-if="dialog.edit.note.type === 'text'" :data="dialog.edit.note" @onSubmit="onSaveNote"></NoteFormText>
          <NoteFormPicture form-id="note-edit-form" v-if="dialog.edit.note.type === 'picture'" :data="dialog.edit.note" @onSubmit="onSaveNote"></NoteFormPicture>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error" @click="dialog.edit.open = false">{{$t('note.actions.abort')}}</v-btn>
          <v-btn color="primary" type="submit" form="note-edit-form">{{$t('note.actions.save')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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

    <v-snackbar v-model="snackbar.copied" color="success" class="text-center" :timeout="1000">
      {{$t('note.copy.successful')}}
      <v-btn text @click="snackbar.copied = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar.saved" color="success" class="text-center" :timeout="1000">
      {{$t('note.saved.successful')}}
      <v-btn text @click="snackbar.saved = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

    <v-footer app class="pa-0">
      <v-toolbar dense color="footer">
        <div class="flex-grow-1"></div>

        <v-toolbar-items>
          <v-menu offset-y top max-height="50%" :close-on-content-click="false">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="primary">
                <v-icon>search</v-icon>
              </v-btn>
            </template>
            <v-list v-if="availableTags && availableTags.length > 0">
              <v-list-item v-for="tag in availableTags" :key="tag">
                <v-btn block class="text-capitalize" @click="onFilterTagChange(tag)">
                  <v-icon v-if="filter.tags[tag] === true" color="green">check_circle</v-icon>
                  <v-icon v-if="filter.tags[tag] === false" color="red">remove_circle</v-icon>
                  <v-icon v-if="filter.tags[tag] === null">filter_list</v-icon>
                  <span class="flex-grow-1"></span>
                  {{tag}}
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu offset-y top>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="primary">
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
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import Vue from 'vue'
import copy from 'copy-to-clipboard';
import uuid4 from 'uuid4';

import { readBoardQuery } from '../common/boardQuery'
import NoteCardText from "../components/note/card/Text";
import NoteCardPicture from "../components/note/card/Picture";
import NoteFormText from "../components/note/form/Text";
import NoteFormPicture from "../components/note/form/Picture";

export default {
  components: {
    NoteCardText, NoteCardPicture, NoteFormText, NoteFormPicture
  },
  data(){
    return {
      dialog: {
        new: {
          open: false,
          type: null
        },
        edit: {
          open: false,
          note: null
        },
        delete: {
          open: false,
          noteId: null
        }
      },

      filter: {
        tags: {},
      },

      snackbar: {
        copied: false,
        saved: false,
      },

      note: {
        data: {},
        types: [
          { id: 'picture', icon: 'photo', text: 'note.picture.title' },
          { id: 'text', icon: 'notes', text: 'note.text.title' },
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      noteTags: 'note/getAvailableTags',
      boardTags: 'board/getAvailableTags'
    }),
    ...mapState({
      notes: state => state.note.notes,
    }),
    availableTags() {
      let tags = {}
      for(let tag of this.noteTags) tags[tag] = true
      for(let tag of this.boardTags) tags[tag] = true

      return Object.keys(tags).sort()
    },
    filteredNotes(){
      if(!this.availableTags || this.availableTags.length === 0){
        return this.notes
      }

      let blacklist = {}
      let whitelist = {}

      for(let tagName of Object.keys(this.filter.tags)) {
        let tagValue = this.filter.tags[tagName]

        if(tagValue === true) whitelist[tagName] = true
        else if(tagValue === false) blacklist[tagName] = true
      }

      return this.notes.filter(note => {
        let tagsMap = {}
        for(let tag of note.tags) tagsMap[tag] = true

        for(let blacklistedTag of Object.keys(blacklist)) {
          if(tagsMap.hasOwnProperty(blacklistedTag)) {
            //this tag is blacklisted -> not should be filtered out!
            return false
          }
        }

        for(let whitelistedTag of Object.keys(whitelist)) {
          if(!tagsMap.hasOwnProperty(whitelistedTag)) {
            //this tag is not included in note -> this note should be filtered out!
            return false
          }
        }

        return true
      })
    }
  },
  methods: {
    ...mapMutations({
      addNote: 'note/addNote',
      editNote: 'note/editNote',
      deleteNote: 'note/deleteNote',
    }),
    onNewNote(type) {
      this.dialog.new.open = true
      this.dialog.new.type = type
    },
    onSaveNewNote(note){
      this.addNote({
        id: uuid4(),
        type: this.dialog.new.type.id,
        ...note
      })
      this.dialog.new.open = false
    },
    onDeleteRequest(id) {
      this.dialog.delete.open = true
      this.dialog.delete.noteId = id
    },
    onDeleteNote() {
      this.deleteNote(this.dialog.delete.noteId)
      this.dialog.delete.open = false
      this.dialog.delete.noteId = null
    },
    onEditRequest(note) {
      this.dialog.edit.note = note
      this.dialog.edit.open = true
    },
    onSaveNote(note) {
      this.snackbar.saved = false
      this.editNote({
        id: this.dialog.edit.note.id,
        type: this.dialog.edit.note.type,
        ...note,
      })
      this.dialog.edit.open = false
      this.snackbar.saved = true
    },
    onCopyNote(content) {
      this.snackbar.copied = false
      copy(content)
      this.snackbar.copied = true
    },
    onFilterTagChange(tag){
      if(this.filter.tags[tag] === true) this.filter.tags[tag] = false
      else if(this.filter.tags[tag] === false) this.filter.tags[tag] = null
      else if(this.filter.tags[tag] === null) this.filter.tags[tag] = true
    },
    applyTags(tags){
      //add missing
      for(let tag of tags) {
        if(!this.filter.tags.hasOwnProperty(tag)){
          Vue.set(this.filter.tags, tag, null)
        }
      }
    },
    applyQueryTags(){
      this.filter.tags = {}
      this.applyTags(this.availableTags)

      let boardQuery = readBoardQuery(this.$route.query)
      for(let tagName of Object.keys(boardQuery.tags)) {
        this.filter.tags[tagName] = boardQuery.tags[tagName]
      }
    }
  },
  watch: {
    availableTags(tags) {
      this.applyTags(tags)
    },
    '$route.query'() {
      this.applyQueryTags()
    }
  },
  mounted() {
    this.applyQueryTags()
  },
}
</script>
