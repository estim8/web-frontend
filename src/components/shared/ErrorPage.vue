<template>
  <div>An error has occured: {{ error.message }}</div>
</template>

<script>
import store from "vuex";

export default {
  computed: {
    error() {
      return store.state.error;
    }
  }
};
</script>

<style></style>
