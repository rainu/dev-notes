<template>
  <v-form v-model="valid" @submit.prevent="onSubmit()" :id="formId" ref="form">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="note.title" :label="$t('note.title')" :rules="ruleRequired" required></v-text-field>
        </v-col>
      </v-row>

      <!-- Date and Time -->
      <v-row>
        <v-col cols="7" sm="6">
          <v-dialog
            ref="dateDialog"
            v-model="date.dialog"
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value.sync="formattedDate"
                :label="$t('note.reminder.date')"
                prepend-inner-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-if="date.dialog"
              v-model="date.value"
              :locale="$t('common.datetime.locale')"
              :first-day-of-week="firstDayOfWeek"
              header-color="primary"
              color="primary"
              scrollable
              full-width>
              <v-spacer></v-spacer>
              <v-btn block color="primary" @click="date.dialog = false" >{{$t('common.confirmation.close')}}</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="5" sm="6">
          <v-dialog
            ref="timeDialog"
            v-model="time.dialog"
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value.sync="formattedTime"
                :label="$t('note.reminder.time')"
                append-icon="access_time"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="time.dialog"
              v-model="time.value"
              :format="timeFormat"
              :locale="$t('common.datetime.locale')"
              header-color="primary"
              color="primary"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn block color="primary" @click="time.dialog = false">{{$t('common.confirmation.close')}}</v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea v-model="note.content" :label="$t('note.reminder.content')" :auto-grow="true" :rules="ruleRequired" required></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-switch v-model="note.markdown" :label="$t('note.reminder.markdown')" color="primary"></v-switch>
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
  import * as dateFN from 'date-fns'
  import TagPicker from "./TagPicker";


  export default {
    name: "NoteFormReminder",
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
        date: dateFN.addDays(new Date(), 1),
        content: "",
        markdown: false
      }

      if(this.data) {
        note.title = this.data.title
        note.tags = this.data.tags
        note.date = this.data.content.date
        note.markdown = !!this.data.content.markdown
        note.content = note.markdown ? this.data.content.markdown : this.data.content.text
      }

      return {
        date: {
          dialog: false,
          value: dateFN.format(note.date, 'yyyy-MM-dd'),
        },
        time: {
          dialog: false,
          value: dateFN.format(note.date, 'HH:mm'),
        },
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
        firstDayOfWeek: state => state.settings.date.firstDayOfWeek,
        timeFormat: state => state.settings.date.timeFormat,
      }),
      formattedDate(){
        return dateFN.format(this.note.date, this.$t('common.datetime.format.date'))
      },
      formattedTime(){
        return dateFN.format(this.note.date, this.$t('common.datetime.format.time'))
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
      recalcNoteDate() {
        let result = dateFN.parse(this.date.value + this.time.value, `yyyy-MM-ddHH:mm`, new Date())
        if(isNaN(result.getDate())) result = new Date()

        this.note.date = result
      },
      onSubmit() {
        if(!this.valid) return

        let data = {}
        data.title = this.note.title
        data.tags = this.note.tags
        data.content = {}
        data.content.date = this.note.date
        data.content.noticed = false

        if(this.note.markdown) data.content.markdown = this.note.content
        else data.content.text = this.note.content

        this.$emit('onSubmit', data)
        if(this.clearAfterSubmit) {
          this.$refs.form.resetValidation()

          this.note.title = ""
          this.note.tags = []
          this.note.content = ""
          this.note.markdown = false
        }
      }
    },
    watch: {
      'date.value'(){
        this.recalcNoteDate()
      },
      'time.value'(){
        this.recalcNoteDate()
      },
      data(newData) {
        this.note.title = newData.title
        this.note.tags = newData.tags
        this.note.date = newData.content.date
        this.note.markdown = !!newData.content.markdown
        this.note.content = this.note.markdown ? newData.content.markdown : newData.content.text
      }
    }
  }
</script>

<style scoped>

</style>
