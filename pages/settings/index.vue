<template>
  <v-container fluid>
    <v-layout column justify-center>
      <v-row align="center">
        <v-col cols="12">
          <v-expansion-panels v-model="panel" accordion focusable>

            <!-- Encryption -->
            <v-expansion-panel>
              <v-expansion-panel-header>{{$t('settings.encryption.title')}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <SettingsEncryption />
              </v-expansion-panel-content>
            </v-expansion-panel>

            <!-- Other options -->
            <v-expansion-panel>
              <v-expansion-panel-header>{{$t('settings.others.title')}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="12" >
                    <SettingsNote />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <SettingsTheme />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <SettingsTagDelimiter />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <SettingsLanguage />
                  </v-col>
                  <v-col cols="12" >
                    <SettingsDateTime />
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <!-- Board options -->
            <v-expansion-panel>
              <v-expansion-panel-header>{{$t('settings.boards.title')}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <SettingsBoard />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
  import SettingsTheme from "../../components/settings/Theme";
  import SettingsLanguage from "../../components/settings/Language";
  import SettingsNote from "../../components/settings/Note";
  import SettingsBoard from "../../components/settings/Board";
  import SettingsEncryption from "../../components/settings/Encryption";
  import SettingsDateTime from "../../components/settings/DateTime";
  import SettingsTagDelimiter from "../../components/settings/TagDelimiter";

  export default {
    components: {
      SettingsDateTime,
      SettingsEncryption,
      SettingsBoard,
      SettingsNote,
      SettingsTagDelimiter,
      SettingsLanguage,
      SettingsTheme
    },
    data(){
      return {
        panel: 1
      }
    }
  }
</script>

<style scoped>

</style>
