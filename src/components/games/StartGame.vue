<template>
  <div class="row row-xs">
    <div class="col-lg-12">
      <div class="row">
        <div class="d-flex align-items-center justify-content-center">
          <b-form>
            <b-form-group>
              <label class="d-block">Type of cards</label>
              <b-form-select v-model="cardsetId">
                <option selected="true" value="84e1459d-2cca-496b-a44c-a9a4c7bfded5"
                  >Default Fibonnaci
                </option>
              </b-form-select>
            </b-form-group>
            <b-form-group>
              <label class="d-block">Game password</label>
              <b-input v-model="secret" />
            </b-form-group>
            <b-form-group>
              <label class="d-block">Player name</label>
              <b-input v-model="playerName" />
            </b-form-group>
            <b-form-group>
              <label class="d-block">Gravatar e-mail</label>
              <b-input v-model="gravatar" />
            </b-form-group>
            <b-button variant="primary" title="Start game" @click="startGame"
              >Start a game</b-button
            >
            Id: {{ activeGameId }}
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "StartGame",
  components: {},
  data() {
    return {
      cardsetId: "84e1459d-2cca-496b-a44c-a9a4c7bfded5",
      // eslint-disable-next-line no-bitwise
      secret: [...Array(10)].map(i => (~~(Math.random() * 36)).toString(36)).join(""),
      playerName: "",
      gravatar: undefined
    };
  },
  computed: {
    ...mapGetters({ activeGameId: "games/activeGameId" })
  },
  watch: {
    activeGameId(id) {
      this.$router.push({
        name: "host-session",
        params: { gameId: id }
      });
    }
  },
  methods: {
    startGame() {
      this.$store
        .dispatch("games/CREATE_GAME", {
          cardsetId: this.cardsetId,
          secret: this.secret,
          playerName: this.playerName,
          gravatar: this.gravatar
        })
        // eslint-disable-next-line prettier/prettier
        .catch((e) => {
          console.log({ e });
          this.$router.push({ name: "error" });
        });
    }
  }
};
</script>

<style></style>
