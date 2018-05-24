<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      elevation="0"
      app
    >
      <v-toolbar flat class="transparent hidden-sm-and-down">
        <v-list class="pa-0">
          <v-list-tile avatar >
            <v-list-tile-avatar>
              <v-icon large>info</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>About</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <div class="pa-3 hidden-sm-and-down">
        <p>
          The goal is to provide a resource to <b>component consumers</b> that is always up-to-date with good metadata to aid in a quick discovery and qualification process.
        </p>
        <p>
          In addition, we want a platform that provides <b>component authors</b> a very low friction way of giving visibility to your open-source components.
        </p>
      </div>

      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon large>search</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Searching</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <div class="pa-3">
        <p>
          Searching filters on the component <b>name</b> and it's <b>description</b> fields; giving higher weight to the name. This is an OK way to search but a lot of times it will be worth narrowing down the result with a tag first and either scrolling through that area or applying the text filter.
        </p>
      </div>

      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon large>style</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Tags</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <div class="pa-3">
        <p>
          Tags give you a multi tiered hierarchy to search on. You'll understand the hierarchy by doing a little searching through the dropdown but it allows you to zoom in and zoom out quickly.
        </p>
      </div>

      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon large>filter_list</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Other Filters</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <div class="pa-3">
        <p>
          You can also narrow your results based on the following criteria:
          <ul class="ml-4 mt-3">
            <li>
              <b>stars</b><br>
              <i class="caption">the number of github stars the repo has</i>
            </li>
            <li>
              <b>rating</b><br>
              <i class="caption">the summary rating which NPM gives to repos</i>
            </li>
          </ul>
        </p>
      </div>      

    </v-navigation-drawer>
    <v-toolbar
      app
      flat
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Docs</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-layout row wrap fill-height>
        <v-flex xs12 sm12 md5 lg4 xl2 right-border fill-height>
          <v-layout column py-0 px-0 fill-height>
            <SearchResultTabs @repoSelected="selectedRepo=$event" :selectedRepo="selectedRepo"/>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md7 lg8 xl10 my-3 px-3 >
         {{ selectedRepo }}
        </v-flex>
      </v-layout> 
    </v-content>
  
    <v-footer :fixed="fixed" app  >
      <div class="text-lg-center">
        <span class="px-3">&copy; 2018 Ken Snyder</span>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import SearchResultTabs from './components/SearchResultTabs';

export default {
  name: 'App',
  components: {
    SearchResultTabs
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'bubble_chart',
          title: 'Inspire'
        }
      ],
      miniVariant: false,
      title: 'VueJS Components',
      selectedRepo: ''
    };
  }
};
</script>
 
 <style scoped>
.right-border {
  border-right: 2px solid black;
  height: 100%;
}
</style>
 