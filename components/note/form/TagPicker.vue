<template>
  <span>
    <v-dialog v-model="dialog.open">
      <v-card>
        <v-card-title>
          <span class="headline">{{$t('note.tags.action.add.title')}}</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addTag()">
            <v-text-field autofocus v-model="dialog.tag" :label="$t('note.tags.action.add.tag')"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error" @click="dialog.open = false">{{$t('note.tags.action.add.cancel')}}</v-btn>
          <v-btn color="primary" @click="addTag()">{{$t('note.tags.action.add.ok')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-autocomplete
      v-model="chosenTags"
      :items="availableTags"
      filled
      chips
      :label="$t('note.tags.title')"
      no-data-text=""
      clearable
      multiple
      dense
      @change="onChange"
    >
    <v-btn slot="append-outer" @click="dialog.open = true">
      <v-icon>add_circle</v-icon>
    </v-btn>
  </v-autocomplete>
  </span>
</template>

<script>
  export default {
    name: "TagPicker",
    props: {
      value: {
        type: Array,
        required: false,
      },
      tags: {
        type: Array,
        required: false,
      }
    },
    data(){
      let availableTags = []
      let chosenTags = []
      if(this.tags){
        availableTags = this.tags.sort()
      }
      if(this.value){
        chosenTags = this.value.sort()
      }

      return {
        availableTags: availableTags,
        chosenTags: chosenTags,
        dialog: {
          open: false,
          tag: null
        },
      }
    },
    methods: {
      addTag(){
        this.dialog.open = false
        this.availableTags.push(this.dialog.tag)
        this.availableTags.sort()

        this.chosenTags.push(this.dialog.tag)
        this.dialog.tag = null
      },
      onChange(){
        this.$emit("input", this.chosenTags)
      }
    },
    watch: {
      tags(newTags){
        if(!newTags) {
          this.availableTags = []
        }else if(newTags.length !== this.availableTags.length){
          this.availableTags = newTags.sort()
        }
      },
      value(value) {
        if (!value) {
          this.chosenTags = []
        } else if (value.length !== this.chosenTags.length) {
          this.chosenTags = value.sort()
        }
      }
    }
  }
</script>

<style scoped>

</style>
