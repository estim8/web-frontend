<template>
  <div class="row">
    <div class="col">
      <div v-if="!this.gameId">
        <b-form>
          <b-button @click="scanQR">Scan QR</b-button>
          <qrcode-stream v-if="showQrScanner" @decode="onDecode"></qrcode-stream>
        </b-form>
      </div>
      <div v-if="!showQrScanner">
        <b-form>
          <b-form-group>
            <label class="d-block">Game ID</label>
            <b-input v-model="gameIdEntered" />
          </b-form-group>
          <b-form-group>
            <label class="d-block">Secret</label>
            <b-input v-model="secretEntered" />
          </b-form-group>
          <b-form-group>
            <label class="d-block">Player name</label>
            <b-input v-model="playerName" />
          </b-form-group>
          <b-form-group>
            <label class="d-block">Gravatar</label>
            <b-input v-model="gravatar" />
          </b-form-group>
          <b-button variant="primary" @click="joinGame">Join game</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";

export default {
  name: "JoinGame",
  components: { QrcodeStream },
  props: { gameId: { type: String, default: "" }, secret: { type: String, default: "" } },
  data() {
    return {
      secretEntered: this.secret,
      playerName: "",
      gravatar: undefined,
      gameIdEntered: this.gameId,
      showQrScanner: false,
      scannedCode: "",
      error: ""
    };
  },
  computed: {
    isCurrentGame() {
      return this.gameId === this.$store.getters["games/activeGameId"];
    }
  },
  methods: {
    joinGame() {
      this.$store
        .dispatch("games/JOIN_GAME", {
          gameId: this.gameIdEntered,
          secret: this.secret,
          playerName: this.playerName,
          gravatar: this.gravatar
        })
        .then(() => {
          this.$router.push({ name: "host-session", params: { gameId: this.gameIdEntered } });
        })
        .catch(() => this.$router.push({ name: "error" }));
    },
    scanQR() {
      this.showQrScanner = !this.showQrScanner;
    },
    onDecode(result) {
      this.scannedCode = result;
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    }
  }
};
</script>

<style></style>
