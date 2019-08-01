<template>
  <div class="navbar-right">
    <span v-if="isDealer">
      <b-button v-if="activeGame.state === 'AwaitingPlayers'" @click="startGame">
        Start game
      </b-button>
      <b-button v-if="activeGame.state === 'Playing'" @click="endGame">End game</b-button>
    </span>
    <b-button v-if="activeGame.state === 'Ended'" @click="endSession">{{ endBtnText }}</b-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "GameControls",
  computed: {
    ...mapGetters({ isDealer: "games/isDealer", activeGame: "games/activeGame" }),
    canStartGame() {
      return this.activeGame.state === "AwaitingPlayers";
    },
    endBtnText() {
      return this.isDealer ? "End session" : "Leave game";
    }
  },
  methods: {
    startGame() {
      this.$store.dispatch("games/START_GAME");
    },
    endGame() {
      this.$store.dispatch("games/END_GAME");
    },
    endSession() {
      this.$store
        .dispatch("games/END_SESSION")
        .then(() => {
          this.$router.push({ name: "play" });
        })
        .catch(e => {
          console.log({ e });
          this.$router.push({ name: "error" });
        });
    }
  }
};
</script>

<style></style>
