<template>
<div class="row row-xs">
  <div class="col-lg-12">
    <div class="row">
      <div class="d-flex align-items-center justify-content-center">
      <b-form>
<b-form-group>
<label class="d-block">Type of cards</label>
      <b-form-select v-model="cardsetId">
<option value="84e1459d-2cca-496b-a44c-a9a4c7bfded5">Default Fibonnaci</option>
      </b-form-select>
</b-form-group>
<b-form-group>
<label class="d-block">Secret</label>
      <b-input v-model="secret" />
</b-form-group>
      <b-button @click="startGame" variant="primary" title="Start game">Start a game</b-button>
      </b-form>
      </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: "StartGame",
  components: {},
  data() {
    return {
      cardsetId: '',
      secret: '',
    }
  },
  computed: {
      activeGameId() { return this.$store.state.currentGame },
  },
  methods: {
    startGame() {
      this.$store.dispatch("START_GAME", { cardsetId: this.cardsetId, secret: this.secret })
        .then(() => { this.$router.push({ name: 'host-session', params: { gameId: this.$store.state.currentGame.session.id } }) })
        .catch(() => this.$router.push({ name: 'error' }))
    },
  },
};
</script>

<style>
</style>
