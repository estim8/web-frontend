<template>
  <div>An error has occured: {{ error.code }} {{ error.message }}</div>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.state.app.error;
    }
  }
};
</script>

<style></style>
