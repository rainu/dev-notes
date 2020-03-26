<template>
  <div>
    <div ref="waveform" class="wave pb-1"></div>
    <v-btn block @click="onPlay" v-show="!audio.playing" small>
      <v-icon class="pr-5" small>play_circle_outline</v-icon>
      <span>{{formattedCurrentTime}}</span> / <span>{{formattedDuration}}</span>
    </v-btn>
    <v-btn block @click="onPause" v-show="audio.playing" small>
      <v-icon class="pr-5" small>pause_circle_outline</v-icon>
      <span>{{formattedCurrentTime}}</span> / <span>{{formattedDuration}}</span>
    </v-btn>
  </div>
</template>

<script>
  import WaveSurfer from 'wavesurfer.js'

  export default {
    name: "Audio",
    props: {
      value: {
        type: String,
        required: true,
      }
    },
    data(){
      return {
        audio: {
          playing: null,
          currentTime: null,
          duration: null,
        },
        wavesurfer: null
      }
    },
    methods: {
      onPlay(){
        this.wavesurfer.play()
      },
      onPause(){
        this.wavesurfer.pause()
      },
      format(duration){
        let date = new Date(0)
        date.setSeconds(duration)
        return date.toISOString().substr(11, 8)
      }
    },
    computed: {
      formattedCurrentTime(){
        return this.format(this.audio.currentTime)
      },
      formattedDuration(){
        return this.format(this.audio.duration)
      },
    },
    mounted() {
      let curTheme = this.$vuetify.theme.isDark ? this.$vuetify.theme.themes.dark : this.$vuetify.theme.themes.light

      this.wavesurfer = WaveSurfer.create({
        container: this.$refs.waveform,
        waveColor: curTheme.primary,
        progressColor: curTheme.secondary,
        cursorColor: curTheme.accent,
        height: 100,
        cursorWidth: 3,
        responsive: true
      })
      this.wavesurfer.on('ready', () => {
        this.audio.duration = this.wavesurfer.getDuration()
      })
      this.wavesurfer.on('play', () => {
        this.audio.playing = true
      })
      this.wavesurfer.on('pause', () => {
        this.audio.playing = false
      })
      this.wavesurfer.on('audioprocess', () => {
        this.audio.currentTime = this.wavesurfer.getCurrentTime()
      })
      this.wavesurfer.on('seek', () => {
        this.audio.currentTime = this.wavesurfer.getCurrentTime()
      })
      this.wavesurfer.load(this.value)
    },
    beforeDestroy() {
      this.wavesurfer.destroy()
    }
  }
</script>

<style scoped>
  .wave {
    cursor: text;
  }
</style>
