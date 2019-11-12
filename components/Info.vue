<template>
  <v-dialog v-model="dialog" scrollable>
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">
        <v-icon>info</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{$t('about.title')}}</span>
      </v-card-title>

      <v-card-text>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="routerBase + 'avatar.jpg'"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-subtitle>{{$t('about.author')}}</v-list-item-subtitle>
            <v-list-item-title>
              <a href="http://rainu.solutions" target="_blank">rainu</a>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>build</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-subtitle>{{$t('about.version')}}</v-list-item-subtitle>
            <v-list-item-title>{{version}} - <a :href="'https://github.com/rainu/dev-notes/tree/' + revision.long" target="_blank">{{revision.short}}</a></v-list-item-title>
            <v-list-item-title>{{formattedBuiltDate}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>bug_report</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <a href="https://github.com/rainu/dev-notes/issues" target="_blank">{{$t('about.bug')}}</a>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>code</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <a href="https://github.com/rainu/dev-notes" target="_blank">{{$t('about.code')}}</a>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>copyright</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-subtitle>{{$t('about.license')}}</v-list-item-subtitle>
            <v-list-item-title>
              <a href="https://github.com/rainu/dev-notes/blob/master/LICENSE" target="_blank">MIT</a>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-card-text>

      <v-card-actions class="text-center">
        <div class="flex-grow-1"></div>
        <v-btn color="primary" @click="dialog = false">{{$t('about.close')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
  import * as dateFN from 'date-fns'

  export default {
    name: "Info",
    data(){
      return {
        routerBase: process.env.routerBase,
        version: process.env.version,
        builtDate: new Date(process.env.builtDate),
        revision: {
          long: process.env.revision,
          short: process.env.revision.substr(0, 8),
        },
        dialog: false
      }
    },
    computed: {
      formattedBuiltDate(){
        return dateFN.format(this.builtDate, this.$t('common.datetime.format.date'))
      }
    }
  }
</script>

<style scoped>

</style>
