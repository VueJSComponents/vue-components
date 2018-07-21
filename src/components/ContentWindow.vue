<template>
  <v-layout m0 p0 row wrap fill-height >
    <v-flex xs12 sm12 md5 lg2 xl2 right-border fill-height :class="showSearchSidebar ? '' : 'hide-searchbar'">
      <v-layout column py-0 px-0 fill-height>
        <RepoChoicesWindow />
      </v-layout>
    </v-flex>
    <RepoDetailWindow :selectedRepo="$route.params.id" />
  </v-layout> 
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import RepoChoicesWindow from './RepoChoicesWindow.vue';
import RepoDetailWindow from './RepoDetailWindow.vue';

@Component({
  components: {
    RepoChoicesWindow,
    RepoDetailWindow
  }
})
export default class ContentWindow extends Vue {
  public changeRepo(val: string) {
    this.$emit('changeRepo', val);
  }

  public get showSearchSidebar() {
    return this.$route.path.indexOf('package') !== -1 || this.$route.name === 'notselected'
      ? true
      : false;
  }
}
</script>

<style scoped>
.right-border {
  border-right: 2px solid black;
  height: 100%;
}

.hide-searchbar {
  position: absolute;
  transform: translateX(-290px);
  width: calc(100vw + 280px);
  transition-duration: 1s;
}
</style>
