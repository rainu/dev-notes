<template>
  <v-form v-model="valid" @submit.prevent="onSubmit()" :id="formId" ref="form">
    <v-container>
      <v-row>
        <v-col cols="9" sm="11">
          <v-text-field v-model="note.title" :label="$t('note.title')" :placeholder="$t('note.untitled')"></v-text-field>
        </v-col>
        <v-col cols="3" sm="1">
          <ColorPicker v-model="note.color" />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="note.url" :label="$t('note.text.content')" :placeholder="$t('note.picture.url.placeholder')" :rules="ruleRequired" required autofocus></v-text-field>
        </v-col>
        <v-col cols="12">
          <TagPicker v-model="note.tags" :tags="availableTags"></TagPicker>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  import { mapGetters } from 'vuex';
  import TagPicker from "./TagPicker";
  import ColorPicker from "./ColorPicker";
  export default {
    name: "NoteFormPicture",
    components: {ColorPicker, TagPicker},
    props: {
      formId: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: false,
      },
      data: {
        type: Object,
        required: false,
      },
      clearAfterSubmit: {
        type: Boolean,
        required: false,
        default: false
      },
      initialTags: {
        type: Array,
        required: false,
        default: () => []
      },
      initialColor: {
        type: String,
        required: false,
      }
    },
    data() {
      let note = {
        title: "",
        color: this.initialColor,
        tags: this.initialTags,
        url: "",
      }

      if(this.data) {
        note.title = this.data.title === this.$t('note.untitled') ? null : this.data.title
        note.tags = this.data.tags
        note.color = this.data.color
        note.url = this.data.content.url
      }

      return {
        dialog: false,
        valid: false,
        note: note
      }
    },
    computed: {
      ...mapGetters({
        noteTags: 'note/getAvailableTags',
        boardTags: 'board/getAvailableTags'
      }),
      availableTags() {
        let tags = {}
        for(let tag of this.noteTags) tags[tag] = true
        for(let tag of this.boardTags) tags[tag] = true

        return Object.keys(tags).sort()
      },
      ruleRequired(){
        return [
          v => !!v || this.$t('common.form.validation.required')
        ]
      }
    },
    methods: {
      onSubmit() {
        if(!this.valid) return

        let data = {
          content: {}
        }
        data.title = this.note.title ? this.note.title : this.$t('note.untitled')
        data.tags = this.note.tags
        data.color = this.note.color
        data.content.url = this.note.url

        this.$emit('onSubmit', data)
        if(this.clearAfterSubmit) {
          this.$refs.form.reset()
          this.note.tags = []
        }
      }
    },
    watch: {
      data(newData) {
        this.note.title = newData.title === this.$t('note.untitled') ? null : newData.title
        this.note.tags = newData.tags
        this.note.color = newData.color
        this.note.url = newData.content.url
      }
    }
  }
</script>

<style scoped>

</style>
