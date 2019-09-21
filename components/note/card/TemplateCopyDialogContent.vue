<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{$t('note.template.placeholder.title')}}</span>
    </v-card-title>

    <v-card-text>
      <v-form v-model="valid" @submit.prevent="onCopy">
        <v-row justify="center">
          <v-col cols="12" sm="4" v-for="placeholder of placeholderForm" :key="placeholder.name">
            <v-text-field
              v-model="placeholder.value"
              :label="placeholder.name"
              :placeholder="placeholder.default"
              :hint="placeholder.description"
              :required="placeholder.required"
              :rules="placeholder.required ? ruleRequired : []"></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-card-actions class="text-center">
      <div class="flex-grow-1"></div>
      <v-btn color="primary" @click="onCopy">{{$t('note.copy.title')}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: "TemplateCopyDialogContent",
    props: {
      template: {
        type: String,
        required: true
      },
      placeholder: {
        type: Array,
        required: true
      }
    },
    data(){
      let placeholderForm = []

      for(let placeholder of this.placeholder){
        placeholderForm.push({
          name: placeholder.name,
          value: placeholder.default,
          required: placeholder.required,
          description: placeholder.description,
          default: placeholder.default,
        })
      }

      return {
        valid: false,
        placeholderForm
      }
    },
    computed: {
      ruleRequired(){
        return [
          v => !!v || this.$t('common.form.validation.required')
        ]
      }
    },
    methods:{
      onCopy(){
        if(!this.valid) return

        let copyText = this.template

        for(let placeholder of this.placeholder) {
          let placeholderFormItem = this.placeholderForm.find(p => p.name === placeholder.name)
          copyText = copyText.replace(new RegExp(`__${placeholder.name}__`, 'g'), placeholderFormItem.value)
        }

        this.$emit('copy', copyText)
      },
    },
  }
</script>

<style scoped>

</style>
