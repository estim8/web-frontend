<template>
  <div>
    <div v-if="gameState === 'AwaitingPlayers'">
      <GameLobby />
    </div>
    <div v-else-if="gameState === 'Playing'">
      Playing
    </div>
    <div v-else-if="gameState === 'Completed'">
      In the lobby
    </div>
  </div>
</template>

<script>
import GameLobby from "./GameLobby.vue";

export default {
  name: "GameSession",
  components: { GameLobby },
  computed: {
    gameState() {
      return this.$store.state.games.currentGame.session.gameState;
    }
  }
};
</script>

<style></style>
