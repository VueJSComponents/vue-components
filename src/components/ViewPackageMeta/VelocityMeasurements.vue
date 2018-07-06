<template>
  <v-expansion-panel popout>
    <v-expansion-panel-content v-for="(item) in measurements" :key="item.name">
      <div slot="header">{{item.name}}</div>
      <v-card>
        <v-card-text>
          <p>
            {{item.description}}
          </p>
          <ul>
            <li v-for="lineItem in item.data" :key="lineItem.id"> 
              {{lineItem.from}} {{lineItem.count}}
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>


<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import { Package } from '@/models/Package';
import { IDistributionElement } from '@/models';
import differenceInDays from 'date-fns/difference_in_days';

const Packages = namespace('packages');

@Component
export default class VelocityMeasurements extends Vue {
  @Packages.Getter public selectedPackage: Package;
  public get measurements() {
    return [
      {
        name: 'NPM Downloads',
        description: 'The number of downloads downloaded across different time windows.',
        data: (this.selectedPackage.npmDownloads || []).map(i => {
          switch (differenceInDays(i.to, i.from)) {
            case 1:
              i.label = 'last day';
              break;
            case 7:
              i.label = 'last week';
              break;
            case 365:
              i.label = 'last year';
              break;
            default:
              i.label = `last ${differenceInDays(i.to, i.from)} days`;
          }
          return i;
        })
      },
      {
        name: 'NPM Releases',
        data: this.selectedPackage.npmReleases
      },
      {
        name: 'Github Issues',
        data: this.selectedPackage.issues
      }
    ];
  }
}
</script>

