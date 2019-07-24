<template>
  <div>
    <div v-if="activeGame.state === 'AwaitingPlayers'">
      <GameLobby />
    </div>
    <div v-else-if="activeGame.state === 'Playing'">
      Playing
    </div>
    <div v-else-if="activeGame.state === 'Completed'">
      In the lobby
    </div>
  </div>
</template>

<script>
import GameLobby from "./GameLobby.vue";
import { mapGetters } from "vuex";

export default {
  name: "GameTable",
  components: { GameLobby },
  computed: {
    ...mapGetters({ activeGame: "games/activeGame" })
  }
};
</script>

<style></style>
