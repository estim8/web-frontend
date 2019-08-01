<template>
  <div class="row row-xs">
    <div class="col-lg-12">
      <div class="row">
        <b-form>
          <b-button @click="scanQR">Scan QR</b-button>
          <qrcode-stream v-if="showQrScanner" @decode="onDecode"></qrcode-stream>
        </b-form>
      </div>
      <div v-if="!showQrScanner" class="row">
        <b-form>
          <b-form-group>
            <label class="d-block">Game ID</label>
            <b-input v-model="gameIdEntered" />
          </b-form-group>
          <b-form-group>
            <label class="d-block">Secret</label>
            <b-input v-model="secret" />
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
  props: { gameId: String },
  data() {
    return {
      secret: "",
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
        .dispatch("games/JOIN_GAME", { gameId: this.gameIdEntered, secret: this.secret })
        .then(() => {
          this.$router.push({ name: "join-session", params: { gameId: this.gameIdEntered } });
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
