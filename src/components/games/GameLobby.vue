<template>
  <div>
    <qriously :value="activeGameId" :size="200" />
    <div>{{ activeGameId }}</div>
    <game-player-list />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GamePlayerList from "./GamePlayerList.vue";

export default {
  name: "GameLobby",
  components: { GamePlayerList },
  computed: {
    ...mapGetters({ activeGameId: "games/activeGameId" })
  }
};
</script>

<style></style>
