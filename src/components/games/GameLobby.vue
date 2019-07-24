<template>
  <div>
    <qriously :value="joinLink" :size="200" />
    <div>{{ joinLink }}</div>
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
    ...mapGetters({ activeGameId: "games/activeGameId" }),
    joinLink() {
      return `https://www.estim8.io/#/join/${this.activeGameId}`;
    }
  }
};
</script>

<style></style>
