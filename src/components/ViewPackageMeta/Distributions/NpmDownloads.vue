<template>
<li class="npm-downloads">
  <div slot="header">NPM Downloads</div>
  <v-card>
    <v-card-text>
      <p>
        {{distribution.description}}
      </p>
      <ul>
        <li v-for="lineItem in distribution.data" :key="lineItem.id"> 
          {{lineItem.from}} {{lineItem.count}}
        </li>
      </ul>
    </v-card-text>
  </v-card>
</li>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import { IDistributionElement } from '@/models/index';

@Component
export default class NpmDownloads extends Vue {
  @Prop() public distribution: IDistributionElement[];
}
</script>
