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
              v-if="placeholder.type === 'text'"
              v-model="placeholder.value"
              :label="placeholder.name"
              :placeholder="placeholder.default"
              :hint="placeholder.description"
              :required="placeholder.required"
              :rules="placeholder.required ? ruleRequired : []"></v-text-field>

            <v-switch
              v-if="placeholder.type === 'flag'"
              @change="onFlagChange($event, placeholder)"
              :label="`${placeholder.name}${placeholder.description ? ': ' + placeholder.description : ''}`"
              color="primary"
            ></v-switch>

            <v-select
              v-if="placeholder.type === 'enum'"
              v-model="placeholder.value"
              :label="placeholder.name"
              :hint="placeholder.description"
              :items="placeholder.default"
              item-text="label"
              item-value="value"
            ></v-select>

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
        let item = {
          name: placeholder.name,
          type: placeholder.type,
          description: placeholder.description,
        }
        switch(placeholder.type) {
          case 'text':
            item.value = placeholder.default
            item.default = placeholder.default
            item.required = placeholder.required
            break;
          case 'flag':
            item.value = ''
            item.default = placeholder.value
            break;
          case 'enum':
            item.value = placeholder.values[0].value
            item.default = placeholder.values
            break;
        }

        placeholderForm.push(item)
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
      onFlagChange(value, placeholder){
        if(value) {
          placeholder.value = placeholder.default
        }else{
          placeholder.value = ''
        }
      },
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
