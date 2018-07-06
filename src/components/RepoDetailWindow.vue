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

          <v-tab-item key="meta"> 
              <ViewPackageMeta :selectedRepo="selectedRepo" />
          </v-tab-item>            
          <v-tab-item key="readme">
              README

          </v-tab-item>
          <v-tab-item key="docs" disabled>
              DOCS
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

@Component({
  components: {
    ViewPackageMeta
  }
})
export default class RepoDetailWindow extends Vue {
  @Prop() public selectedRepo!: string;
  public active: string = 'meta';
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
