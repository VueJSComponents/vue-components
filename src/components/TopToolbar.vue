<template>
  <v-toolbar
      app
      flat
      dark
      style="flexbox center"
    >
      <img src="/img/icons/android-chrome-192x192.png" style="flexbox" width="64px">
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <router-link 
          v-if="onAboutPage" 
          tag="v-btn" 
          flat 
          :to="destination"
          class="page-link"
        >
          Search
        </router-link>
        <router-link v-else tag="v-btn" class="page-link" flat :to="destination">About</router-link>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';

@Component
export default class TopToolbar extends Vue {
  @Prop() public title!: string;

  public get onAboutPage() {
    return this.$route.name === 'about';
  }

  public get destination() {
    return this.onAboutPage
      ? { name: this.$route.query.name, params: { id: this.$route.query.id } }
      : this.$route.params.id
        ? { query: { name: this.$route.name, id: this.$route.params.id }, name: 'about' }
        : { name: 'notselected' };
  }
}
</script>


<style scoped>
.page-link {
  height: 56px;
  margin-top: 5px;
}
</style>
