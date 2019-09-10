<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{note.title}}</span>
    </v-card-title>

    <v-card-text>
      <vue-markdown v-if="note.content.markdown" :source="note.content.markdown"></vue-markdown>
      <template v-if="note.content.text">{{note.content.text}}</template>
    </v-card-text>

    <v-card-actions>
      <v-btn icon class="error" @click="onDelete()">
        <v-icon>delete</v-icon>
      </v-btn>
      <v-btn icon class="primary" @click="onEdit()">
        <v-icon>edit</v-icon>
      </v-btn>

      <div class="flex-grow-1"></div>

      <v-btn icon @click="onCopy()">
        <v-icon>file_copy</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import VueMarkdown from 'vue-markdown'

  export default {
    components: {
      'vue-markdown': VueMarkdown,
    },
    name: "NoteCardText",
    props: {
      note: {
        type: Object,
        required: true,
      }
    },
    data(){
      return {
      }
    },
    methods: {
      onEdit(){
        this.$emit('onEdit')
      },
      onDelete(){
        this.$emit('onDelete')
      },
      onCopy(){
        const content = this.note.content.text ? this.note.content.text : this.note.content.markdown
        this.$emit('onCopy', content)
      }
    }
  }
</script>

<style scoped>

</style>
