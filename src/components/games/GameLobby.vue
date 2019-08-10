<template>
  <div>
    <div v-if="isDealer" class="row">
      <div class="col">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <qriously :value="joinLink" :size="200" />
          <div>
            <a :href="joinLink" target="top">{{ joinLink }}</a>
          </div>
          <div>&nbsp;</div>
          <div>{{ activeGame.secret }}</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <game-player-list />
      </div>
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
    ...mapGetters({
      activeGameId: "games/activeGameId",
      activeGame: "games/activeGame",
      isDealer: "games/isDealer"
    }),
    joinLink() {
      return `https://www.estim8.io/#/join/${this.activeGameId}?secret=${this.activeGame.secret}`;
    }
  }
};
</script>

<style></style>
