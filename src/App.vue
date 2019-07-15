<template>
  <div id="app">
    <NavBar />
    <div class="content content-fixed">
      <div class="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
        <PageHeader />
        <router-view/>
      </div>
    </div>
    <PageFooter />
  </div>
</template>
<script>
import { NavBar, PageHeader, PageFooter } from '@/components/shared';

export default {
  components: { NavBar, PageHeader, PageFooter },
};
</script>

<style lang="scss">
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
