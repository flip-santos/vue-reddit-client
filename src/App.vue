<template>
  <div id="app">
    <!-- <h1>A simple Reddit client made with Vue.js</h1> -->
    <div class="sidebar-wrapper">
      <sidebar />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'app',
  components: {
    Sidebar
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap');
  @import '@/assets/reset.scss';
  @import '@/assets/variables.scss';

  #app {
    position: relative;
    font-family: $default-font;
    font-size: $font-size-sm;
    color: $black;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .sidebar-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 350px;
    // outline: solid 1px $red;
  }
</style>
