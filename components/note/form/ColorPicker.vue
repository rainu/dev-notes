<template>
  <span>
    <template v-if="isDisplayXS">
      <v-btn :color="color" fab @click="show = true">
        <v-icon>color_lens</v-icon>
      </v-btn>

      <v-dialog v-model="show" max-width="345" content-class="ma-3">
        <v-card>
          <v-color-picker width="345"
                          :swatches="swatches"
                          :mode="mode"
                          v-model="color"
                          show-swatches
                          @update:color="onChange">
          </v-color-picker>
          <v-card-actions>
            <v-btn color="primary" block @click="show = false">
              {{$t('common.confirmation.close')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-else>
      <v-menu offset-y offset-x :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-btn :color="color" fab v-on="on">
            <v-icon>color_lens</v-icon>
          </v-btn>
        </template>
        <v-color-picker class="ma-2"
                        width="345"
                        :swatches="swatches"
                        :mode="mode"
                        v-model="color"
                        show-swatches
                        @update:color="onChange">
        </v-color-picker>
      </v-menu>
    </template>
  </span>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: "ColorPicker",
    props: ['value'],
    data(){
      return {
        mode: 'rgba',
        show: false,
        color: this.value || this.$vuetify.theme.currentTheme.primary,
        defaultSwatches: [
          [this.$vuetify.theme.currentTheme.primary.toUpperCase()],
          [this.$vuetify.theme.currentTheme.error.toUpperCase()],
          [this.$vuetify.theme.currentTheme.warning.toUpperCase()],
          [this.$vuetify.theme.currentTheme.success.toUpperCase()],
          [this.$vuetify.theme.currentTheme.info.toUpperCase()],
          ['#3F51B5'],
        ],
      }    },
    computed: {
      ...mapGetters({
        usedNoteColors: 'note/getUsedColors',
        usedBoardColors: 'board/getUsedColors',
      }),
      swatches(){
        let defaultColors = this.defaultSwatches.flat()
        let usedColors = [...new Set([...this.usedNoteColors, ...this.usedBoardColors])]
        let unknownColors = usedColors.filter(c => !defaultColors.includes(c))

        let swatches = []
        for(let col of this.defaultSwatches) {
          swatches.push([...col])
        }
        let swatchIndex = 0
        for(let color of unknownColors) {
          swatches[swatchIndex++].push(color)
          if(swatchIndex >= swatches.length) {
            swatchIndex = 0
          }
        }

        return swatches
      },
      isDisplayXS(){
        return this.$vuetify.breakpoint.xs
      }
    },
    methods: {
      onChange(){
        this.$emit('input', this.color.toUpperCase())
      }
    }
  }
</script>

<style scoped>

</style>
