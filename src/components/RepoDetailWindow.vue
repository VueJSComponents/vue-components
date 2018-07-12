<template>
  <v-flex xs12 sm12 md7 lg10 xl10 my-0 px-0 fill-height>
      <div class="selected-repo" v-if="selectedRepo">
        <v-tabs
          v-model="active"
          color="blue"
          dark
          fixed-tabs
          slider-color="blue darken-4"
        >
          <v-spacer></v-spacer>
          <v-tab key="meta" ripple>
              META
          </v-tab>
          <v-tab key="readme" ripple>
              README
          </v-tab>
          <v-tab key="docs" ripple>
              Docs
          </v-tab>
          <v-tab key="play" ripple>
              Playground
          </v-tab>

          <v-tab-item key="meta"> 
            <ViewPackageMeta :selected="selected" :packageName="packageName"/>
          </v-tab-item>
          <v-tab-item key="readme">
            <package-readme :selected="selected" :packageName="packageName" />
          </v-tab-item>
          <v-tab-item key="docs">
              <package-docs :selected="selected" :packageName="packageName" />
          </v-tab-item>
          <v-tab-item key="play">
              <package-playground :selected="selected" :packageName="packageName" />
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import ViewPackageMeta from './ViewPackageMeta.vue';
import PackageReadme from './PackageReadme.vue';
import PackageDocs from './PackageDocs.vue';
const Packages = namespace('packages');
import PackagePlayground from './PackagePlayground.vue';
import { Package } from '@/models/Package';

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
  public active: string = 'meta';

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

  public get packageName() {
    return this.selected ? this.selected.id.replace('!!!', '/').replace('%2E', '.') : '';
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
