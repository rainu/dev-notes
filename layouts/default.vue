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
      <v-list>
        <v-list-item router exact to="/">
          <v-list-item-action>
            <v-icon>bookmarks</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('navigation.home') + ' (' + notes.length + ')'" />
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <!-- CUSTOMER generated Links -->
        <v-list-item v-for="link in links" :key="link.route" router exact :to="link.route">
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="link.text" />
          </v-list-item-content>
        </v-list-item>

        <v-divider />

      </v-list>
        <v-list dense>
        <v-list-item router to="/trash/" v-if="hasDeletedNotes">
          <v-list-item-action>
            <v-icon>delete</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('navigation.trash')+ ' (' + deletedNotes.length + ')'" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item router to="/backup/" v-if="notes.length > 0 ">
          <v-list-item-action>
            <v-icon>import_export</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('navigation.backup')" />
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

        <v-list-item router to="/help/">
          <v-list-item-action>
            <v-icon>help</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('navigation.help')" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app color="header">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{boardTitle}}</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-toolbar-items>
        <Info />
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <OverdueNotifications />
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { generateBoardQuery, readBoardQuery } from '../common/boardQuery'
import Info from "../components/Info";
import OverdueNotifications from "../components/note/OverdueNotifications";

export default {
  components: {OverdueNotifications, Info},
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      links: [],
      boardTitle: null,
      miniVariant: false,
    }
  },
  computed: {
    ...mapState({
      boards: state => state.board.boards,
      boardOrder: state => state.board.boardOrder,
      deletedNotes: state => state.note.deletedNotes,
      notes: state => state.note.notes,
    }),
    ...mapGetters({
      hasDeletedNotes: 'note/hasDeletedNotes',
    }),
  },
  methods: {
    applyBoards(){
      this.links = this.boardOrder.map(bId => this.boards.find(b => b.id === bId)).map(board => {
        return {
          text: board.title,
          icon: board.icon,
          route: `/?${generateBoardQuery(board)}`,
        }
      })
    },
    applyBoardInfo(){
      this.boardTitle = readBoardQuery(this.$route.query).title
    }
  },
  watch: {
    boards(){
      this.applyBoards()
    },
    boardOrder(){
      this.applyBoards()
    },
    '$route.query'() {
      this.applyBoardInfo()
    },
  },
  mounted() {
    this.applyBoards()
    this.applyBoardInfo()
  }
}
</script>
