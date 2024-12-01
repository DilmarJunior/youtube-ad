<template>
  <v-container>
    <title-form />
    <form-index />
  </v-container>
</template>
  
<script>
import TitleForm from "./components/TitleForm";
import FormIndex from "./components/FormIndex";

export default {
  name: "index-youtube-ad",

  components: {
    TitleForm,
    FormIndex,
  },
};
</script>
  
<style>
.d-flex {
  display: flex;
}

.justify-content-end {
  justify-content: flex-end;
}
</style>
  