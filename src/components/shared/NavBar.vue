<template>
  <header class="navbar navbar-header navbar-header-fixed">
    <a id="mainMenuOpen" href="" class="burger-menu"><i data-feather="menu"></i></a>
    <div class="navbar-brand">
      <router-link to="/" class="logo"><LogoImage height="20"/></router-link>
    </div>
    <!-- navbar-brand -->
    <div id="navbarMenu" class="navbar-menu-wrapper">
      <div class="navbar-menu-header">
        <router-link to="/" class="logo"><LogoImage height="20"/></router-link>
        <a id="mainMenuClose" href=""><i data-feather="x"></i></a>
      </div>
      <!-- navbar-menu-header -->
      <ul class="nav navbar-menu">
        <li class="nav-label pd-l-20 pd-lg-l-25 d-lg-none">Main Navigation</li>
        <router-link v-if="!inSession" tag="li" active-class="active" to="/play" class="nav-item">
          <a class="nav-link" href="#"><unicon name="caret-right" /> Play</a>
        </router-link>
        <router-link v-if="!inSession" tag="li" active-class="active" to="/join" class="nav-item">
          <a href="#" class="nav-link"><unicon name="user-plus" /> Join a game</a>
        </router-link>
        <router-link v-if="!inSession" tag="li" active-class="active" to="/about" class="nav-item">
          <a href="#" class="nav-link"> About</a>
        </router-link>
      </ul>
    </div>
    <!-- navbar-menu-wrapper -->
    <GameControls v-if="inSession" />
    <!-- navbar-right -->
  </header>
  <!-- navbar -->
</template>

<script>
import LogoImage from "@/components/shared/LogoImage.vue";
import GameControls from "@/components/shared/GameControls.vue";
import { mapGetters } from "vuex";
export default {
  name: "NavBar",
  components: { LogoImage, GameControls },
  computed: {
    ...mapGetters({ activeGameId: "games/activeGameId" }),
    inSession() {
      return this.activeGameId !== "";
    }
  }
};
</script>

<style></style>
