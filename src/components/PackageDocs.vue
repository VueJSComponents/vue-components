<template>
<v-card class="details-content">
  <v-card-media src="/img/DocsHeader.jpg" class="black--text" height="230px">

  </v-card-media>
  <v-card-title class="title flexbox center">
    <i class="light" >
      for the package 
    </i>
    &nbsp;
    {{selected.name}}
  </v-card-title>
  <v-card-text class="doc-frame">
      <iframe src="http://miaolz123.github.io/vue-markdown/" frameborder="0"></iframe>
  </v-card-text>
</v-card>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import { Package } from '@/models/Package';

@Component
export default class PackageDocs extends Vue {
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

.doc-frame iframe {
  width: 930px;
  height: 900px;
}
</style>
