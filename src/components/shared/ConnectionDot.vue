<template>
  <lottie
    v-if="session.websocketConnected"
    :options="connectedOptions"
    title="Session connected"
    :height="40"
    :width="40"
    @animCreated="handleAnimation"
  />
  <!-- <lottie
    v-else
    :options="disconnectedOptions"
    :height="40"
    :width="40"
    @animCreated="handleAnimation"
  /> -->
</template>

<script>
import Lottie from "vue-lottie";
import * as connected from "@/assets/animations/dot.connected.json";
import * as disconnected from "@/assets/animations/dot.disconnected.json";
import { mapGetters } from "vuex";
export default {
  name: "ConnectionDot",
  components: { Lottie },
  data() {
    return {
      connectedOptions: { animationData: connected.default, autoplay: true, loop: true },
      disconnectedOptions: { animationData: disconnected.default, autoplay: true, loop: true }
    };
  },
  computed: {
    ...mapGetters({ session: "games/activeSession" })
  },
  mounted() {
    console.log({ connected });
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
    }
  }
};
</script>

<style></style>
