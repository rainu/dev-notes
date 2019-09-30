<template>
  <div>
    <v-card class="elevation-12">
      <v-toolbar color="primary" flat>
        <v-toolbar-title>{{$t('settings.boards.title')}}</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="showHelp = true">
          <v-icon>help</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- for each available board -->
      <draggable v-model="boardOrder" handle=".handle">
        <v-card-text v-for="boardId of boardOrder" :key="boardId">
          <v-card >
            <v-card-title>
              <v-icon>{{boardMap[boardId].icon}}</v-icon>
              {{boardMap[boardId].title}}
            </v-card-title>

            <v-card-text class="pb-0">
              <v-chip v-for="tagName of Object.keys(boardMap[boardId].filter.tags)" :key="boardId + '_' + tagName">
                <v-icon left color="green" v-if="boardMap[boardId].filter.tags[tagName].value">check_circle</v-icon>
                <v-icon left color="red" v-else>remove_circle</v-icon>
                {{tagName}}
              </v-chip>
            </v-card-text>

            <v-card-actions>
              <v-btn icon class="handle">
                <v-icon>drag_indicator</v-icon>
              </v-btn>
              <div class="flex-grow-1"></div>
              <v-btn icon class="error" @click="onBoardDeleteRequest(boardId)">
                <v-icon>delete</v-icon>
              </v-btn>
              <v-btn icon class="primary" @click="onEditRequest(boardMap[boardId])">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>
        <transition-group>
        </transition-group>
      </draggable>

      <v-card-actions>
        <v-btn block color="primary" @click="dialog.new.open = true">
          <v-icon>dashboard</v-icon>
          {{$t('board.actions.new')}}
        </v-btn>
      </v-card-actions>
    </v-card>

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
          <v-btn color="primary" type="submit" form="board-new-form">{{$t('board.actions.add')}}</v-btn>
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

    <v-dialog v-model="showHelp" scrollable>
      <HelpBoard>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" @click="showHelp = false">
          {{$t('common.confirmation.close')}}
        </v-btn>
      </HelpBoard>
    </v-dialog>

    <v-snackbar v-model="snackbar.board.saved" color="success" class="text-center" :timeout="1000">
      {{$t('board.saved.successfully')}}
      <v-btn text @click="snackbar.board.saved = false" >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';
  import uuid4 from 'uuid4'
  import draggable from 'vuedraggable'
  import BoardForm from "../board/Form";
  import HelpBoard from "../help/Board";

  export default {
    name: "SettingsBoard",
    components: {HelpBoard, BoardForm, draggable},
    data(){
      return {
        showHelp: false,
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
        snackbar: {
          board: {
            saved: false,
          },
        }
      }
    },
    computed: {
      ...mapState({
        boards: state => state.board.boards,
      }),
      boardMap() {
        let map = {}

        for(let board of this.boards) {
          map[board.id] = board
        }

        return map
      },
      boardOrder: {
        get() {
          return this.$store.state.board.boardOrder
        },
        set(value) {
          this.$store.commit('board/setBoardOrder', value)
        }
      }
    },
    methods: {
      ...mapMutations({
        addBoard: 'board/addBoard',
        editBoard: 'board/editBoard',
        deleteBoard: 'board/deleteBoard',
      }),
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
    }
  }
</script>

<style scoped>
  .handle {
    cursor: grab;
  }
</style>
