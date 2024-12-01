<template>
  <v-container>
    <v-row class="text-center">
      <h1>{{ title }}</h1>
    </v-row>
  </v-container>
</template>
  
<script>
import { title } from "../../package.json";
export default {
  name: "title-form",

  computed: {
    title() {
      return title;
    },
  },
};
</script>
  