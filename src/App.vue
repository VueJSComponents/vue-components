<template>
  <v-app>
    <NavDrawer :drawer="drawer"/>
    <TopToolbar :title="title" @toggleDrawer="drawer = !drawer"/>
    <v-content>
      <ContentWindow :selectedRepo="selectedRepo" @clearRepo="selectedRepo=''"/>
    </v-content>
  
    <v-footer :fixed="fixed" app  color="grey darken-3" dark>
      <div class="text-lg-center">
        <span class="px-3">&copy; 2018 Ken Snyder</span>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import RepoChoicesWindow from './components/RepoChoicesWindow';
import ContentWindow from './components/ContentWindow';
import NavDrawer from './components/NavDrawer';
import TopToolbar from './components/TopToolbar';

export default {
  name: 'App',
  components: {
    RepoChoicesWindow,
    ContentWindow,
    TopToolbar,
    NavDrawer
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

.flex-end {
  justify-content: flex-end;
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
 