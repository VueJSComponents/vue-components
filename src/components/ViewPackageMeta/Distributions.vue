<template>
<v-card class="xs12 sidebar-info" ref="distributions" v-resize="onResize">
  <v-card-title class="brown lighten-4">Distributions</v-card-title>
  <v-card-text>             
    <v-expansion-panel popout>
      <v-expansion-panel-content v-for="(item) in measurements" :key="item.name">
        <div slot="header">{{item.name}}</div>
        <v-card class="chart-area">
            <distribution-chart :type="item.property" :xAxis="item.xAxis" :velocity="item.velocity" />
            <p>
              {{item.description}}
            </p>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-card-text>
</v-card>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import { Package } from '@/models/Package';
import { IDistributionElement } from '@/models';
import DistributionChart from '@/components/ViewPackageMeta/DistributionChart.vue';
import differenceInDays from 'date-fns/difference_in_days';
import { IDictionary } from 'common-types';
// import resize from 'vue-resize-directive';

const Packages = namespace('packages');
const Transient = namespace('transient');

@Component({
  components: { DistributionChart }
})
export default class Distributions extends Vue {
  @Packages.Getter public selectedPackage: Package;
  @Transient.State public distributionWidth: number;

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

  public mounted() {
    this.setDistributionWidth();
  }

  public onResize() {
    this.setDistributionWidth();
  }

  public setDistributionWidth() {
    const width = (this.$refs.distributions as Vue).$el.offsetWidth;

    if (this.distributionWidth !== width) {
      this.$store.commit('transient/DISTRIBUTION_WIDTH', width);
    }
  }

  /**
   * shallow clone of array or object
   */
  public clone(thingy: IDictionary) {
    return Array.isArray(thingy) ? thingy.slice(0) : Object.assign({}, thingy);
  }
}
</script>

<style scoped>
.chart-area {
  padding-left: 0;
}
.chart-area svg {
  padding-bottom: 0.5rem;
}
</style>
