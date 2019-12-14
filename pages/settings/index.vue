<template>
  <v-container fluid>
    <v-layout column justify-center>
      <v-row align="center">
        <!-- Encryption -->
        <v-col cols="12" >
          <SettingsEncryption />
        </v-col>

        <!-- Other options -->
        <v-col cols="12">
          <v-card class="elevation-12">
            <v-toolbar flat>
              <v-toolbar-title>{{$t('settings.others.title')}}</v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>
            <v-card-text class="pb-0">
              <v-row>
                <v-col cols="4" >
                  <SettingsNote />
                </v-col>
                <v-col cols="4" sm="4">
                  <SettingsTheme />
                </v-col>
                <v-col cols="4" sm="4">
                  <SettingsLanguage />
                </v-col>
                <v-col cols="4" >
                  <SettingsDateTime />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Board options -->
        <v-col cols="4">
          <SettingsBoard />
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

  export default {
    components: {
      SettingsDateTime,
      SettingsEncryption,
      SettingsBoard,
      SettingsNote,
      SettingsLanguage,
      SettingsTheme
    },
  }
</script>

<style scoped>

</style>
