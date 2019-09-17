<template>
  <v-container fluid>
    <v-layout column justify-center>
      <v-row align="center">
        <v-col cols="12">
          <v-card class="elevation-12">
            <v-toolbar color="primary" flat>
              <v-toolbar-title>{{$t('settings.boards.title')}}</v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>

            <!-- for each available board -->
            <v-card-text v-for="board of boards" :key="board.id">
              <v-card >
                <v-card-title>
                  <v-icon>{{board.icon}}</v-icon>
                  {{board.title}}
                </v-card-title>

                <v-card-text class="pb-0">
                  <v-chip v-for="tagName of Object.keys(board.filter.tags)" :key="board.id + '_' + tagName">
                    <v-icon left color="green" v-if="board.filter.tags[tagName].value">check_circle</v-icon>
                    <v-icon left color="red" v-else>remove_circle</v-icon>
                    {{tagName}}
                  </v-chip>
                </v-card-text>

                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn icon class="error" @click="onBoardDeleteRequest(board.id)">
                    <v-icon>delete</v-icon>
                  </v-btn>
                  <v-btn icon class="primary" @click="onEditRequest(board)">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-card-text>

            <v-card-actions>
              <v-btn block color="primary" @click="dialog.new.open = true">
                <v-icon>dashboard</v-icon>
                {{$t('board.actions.new')}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="elevation-12">
            <v-toolbar color="primary" flat>
              <v-toolbar-title>{{$t('settings.others.title')}}</v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>
            <v-card-text>
              <v-select
                :items="localeOptions"
                :value="locale"
                item-text="label"
                item-value="value"
                prepend-icon="language"
                :label="$t('settings.others.language.title')"
                @change="onLanguageChange"
              ></v-select>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-dialog v-model="dialog.new.open" persistent>
        <v-card>
          <v-card-title>
            <span class="headline">{{$t('board.new.title')}}</span>
          </v-card-title>
          <v-card-text>
            <BoardForm form-id="board-new-form" @onSubmit="onSaveNewBoard"></BoardForm>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="error" @click="dialog.new.open = false">{{$t('note.actions.abort')}}</v-btn>
            <v-btn color="primary" type="submit" form="board-new-form">{{$t('board.actions.save')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog.edit.open" persistent>
        <v-card>
          <v-card-title>
            <span class="headline">{{$t('board.edit.title')}}</span>
          </v-card-title>
          <v-card-text>
            <BoardForm form-id="board-edit-form" :data="dialog.edit.board" @onSubmit="onSaveBoard"></BoardForm>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="error" @click="dialog.edit.open = false">{{$t('board.actions.abort')}}</v-btn>
            <v-btn color="primary" type="submit" form="board-edit-form">{{$t('board.actions.save')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog.delete.open" max-width="290">
        <v-card>
          <v-card-title class="headline">{{$t('common.confirmation.title')}}</v-card-title>
          <v-card-text>{{$t('board.delete.confirmation')}}</v-card-text>

          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="error" @click="onBoardDelete()">
              {{$t('common.confirmation.agree')}}
            </v-btn>
            <v-btn color="primary" @click="dialog.delete.open = false">
              {{$t('common.confirmation.disagree')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-footer app class="pa-0">
        <v-toolbar dense color="footer">
          <div class="flex-grow-1"></div>

          <v-toolbar-items>
            <v-btn block color="primary" @click="onSave">
              <v-icon>save</v-icon>
              {{$t('settings.save')}}
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-footer>

      <v-snackbar v-model="snackbar.board.saved" color="success" class="text-center" :timeout="1000">
        {{$t('board.saved.successfully')}}
        <v-btn text @click="snackbar.board.saved = false" >
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
      <v-snackbar v-model="snackbar.saved" color="success" class="text-center">
        {{$t('settings.saved')}}
        <v-btn text @click="snackbar.saved = false" >
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex';
  import i18n from '../../locales'
  import uuid4 from 'uuid4'
  import BoardForm from "../../components/board/Form";

  export default {
    components: {BoardForm},
    data: () => ({
      dialog: {
        new: {
          open: false,
        },
        edit: {
          open: false,
          board: null,
        },
        delete: {
          open: false,
          boardId: null,
        }
      },
      language: null,
      snackbar: {
        board: {
          saved: false,
        },
        saved: false
      }
    }),
    computed: {
      ...mapState({
        locale: state => state.i18n.locale,
        locales: state => state.i18n.locales,
        boards: state => state.board.boards,
      }),
      localeOptions(){
        return this.locales.map(l => ({value: l, label: i18n.localeMappings[l].meta.language.code}))
      }
    },
    methods: {
      ...mapActions({
        applyLanguage: 'i18n/applyLanguage',
      }),
      ...mapMutations({
        addBoard: 'board/addBoard',
        editBoard: 'board/editBoard',
        deleteBoard: 'board/deleteBoard',
      }),
      onLanguageChange(lang){
        this.language = lang
      },
      onSaveNewBoard(board){
        this.addBoard({
          id: uuid4(),
          ...board
        })
        this.dialog.new.open = false
        this.snackbar.board.saved = true
      },
      onEditRequest(board) {
        this.dialog.edit.board = board
        this.dialog.edit.open = true
      },
      onSaveBoard(board) {
        this.editBoard({
          id: this.dialog.edit.board.id,
          ...board
        })

        this.dialog.edit.open = false
        this.dialog.edit.board = null
        this.snackbar.board.saved = true
      },
      onBoardDeleteRequest(boardId) {
        this.dialog.delete.boardId = boardId
        this.dialog.delete.open = true
      },
      onBoardDelete() {
        this.dialog.delete.open = false
        this.deleteBoard(this.dialog.delete.boardId)
        this.dialog.delete.boardId = null
      },
      onSave(){
        this.snackbar.saved = false
        this.applyLanguage(this.language)
        this.snackbar.saved = true
      }
    },
  }
</script>

<style scoped>

</style>
