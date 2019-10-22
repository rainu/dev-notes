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
            <v-toolbar color="primary" flat>
              <v-toolbar-title>{{$t('settings.others.title')}}</v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>
            <v-card-text class="pb-0">
              <v-row>
                <v-col cols="12" >
                  <SettingsNote />
                </v-col>
                <v-col cols="12" sm="6">
                  <SettingsTheme />
                </v-col>
                <v-col cols="12" sm="6">
                  <SettingsLanguage />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Board options -->
        <v-col cols="12">
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

  export default {
    components: {
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
