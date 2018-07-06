<template>
<v-flex class="py-2">
    <v-layout row>
      <v-flex >
        <v-text-field
          ref="filterNameInput"
          :value="name"
          @keyup="filterByName($event.target.value)"
          append-icon="search"
          type="text"
          name="input-10-1"
          label="Repo name / desc"
        ></v-text-field>
      </v-flex>
    </v-layout>
</v-flex>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, namespace, Mutation, State } from 'vuex-class';
import { IRootState } from '@/store';
const SearchCriteria = namespace('searchCriteria');

@Component
export default class FilterByText extends Vue {
  public rating: number = 0;
  @Prop() public searchText!: string;
  @SearchCriteria.State public name!: string;
  @SearchCriteria.Mutation public filterByName!: (name: string) => void;
}
</script>
