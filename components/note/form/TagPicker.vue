<template>
  <span>
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
      :search-input.sync="tagInput"
      @update:search-input="onInputChange"
      @blur="onBlur"
      @change="onChange"
    >
  </v-autocomplete>
  </span>
</template>

<script>
  import { mapState } from 'vuex';

  let arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

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
        tagInput: null,
      }
    },
    computed: {
      ...mapState({
        delimiter: state => state.settings.tag.delimiter,
      })
    },
    methods: {
      addTag(tag){
        if(!this.availableTags.includes(tag)) {
          this.availableTags.push(tag)
          this.availableTags.sort()
        }

        if(!this.chosenTags.includes(tag)) {
          this.chosenTags.push(tag)
          this.onChange()
        }
      },
      onInputChange(text){
        if(text && text.trim() && text.includes(this.delimiter)) {
          let tagValue = text.substring(0, text.indexOf(this.delimiter)).trim()
          if(tagValue) {
            let newTag = text.substring(0, text.indexOf(this.delimiter)).trim()
            this.addTag(newTag)
          }
          this.tagInput = null
        }
      },
      onBlur(){
        if(this.tagInput && this.tagInput.trim()) {
          this.addTag(this.tagInput.trim())
        }
      },
      onChange(){
        this.$emit("input", this.chosenTags)
      }
    },
    watch: {
      tags(newTags) {
        if (!newTags) {
          this.availableTags = []
        } else if (!arraysEqual(newTags, this.availableTags)) {
          this.availableTags = newTags.sort()
        }
      },
      value(value) {
        if (!value) {
          this.chosenTags = []
        } else if (!arraysEqual(value, this.chosenTags)) {
          this.chosenTags = value.sort()
        }
      }
    }
  }
</script>

<style scoped>

</style>
