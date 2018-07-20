<template>
<v-card class="package-readme g-flex">
  <v-card-media src="/img/ReadmeHeader.jpg" class="black--text" height="230px">

  </v-card-media>
  <v-card-title class="title flexbox center">
    <i class="light">for the package </i>
    &nbsp;
    <strong>{{packageName}}</strong>
  </v-card-title>
  <v-card-text>

    {{readme.html}}
  </v-card-text>
</v-card>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import { Package } from '@/models/Package';
import { decompress, absoluteUrl } from '../utils/index';
import { Readme } from '@/models/Readme';
import { Record, FireModel } from 'firemodel';
import { wait } from 'common-types';

@Component
export default class PackageReadme extends Vue {
  @Prop() public selected!: Package;
  @Prop() public packageName!: string;

  public readme: Partial<Readme> = {};

  public async mounted() {
    if (this.selected.name) {
      if (!FireModel.defaultDb) {
        await wait(350);
      }
      await FireModel.defaultDb.waitForConnection();
      this.readme = await Record.get(Readme, this.selected.id);
    }
  }
}
</script>

<style>
@import '/css/prism.css';
</style>


<style scoped>
.title {
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid darkgrey;
  background-color: whitesmoke;
}
</style>
