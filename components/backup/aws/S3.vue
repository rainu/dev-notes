<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" flat>
      <v-toolbar-title>{{$t('backup.aws.s3.title')}}</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon @click="showHelp = true">
        <v-icon>help</v-icon>
      </v-btn>
    </v-toolbar>

    <v-dialog v-model="showHelp" scrollable>
      <HelpAWSS3>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" @click="showHelp = false">
          {{$t('common.confirmation.close')}}
        </v-btn>
      </HelpAWSS3>
    </v-dialog>

    <v-card-text>
      <v-row v-if="!isEncrypted">
        <v-col cols="12">
          <v-alert type="warning" dense dismissible>{{$t('backup.aws.settings.warn.decrypted')}}</v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="accessKey"
            :label="$t('backup.aws.settings.access-key')"
            @change="onSettingsChange" />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            v-model="secret"
            :label="$t('backup.aws.settings.secret')"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            @click:append="showPassword = !showPassword"
            @change="onSettingsChange" />
        </v-col>
        <v-col cols="12" sm="4">
          <v-autocomplete
            v-model="region"
            :label="$t('backup.aws.settings.region')"
            :items="availableRegions"
            @change="onSettingsChange" />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="bucket"
            :label="$t('backup.aws.s3.settings.bucket')"
            @change="onSettingsChange" />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="filename"
            :label="$t('backup.aws.s3.settings.filename')"
            @change="onSettingsChange" />
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-row align="center">
        <v-col md12 lg6>
          <S3Export :filename.sync="filename" :password="password" />
        </v-col>
        <v-col md12 lg6>
          <S3Import :filename.sync="filename" />
        </v-col>
      </v-row>
    </v-card-actions>

  </v-card>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';
  import S3Export from "./S3Export";
  import S3Import from "./S3Import";
  import HelpAWSS3 from "../../help/aws/S3";

  export default {
    name: "S3",
    components: {HelpAWSS3, S3Import, S3Export},
    props: {
      defaultFilename: {
        required: false,
        default: 'dev_notes_backup.json'
      },
      password: {
        required: false,
      }
    },
    data(){
      return{
        rawAvailableRegions: [
          'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
          'ca-central-1',
          'cn-north-1', 'cn-northwest-1',
          'eu-central-1', 'eu-west-1', 'eu-west-2', 'eu-west-3', 'eu-north-1',
          'ap-east-1', 'ap-northeast-1', 'ap-northeast-2', 'ap-northeast-3', 'ap-southeast-1', 'ap-southeast-2', 'ap-south-1',
          'me-south-1',
          'sa-east-1',
        ],
        showHelp: false,
        showPassword: false,
        accessKey: null,
        secret: null,
        region: null,
        bucket: null,
        filename: this.defaultFilename,
        valid: false
      }
    },
    computed: {
      ...mapGetters({
        s3Settings: 'secrets/getAWSS3Settings',
      }),
      ...mapState({
        isEncrypted: state => state.settings.encrypted
      }),
      availableRegions(){
        return this.rawAvailableRegions.map(region => {
          return {
            text: this.$t('backup.aws.settings.region-values.' + region) + " - " + region,
            value: region
          }
        })
      }
    },
    methods:{
      ...mapActions({
        saveS3Settings: 'secrets/setAWSS3Settings',
      }),
      onSettingsChange() {
        this.saveS3Settings({
          accessKey: this.accessKey,
          secret: this.secret,
          region: this.region,
          bucket: this.bucket,
          filename: this.filename ? this.filename : this.defaultFilename
        })
      }
    },
    mounted(){
      if(this.s3Settings) {
        this.accessKey = this.s3Settings.accessKey
        this.secret = this.s3Settings.secret
        this.region = this.s3Settings.region
        this.bucket = this.s3Settings.bucket
        this.filename = this.s3Settings.filename ? this.s3Settings.filename : this.defaultFilename
      }
    },
  }
</script>

<style scoped>

</style>
