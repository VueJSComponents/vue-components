<template>
  <v-app>
    <NavDrawer :drawer="drawer"/>
    <TopToolbar :title="title" @toggleDrawer="drawer = !drawer"/>
    <v-content>
      <ContentWindow :selectedRepo="selectedRepo" @changeRepo="selectedRepo = $event"/>
    </v-content>
  
    <v-footer :fixed="fixed" app  color="grey darken-3" dark class="footer-bar">
      <div class="flex text-lg-center ">
        <span class="footer-text">&copy; 2018 Ken Snyder</span>
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
import { DB } from 'abstracted-client';
import { FireModel, Watch, List, FMEvents } from 'firemodel';
import { VeuxWrapper } from '@/store/VuexWrapper';
import { Package } from '@/models/Package';
import { User } from '@/models/User';
import { wait } from 'common-types';
import { Mutation, namespace } from 'vuex-class';

const Packages = namespace('packages');

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

  @Packages.State public since: number;

  public async created() {
    const config = {
      apiKey: 'AIzaSyCSgGc5m2SdkowLAHk2A2iV0IymNoTWB4Y',
      authDomain: 'vue-components.firebaseapp.com',
      databaseURL: 'https://vue-components.firebaseio.com',
      projectId: 'vue-components',
      storageBucket: 'vue-components.appspot.com',
      messagingSenderId: '342051144863'
    };
    const db = await DB.connect(config);
    FireModel.defaultDb = db;
    FireModel.dispatch = VeuxWrapper(this.$store.dispatch);
    // Packages
    if (this.$store.state.packages.all.length === 0) {
      const packages = await List.all(Package);
      console.log(`got list of all packages [ ${packages.length} ]`);

      // this.$store.commit('packages/UPDATE_SINCE');
      Watch.list(Package)
        .since(this.$store.state.packages.since)
        .start();
    } else {
      console.log(`packages loaded at initialization: `, this.$store.state.packages.all.length);
      await wait(1000); // let other resources load
      Watch.list(Package)
        .since(this.$store.state.packages.since)
        .start();
    }
    // Users
    if (this.$store.state.users.since) {
      console.log(`users loaded at initialization:`, this.$store.state.users.all.length);
      Watch.list(User)
        .since(this.$store.state.users.since)
        .start();
    } else {
      const users = await List.all(User);
      console.log(`loaded all user records [ ${users.length} ]`);
    }
  }
}
</script>
<style scoped>
.footer-bar {
  height: 12px !important;
}
.footer-text {
  font-size: 12px;
  color: #f9f5fd;
  font-weight: 400;
}
</style>

 
<style>
.flexbox {
  display: flex;
}

.space-around {
  justify-content: space-around;
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

.light {
  font-weight: 200;
}

.backtick {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
}
</style>
 