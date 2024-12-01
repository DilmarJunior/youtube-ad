<template>
  <v-btn
    v-if="text"
    :class="classBtn"
    :color="colorBtn"
    @click="emitEvent"
  >
    <v-img 
      :src="require(`../../assets/${icon}.svg`)"
      class="icon-svg m-r-sm"
    />
    {{ text }}
  </v-btn>
  <v-btn
    v-else
    icon=""
    :class="classBtn"
    :color="colorBtn"
    :loading="loadingBtn"
    @click="emitEvent"
  >
    <v-img 
      :src="require(`../../assets/${icon}.svg`)"
      class="icon-svg"
    />
  </v-btn>
</template>

<script>
export default {
  name: "button-actions",

  emits: ["onClickFunction"],

  props: {
    text: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      required: false,
      default: "-",
    },
    classBtn: {
      type: String,
      default: "",
    },
    colorBtn: {
      type: String,
      default: "",
    },
    loadingBtn: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    emitEvent() {
      this.$emit("onClickFunction");
    },
  },
};
</script>

<style scoped>
.icon-svg {
  width: 22px;
  height: 22px;
  color: white;
}

.m-r-sm {
  margin-right: 5px;
}
</style>