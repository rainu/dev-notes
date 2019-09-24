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
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';

  export default {
    name: "SettingsNote",
    data(){
      return {
        notes: {
          size: 'small',
          fixedSize: false,
        },
        noteSizes: [
          {label: 'settings.notes.size.small', value: 'small'},
          {label: 'settings.notes.size.medium', value: 'medium'},
          {label: 'settings.notes.size.large', value: 'large'},
        ],
      }
    },
    computed: {
      ...mapState({
        noteSettings: state => state.settings.notes,
      }),
    },
    methods: {
      ...mapMutations({
        setNoteSize: 'settings/setNoteSize',
      }),
      getNoteSizeItemLabel(item){
        return this.$t(item.label)
      },
      updateNoteSettings(settings){
        this.notes.fixedSize = settings.fixed
        this.notes.size = settings.size
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
            size: notes.size
          })
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
