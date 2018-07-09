<template>
  <v-expansion-panel popout>
    <v-expansion-panel-content v-for="(item) in measurements" :key="item.name">
      <div slot="header">{{item.name}}</div>
      <v-card class="chart-area">
        <v-card-text>
          <distribution-chart :type="item.property" :xAxis="item.xAxis" :velocity="item.velocity" />
          <p>
            {{item.description}}
          </p>
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
import DistributionChart from '@/components/ViewPackageMeta/DistributionChart.vue';
import differenceInDays from 'date-fns/difference_in_days';
import { IDictionary } from 'common-types';

const Packages = namespace('packages');

@Component({
  components: { DistributionChart }
})
export default class Distributions extends Vue {
  @Packages.Getter public selectedPackage: Package;

  public get npmDownloads() {
    return this.selectedPackage.npmDownloads || [];
  }
  public get measurements() {
    return [
      {
        name: 'NPM Downloads',
        description:
          'The number of downloads of this package across different time windows. The red line is the aggregate number, the grey represents velocity (aka, downloads per day per timeframe)',
        property: 'npmDownloads',
        xAxis: ['day', 'wk', '1m', '3m', '6m', '12m'],
        velocity: true,
        data: this.selectedPackage.npmDownloads || []
      },
      {
        name: 'NPM Releases',
        description: 'NPM releases done in various time windows.',
        property: 'npmReleases',
        xAxis: ['1m', '3m', '6m', '1yr', '2yr'],
        velocity: false,
        data: this.selectedPackage.npmReleases
      },
      {
        name: 'Github Issues',
        description: 'Github issues aging report.',
        property: 'issues.distribution',
        xAxis: ['1m', '3m', '6m', '12m'],
        velocity: false,
        data: this.selectedPackage.issues
      }
    ];
  }
  /**
   * shallow clone of array or object
   */
  public clone(thingy: Object) {
    return Array.isArray(thingy) ? thingy.slice(0) : Object.assign({}, thingy);
  }
}
</script>

