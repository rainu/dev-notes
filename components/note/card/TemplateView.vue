<template>
  <component :is="renderedTemplate">
  </component>
</template>

<script>
  export default {
    name: "TemplateView",
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
    computed: {
      renderedTemplate(){
        let rendered = this.template

        for(let placeholder of this.placeholder) {
          rendered = rendered.replace(new RegExp(`__${placeholder.name}__`, 'g'),
              `<a href="javascript:" @click="dialog.${placeholder.name} = true" class="placeholder ${placeholder.required ? 'required' : 'optional'}">${placeholder.name}</a>`
          )
        }
        for(let placeholder of this.placeholder) {
          rendered += `
            <v-dialog v-model="dialog.${placeholder.name}" scrollable>

              <v-card>
                <v-card-title>
                  <span class="headline">${placeholder.name}</span>
                </v-card-title>

                <v-card-text>
                  <h3>{{$t('note.template.placeholder.required.${placeholder.required ? 'mandatory' : 'optional'}')}}</h3>
                  <p></p>

                  <h3>{{$t('note.template.placeholder.default')}}</h3>
                  <p>${placeholder.default ? placeholder.default : '-'}</p>

                  <h3>{{$t('note.template.placeholder.description')}}</h3>
                  <p>${placeholder.description ? placeholder.description : '-' }</p>
                </v-card-text>

                <v-card-actions class="text-center">
                  <div class="flex-grow-1"></div>
                  <v-btn color="primary" @click="dialog.${placeholder.name} = false">{{$t('note.template.placeholder.action.close')}}</v-btn>
                </v-card-actions>
              </v-card>

            </v-dialog>
          `
        }

        let self = this
        return {
          template: `<div>${rendered}</div>`,
          data(){
            let data = {
              dialog: {}
            }

            for(let placeholder of self.placeholder) {
              data.dialog[placeholder.name] = false
            }

            return data
          },
          methods: {
            onPlaceholderClick(name) {
              self.onPlaceholderClick(name)
            }
          }
        }
      }
    }
  }
</script>

<style>
  a.placeholder {
    text-decoration: none;
  }
  a.placeholder.required {
    font-weight: bold;
  }
  a.placeholder.optional {
    font-weight: lighter;
  }
</style>
