<template>
  <div>
    <div class="row">
      <qriously :value="joinLink" :size="200" />
      <div>{{ joinLink }}</div>
      <div>&nbsp;</div>
      <div>{{ activeGame.secret }}</div>
    </div>
    <div class="row">
      <game-player-list />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GamePlayerList from "./GamePlayerList.vue";

export default {
  name: "GameLobby",
  components: { GamePlayerList },
  computed: {
    ...mapGetters({ activeGameId: "games/activeGameId", activeGame: "games/activeGame" }),
    joinLink() {
      return `https://www.estim8.io/#/join/${this.activeGameId}`;
    }
  }
};
</script>

<style></style>
