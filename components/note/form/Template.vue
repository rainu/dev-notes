<template>
  <v-form v-model="valid" @submit.prevent="onSubmit()" :id="formId" ref="form">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="note.title" :label="$t('note.title')" :placeholder="$t('note.untitled')"></v-text-field>
        </v-col>
      </v-row>

      <v-list dense v-if="note.placeholder.length > 0">
        <v-subheader class="pa-0">{{$t('note.template.placeholder.title')}}</v-subheader>
        <v-list-item v-for="placeholder of note.placeholder" :key="placeholder.id" class="pa-0">
          <v-list-item-content>
            <v-list-item-title>
              <v-btn block @click="insertPlaceholder(placeholder.name)" >{{placeholder.name}}</v-btn>
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-btn icon class="error mr-2" @click="deletePlaceholder(placeholder.id)">
              <v-icon>delete</v-icon>
            </v-btn>
            <v-btn icon class="primary" @click="editPlaceholder(placeholder)">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>

      <v-row>
        <v-col>
          <v-btn block color="primary" @click="dialog.add.open = true">
            <v-icon>add</v-icon>
            {{$t('note.template.placeholder.add')}}
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-textarea v-model="note.template" :label="$t('note.template.template')" autofocus></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <TagPicker v-model="note.tags" :tags="availableTags"></TagPicker>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog.add.open" scrollable>
      <v-card>
        <v-card-title>
          <span class="headline">{{$t('note.template.placeholder.add')}}</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="dialog.add.valid" @submit.prevent="addPlaceholder()">
            <v-text-field autofocus
                          v-model="dialog.add.placeholder.name"
                          :label="$t('note.template.placeholder.name')"
                          :rules="[ruleRequired, rulePlaceholderName]"
                          required></v-text-field>

            <v-textarea v-model="dialog.add.placeholder.description"
                        :label="$t('note.template.placeholder.description')" ></v-textarea>

            <v-select v-model="dialog.add.placeholder.type"
                      :label="$t('note.template.placeholder.type.title')"
                      :items="availablePlaceholderTypes"
                      @change="onPlaceholderTypeChange($event, dialog.add.placeholder)"
                      item-text="label"
                      item-value="value"
                      :rules="[ruleRequired]"
                      required ></v-select>

            <template v-if="dialog.add.placeholder.type === 'text'">
              <v-text-field v-model="dialog.add.placeholder.default"
                            :label="$t('note.template.placeholder.default')" ></v-text-field>

              <v-switch v-model="dialog.add.placeholder.required"
                        :label="$t('note.template.placeholder.required.title')"
                        color="primary"></v-switch>
            </template>
            <v-text-field v-if="dialog.add.placeholder.type === 'flag'"
                        v-model="dialog.add.placeholder.value"
                        :label="$t('note.template.placeholder.flag-value')"
                        :rules="[ruleRequired]"
                        required></v-text-field>
            <template v-if="dialog.add.placeholder.type === 'enum'">
              <v-row v-for="item of dialog.add.placeholder.values" :key="item.id">
                <v-col cols="12" sm="5">
                  <v-text-field v-model="item.label" :label="$t('note.template.placeholder.enum.label')" :rules="[ruleRequired]" required/>
                </v-col>
                <v-col cols="12" sm="5">
                  <v-text-field v-model="item.value" :label="$t('note.template.placeholder.enum.value')" :rules="[ruleRequired]" required/>
                </v-col>
                <v-col cols="12" sm="2" v-if="dialog.add.placeholder.values.length > 1">
                  <v-btn block color="error" @click="removeEnumItem(dialog.add.placeholder, item.id)">
                    <v-icon>delete</v-icon>
                    {{$t('note.template.placeholder.enum.remove')}}
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn block color="primary" @click="addEnumItem(dialog.add.placeholder)">
                    <v-icon>add</v-icon>
                    {{$t('note.template.placeholder.enum.add')}}
                  </v-btn>
                </v-col>
              </v-row>
            </template>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error" @click="dialog.add.open = false">{{$t('common.confirmation.disagree')}}</v-btn>
          <v-btn color="primary" @click="addPlaceholder()">{{$t('note.template.placeholder.action.add')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.edit.open" scrollable>
      <v-card>
        <v-card-title>
          <span class="headline">{{$t('note.template.placeholder.edit')}}</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="dialog.edit.valid" @submit.prevent="savePlaceholder()">
            <v-text-field autofocus
                          v-model="dialog.edit.placeholder.name"
                          :label="$t('note.template.placeholder.name')"
                          :rules="[ruleRequired, rulePlaceholderName]"
                          required></v-text-field>

            <v-textarea v-model="dialog.edit.placeholder.description"
                        :label="$t('note.template.placeholder.description')" ></v-textarea>

            <v-select v-model="dialog.edit.placeholder.type"
                      :label="$t('note.template.placeholder.type.title')"
                      :items="availablePlaceholderTypes"
                      item-text="label"
                      item-value="value"
                      :rules="[ruleRequired]"
                      required ></v-select>

            <template v-if="dialog.edit.placeholder.type === 'text'">
              <v-text-field v-model="dialog.edit.placeholder.default"
                            :label="$t('note.template.placeholder.default')" ></v-text-field>

              <v-switch v-model="dialog.edit.placeholder.required"
                        :label="$t('note.template.placeholder.required.title')"
                        color="primary"></v-switch>
            </template>
            <v-text-field v-if="dialog.edit.placeholder.type === 'flag'"
                          v-model="dialog.edit.placeholder.value"
                          :label="$t('note.template.placeholder.flag-value')"
                          :rules="[ruleRequired]"
                          required></v-text-field>
            <template v-if="dialog.edit.placeholder.type === 'enum'">
              <v-row v-for="item of dialog.edit.placeholder.values" :key="item.id">
                <v-col cols="12" sm="5">
                  <v-text-field v-model="item.label" :label="$t('note.template.placeholder.enum.label')" :rules="[ruleRequired]" required/>
                </v-col>
                <v-col cols="12" sm="5">
                  <v-text-field v-model="item.value" :label="$t('note.template.placeholder.enum.value')" :rules="[ruleRequired]" required/>
                </v-col>
                <v-col cols="12" sm="2" v-if="dialog.edit.placeholder.values.length > 1">
                  <v-btn block color="error" @click="removeEnumItem(dialog.edit.placeholder, item.id)">
                    <v-icon>delete</v-icon>
                    {{$t('note.template.placeholder.enum.remove')}}
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn block color="primary" @click="addEnumItem(dialog.edit.placeholder)">
                    <v-icon>add</v-icon>
                    {{$t('note.template.placeholder.enum.add')}}
                  </v-btn>
                </v-col>
              </v-row>
            </template>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error" @click="dialog.edit.open = false">{{$t('common.confirmation.disagree')}}</v-btn>
          <v-btn color="primary" @click="savePlaceholder()">{{$t('note.template.placeholder.action.save')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
  import { mapGetters } from 'vuex';
  import uuid4 from 'uuid4';
  import {cloneDataObject} from "../../../common/copy";
  import TagPicker from "./TagPicker";

  export default {
    name: "NoteFormTemplate",
    components: {TagPicker},
    props: {
      formId: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: false,
      },
      data: {
        type: Object,
        required: false,
      },
      clearAfterSubmit: {
        type: Boolean,
        required: false,
        default: false
      },
      initialTags: {
        type: Array,
        required: false,
        default: () => []
      }
    },
    data() {
      let note = {
        title: "",
        tags: this.initialTags,
        placeholder: [],
        template: ""
      }

      if(this.data) {
        note.title = this.data.title === this.$t('note.untitled') ? null : this.data.title
        note.tags = this.data.tags
        note.template = this.data.content.template
        note.placeholder = cloneDataObject(this.data.content.placeholder)

        for(let placeholder of note.placeholder) {
          if (!placeholder.hasOwnProperty('default')) placeholder.default = null
          if (!placeholder.hasOwnProperty('required')) placeholder.required = true
          if (!placeholder.hasOwnProperty('value')) placeholder.value = null
          if (!placeholder.hasOwnProperty('values')) placeholder.values = []
        }
      }

      return {
        dialog: {
          add: {
            open: false,
            valid: true,
            placeholder: {
              name: null,
              type: 'text',
              value: null,
              values: [],
              description: null,
              default: null,
              required: true,
            }
          },
          edit: {
            open: false,
            valid: true,
            placeholder: {}
          }
        },
        valid: false,
        note: note
      }
    },
    computed: {
      ...mapGetters({
        noteTags: 'note/getAvailableTags',
        boardTags: 'board/getAvailableTags'
      }),
      availablePlaceholderTypes(){
        return [
          { value: 'text', label: this.$t('note.template.placeholder.type.text') },
          { value: 'flag', label: this.$t('note.template.placeholder.type.flag') },
          { value: 'enum', label: this.$t('note.template.placeholder.type.enum') },
        ]
      },
      availableTags() {
        let tags = {}
        for(let tag of this.noteTags) tags[tag] = true
        for(let tag of this.boardTags) tags[tag] = true

        return Object.keys(tags).sort()
      },
      ruleRequired(){
        return v => !!v || this.$t('common.form.validation.required')
      },
      rulePlaceholderName(){
        return v => {
          if(v && v.match(/^[a-zA-Z][a-zA-Z0-9]*$/)) {
            return true
          }
          return this.$t('note.template.placeholder.validation.invalid-character')
        }
      }
    },
    methods: {
      addPlaceholder(){
        if(!this.dialog.add.valid) return

        let placeholder = this.dialog.add.placeholder
        this.note.placeholder.push({
          id: uuid4(),
          ...placeholder
        })
        this.dialog.add.valid = true
        this.dialog.add.placeholder.name = null
        this.dialog.add.placeholder.value = null
        this.dialog.add.placeholder.values = []
        this.dialog.add.placeholder.description = null
        this.dialog.add.placeholder.default = null
        this.dialog.add.placeholder.required = true
        this.dialog.add.open = false
      },
      addEnumItem(placeholder){
        placeholder.values.push({
          id: uuid4(),
          value: null,
          label: null
        })
      },
      removeEnumItem(placeholder, itemId) {
        let index = placeholder.values.findIndex(v => v.id === itemId)
        placeholder.values.splice(index, 1)
      },
      onPlaceholderTypeChange(type, placeholder) {
        if(type === 'enum' && (!placeholder.values || placeholder.values.length === 0)){
          this.addEnumItem(placeholder)
        }
      },
      deletePlaceholder(placeholderId) {
        let index = this.note.placeholder.findIndex(p => p.id === placeholderId)
        this.note.placeholder.splice(index, 1)
      },
      editPlaceholder(placeholder) {
        this.dialog.edit.placeholder = cloneDataObject(placeholder)
        this.dialog.edit.open = true
      },
      savePlaceholder(){
        if(!this.dialog.edit.valid) return

        let index = this.note.placeholder.findIndex(p => p.id === this.dialog.edit.placeholder.id)
        this.note.placeholder[index] = cloneDataObject(this.dialog.edit.placeholder)

        this.dialog.edit.placeholder = {}
        this.dialog.edit.open = false
      },
      insertPlaceholder(placeholderName){
        this.note.template += `__${placeholderName}__`
      },
      onSubmit() {
        if (!this.valid) return

        let data = {
          content: {}
        }
        data.title = this.note.title ? this.note.title : this.$t('note.untitled')
        data.tags = this.note.tags
        data.content.template = this.note.template
        data.content.placeholder = cloneDataObject(this.note.placeholder)

        for (let placeholder of data.content.placeholder) {
          switch (placeholder.type) {
            case 'text':
              delete placeholder.value
              delete placeholder.values
              break;
            case 'flag':
              delete placeholder.default
              delete placeholder.required
              delete placeholder.values
              break;
            case 'enum':
              delete placeholder.default
              delete placeholder.required
              delete placeholder.value
              break;
          }
        }

        this.$emit('onSubmit', data)
        if(this.clearAfterSubmit) {
          this.$refs.form.reset()
          this.note.tags = []
          this.note.placeholder = []
        }
      }
    },
    watch: {
      data(newData) {
        this.note.title = newData.title === this.$t('note.untitled') ? null : newData.title
        this.note.tags = newData.tags
        this.note.template = newData.content.template

        //it is IMPORTANT to COPY the filter data!
        this.note.placeholder = cloneDataObject(newData.content.placeholder)
      }
    }
  }
</script>

<style scoped>
</style>
