<template>
<v-container fluid class="px-0 py-0">
    <v-layout row wrap>
      <v-flex xs12>
        <v-autocomplete
          :items="tagOptions"
          v-model="tagged"
          label="Type of Component"
          item-text="name"
          item-value="name"
          multiple
          chips
          max-height="auto"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              :selected="tagged"
              :key="JSON.stringify(data.item)"
              close
              class="chip--select-multi"
              @input="data.parent.selectItem(data.item)"
              small
            >
              {{ data.item.name }}
            </v-chip>
          </template>
          <template slot="item" slot-scope="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-avatar>
                <v-icon :v-if="data.item.isGroup === true" large>group_work</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                <v-list-tile-sub-title> <i>{{ data.item.group }}</i> </v-list-tile-sub-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-autocomplete>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FilterByTag extends Vue {
  @Prop() public tag!: string[];
  @Prop() public tagged!: string;
  public tagOptions: any[] = [
    { name: 'ui', group: 'user interface', isGroup: true },
    { name: 'ui/select', group: 'user interface', isGroup: false },
    { name: 'ui/date-picker', group: 'user interface', isGroup: false },
    { name: 'ui/time-picker', group: 'user interface', isGroup: false }
  ];
}
</script>
