<template>
  <header class="navbar navbar-header navbar-header-fixed">
    <a id="mainMenuOpen" href="" class="burger-menu"><i data-feather="menu"></i></a>
    <div class="navbar-brand">
      <router-link to="/" class="logo">Estim<span>8</span></router-link>
    </div>
    <!-- navbar-brand -->
    <div id="navbarMenu" class="navbar-menu-wrapper">
      <div class="navbar-menu-header">
        <router-link to="/" class="logo">Estim<span>8</span></router-link>
        <a id="mainMenuClose" href=""><i data-feather="x"></i></a>
      </div>
      <!-- navbar-menu-header -->
      <ul class="nav navbar-menu">
        <li class="nav-label pd-l-20 pd-lg-l-25 d-lg-none">Main Navigation</li>
        <router-link tag="li" active-class="active" to="/play" class="nav-item">
          <a class="nav-link" href="#"><unicon name="angle-double-right" /> Play</a>
        </router-link>
        <router-link tag="li" active-class="active" to="/join" class="nav-item">
          <a href="#" class="nav-link"><unicon name="angle-double-right" /> Join a game</a>
        </router-link>
        <li class="nav-item">
          <router-link to="/about" class="nav-link"
            ><i data-feather="layers"></i> About</router-link
          >
        </li>
      </ul>
    </div>
    <!-- navbar-menu-wrapper -->
    <div class="navbar-right">
      <div class="dropdown dropdown-profile">
        <a href="" class="dropdown-link" data-toggle="dropdown" data-display="static">
          <div class="avatar avatar-sm">
            <img src="https://via.placeholder.com/200" class="rounded-circle" alt="" />
          </div> </a
        ><!-- dropdown-link -->
        <div class="dropdown-menu dropdown-menu-right tx-13">
          <div class="avatar avatar-lg mg-b-15">
            <img src="https://via.placeholder.com/200" class="rounded-circle" alt="" />
          </div>
          <h6 class="tx-semibold mg-b-5">Katherine Pechon</h6>
          <p class="mg-b-25 tx-12 tx-color-03">Administrator</p>

          <a href="" class="dropdown-item"><i data-feather="edit-3"></i> Edit Profile</a>
          <a href="page-profile-view.html" class="dropdown-item"
            ><i data-feather="user"></i> View Profile</a
          >
          <div class="dropdown-divider"></div>
          <a href="page-help-center.html" class="dropdown-item"
            ><i data-feather="help-circle"></i> Help Center</a
          >
          <a href="" class="dropdown-item"><i data-feather="life-buoy"></i> Forum</a>
          <a href="" class="dropdown-item"><i data-feather="settings"></i>Account Settings</a>
          <a href="" class="dropdown-item"><i data-feather="settings"></i>Privacy Settings</a>
          <a href="page-signin.html" class="dropdown-item"
            ><i data-feather="log-out"></i>Sign Out</a
          >
        </div>
        <!-- dropdown-menu -->
      </div>
      <!-- dropdown -->
    </div>
    <!-- navbar-right -->
  </header>
  <!-- navbar -->
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style></style>
