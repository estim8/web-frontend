<template>
<div class="row row-xs">
  <div class="col-lg-9">
    <PokerImage style="height:50%" />
  </div>
  <div class="bg-gray-1 col-lg-3">
    <div class="row"><input type="text" class="form-control" /></div>
    </div>
</div></template>

<script>
import PokerImage from './PokerImage.vue';

export default {
  name: "StartGame",
  components: { PokerImage },
};
</script>

<style>
</style>
