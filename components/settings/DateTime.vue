<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          <v-select
            :items="timeFormatItems"
            :value="timeFormat"
            :item-text="itemText"
            item-value="value"
            prepend-icon="access_time"
            :label="$t('settings.date.time-format.title')"
            @change="setDateTimeFormat"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            :items="firstDayItems"
            :value="firstDay"
            :item-text="itemText"
            item-value="value"
            prepend-icon="event"
            :label="$t('settings.date.first-day.title')"
            @change="setDateFirstDay"
          ></v-select>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';

  export default {
    name: "SettingsDateTime",
    data(){
      return {
        timeFormatItems: [{
          label: 'settings.date.time-format.24hr',
          value: '24hr'
        },{
          label: 'settings.date.time-format.ampm',
          value: 'ampm'
        }],
        timeFormat: '',
        firstDayItems:[
          { label: 'settings.date.first-day.sunday', value: 0 },
          { label: 'settings.date.first-day.monday', value: 1 },
          { label: 'settings.date.first-day.tuesday', value: 2 },
          { label: 'settings.date.first-day.wednesday', value: 3 },
          { label: 'settings.date.first-day.thursday', value: 4 },
          { label: 'settings.date.first-day.friday', value: 5 },
          { label: 'settings.date.first-day.saturday', value: 6 },
        ],
        firstDay: 0,
      }
    },
    computed: {
      ...mapState({
        dateTimeFormat: state => state.settings.date.timeFormat,
        dateFirstDay: state => state.settings.date.firstDayOfWeek,
      })
    },
    methods: {
      ...mapMutations({
        setDateTimeFormat: 'settings/setDateTimeFormat',
        setDateFirstDay: 'settings/setDateFirstDay'
      }),
      itemText(item) {
        return this.$t(item.label)
      },
    },
    mounted() {
      this.timeFormat = this.dateTimeFormat
      this.firstDay = this.dateFirstDay
    }
  }
</script>

<style scoped>

</style>
