<template>
  <v-layout row>
    <v-flex xs12>
        <v-list>
          <v-list-tile 
            v-for="item in results" 
            :key="item.repo" 
            avatar 
            @click="selectItem(item)" 
            ripple
          >
            <v-list-tile-avatar :class="item.repo === selectedRepo ? 'active' : 'inactive'">
              <v-avatar
                :size="avatarSize"
                color="grey lighten-4"
              >
                <v-gravatar :email="item.author.email" default-img="mm" :size="avatarSize"></v-gravatar>
              </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>
                    <div class="left">
                      {{ item.repo }}
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

@Component
export default class SearchResults extends Vue {
  public avatarSize: number = 48;
  @Prop() public results!: ISearchItem[];
  @Prop() public selectedRepo!: string;

  selectItem(item: ISearchItem) {
    this.$emit('repoSelected', item.repo);
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
</style>
