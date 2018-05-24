<template>
<v-flex class="py-2">
    <v-layout row>
      <v-flex >
        <v-text-field
          v-model="searchText"
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

@Component
export default class FilterByText extends Vue {
  public rating: number = 0;
  @Prop() public searchText!: string;
}
</script>
