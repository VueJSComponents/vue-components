<template>
<div class="package-meta" v-if="selectedPackage">
  <v-flex class="d-flex space-around">
      <v-card class="d-flex ">
        <v-card-media
          class="white--text"
          height="230px"
          src="/img/github.jpg"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs9 align-start flexbox column>
                <span class="headline flexbox">
                  {{ cleanedRepoName }}
                  <br>
                </span>
                <span class="normal author">{{ ((selectedPackage || {}).author || {}).name }}</span>
              </v-flex>
              <v-flex xs3 flexbox flex-end space-between npm-version>
                <span class="headline slugify flexbox column">
                  <span class="headline flex-end flexbox">{{(selectedPackage || {}).version}}</span>
                  <span class="caption">npm version </span>
                </span>
                <span>
                  <span class="headline flexbox column flex-end">
                  <span class="caption npm-score-title">npm score </span>
                  <span class="display-1 flex-end flexbox">
                    <v-tooltip right>
                      <span slot="activator" class="npm-score">{{((selectedPackage || {}).score || {}).final}}</span>
                      <span>
                        quality: {{(((selectedPackage || {}).score || {}).detail || {}).quality}},<br/>
                        popularity: {{(((selectedPackage || {}).score || {}).detail || {}).popularity}},<br/>
                        maintenance: {{(((selectedPackage || {}).score || {}).detail || {}).maintenance}}
                      </span>
                    </v-tooltip>
                  </span>
                </span>
                </span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-text class="repo-attributes flexbox space-around v-center">
          <span>
            <v-icon large>star</v-icon>
            <b>{{(selectedPackage || {}).starsCount || 0}}</b>&nbsp; github stars
          </span>
          <span>
            <v-icon large>face</v-icon>
            <b>{{(selectedPackage || {}).follower || 0}}</b>&nbsp; followers
          </span>
          <span>
            <v-icon large>call_split</v-icon>
            <b>{{(selectedPackage || {}).forksCount || 0}}</b>&nbsp; forks
          </span>
          <span>
            <v-icon large>error_outline</v-icon>
            <span><strong>&nbsp;{{ issues.open}}&nbsp;</strong> open issues, &nbsp;<b>{{issues.closed}}</b>&nbsp; closed</span>
          </span>
        </v-card-text>
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
          <v-card class="xs12 sidebar-info" ref="distributions" v-resize="onResize">
            <v-card-title class="brown lighten-4">Distributions</v-card-title>
            <v-card-text>
              <Distributions />
            </v-card-text>
          </v-card>
          <v-card class="xs12 dependencies sidebar-info">
            <v-card-title class="brown lighten-4">Dependencies</v-card-title>
            <v-card-text class="d-inline">
                <v-data-table
                  :headers="dependencyHeaders"
                  :items="dependencies"
                  hide-actions
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.dependency.replace('%2E', '.').replace('!!!', '/') }}</td>
                    <td class="text-xs-right">{{ props.item.version }}</td>
                  </template>
                </v-data-table>
            </v-card-text>
          </v-card>
          <v-card class="sidebar-info contributors xs12">
            <v-card-title class="brown lighten-4">Contributors</v-card-title>
            <v-card-text>
                <v-data-table
                  :headers="contributorHeaders"
                  :items="contributors"
                  hide-actions
                >
                  <template slot="items" slot-scope="props" >
                    <tr @click.stop="SHOW_USER_PROFILE(props.item.id)">
                    <td class="contributor-avatar">
                      <v-avatar size=25>
                        <img 
                          v-if="lookupUser(props.item.id).avatar_url" 
                          :src="lookupUser(props.item.id).avatar_url">
                        <v-gravatar v-else :email="lookupUser(props.item.id).email" default-img="mm" />
                      </v-avatar>
                    </td>
                    <td class="text-xs-left" >
                      &nbsp;&nbsp;
                      {{ props.item.username }}
                    </td>
                    <td class="text-xs-right">{{ props.item.commitsCount }}</td>

                    </tr>
                  </template>
                </v-data-table>
            </v-card-text>
          </v-card>
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
import UserDialog from './UserDialog.vue';
import { Package, IContributors } from '@/models/Package';
import { ISnackbar } from '@/store/snackbar';
import { IDictionary, fk } from 'common-types';
import { hashToArray } from 'typed-conversions';
import format from 'date-fns/format';
import { User } from '@/models/User';
import resize from 'vue-resize-directive';
const Packages = namespace('packages');
const Users = namespace('users');
const SnackBar = namespace('snackbar');
const Transient = namespace('transient');

@Component({
  components: { Distributions, UserDialog }
})
export default class ViewPackageMeta extends Vue {
  @Prop() public selectedRepo!: string;
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
  @Transient.State public distributionWidth: number;

  mounted() {
    this.$nextTick(() => {
      this.setDistributionWidth();
    });
  }

  onResize() {
    this.$nextTick(() => {
      this.setDistributionWidth();
    });
  }

  public setDistributionWidth() {
    const width = (this.$refs.distributions as Vue).$el.offsetWidth;

    if (this.distributionWidth !== width) {
      this.$store.commit('transient/DISTRIBUTION_WIDTH', width);
    }
  }

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
    return this.selectedRepo.replace('!!!', '/').replace('%2E', '.');
  }

  public get dependencies(): IDictionary<{ dependency: string; version: string }>[] {
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

  public dependencyHeaders = [
    { text: 'Dependency', value: 'dependency', sortable: false },
    { text: 'Version', value: 'version', align: 'right', sortable: false }
  ];
  public contributorHeaders = [
    { text: '', value: 'avatar', align: 'left', sortable: false, width: '28px' },
    { text: 'Name', value: 'name', align: 'left', sortable: false },
    { text: 'Commits', value: 'commits', align: 'right', sortable: false }
  ];
}
</script>


<style scoped>
.v-card {
  margin: 25px;
  max-width: 1024px;
  flex-grow: 0;
  flex-direction: column;
}

.space-around {
  justify-content: space-around;
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

.v-card.contributors {
  max-width: 30%;
  cursor: pointer;
}

.v-card.dependencies {
  max-width: 28%;
  cursor: default;
}

table.v-table tbody td,
table.v-table thead th {
  padding: 0 12px;
}

.package-meta > .flex {
  min-width: 860px;
}
.npm-version {
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
.npm-version .caption {
  margin-top: -10px;
  color: #d7ccc8;
}

.author {
  margin-top: -4px;
  color: #d7ccc8;
}

.repo-attributes {
  border-bottom: 2px solid black;
}

.repo-attributes span {
  display: flex;
  align-items: center;
}

.repo-attributes span > .icon {
  margin-right: 5px;
}

.npm-score-title {
  padding: 0;
  margin-bottom: -8px;
}

.npm-score {
  cursor: pointer;
}

.npm-score:hover {
  font-weight: 700;
  margin-right: -2px;
  transition: all 0.5s;
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

