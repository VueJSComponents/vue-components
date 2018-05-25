<template>
  <v-app>
    <NavDrawer :drawer="drawer"/>
    <TopToolbar :title="title" @toggleDrawer="drawer = !drawer"/>
    <v-content>
      <ContentWindow :selectedRepo="selectedRepo" @changeRepo="selectedRepo = $event"/>
    </v-content>
  
    <v-footer :fixed="fixed" app  color="grey darken-3" dark>
      <div class="text-lg-center">
        <span class="px-3">&copy; 2018 Ken Snyder</span>
      </div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import RepoChoicesWindow from './components/RepoChoicesWindow.vue';
import ContentWindow from './components/ContentWindow.vue';
import NavDrawer from './components/NavDrawer.vue';
import TopToolbar from './components/TopToolbar.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'App',
  components: {
    RepoChoicesWindow,
    ContentWindow,
    TopToolbar,
    NavDrawer
  }
})
export default class App extends Vue {
  public drawer: boolean = false;
  public fixed: boolean = false;
  public title: string = 'VueJS Components';
  public selectedRepo: string = '';
}
</script>
 
<style>
.flexbox {
  display: flex;
}

.flexbox > span,
.flexbox > div {
  display: flex;
}

.flexbox.row.v-center,
.flexbox.v-center {
  align-items: center;
}

.flexbox.row.center,
.flexbox.center {
  justify-content: center;
}

.flexbox.row.space-around,
.flexbox.space-around {
  justify-content: space-around;
}

.flexbox.column > span,
.flexbox.column > div {
  flex-direction: row;
}
.flexbox.row > span,
.flexbox.row > div {
  flex-direction: column;
}

.flex-end,
.row.flex-end {
  justify-content: flex-end;
}
.column.flex-end {
  align-items: flex-end;
}

.flex.row {
  flex-direction: row;
}

.flex.column,
.flexbox.column {
  flex-direction: column;
}

.horizontal-cards > .card {
  margin: 0 5px;
}

.informal-font {
  font-family: fantasy;
}
</style>
 