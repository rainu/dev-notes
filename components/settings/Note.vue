<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          <v-switch v-model="notes.fixedSize" :label="$t('settings.notes.size.fixed')" color="primary"></v-switch>
        </v-col>
        <v-col cols="12" sm="6" v-if="notes.fixedSize">
          <v-select
            :items="noteSizes"
            v-model="notes.size"
            :item-text="getNoteSizeItemLabel"
            item-value="value"
            prepend-icon="format_size"
            :label="$t('settings.notes.size.value')"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-switch v-model="notes.deleteFast" :label="$t('settings.notes.delete.fast')" color="primary"></v-switch>
        </v-col>
        <v-col cols="12" sm="6" >
          <v-select
            :items="noteTypes"
            v-model="notes.defaultType"
            :item-text="getNoteTypeLabel"
            item-value="id"
            :prepend-icon="noteTypeIcon"
            :label="$t('settings.notes.type.default')"
          >
          </v-select>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';
  import noteTypes from '../../components/note/types'

  export default {
    name: "SettingsNote",
    data(){
      return {
        notes: {
          size: 'small',
          fixedSize: false,
          deleteFast: true,
          defaultType: 'text'
        },
        noteSizes: [
          {label: 'settings.notes.size.small', value: 'small'},
          {label: 'settings.notes.size.medium', value: 'medium'},
          {label: 'settings.notes.size.large', value: 'large'},
        ],
        noteTypes: noteTypes
      }
    },
    computed: {
      ...mapState({
        noteSettings: state => state.settings.notes,
      }),
      noteTypeIcon(){
        let nt = this.noteTypes.find(nt => nt.id === this.notes.defaultType)
        return nt ? nt.icon : ''
      }
    },
    methods: {
      ...mapMutations({
        setNoteSize: 'settings/setNoteSize',
        setNoteDeleteHard: 'settings/setNoteDeleteHard',
        setNoteDefaultType: 'settings/setNoteDefaultType',
      }),
      getNoteSizeItemLabel(item){
        return this.$t(item.label)
      },
      getNoteTypeLabel(item){
        return this.$t(`note.${item.id}.title`)
      },
      updateNoteSettings(settings){
        this.notes.fixedSize = settings.fixed
        this.notes.size = settings.size
        this.notes.deleteFast = !settings.deleteHard
        this.notes.defaultType = settings.defaultType
      },
    },
    watch: {
      noteSettings: {
        deep: true,
        handler(settings){
          this.updateNoteSettings(settings)
        }
      },
      notes: {
        deep: true,
        handler(notes) {
          this.setNoteSize({
            fixed: notes.fixedSize,
            size: notes.size,
          })
          this.setNoteDefaultType(notes.defaultType)
          this.setNoteDeleteHard(!notes.deleteFast)
        }
      },
    },
    mounted() {
      this.updateNoteSettings(this.noteSettings)
    }
  }
</script>

<style scoped>

</style>
