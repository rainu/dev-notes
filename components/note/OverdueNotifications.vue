<template>
  <div>
    <v-snackbar :value="true"
                right top
                color="primary"
                class="text-center"
                :timeout="0"
                v-for="note of overdueNotes" :key="note.id">
      <h3><v-icon>alarm</v-icon> {{note.title}}</h3>
      <v-btn icon @click="removeAlarm(note.id)">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "OverdueNotifications",
  computed: {
    ...mapGetters({
      overdueNotes: 'note/getOverdueNotes',
    }),
  },
  methods: {
    ...mapActions({
      removeAlarm: 'note/removeOverdueAlarm'
    }),
  }
}
</script>

<style scoped>

</style>
