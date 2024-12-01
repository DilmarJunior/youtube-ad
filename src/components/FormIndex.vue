<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <card-urls />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <card-search-video />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
  
<script>
import CardUrls from "./cards/CardUrls";
import CardSearchVideo from "./cards/CardSearchVideo.vue";

export default {
  name: "form-index",

  components: {
    CardUrls,
    CardSearchVideo,
  },
};
</script>