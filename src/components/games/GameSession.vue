<template>
  <div>
    <div v-if="gameState === 'awaitingPlayers'">
      In the lobby
    </div>
    <div v-else-if="gameState === 'playing'">
      Playing
    </div>
    <div v-else-if="gameState === 'completed'">
      In the lobby
    </div>
  </div>
</template>

<script>
export default {
  name: "GameSession",
  computed: {
    gameState() {
      return this.$store.state.currentGame.session.gameState;
    }
  }
};
</script>

<style></style>
