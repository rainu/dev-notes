<template>
  <v-card>
    <v-img :src="note.content.url">
      <v-card-title >{{note.title}}</v-card-title>
    </v-img>

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
  export default {
    name: "NoteCardPicture",
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
        this.$emit('onCopy', this.note.content.url)
      }
    }
  }
</script>

<style scoped>

</style>
