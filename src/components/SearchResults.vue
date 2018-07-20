<template>
  <v-layout row>
    <v-flex xs12>
        <v-list>
          <v-list-tile
            @click="selectItem(item)"
            v-for="item in filteredResults" 
            :key="item.id" 
            avatar 
            ripple
            :class="item.id === active ? 'active' : 'inactive'"
          >
            <v-list-tile-avatar >
              <v-avatar
                :size="avatarSize"
                color="grey lighten-4"
              >
                <img v-if="item && item.owner && item.owner.avatar_url " :src="item.owner.avatar_url" width=avatarSize>
                <v-gravatar 
                  v-else
                  :email="item.author.email" 
                  default-img="mm" 
                  :size="avatarSize"></v-gravatar>
                
              </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>
                    <div class="left">
                      {{ item.id.replace('!!!', '/').replace('%2E', '.') }}
                    </div>
                    <div class="right version-tag">
                      {{ item.version }}
                    </div>
                </v-list-tile-title>
                <v-list-tile-sub-title v-text="item.description" class="caption"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Package } from '@/models/Package';
import { ComponentTab } from '@/store/transient';

export interface ISearchItem {
  avatar?: string;
  version?: string;
  repo: string;
  description: string;
  author: {
    name?: string;
    email?: string;
    username?: string;
  };
}
const Packages = namespace('packages');
const Transient = namespace('transient');

@Component
export default class SearchResults extends Vue {
  public avatarSize: number = 48;
  @Prop() public results!: ISearchItem[];
  @Prop() public selectedRepo!: string;
  @Packages.Getter public filteredPackages!: Package[];
  @Transient.State public componentTab: ComponentTab;
  // public active: string = '';
  public get active() {
    return this.$route.params.id;
  }

  public selectItem(item: Package) {
    console.log('select item: ', item);

    if (this.$route.params.id === item.id) {
      this.$router.push({ name: 'packageUnselected' });
      // this.active = '';
    } else {
      // this.active = item.id;
      this.$router.push(`/package/${item.id}/${this.componentTab}`);
    }
  }

  public get filteredResults() {
    const { windowSize } = this.$store.state.packages;
    return this.filteredPackages.slice(0, windowSize);
  }
}
</script>

<style scoped>
.version-tag {
  background-color: black;
  color: white;
  padding: 0 6px;
  border-radius: 4px;
  font-size: 12px;
}

.active {
  background-color: #fff9c4;
}
</style>
