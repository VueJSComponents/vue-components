<template>
  <v-flex xs12 sm12 md7 lg10 xl10 my-0 px-0 fill-height class="repo-detail-window">
      <div class="selected-repo" v-if="selectedRepo">
        <v-tabs
          :value="tab"
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
            :key="item" ripple 
            v-for="item in tabs"
          >
            {{item.toUpperCase()}}
          </router-link>

          <v-tab-item v-for="item in tabs" :id="'tab-item-' + item" :key="item">
            item: {{item}}
            <router-view :selectedPackage="selectedPackage"></router-view>
          </v-tab-item>

          <v-spacer></v-spacer>
        </v-tabs>

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
          <span>no repo selected</span>
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
import { ComponentTab } from '@/store/transient';
import { Route } from 'vue-router';
const Packages = namespace('packages');
const Transient = namespace('transient');

@Component({
  components: {
    ViewPackageMeta,
    PackageReadme,
    PackageDocs,
    PackagePlayground
  }
})
export default class RepoDetailWindow extends Vue {
  @Prop() public selectedRepo!: string;
  @Packages.Getter('selectedPackage') public selectedPackage: Package;
  @Transient.State('componentTab') public tab: string;
  private tabs = ['Meta', 'Readme', 'Docs', 'Playground'];

  public get active(): string {
    return this.tab;
  }

  public changeTab(index: number) {
    this.$router.push({ name: `package${this.tabs[index]}` });
  }

  public get selected(): Package {
    const pkg: Partial<Package> = this.selectedPackage || {
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
