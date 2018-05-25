<template>
  <v-layout m0 p0 row wrap fill-height>
    <v-flex xs12 sm12 md5 lg4 xl2 right-border fill-height>
      <v-layout column py-0 px-0 fill-height>
        <RepoChoicesWindow @repoSelected="selectedRepo=$event" :selectedRepo="selectedRepo"/>
      </v-layout>
    </v-flex>
    <RepoDetailWindow @clearRepo="clearRepo" :selectedRepo="selectedRepo" />
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
  @Prop() public selectedRepo!: string;

  public clearRepo() {
    this.$emit('clearRepo');
  }
}
</script>

<style scoped>
.right-border {
  border-right: 2px solid black;
  height: 100%;
}
</style>
