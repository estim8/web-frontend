<template>
  <div class="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30">
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-style1 mg-b-10">
          <li class="breadcrumb-item">
            <a href="#">Play</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Start a new game</li>
        </ol>
      </nav>
      <h4 class="mg-b-0 tx-spacing--1">{{ $route.meta.title }}</h4>
    </div>
    <div v-if="isDealer" class="d-none d-md-block">
      <button class="btn btn-sm pd-x-15 btn-white btn-uppercase">
        <i data-feather="mail" class="wd-10 mg-r-5"></i> Start game
      </button>
    </div>
    <div class="d-none d-md-block">
      <ConnectionDot />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ConnectionDot from "@/components/shared/ConnectionDot.vue";
export default {
  name: "PageHeader",
  components: { ConnectionDot },
  computed: {
    ...mapGetters({ isDealer: "games/isDealer" })
  }
};
</script>

<style></style>
