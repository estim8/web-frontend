<template>
  <div>
    Players:
    <ul>
      <li v-for="player in players" :key="player.playerId">{{ player.playerId }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GamePlayerList",
  computed: {
    players() {
      return this.$store.state.games.currentGame.players;
    }
  }
};
</script>

<style></style>
