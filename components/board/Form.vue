<template>
  <v-form v-model="valid" @submit.prevent="onSubmit()" :id="formId" ref="form">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="board.title" :label="$t('board.title')" :rules="ruleRequired" required>
            <IconChooser v-model="board.icon" slot="prepend"/>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="tag of availableTags" :key="tag">
          <v-btn block class="text-capitalize" @click="onTagChange(tag)" v-if="board.filter.tags[tag]">
            <v-icon v-if="board.filter.tags[tag].value === true" color="green">check_circle</v-icon>
            <v-icon v-if="board.filter.tags[tag].value === false" color="red">remove_circle</v-icon>
            <v-icon v-if="board.filter.tags[tag].value === null" disabled>filter_list</v-icon>
            <span class="flex-grow-1"></span>
            {{tag}}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  import { mapGetters } from 'vuex';
  import {cloneDataObject} from "../../common/copy";
  import Vue from 'vue'
  import IconChooser from "../IconChooser";

  export default {
    name: "BoardForm",
    components: {IconChooser},
    props: {
      formId: {
        type: String,
        required: true,
      },
      defaultIcon: {
        type: String,
        required: false,
        default: "dashboard"
      },
      data: {
        type: Object,
        required: false,
      },
      clearAfterSubmit: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    data() {
      let board = {
        title: "",
        icon: this.defaultIcon,
        filter: {
          tags: {}
        },
      }

      if(this.data) {
        board.title = this.data.title
        board.icon = this.data.icon
        board.filter = cloneDataObject(this.data.filter)
      }

      return {
        valid: false,
        board: board
      }
    },
    computed: {
      ...mapGetters({
        availableTags: 'note/getAvailableTags'
      }),
      ruleRequired(){
        return [
          v => !!v || this.$t('common.form.validation.required')
        ]
      }
    },
    methods: {
      onTagChange(tag){
        if(this.board.filter.tags[tag].value === true) this.board.filter.tags[tag].value = false
        else if(this.board.filter.tags[tag].value === false) this.board.filter.tags[tag].value = null
        else if(this.board.filter.tags[tag].value === null) this.board.filter.tags[tag].value = true
      },
      applyTags(tags){
        //add missing
        for(let tag of tags) {
          if(!this.board.filter.tags.hasOwnProperty(tag)){
            Vue.set(this.board.filter.tags, tag, { value: null })
          }
        }
      },
      onSubmit() {
        if(!this.valid) return

        let data = {}
        data.title = this.board.title
        data.icon = this.board.icon
        data.filter = cloneDataObject(this.board.filter)

        //remove undefined ones
        for(let tagName of Object.keys(data.filter.tags)) {
          if(data.filter.tags[tagName].value === null) {
            delete data.filter.tags[tagName]
          }
        }

        this.$emit('onSubmit', data)
        if(this.clearAfterSubmit) {
          this.$refs.form.reset()

          this.board.filter.tags = {}
          this.applyTags(this.availableTags)
        }
      }
    },
    watch: {
      availableTags(tags) {
        this.applyTags(tags)
      },
      data(newData) {
        if(!newData) {
          this.board.title = ""
          this.board.icon = this.defaultIcon
          this.board.filter.tags = {}
          return
        }

        this.board.title = newData.title
        this.board.icon = newData.icon

        //it is IMPORTANT to COPY the filter data!
        this.board.filter = cloneDataObject(newData.filter)
        this.applyTags(this.availableTags)
      }
    },
    mounted() {
      this.applyTags(this.availableTags)
    },
  }
</script>

<style scoped>

</style>
