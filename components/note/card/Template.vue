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

        <v-card-text class="pa-4">
          <TemplateView :template="note.content.template" :placeholder="note.content.placeholder" />
        </v-card-text>

        <v-card-actions>
          <v-btn icon class="error" @click="onDelete()">
            <v-icon>delete</v-icon>
          </v-btn>
          <v-btn icon class="primary" @click="onEdit()">
            <v-icon>edit</v-icon>
          </v-btn>
          <div class="flex-grow-1"></div>
          <v-btn icon @click="copyDialog = true">
            <v-icon>file_copy</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="copyDialog" scrollable>
      <TemplateCopyDialogContent :template="note.content.template" :placeholder="note.content.placeholder" @copy="onCopy"/>
    </v-dialog>

    <v-card-text :class="viewClass">
      <TemplateView :template="note.content.template" :placeholder="note.content.placeholder" />
    </v-card-text>

    <div class="text-center pt-2 px-2" v-show="showTags">
      <v-chip v-for="tag of note.tags" :key="tag" class="ma-1">{{tag}}</v-chip>
    </div>

    <v-card-actions>
      <v-btn icon class="error" @click="onDelete()">
        <v-icon>delete</v-icon>
      </v-btn>
      <v-btn icon class="primary" @click="onEdit()" v-if="editable">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn icon class="primary" @click="onRestore()" v-if="restorable">
        <v-icon>restore_from_trash</v-icon>
      </v-btn>

      <div class="flex-grow-1"></div>

      <v-btn icon :color="showTags ? 'primary' : ''" @click="showTags = !showTags">
        <v-icon>flag</v-icon>
      </v-btn>
      <v-btn icon @click="fullscreen = true">
        <v-icon>fullscreen</v-icon>
      </v-btn>
      <v-btn icon @click="onCopyRequest">
        <v-icon>file_copy</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex';
  import VueMarkdown from 'vue-markdown'
  import TemplateView from "./TemplateView";
  import TemplateCopyDialogContent from "./TemplateCopyDialogContent";

  export default {
    components: {
      TemplateCopyDialogContent,
      TemplateView,
      'vue-markdown': VueMarkdown,
    },
    name: "NoteCardTemplate",
    props: {
      note: {
        type: Object,
        required: true,
      },
      showTags: {
        type: Boolean,
        required: false,
        default: false
      },
      editable: {
        type: Boolean,
        required: false,
        default: true
      },
      restorable: {
        type: Boolean,
        required: false,
        default: false
      },
    },
    data(){
      return {
        fullscreen: false,
        copyDialog: false,
      }
    },
    computed: {
      ...mapState({
        noteSettings: state => state.settings.notes,
      }),
      viewClass(){
        if(!this.noteSettings.fixed) return ""
        return `card-view-${this.noteSettings.size}`
      },
    },
    methods: {
      onEdit(){
        this.$emit('onEdit')
      },
      onRestore(){
        this.$emit('onRestore')
      },
      onDelete(){
        this.$emit('onDelete')
      },
      onCopyRequest(){
        if(this.note.content.placeholder.length > 0) {
          this.copyDialog = true
        }else{
          this.onCopy(this.note.content.template)
        }
      },
      onCopy(content){
        this.copyDialog = false
        this.$emit('onCopy', content)
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
