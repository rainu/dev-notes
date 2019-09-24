<template>
  <v-container fluid>
    <v-layout column justify-center>
      <v-row align="center">

        <!-- Board options -->
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

        <!-- Encryption -->
        <v-col cols="12" >
          <v-card class="elevation-12">
            <v-toolbar color="primary" flat>
              <v-toolbar-title>{{$t('settings.encryption.title')}}</v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>

            <template v-if="isEncrypted">
              <v-card-text>
                <v-row>

                  <!-- Change password -->
                  <v-col cols="12">
                    <v-card>
                      <v-card-text>
                        <v-form v-model="passwordChange.valid" @submit.prevent="onPasswordChange" ref="password-change">
                          <v-row>
                            <v-col cols="12" sm="3">
                              <v-text-field :type="passwordChange.showPassword ? 'text' : 'password'"
                                            :append-icon="passwordChange.showPassword ? 'visibility' : 'visibility_off'"
                                            @click:append="passwordChange.showPassword = !passwordChange.showPassword"
                                            v-model="passwordChange.current"
                                            :rules="changePasswordCurrentRules"
                                            :label="$t('settings.encryption.password.current')"
                                            @change="validatePasswordChange"
                                            required />
                            </v-col>
                            <v-col cols="12" sm="3">
                              <v-text-field type="password"
                                            v-model="passwordChange.password[0]"
                                            :rules="changePassword1Rules"
                                            :label="$t('settings.encryption.password.1st')"
                                            @change="validatePasswordChange"
                                            required />
                            </v-col>
                            <v-col cols="12" sm="3">
                              <v-text-field type="password"
                                            v-model="passwordChange.password[1]"
                                            :rules="changePassword2Rules"
                                            :label="$t('settings.encryption.password.2nd')"
                                            @change="validatePasswordChange"
                                            required />
                            </v-col>
                            <v-col cols="12" sm="3" align-self="center">
                              <v-btn block color="primary" @click="onPasswordChange" :disabled="!passwordChange.valid">
                                <v-icon>compare_arrows</v-icon>
                                {{$t('settings.encryption.actions.change')}}
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <!-- disable encryption -->
                  <v-col cols="12">
                    <v-card>
                      <v-card-text>
                        <v-form v-model="decryption.valid" @submit.prevent="onDecrypt" ref="encryption-disable">
                          <v-row>
                            <v-col cols="12" sm="3">
                              <v-text-field :type="decryption.showPassword ? 'text' : 'password'"
                                            :append-icon="decryption.showPassword ? 'visibility' : 'visibility_off'"
                                            @click:append="decryption.showPassword = !decryption.showPassword"
                                            v-model="decryption.password"
                                            :label="$t('settings.encryption.password.current')"
                                            required />
                            </v-col>
                            <v-col cols="12" sm="3" align-self="center">
                              <v-btn block color="primary" @click="onDecrypt" :disabled="!decryption.valid">
                                <v-icon>lock_open</v-icon>
                                {{$t('settings.encryption.actions.decrypt')}}
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-col>

                </v-row>

              </v-card-text>
            </template>
            <template v-else>
              <v-card-text>
                <v-form v-model="encryption.valid" @submit.prevent="onEncrypt" ref="encryption-enable">
                  <v-row>

                    <v-col cols="12" sm="4">
                      <v-text-field type="password"
                                    :label="$t('settings.encryption.password.1st')"
                                    v-model="encryption.password[0]"
                                    :rules="encryptionPassword1Rules"
                                    @change="validateEncryptionChange"
                                    required />
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field type="password"
                                    :label="$t('settings.encryption.password.2nd')"
                                    v-model="encryption.password[1]"
                                    :rules="encryptionPassword2Rules"
                                    @change="validateEncryptionChange"
                                    required />
                    </v-col>
                    <v-col cols="12" sm="4" align-self="center">
                      <v-btn block color="primary" @click="onEncrypt" :disabled="!encryption.valid">
                        <v-icon>lock</v-icon>
                        {{$t('settings.encryption.actions.encrypt')}}
                      </v-btn>
                    </v-col>

                  </v-row>
                </v-form>
              </v-card-text>
            </template>

          </v-card>
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

      <v-snackbar v-model="snackbar.board.saved" color="success" class="text-center" :timeout="1000">
        {{$t('board.saved.successfully')}}
        <v-btn text @click="snackbar.board.saved = false" >
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
      <v-snackbar v-model="snackbar.change.failed" color="error" class="text-center" :timeout="5000">
        {{$t('encryption.invalid')}}
        <v-btn text @click="snackbar.change.failed = false" >
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
      <v-snackbar v-model="snackbar.change.success" color="success" class="text-center" :timeout="5000">
        {{$t('settings.encryption.change.successful')}}
        <v-btn text @click="snackbar.change.success = false" >
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex';
  import uuid4 from 'uuid4'
  import BoardForm from "../../components/board/Form";
  import SettingsTheme from "../../components/settings/Theme";
  import SettingsLanguage from "../../components/settings/Language";
  import SettingsNote from "../../components/settings/Note";

  export default {
    components: {SettingsNote, SettingsLanguage, SettingsTheme, BoardForm},
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
      encryption: {
        valid: false,
        password: ["", ""],
      },
      decryption: {
        valid: false,
        showPassword: false,
        password: "",
      },
      passwordChange: {
        valid: false,
        showPassword: false,
        current: null,
        password: ["", ""],
      },
      snackbar: {
        board: {
          saved: false,
        },
        change: {
          success: false,
          failed: false,
        }
      }
    }),
    computed: {
      ...mapState({
        isEncrypted: state => state.settings.encrypted,
        boards: state => state.board.boards,
      }),
      encryptionPassword1Rules(){
        return [
          v => !!v || this.$t('common.form.validation.required')
        ]
      },
      encryptionPassword2Rules(){
        return [
          v => !!v || this.$t('settings.encryption.password.different'),
          v => this.encryption.password[0] === this.encryption.password[1] || this.$t('settings.encryption.password.different')
        ]
      },
      changePasswordCurrentRules(){
        return [
          v => !!v || this.$t('common.form.validation.required')
        ]
      },
      changePassword1Rules(){
        return [
          v => !!v || this.$t('settings.encryption.password.different'),
        ]
      },
      changePassword2Rules(){
        return [
          v => !!v || this.$t('settings.encryption.password.different'),
          v => this.passwordChange.password[0] === this.passwordChange.password[1] || this.$t('settings.encryption.password.different')
        ]
      },

    },
    methods: {
      ...mapActions({
        checkSecret: 'settings/checkSecret',
        enableEncryption: 'settings/enableEncryption',
        disableEncryption: 'settings/disableEncryption'
      }),
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
      onEncrypt(){
        if(!this.encryption.valid) return

        let secret = this.encryption.password[0]
        this.$refs['encryption-enable'].reset()
        this.enableEncryption(secret)
      },
      validateEncryptionChange(){
        this.$refs['encryption-enable'].validate()
      },
      onPasswordChange(){
        if(!this.passwordChange.valid) return

        this.checkSecret(this.passwordChange.current)
          .then(() => {
            this.enableEncryption(this.passwordChange.password[0])
            this.$refs['password-change'].reset()

            this.snackbar.change.success = true
          })
          .catch(() => this.snackbar.change.failed = true)
      },
      validatePasswordChange(){
        this.$refs['password-change'].validate()
      },
      onDecrypt(){
        if(!this.decryption.valid) return

        this.checkSecret(this.decryption.password)
          .then(() => {
            this.$refs['encryption-disable'].reset()
          })
          .then(() => this.disableEncryption())
          .catch(() => this.snackbar.change.failed = true)
      },
    }
  }
</script>

<style scoped>

</style>
