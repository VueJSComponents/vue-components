<template>
  <v-layout row>
    <v-flex xs12>
        <v-list>
          <v-list-tile 
            v-for="item in filteredResults" 
            :key="item.id" 
            avatar 
            @click="selectItem(item)" 
            ripple
            :class="item.id === $route.params.id ? 'active' : 'inactive'"
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
                      {{ item.id.replace('!!!', '/') }}
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

@Component
export default class SearchResults extends Vue {
  public avatarSize: number = 48;
  @Prop() public results!: ISearchItem[];
  @Prop() public selectedRepo!: string;
  @Packages.Getter public filteredPackages!: Package[];

  public selectItem(item: Package) {
    if (this.$route.params.id === item.id) {
      this.$router.push({ path: `/component` });
    } else {
      this.$router.push({ path: `/component/${item.id}` });
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
