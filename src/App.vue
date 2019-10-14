<template>
  <div class="page-container">
    
    <md-app>
      
      <!-- <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menu_visible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">A simple Reddit client made with Vue.js and GraphQL</span>
      </md-app-toolbar> -->

      <md-app-drawer :md-active.sync="menu_visible" md-persistent="full">
        
        <md-toolbar class="sidebar-toolbar" md-elevation="0">
          <span class="sidebar-title">Top {{limit}} Reddit Articles</span>

          <!-- <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div> -->
        </md-toolbar>
        
        <!-- <md-menu class="sidebar-options" md-size="small">
          
          <md-button md-menu-trigger>{{limit}}</md-button>
          <md-menu-content>
            <md-menu-item @click="updateLimit(1)">1</md-menu-item>
            <md-menu-item @click="updateLimit(5)">5</md-menu-item>
            <md-menu-item @click="updateLimit(10)">10</md-menu-item>
            <md-menu-item @click="updateLimit(25)">20</md-menu-item>
            <md-menu-item @click="updateLimit(50)">50</md-menu-item>
          </md-menu-content>
        </md-menu> -->

        <sidebar class="sidebar-component" />
      </md-app-drawer>

      <md-app-content>
        
        <article-page v-if="current_article && current_article.preview" :article="current_article" />
        <section v-else class="select-article">
          <h2>Please, select an article...</h2>
        </section>
        
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import Sidebar from './components/Sidebar.vue'
  import ArticlePage from './components/ArticlePage.vue'
  
  export default {
    name: 'App',
    components: {
      Sidebar,
      ArticlePage,
    },
    computed: mapState({
      limit: state => state.limit,
      menu_visible: state => state.menu_visible,
      current_article: state => state.current_article,
    }),
    methods: {
      ...mapActions([
        'toggleMenu',
        'updateLimit',
        'updateAfter',
      ]),
    },
  }
</script>

<style lang="scss" scoped>
  @import './styles/variables';
  @import "~vue-material/dist/theme/engine"; // Import the theme engine
  @include md-register-theme("default", (
    primary: $dark-gray,
    accent: $pink
  ));
  @import "~vue-material/dist/theme/all"; // Apply the theme
  @import "~vue-material/dist/components/MdButton/theme";

  .md-app {
    min-height: 100vh;
    color: $black;
    font-smooth: auto;
  }

  .md-drawer {
    background-color: $pink;
    width: 230px;
    max-width: calc(100vw - 125px);
  }
  .sidebar-options {
    position: relative;
    z-index: 2;
  }
  .sidebar-component {
    position: relative;
    z-index: 1;    
  }
  .sidebar-toolbar {
    background-color: $pink;
  }
  .sidebar-title {
    color: $pink;
    font-size: $font-lg;
    font-weight: $font-bold;
    user-select: none;
  }
  .select-article {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
      font-size: 36px;
      color: $pink;
    }
  }
</style>
