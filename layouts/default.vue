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
        <v-list-item router exact to="/">
          <v-list-item-action>
            <v-icon>bookmarks</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('navigation.home')" />
          </v-list-item-content>
        </v-list-item>

        <!-- CUSTOMER generated Links -->
        <v-list-item v-for="link in links" :key="link.route" router exact :to="link.route">
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="link.text" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item router to="/settings/">
          <v-list-item-action>
            <v-icon>settings_applications</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('navigation.settings')" />
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
import { mapState } from 'vuex';
import { generateBoardQuery } from '../common/boardQuery'

export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      links: [],
      miniVariant: false,
    }
  },
  computed: {
    ...mapState({
      boards: state => state.board.boards,
    }),
  },
  methods: {
    applyBoards(boards){
      this.links = boards.map(board => {
        return {
          text: board.title,
          icon: board.icon,
          route: `/?${generateBoardQuery(board)}`,
        }
      })
    }
  },
  watch: {
    boards(boards){
      this.applyBoards(boards)
    }
  },
  mounted() {
    this.applyBoards(this.boards)
  }
}
</script>
