<template>
  <span>
     <span v-if="!trigger" @click="onRequestChange">{{usedValue}}</span>
     <v-text-field v-else v-model="usedValue" @blur="onChange" autofocus/>
  </span>
</template>

<script>
  export default {
    name: "ClickToEdit",
    props: {
      value: {
        type: String,
        required: true,
      }
    },
    data(){
      let v = this.value
      return {
        trigger: false,
        usedValue: v
      }
    },
    methods: {
      onRequestChange() {
        this.trigger = true
      },
      onChange() {
        this.trigger = false

        if(this.usedValue !== this.value) {
          this.$emit('input', this.usedValue)
        }
      },
    }
  }
</script>

<style scoped>

</style>
