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
      </v-row>

      <v-row v-if="note.record">
        <v-col cols="12">
          <Audio :value="note.record" class="pa-0"/>
        </v-col>
      </v-row>
      <v-row v-else>
          <Recorder v-model="note.record" />
      </v-row>
      <v-row v-if="note.record">
        <v-col cols="12">
          <v-btn block @click="onRecordDelete" color="error">
            <v-icon >delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-textarea v-model="note.description" :label="$t('note.camera.description')" ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
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
    name: "NoteFormRecord",
    components: {
      ColorPicker,
      TagPicker,
    },
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
        record: null,
        description: ""
      }

      if(this.data) {
        note.title = this.data.title === this.$t('note.untitled') ? null : this.data.title
        note.tags = this.data.tags
        note.color = this.data.color
        note.description = this.data.content.description
        note.record = this.data.content.record
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
      device: function() {
        return this.devices.find(n => n.deviceId === this.deviceId);
      },
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
      },
    },
    methods: {
      onRecordDelete() {
        this.note.record = null
      },
      onSubmit() {
        if(!this.valid) return

        let data = {
          content: {}
        }
        data.title = this.note.title ? this.note.title : this.$t('note.untitled')
        data.tags = this.note.tags
        data.color = this.note.color
        data.content.description = this.note.description
        data.content.record = this.note.record

        this.$emit('onSubmit', data)
        if(this.clearAfterSubmit) {
          this.$refs.form.reset()
          this.note.tags = []
          this.note.image = ""
        }
      }
    },
    watch: {
      data(newData) {
        this.note.title = newData.title === this.$t('note.untitled') ? null : newData.title
        this.note.tags = newData.tags
        this.note.color = newData.color
        this.note.description = newData.content.description
        this.note.record = newData.content.record
      }
    }
  }
</script>

<style scoped>
</style>
