<template>
<div class="row row-xs">
  <div class="col-lg-12">
    <div class="row">
<b-form>
<b-form-group>
<label class="d-block">Game ID</label>
<b-input v-model="gameIdEntered" />
</b-form-group>
<b-form-group>
<label class="d-block">Secret</label>
<b-input v-model="secret" />
</b-form-group>
<b-button @click="joinGame">Join game</b-button>
</b-form>
</div>
  </div></div>
</template>

<script>
export default {
    name: "JoinGame",
    props: { gameId: String },
    data() {
        return {
            secret: "",
            gameIdEntered: this.gameId,
        }
    },
    computed: {
        isCurrentGame() {
            return this.gameId === this.$store.state.currentGame.session.id;
        },
    },
    methods: {
        joinGame() {
        this.$store.dispatch("START_GAME", { cardsetId: this.cardsetId, secret: this.secret })
            .then(() => { this.$router.push({ name: 'join-session', params: { gameId: this.gameIdEntered } }) })
            .catch(() => this.$router.push({ name: 'error' }))
        },
    },
}
</script>

<style>

</style>
