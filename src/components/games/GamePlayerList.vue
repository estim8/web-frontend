<template>
  <div>
    Players:
    <ul>
      <li v-for="player in activeGame.players" :key="player.playerId">
        <avatar
          :src="formatGravatar(player)"
          :username="player.playerName"
          :title="player.playerName"
        />
        <span v-if="player.playerId === activeGame.dealerId" class="badge badge-primary">
          dealer
        </span>
      </li>
    </ul>
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
