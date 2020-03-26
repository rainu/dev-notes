<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pt-0">
        <div ref="waveform"></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" class="pb-0">
        <v-select v-model="deviceId"
                  :label="$t('note.record.device')"
                  :items="devices"
                  item-value="deviceId"
                  item-text="label"
                  :disabled="recorder.recording"
                  @change="onDeviceChange"
        >
        </v-select>
      </v-col>
      <v-col cols="4" class="pb-0">
        <div v-show="!deviceId" class="pt-4">
          <v-icon color="error" x-large>mic_off</v-icon>
        </div>
        <div v-show="deviceId && !recorder.recording" class="pt-4">
          <v-btn @click="onStart">
            <v-icon x-large color="error">fiber_manual_record</v-icon>
          </v-btn>
        </div>
        <div v-show="recorder.recording" class="pt-4">
          <v-btn @click="onPause" v-show="!recorder.paused">
            <v-icon x-large>pause</v-icon>
          </v-btn>
          <v-btn @click="onResume" v-show="recorder.paused">
            <v-icon x-large>play_arrow</v-icon>
          </v-btn>
          <v-btn @click="onStop">
            <v-icon x-large color="error">stop</v-icon>
          </v-btn>

          <span class="text-center">{{formattedTime}}</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import WaveSurfer from 'wavesurfer.js'
  import Microphone from 'wavesurfer.js/dist/plugin/wavesurfer.microphone'
  import RecordRTC from "recordrtc";

  export default {
    name: "Recorder",
    data() {
      return {
        recorder: {
          recorder: null,
          recording: null,
          paused: null,
          timeTicker: null,
          time: 0,
        },
        deviceId: null,
        devices: [],
        wavesurfer: null,
      }
    },
    computed: {
      formattedTime(){
        let date = new Date(0)
        date.setSeconds(this.recorder.time)
        return date.toISOString().substr(11, 8)
      }
    },
    methods: {
      onStart(){
        let curTheme = this.$vuetify.theme.isDark ? this.$vuetify.theme.themes.dark : this.$vuetify.theme.themes.light

        this.wavesurfer = WaveSurfer.create({
          container: this.$refs.waveform,
          waveColor: curTheme.primary,
          progressColor: curTheme.secondary,
          interact: false,
          responsive: true,
          cursorWidth: 0,
          constraint: {audio: {deviceId: this.deviceId}},
          plugins: [
            Microphone.create()
          ]
        });
        this.wavesurfer.microphone.on('deviceReady', stream => {
          this.recorder.recorder = RecordRTC(stream, {
            type: 'audio',
          })
          this.recorder.recorder.startRecording()
          this.recorder.recording = true
        });
        this.wavesurfer.microphone.on('deviceError', code => {
          console.warn('Device error: ' + code);
        });
        this.recorder.time = 0
        this.wavesurfer.microphone.start()
        this.startTimeTicker()
      },
      onResume(){
        this.wavesurfer.microphone.play()
        this.recorder.recorder.resumeRecording()
        this.startTimeTicker()
        this.recorder.paused = false
      },
      onPause(){
        this.wavesurfer.microphone.pause()
        this.recorder.recorder.pauseRecording()
        this.stopTimeTicker()
        this.recorder.paused = true
      },
      onStop(){
        this.wavesurfer.destroy()
        this.wavesurfer = null

        this.recorder.recorder.stopRecording(() => {
          this.recorder.recorder.getDataURL(url => {
            this.recorder.recorder = null
            this.recorder.recording = false
            this.recorder.paused = false

            this.$emit('input', url)
          })
        })
        this.stopTimeTicker()
      },
      onDevices(devices) {
        this.devices = devices;

        //if no device is selected, select the first one
        if(!this.deviceId && this.devices) {
          this.onDeviceChange(devices[0].deviceId)
        }
      },
      onDeviceChange(deviceId) {
        this.deviceId = deviceId
      },
      startTimeTicker(){
        this.recorder.timeTicker = setInterval(() => {
          this.recorder.time += 0.25
        }, 250)
      },
      stopTimeTicker(){
        clearInterval(this.recorder.timeTicker)
      }
    },
    mounted() {
      navigator.mediaDevices.enumerateDevices()
        .then(allDevices => {
          let audioInputDevices = allDevices.filter(d => d.kind === 'audioinput')
          this.onDevices(audioInputDevices)
        })
    },
    beforeDestroy() {
      if(this.wavesurfer) this.wavesurfer.destroy()
    }
  }
</script>

<style scoped>

</style>
