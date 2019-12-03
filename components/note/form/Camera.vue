<template>
  <v-form v-model="valid" @submit.prevent="onSubmit()" :id="formId" ref="form">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-img v-if="note.image" :src="note.image" />
          <div v-show="!note.image && state" @click="onCapture" class="justify-center video-view">
            <vue-web-cam ref="webcam"
                         :device-id="deviceId"
                         height="100%"
                         @started="onStarted"
                         @stopped="onStopped"
                         @error="onError"
                         @cameras="onCameras"
                         @camera-change="onCameraChange" />
          </div>
          <v-row v-if="!state" align="center" justify="center" class="py-12">
            <v-icon color="error" x-large>visibility_off</v-icon>
          </v-row>
        </v-col>
      </v-row>

      <!-- image preview -->
      <v-row v-if="note.image">
        <v-col cols="12">
          <v-btn block @click="onImageDelete" color="error">
            <v-icon >delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="6">
          <!-- device-chooser -->
          <v-select v-model="deviceId"
                    :label="$t('note.camera.device')"
                    :items="devices"
                    item-value="deviceId"
                    item-text="label"
                    @change="onCameraChange"
                    ></v-select>
        </v-col>
        <v-col cols="6">
          <!-- device power button -->
          <v-btn block v-if="state" @click="onStop">
            <v-icon >videocam</v-icon>
          </v-btn>
          <v-btn block v-else @click="onStart" color="error">
            <v-icon >videocam_off</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field v-model="note.title" :label="$t('note.title')" :rules="ruleRequired" required></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-textarea v-model="note.description" :label="$t('note.camera.description')" ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <TagPicker v-model="note.tags" :tags="availableTags"></TagPicker>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { WebCam } from "vue-web-cam";
  import TagPicker from "./TagPicker";

  export default {
    name: "NoteFormCamera",
    components: {
      TagPicker,
      "vue-web-cam": WebCam
    },
    props: {
      formId: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: false,
      },
      data: {
        type: Object,
        required: false,
      },
      clearAfterSubmit: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data() {
      let note = {
        title: "",
        tags: [],
        image: null,
        description: ""
      }

      if(this.data) {
        note.title = this.data.title
        note.tags = this.data.tags
        note.description = this.data.content.description
        note.image = this.data.content.image
      }

      return {
        dialog: false,
        valid: false,
        note: note,
        camera: null,
        deviceId: null,
        state: false,
        devices: []
      }
    },
    computed: {
      ...mapGetters({
        noteTags: 'note/getAvailableTags',
        boardTags: 'board/getAvailableTags'
      }),
      device: function() {
        return this.devices.find(n => n.deviceId === this.deviceId);
      },
      availableTags() {
        let tags = {}
        for(let tag of this.noteTags) tags[tag] = true
        for(let tag of this.boardTags) tags[tag] = true

        return Object.keys(tags).sort()
      },
      ruleRequired(){
        return [
          v => !!v || this.$t('common.form.validation.required')
        ]
      }
    },
    methods: {
      onCapture() {
        this.note.image = this.$refs.webcam.capture();
      },
      onStarted(stream) {
        this.state = true;
      },
      onStopped(stream) {
        this.state = false;
      },
      onStop() {
        this.$refs.webcam.stop();
      },
      onStart() {
        this.$refs.webcam.start();
      },
      onError(error) {
        console.log("On Error Event", error);
      },
      onCameras(cameras) {
        this.devices = cameras;
      },
      onCameraChange(deviceId) {
        this.deviceId = deviceId;
        this.camera = deviceId;
      },
      onImageDelete() {
        this.note.image = null
      },
      onSubmit() {
        if(!this.valid) return

        let data = {
          content: {}
        }
        data.title = this.note.title
        data.tags = this.note.tags
        data.content.description = this.note.description
        data.content.image = this.note.image

        this.$emit('onSubmit', data)
        if(this.clearAfterSubmit) {
          this.$refs.form.reset()
          this.note.tags = []
          this.note.image = ""
        }
      }
    },
    watch: {
      camera: function(id) {
        this.deviceId = id;
      },
      devices: function() {
        // Once we have a list select the first one
        const [first, ...tail] = this.devices;
        if (first) {
          this.camera = first.deviceId;
          this.deviceId = first.deviceId;
          this.state = true;
        }
      },
      data(newData) {
        this.note.title = newData.title
        this.note.tags = newData.tags
        this.note.description = newData.content.description
        this.note.image = newData.content.image
      }
    },
  }
</script>

<style scoped>
  .video-view {
    cursor: pointer;
  }
</style>
