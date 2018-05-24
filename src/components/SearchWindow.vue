<template>
<v-container class="search-window py-0 px-3 my-0 mt-0 brown lighten-5 search-window" grid-list-lg>
  <filter-by-text/>
  <filter-by-tag></filter-by-tag>
  <v-layout row>
      <filter-by-stars/>
      <filter-by-rating/>
  </v-layout>
</v-container>   
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FilterByText from './FilterByText.vue';
import FilterByStars from './FilterByStars.vue';
import FilterByTag from './FilterByTag.vue';
import FilterByRating from './FilterByRating.vue';

@Component({
  components: {
    FilterByText,
    FilterByStars,
    FilterByRating,
    FilterByTag
  }
})
export default class SearchWindow extends Vue {}
</script>

<style scoped>
.search-window {
  border-bottom: 3px black solid;
}
</style>
