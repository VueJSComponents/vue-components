<template>
  <div class="distribution-chart ct-chart ct-major-sixth"></div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import Chartist from 'chartist';
import { IDistributionElement } from '@/models';
import differenceInDays from 'date-fns/difference_in_days';
import { Package } from '@/models/Package';
import { IDictionary } from 'common-types';

const Packages = namespace('packages');
const Transient = namespace('transient');

@Component
export default class DistibutionChart extends Vue {
  @Prop() public type: keyof typeof Package;
  @Prop() public xAxis: string[];
  @Prop() public velocity: boolean;
  @Packages.Getter public selectedPackage: Package;
  @Transient.State public distributionWidth: number;

  public get aggregateSeries() {
    const distribution = this.selectedPackage
      ? (this.selectedPackage as any)[this.$props.type]
      : [];
    return distribution ? distribution.map((i: IDictionary) => i.count) : [];
  }

  public get velocitySeries() {
    const distribution =
      this.selectedPackage && this.velocity
        ? (this.selectedPackage as any)[this.$props.type].map((i: IDistributionElement) => {
            const daysElapsed = differenceInDays(i.to, i.from);
            return i.count / daysElapsed;
          })
        : [];
    const max = Math.max(...distribution);
    const outputMax = Math.max(...this.aggregateSeries);
    const margin = outputMax * 0.05;
    const ratio = (outputMax - margin) / max;

    return distribution ? distribution.map((i: number) => i * ratio) : [];
  }

  public onResize() {
    const width = this.$el.parentElement.offsetWidth;
    if (width > 60) {
      this.chart();
    }
  }

  public chart() {
    // TODO: this is a workaround until I can figure out why the SVG is not responsive
    const width = this.distributionWidth > 60 ? this.distributionWidth - 60 : 200;
    const aspectRatio = 3 / 5;
    const series = this.$props.velocity
      ? [this.aggregateSeries, this.velocitySeries]
      : [this.aggregateSeries];
    this.$el.innerHTML = '';
    new Chartist.Line(
      this.$el,
      {
        labels: this.$props.xAxis,
        series
      },
      {
        showArea: false,
        width,
        height: width * aspectRatio
      }
    );
  }

  public get width() {
    return this.$el.offsetWidth;
  }

  public mounted() {
    this.$nextTick(() => {
      this.chart();
    });
  }
}
</script>

<style >
.chart-area {
  margin-left: 0;
  padding-left: 0;
  padding-left: -16px;
}
.ct-series-b .ct-line {
  stroke: grey;
  stroke-dasharray: 6px 8px;
  stroke-linecap: round;
}
.ct-series-b .ct-point {
  stroke-width: 1px;
  stroke: grey;
}
</style>
