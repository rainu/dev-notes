<template>
  <div>
    <component :is="renderedTemplate" />

    <v-dialog v-model="dialog.show" v-if="dialog.placeholder" scrollable>

      <v-card>
        <v-toolbar color="primary" flat>
          <v-toolbar-title>{{dialog.placeholder.name}}</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <v-card-text class="pt-4">
          <template v-if="dialog.placeholder.type === 'text'">
            <h3>{{$t(`note.template.placeholder.required.${dialog.placeholder.required ? 'mandatory' : 'optional'}`)}}</h3>
            <p></p>

            <h3>{{$t('note.template.placeholder.default')}}</h3>
            <p>{{dialog.placeholder.default ? dialog.placeholder.default : '-'}}</p>
          </template>
          <template v-if="dialog.placeholder.type === 'flag'">
            <h3>{{$t('note.template.placeholder.flag-value')}}</h3>
            <p>{{dialog.placeholder.value}}</p>
          </template>
          <template v-if="dialog.placeholder.type === 'enum'">
            <h3>{{$t('note.template.placeholder.type.enum')}}</h3>
            <v-simple-table class="pb-2" dense>
              <template v-slot:default>
                <thead>
                <tr>
                  <th class="text-left">{{$t('note.template.placeholder.enum.label')}}</th>
                  <th class="text-left">{{$t('note.template.placeholder.enum.value')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in dialog.placeholder.values" :key="item.id">
                  <td>{{ item.label }}</td>
                  <td>{{ item.value }}</td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>


          <h3>{{$t('note.template.placeholder.description')}}</h3>
          <p>{{dialog.placeholder.description ? dialog.placeholder.description : '-' }}</p>
        </v-card-text>

        <v-card-actions class="text-center">
          <div class="flex-grow-1"></div>
          <v-btn color="primary" @click="dialog.show = false">{{$t('note.template.placeholder.action.close')}}</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </div>
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
    data(){
      return {
        dialog: {
          show: false,
          placeholder: null,
        }
      }
    },
    methods: {
      onPlaceholderClick(placeholderIndex) {
        this.dialog.placeholder = this.placeholder[placeholderIndex]
        this.dialog.show = true
      }
    },
    computed: {
      renderedTemplate(){
        let rendered = this.template

        for(let i in this.placeholder) {
          let placeholder = this.placeholder[i]
          rendered = rendered.replace(new RegExp(`__${placeholder.name}__`, 'g'),
              `<a href="javascript:" @click="onPlaceholderClick(${i})" class="placeholder ${placeholder.required ? 'required' : 'optional'}">${placeholder.name}</a>`
          )
        }
        let self = this
        return {
          template: `<div>${rendered}</div>`,
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
