<template>
<v-card class="details-content">
  <v-card-media src="/img/PlaygroundHeader.jpg" class="black--text" height="230px">

  </v-card-media>
  <v-card-title class="title flexbox center">
    <i class="light">for the package </i>
    &nbsp;
    <strong>{{selected.name}}</strong>
  </v-card-title>
  <v-card-text>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis at ab recusandae fugiat, saepe molestiae doloribus assumenda rem voluptates non illum nemo dolorem architecto animi obcaecati esse eius et iure
  </v-card-text>
</v-card>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import { Package } from '@/models/Package';

@Component
export default class PackagePlayground extends Vue {
  @Prop() public selected!: Package;
  @Prop() public packageName!: string;
}
</script>

<style scoped>
.title {
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid darkgrey;
  background-color: whitesmoke;
}
</style>
