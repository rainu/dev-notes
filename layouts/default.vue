<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      color="navigation"
      fixed
      app
    >
      <v-list dense>
        <v-list-item v-for="link in links" :key="link.route" router :to="link.route">
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t(link.text)" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app color="header">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>RayNote</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      links: [
        { icon: 'home', text: 'navigation.home', route: '/' },
        { icon: 'settings_applications', text: 'navigation.settings', route: '/settings/' },
      ],
      miniVariant: false,
    }
  }
}
</script>
