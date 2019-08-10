<template>
  <div class="d-flex flex-wrap align-content-center justify-content-center">
    <div
      v-for="player in activeGame.players"
      :key="player.playerId"
      class="d-flex flex-column p-3 justify-content-top"
    >
      <avatar
        :src="formatGravatar(player)"
        :username="player.playerName"
        :title="player.playerName"
        class="p-1"
      />
      <span v-if="player.playerId === activeGame.dealerId" class="badge badge-primary p-1">
        dealer
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Avatar from "vue-avatar";
import gravatarUrl from "gravatar-url";
export default {
  name: "GamePlayerList",
  components: { Avatar },
  computed: {
    ...mapGetters({ activeGame: "games/activeGame" })
  },
  methods: {
    formatGravatar(player) {
      if (!player.gravatar) return null;
      return gravatarUrl(player.gravatar, { default: "retro" });
    }
  }
};
</script>

<style></style>
