<template>
  <v-form v-model="valid" @submit.prevent="onSubmit()" :id="formId" ref="form">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="note.title" :label="$t('note.title')" :rules="ruleRequired" required></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="note.content" :label="$t('note.text.content')" :auto-grow="true" :rules="ruleRequired" required></v-textarea>
        </v-col>
        <v-col cols="6">
          <v-switch v-model="note.markdown" :label="$t('note.text.markdown')" color="primary"></v-switch>
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
  export default {
    name: "NoteFormText",
    components: {TagPicker},
    props: {
      formId: {
        type: String,
        required: true,
      },
      data: {
        type: Object,
        required: false,
      },
      clearAfterSubmit: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    data() {
      let note = {
        title: "",
        tags: [],
        content: "",
        markdown: false
      }

      if(this.data) {
        note.title = this.data.title
        note.tags = this.data.tags
        note.markdown = !!this.data.content.markdown
        note.content = note.markdown ? this.data.content.markdown : this.data.content.text
      }

      return {
        dialog: false,
        valid: false,
        note: note
      }
    },
    computed: {
      ...mapGetters({
        availableTags: 'note/getAvailableTags'
      }),
      ruleRequired(){
        return [
          v => !!v || this.$t('common.form.validation.required')
        ]
      }
    },
    methods: {
      onSubmit() {
        if(!this.valid) return

        let data = {}
        data.title = this.note.title
        data.tags = this.note.tags
        data.content = {}
        if(this.note.markdown) data.content.markdown = this.note.content
        else data.content.text = this.note.content

        this.$emit('onSubmit', data)
        if(this.clearAfterSubmit) {
          this.$refs.form.reset()
        }
      }
    },
    watch: {
      data(newData) {
        this.note.title = newData.title
        this.note.tags = newData.tags
        this.note.markdown = !!newData.content.markdown
        this.note.content = this.note.markdown ? newData.content.markdown : newData.content.text
      }
    }
  }
</script>

<style scoped>

</style>
