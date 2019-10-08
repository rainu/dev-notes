<template>
  <v-form v-model="valid" @submit.prevent="onSubmit()" :id="formId" ref="form">
    <v-container>
      <v-row v-if="!isEncrypted">
        <v-col cols="12">
          <v-alert type="warning" dense dismissible>{{$t('note.credentials.warn.decrypted')}}</v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="note.title" :label="$t('note.title')" :rules="ruleRequired" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="note.url" :label="$t('note.credentials.url')" ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea v-model="note.description" :label="$t('note.credentials.description')" ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="note.username" :label="$t('note.credentials.username')" :rules="ruleRequired" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field :type="showPassword ? 'text' : 'password'"
                        :label="$t('note.credentials.password')"
                        v-model="note.password"
                        :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                        @click:append="showPassword = !showPassword"
                        :rules="ruleRequired"
                        required />
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
  import { mapGetters, mapState } from 'vuex';
  import TagPicker from "./TagPicker";

  export default {
    name: "NoteFormCredentials",
    components: {TagPicker},
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
        default: true
      }
    },
    data() {
      let note = {
        title: "",
        tags: [],
        url: "",
        description: "",
        username: "",
        password: ""
      }

      if(this.data) {
        note.title = this.data.title
        note.tags = this.data.tags
        note.url = this.data.content.url
        note.description = this.data.content.description
        note.username = this.data.content.username
        note.password = this.data.content.password
      }

      return {
        dialog: false,
        showPassword: false,
        valid: false,
        note: note
      }
    },
    computed: {
      ...mapGetters({
        noteTags: 'note/getAvailableTags',
        boardTags: 'board/getAvailableTags'
      }),
      ...mapState({
        isEncrypted: state => state.settings.encrypted
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
        data.title = this.note.title
        data.tags = this.note.tags
        data.content.url = this.note.url
        data.content.description = this.note.description
        data.content.username = this.note.username
        data.content.password = this.note.password

        this.$emit('onSubmit', data)
        if(this.clearAfterSubmit) {
          this.$refs.form.reset()
          this.note.tags = []
        }
      }
    },
    watch: {
      data(newData) {
        this.note.title = newData.title
        this.note.tags = newData.tags
        this.note.url = newData.content.url
        this.note.description = newData.content.description
        this.note.username = newData.content.username
        this.note.password = newData.content.password
      }
    }
  }
</script>

<style scoped>

</style>
