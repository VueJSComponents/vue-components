<template>
<div class="package-meta" v-if="selectedPackage">
  <v-flex class="d-flex space-around">
      <v-card class="d-flex ">
        <v-card-media
          class="white--text"
          height="230px"
          src="/img/github.jpg"
        >
          <package-header :selected="selected" />
        </v-card-media>

        <package-sub-header :selected="selected" />

        <v-card-title>
          <h3>Overview</h3> 
        </v-card-title>
        <v-card-text>
            <p>
              The <i>{{ cleanedRepoName }}</i>&nbsp; repository has been in existence since <b>{{createdAt}}</b> with the latest commit on <b>{{lastUpdated}}</b>. It describes itself as: 
            </p>
            <p class="px-3 text-xs-center">
              <v-icon>format_quote</v-icon>
              {{(selectedPackage || {}).description}}
              <v-icon>format_quote</v-icon>
            </p>
        </v-card-text>

        <v-card-title>
          <h3>Tags</h3>
        </v-card-title>

        <v-card-text>
            <p class="py-1">
              This repository also has tagged keywords in the <span class="backtick">package.json</span> file which maps to the following tags:
            </p>
            <div class="flexbox row center">
              <v-chip>ui /&nbsp;<strong>select</strong></v-chip>
              <v-chip>vue /&nbsp;<strong>2.x</strong></v-chip>
              <v-chip>scale /&nbsp;<strong>atomic</strong></v-chip>
            </div>
        </v-card-text>

        <v-card-title>
          <h3>Other Meta</h3>
        </v-card-title>

        <v-card-text class="pt-3 xs12 flexbox row horizontal-cards">
          <Distributions />

          <package-dependencies :dependencies="selectedPackage.dependencies" />
          <package-contributors :contributors="selectedPackage.contributors" />

        </v-card-text>
        <v-card-actions>
          <v-btn 
            v-if="selectedPackage.homePage"
            flat 
            color="green" 
            @click="openNewTab(selectedPackage.homePage)"
          >
            <v-icon color="green lighten-3">link</v-icon> Home Page
          </v-btn>
          <v-btn flat color="green" @click="openNewTab('https://github.com/' + selectedPackage.gitRepositoryOrg + '/' + selectedPackage.gitRepositoryName)">
            <v-icon color="green lighten-3">link</v-icon> Github
          </v-btn>
          <v-btn flat color="green" @click="openNewTab(selectedPackage.links.npm)">
            <v-icon color="green lighten-3">link</v-icon> NPM
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <user-dialog :id="show"></user-dialog>
  <!-- <v-snackbar
        :value="snackConfig.display"
        :color="snackConfig.color"
        :multi-line="snackConfig.mode === 'multi-line'"
        :timeout="snackConfig.timeout"
        :vertical="snackConfig.horizontalPosition === 'vertical'"
      >
        {{ snackConfig.text }}
        <v-btn
          dark
          flat
          @click="closeSnackbar"
        >
          Close
        </v-btn>
      </v-snackbar> -->
</div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import Distributions from './ViewPackageMeta/Distributions.vue';
import PackageDependencies from './ViewPackageMeta/PackageDependencies.vue';
import PackageHeader from './ViewPackageMeta/PackageHeader.vue';
import PackageSubHeader from './ViewPackageMeta/PackageSubHeader.vue';
import PackageContributors from './ViewPackageMeta/PackageContributors.vue';
import UserDialog from './UserDialog.vue';
import { Package, IContributors } from '@/models/Package';
import { ISnackbar } from '@/store/snackbar';
import { IDictionary, fk } from 'common-types';
import { hashToArray } from 'typed-conversions';
import format from 'date-fns/format';
import { User } from '@/models/User';
const Packages = namespace('packages');
const Users = namespace('users');
const SnackBar = namespace('snackbar');

@Component({
  components: {
    Distributions,
    UserDialog,
    PackageDependencies,
    PackageHeader,
    PackageSubHeader,
    PackageContributors
  }
})
export default class ViewPackageMeta extends Vue {
  @Prop() public packageName!: string;
  @Prop() public selected!: Package;
  @Packages.Getter public filteredPackages!: Package[];
  @Packages.Getter public selectedPackage!: Package;
  public avatarSize = '25px';
  @SnackBar.Mutation public closeSnackbar!: () => void;
  @SnackBar.Mutation public displaySnack!: (config: ISnackbar) => void;
  @SnackBar.State('.') public snackConfig: ISnackbar;
  @Users.Getter public lookupUser: (id: fk) => User;
  @Users.Mutation public SHOW_USER_PROFILE: (id: fk) => void;
  @Users.Mutation public HIDE_USER_PROFILE: () => void;
  @Users.State public show: fk;

  // public get selected(): Package {
  //   const pkg: Partial<Package> = this.selectedPackage || {
  //     author: {
  //       id: '',
  //       name: '',
  //       email: '',
  //       avatar_url: '',
  //       user_url: '',
  //       company: '',
  //       blog: '',
  //       bio: '',
  //       location: '',
  //       isVueUser: '',
  //       favorites: []
  //     },
  //     score: {
  //       detail: { popularity: 0, quality: 0, maintenance: 0 },
  //       final: 0
  //     }
  //   };

  //   return pkg as Package;
  // }

  public get createdAt() {
    return format(this.selectedPackage.createdAt, 'D MMM YYYY');
  }
  public get lastUpdated() {
    return format(this.selectedPackage.lastUpdated, 'D MMM YYYY');
  }

  public get issues() {
    const open =
      this.selectedPackage.issues && this.selectedPackage.issues.openCount
        ? this.selectedPackage.issues.openCount
        : 0;
    const total =
      this.selectedPackage.issues && this.selectedPackage.issues.count
        ? this.selectedPackage.issues.count
        : 0;
    const closed = total - open;

    return { open, closed, total };
  }

  public get cleanedRepoName() {
    return this.selected.id.replace('!!!', '/').replace('%2E', '.');
  }

  public get dependencies(): Array<IDictionary<{ dependency: string; version: string }>> {
    const deps = this.selectedPackage.dependencies || {};
    return Object.keys(deps).reduce((arr: any[], key: string): any[] => {
      arr = arr.concat({ dependency: key, version: deps[key] });
      return arr;
    }, []);
  }

  public get contributors(): IContributors[] {
    const deps = hashToArray(this.selectedPackage.contributors || {});
    return deps.sort((a, b) => (a.commitsCount > b.commitsCount ? -1 : 1));
  }

  public openNewTab(url: string) {
    if (url) {
      window.open(url, '_external');
    } else {
      const snack = {
        color: '',
        mode: '',
        timeout: 6000,
        text: 'No URL found'
      };
    }
  }
}
</script>


<style >
.v-card {
  margin: 25px;
  max-width: 1024px;
  flex-grow: 0;
  flex-direction: column;
}

.v-card.sidebar-info {
  margin: 12px;
}

.v-card.sidebar-info:first-child {
  margin-left: 2px;
}

.v-card.sidebar-info:last-child {
  margin-right: 2px;
}

.v-card.dependencies {
  max-width: 28%;
  cursor: default;
}

table.v-table tbody td,
table.v-table thead th {
  padding: 0 12px;
}

.dependencies,
.contributors {
  flex: none;
}

.contributor-avatar {
  max-width: 26px;
}
</style>

<style>
table.table td:first-child,
table.table thead th:first-child {
  padding: 0 12px;
}

table.table td:last-child,
table.table thead th:not(:first-child) {
  padding: 0 12px;
}
</style>

