<template>
  <v-toolbar
      app
      flat
      dark
    >
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>FAQ</v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';

@Component
export default class TopToolbar extends Vue {
  @Prop() public title!: string;

  public toggleDrawer() {
    this.$emit('toggleDrawer');
  }
}
</script>
