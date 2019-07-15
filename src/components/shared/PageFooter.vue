<template>
    <footer class="footer">
      <div>
        <span>&copy; 2019 Estim8.io</span>
      </div>
      <div>
        <nav class="nav">
          <router-link to="/licenses" class="nav-link">Licenses</router-link>
          <a href="https://www.github.com/estim8" class="nav-link">GitHub</a>
          <router-link to="/donate" class="nav-link">Donate</router-link>
        </nav>
      </div>
    </footer>
</template>

<script>
export default {
name: "PageFooter",
}
</script>

<style>

</style>
