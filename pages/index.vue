<template>
  <v-container fluid>
    <v-row justify="center" v-if="!existNotes">
      <v-col>
        <HelpFirstSteps />
      </v-col>
    </v-row>

    <!-- the following class of draggable will mocks a <v-row align="center"> -->
    <draggable v-model="filteredNoteOrder"
               class="row align-center draggable"
               handle=".handle"
               :scroll-sensitivity="200"
               :force-fallback="true">

      <v-col cols="12" sm="6" md="3" v-for="note of filteredNotes" :key="note.id" >
        <NoteCardText v-if="note.type === 'text'" :note="note"
                      :show-tags="showTags"
                      @onCopy="onCopyNote"
                      @onEdit="onEditRequest(note)"
                      @onDelete="onDeleteRequest(note.id)"
                      @onTitleChange="onTitleChange(note, $event)" />
        <NoteCardReminder v-if="note.type === 'reminder'" :note="note"
                      :show-tags="showTags"
                      @onCopy="onCopyNote"
                      @onEdit="onEditRequest(note)"
                      @onDelete="onDeleteRequest(note.id)"
                      @onTitleChange="onTitleChange(note, $event)"/>
        <NoteCardCredentials v-if="note.type === 'credentials'" :note="note"
                      :show-tags="showTags"
                      @onCopy="onCopyNote"
                      @onEdit="onEditRequest(note)"
                      @onDelete="onDeleteRequest(note.id)"
                      @onTitleChange="onTitleChange(note, $event)"/>
        <NoteCardPicture v-if="note.type === 'picture'" :note="note"
                         :show-tags="showTags"
                         @onCopy="onCopyNote"
                         @onEdit="onEditRequest(note)"
                         @onDelete="onDeleteRequest(note.id)"
                         @onTitleChange="onTitleChange(note, $event)"/>
        <NoteCardCamera v-if="note.type === 'camera'" :note="note"
                         :show-tags="showTags"
                         @onCopy="onCopyNote"
                         @onEdit="onEditRequest(note)"
                         @onDelete="onDeleteRequest(note.id)"
                         @onTitleChange="onTitleChange(note, $event)"/>
        <NoteCardTemplate v-if="note.type === 'template'" :note="note"
                          :show-tags="showTags"
                          @onCopy="onCopyNote"
                          @onEdit="onEditRequest(note)"
                          @onDelete="onDeleteRequest(note.id)"
                          @onTitleChange="onTitleChange(note, $event)"/>
        <NoteCardRecord v-if="note.type === 'record'" :note="note"
                        :show-tags="showTags"
                        @onCopy="onCopyNote"
                        @onEdit="onEditRequest(note)"
                        @onDelete="onDeleteRequest(note.id)"
                        @onTitleChange="onTitleChange(note, $event)"/>
      </v-col>
    </draggable>

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
    <v-snackbar v-model="snackbar.trash" color="success" class="text-center" :timeout="1000">
      {{$t('note.delete.trash')}}
      <v-btn text @click="snackbar.trash = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

    <v-footer app class="pa-0">
      <v-toolbar dense color="footer">
        <v-toolbar-items>
          <v-btn @click="showTags = !showTags">
            <v-icon :color="showTags ? 'primary' : ''">flag</v-icon>
          </v-btn>
        </v-toolbar-items>

        <v-toolbar-items class="flex-grow-1">
          <v-text-field v-model="filter.query"
                        :placeholder="$t('note.filter.query')"
                        solo
                        clearable/>
        </v-toolbar-items>

        <v-toolbar-items>
          <v-menu offset-y top max-height="50%" :close-on-content-click="false">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" :color="filter.active || filter.query ? 'primary' : ''">
                <v-icon>search</v-icon>
              </v-btn>
            </template>
            <v-list v-if="availableTags && availableTags.length > 0">
              <v-list-item v-for="tag in availableTags" :key="tag">
                <v-btn block class="text-none" @click="onFilterTagChange(tag)">
                  <v-icon v-if="filter.tags[tag] === true" color="green">check_circle</v-icon>
                  <v-icon v-if="filter.tags[tag] === false" color="red">remove_circle</v-icon>
                  <v-icon v-if="filter.tags[tag] === null">filter_list</v-icon>
                  <span class="flex-grow-1"></span>
                  {{tag}}
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu offset-y top open-on-hover>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" @click="onNewDefaultNote">
                <v-icon>add_circle</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="type in note.types" :key="type.id">
                <v-btn block @click="onNewNote(type)">
                  <v-icon left>{{type.icon}}</v-icon>
                  {{$t(`note.${type.id}.title`)}}
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
import { mapGetters, mapState, mapActions } from 'vuex';
import noteTypes from '../components/note/types'
import Vue from 'vue'
import copy from 'copy-to-clipboard';
import Fuse from 'fuse.js'

import { readBoardQuery } from '../common/boardQuery'
import NoteCardText from "../components/note/card/Text";
import NoteCardPicture from "../components/note/card/Picture";
import NoteCardTemplate from "../components/note/card/Template";
import HelpFirstSteps from "../components/help/FirstSteps";
import NoteCardCredentials from "../components/note/card/Credentials";
import NoteCardCamera from "../components/note/card/Camera";
import NoteCardReminder from "../components/note/card/Reminder";
import NoteCardRecord from "../components/note/card/Record";

export default {
  components: {
    NoteCardReminder,
    HelpFirstSteps,
    NoteCardTemplate,
    NoteCardText,
    NoteCardPicture,
    NoteCardCredentials,
    NoteCardCamera,
    NoteCardRecord
  },
  data(){
    return {
      dialog: {
        delete: {
          open: false,
          noteId: null
        }
      },

      showTags: false,

      filter: {
        active: false,
        tags: {},
        query: null,
      },

      snackbar: {
        copied: false,
        trash: false
      },

      note: {
        data: {},
        types: noteTypes
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
      noteOrder: state => state.note.noteOrder,
      noteDeleteHard: state => state.settings.notes.deleteHard,
      noteDefaultType: state => state.settings.notes.defaultType
    }),
    filteredNoteOrder: {
      get() {
        return this.filteredNotes.map(n => n.id)
      },
      set(value) {
        //the filteredNoteOrder array can be a subset of noteOrder
        //so here we have to translate the new subset order to the whole noteOrder!
        let valueOrdinal = {}
        for(let i=0; i < value.length; i++) {
          valueOrdinal[value[i]] = i
        }

        let newOrder = [...this.noteOrder]
        newOrder.sort((a, b) => {
          if(!valueOrdinal.hasOwnProperty(a)) return 0 //a is a note not included in the filteredNotes!
          if(!valueOrdinal.hasOwnProperty(b)) return -1
          if(valueOrdinal[a] > valueOrdinal[b]) return 1
          if(valueOrdinal[a] < valueOrdinal[b]) return -1
          return 0
        })
        this.$store.dispatch('note/setNoteOrder', newOrder)
      }
    },
    availableTags() {
      let tags = {}
      for(let tag of this.noteTags) tags[tag] = true
      for(let tag of this.boardTags) tags[tag] = true

      return Object.keys(tags).sort()
    },
    filteredNotes(){
      let noteMap = {}
      for(let note of this.notes) {
        noteMap[note.id] = note
      }

      if((!this.availableTags || this.availableTags.length === 0) && !this.filter.query){
        return this.noteOrder.map(nId => noteMap[nId])
      }

      let blacklist = {}
      let whitelist = {}

      for(let tagName of Object.keys(this.filter.tags)) {
        let tagValue = this.filter.tags[tagName]

        if(tagValue === true) whitelist[tagName] = true
        else if(tagValue === false) blacklist[tagName] = true
      }

      let filtered = this.noteOrder.map(nId => noteMap[nId]).filter(note => {
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

      if(this.filter.query) {
        let options = {
          shouldSort: false,
          threshold: 0.1,
          location: 0,
          distance: 100,
          minMatchCharLength: 1,
          keys: [
            "title",
            "content.text",
            "content.markdown",
            "content.template",
            "content.date",
            "content.url",
            "content.description",
            "content.username"
          ]
        }
        let fuse = new Fuse(filtered, options)
        filtered = fuse.search(this.filter.query).map(f => f.item)
      }

      return filtered
    },
    existNotes() {
      return this.notes.length > 0
    },
  },
  methods: {
    ...mapActions({
      deleteNote: 'note/deleteNote',
      deleteNoteSoft: 'note/deleteNoteSoft',
      editNote: 'note/editNote',
    }),
    onNewNote(type) {
      this.$router.push({ path: "/notes/new/" + type.id, query: this.$route.query })
    },
    onNewDefaultNote(){
      this.$router.push({ path: "/notes/new/" + this.noteDefaultType, query: this.$route.query })
    },
    onEditRequest(note) {
      this.$router.push("/notes/edit/" + note.id)
    },
    onDeleteRequest(id) {
      if(this.noteDeleteHard) {
        this.dialog.delete.open = true
        this.dialog.delete.noteId = id
      } else {
        this.deleteNoteSoft(id)
        this.snackbar.trash = true
      }
    },
    onDeleteNote() {
      this.deleteNote(this.dialog.delete.noteId)
      this.dialog.delete.open = false
      this.dialog.delete.noteId = null
    },
    onTitleChange(note, newTitle){
      note.title = newTitle
      this.editNote(note)
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

      let boardInfo = readBoardQuery(this.$route.query)
      for(let tagName of Object.keys(boardInfo.tags)) {
        this.filter.tags[tagName] = boardInfo.tags[tagName]
      }
    }
  },
  watch: {
    availableTags(tags) {
      this.applyTags(tags)
    },
    '$route.query'() {
      this.applyQueryTags()
    },
    'filter.tags': {
      deep: true,
      handler(tags){
        this.filter.active = false

        for(let tagValue of Object.values(tags)) {
          if(tagValue !== null){
            this.filter.active = true
            break
          }
        }
      }
    }
  },
  mounted() {
    this.applyQueryTags()
  },
}
</script>

<style>
  .draggable .handle {
    cursor: grab;
  }
</style>
