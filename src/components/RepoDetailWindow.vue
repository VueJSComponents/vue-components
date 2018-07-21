<template>
  <v-flex fill-height class="repo-detail-window">
      <div class="selected-repo " v-if="selectedRepo">
        <v-tabs
          :value="active"
          @input="changeTab"
          color="blue"
          dark
          fixed-tabs
          slider-color="blue darken-4"
        >
          <v-spacer></v-spacer>
          <router-link
            tag="v-tab" 
            :to="{ name: 'package' + item }"
            :id="'tab-' + item" 
            :active="item === active"
            :key="item" ripple 
            v-for="(item) in tabs"
            active-class="active"
          >
            {{item.toUpperCase()}}
          </router-link>

          <v-spacer></v-spacer>
        </v-tabs>
        <div class="flexbox row center">
          <transition mode="out-in"
            enter-active-class="animated slideInLeft"
            leave-active-class="animated slideOutRight"
          >
          <!-- <slide-left> -->
            <router-view :selected="selected"></router-view>
          <!-- </slide-left> -->
          </transition>

        </div>

      </div>
      <div v-else>
        <v-tabs
            v-model="active"
            color="blue"
            dark
            fixed-tabs
            slider-color="blue darken-4"
          >
        </v-tabs>
        <v-layout class="not-selected px-1 py-1 " fill-height>
          <router-view></router-view>
        </v-layout>
      </div>
    </v-flex>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import ViewPackageMeta from './ViewPackageMeta.vue';
import PackageReadme from './PackageReadme.vue';
import PackageDocs from './PackageDocs.vue';
import PackagePlayground from './PackagePlayground.vue';
import { Package } from '@/models/Package';
import { Route } from 'vue-router';
import SlideLeft from '../Transitions/SlideLeft.vue';
const Packages = namespace('packages');
const Transient = namespace('transient');

@Component({
  components: {
    ViewPackageMeta,
    PackageReadme,
    PackageDocs,
    PackagePlayground,
    SlideLeft
  }
})
export default class RepoDetailWindow extends Vue {
  @Prop() public selectedRepo!: string;
  @Packages.Getter('selectedPackage') public selectedPackage: Package;
  private tabs = ['Meta', 'Readme', 'Docs', 'Playground'];

  public get active(): number {
    return this.tabs.findIndex(i => i === this.$route.name.replace('package', ''));
  }

  public changeTab(index: number) {
    this.$router.push({ name: `package${this.tabs[index]}` });
  }

  public get selected(): Package {
    const defaults: Partial<Package> = {
      author: {
        id: '',
        name: '',
        email: '',
        avatar_url: '',
        user_url: '',
        company: '',
        blog: '',
        bio: '',
        location: '',
        isVueUser: '',
        favorites: []
      },
      score: {
        detail: { popularity: 0, quality: 0, maintenance: 0 },
        final: 0
      }
    };
    const pkg: Partial<Package> = { ...defaults, ...(this.selectedPackage || {}) };

    return pkg as Package;
  }
}
</script>

<style scoped>
.repo-name {
  color: #ffffff;
  vertical-align: middle;
}

.repo-name i.icon {
  cursor: pointer;
  border-radius: 50%;
}

.repo-name i.icon:hover {
  background-color: red;
  border-radius: 50%;
  color: #ef9a9a;
}
</style>
