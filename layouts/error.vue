<template>
  <v-app>
    <template v-if="isRecallInProgress">
      <v-container fill-height>
        <v-row align="center"
               justify="center">
          <v-progress-circular
            :size="250"
            :width="10"
            color="primary"
            indeterminate
            class="text-center"
          >
            {{$t('recall.progress')}}
          </v-progress-circular>
        </v-row>
      </v-container>
    </template>
    <template v-else>
      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
      <NuxtLink to="/">
        Home page
      </NuxtLink>
    </template>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  computed: {
    isRecallInProgress(){
      return window.location.search && window.location.search.includes("recall")
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
