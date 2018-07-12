<template>
  <v-card class="xs12 dependencies sidebar-info">
    <v-card-title class="brown lighten-4">Dependencies</v-card-title>
    <v-card-text class="d-inline">
        <v-data-table
          :headers="dependencyHeaders"
          :items="depsAsArray"
          hide-actions
        >
          <template slot="items" slot-scope="dep">
            <td>{{ dep.item.id.replace('%2E', '.').replace('!!!', '/') }}</td>
            <td class="text-xs-right">{{ dep.item.value }}</td>
          </template>
        </v-data-table>
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
import { hashToArray } from 'typed-conversions';

const Packages = namespace('packages');

@Component({})
export default class PackageDependencies extends Vue {
  @Prop() public dependencies: IDictionary;
  public get depsAsArray() {
    return hashToArray(this.dependencies);
  }
  public dependencyHeaders = [
    { text: 'Dependency', value: 'dependency', sortable: false },
    { text: 'Version', value: 'version', align: 'right', sortable: false }
  ];
}
</script>

