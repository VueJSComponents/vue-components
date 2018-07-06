<template>
<v-flex xs12 md6 class="py-2 px-0">
    <v-flex xs12 >
        NPM Rating
    </v-flex>
    <v-flex xs12>
        <v-btn-toggle xs12 :input-value="rating === 0 ? undefined : rating.toString()"  >
            <v-btn flat value="35" @click="changeFilter($event.target.value)">
                35
            </v-btn>                
            <v-btn flat value="50" @click="changeFilter($event.target.value)">
                50
            </v-btn>
            <v-btn flat value="75" @click="changeFilter($event.target.value)">
                75
            </v-btn>
            <v-btn flat value="90" @click="changeFilter($event.target.value)">
                90
            </v-btn>
        </v-btn-toggle>
    </v-flex>
</v-flex>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ISearchCriteria } from '@/store/SearchCriteria';
import { Getter, namespace, Mutation, State } from 'vuex-class';

const SearchCriteria = namespace('searchCriteria');

@Component
export default class FilterByRating extends Vue {
  @SearchCriteria.State public rating!: number;
  @SearchCriteria.Mutation public FILTER_BY_RATING!: (stars: number) => void;

  changeFilter(rating: string) {
    if (Number(rating) === this.rating) {
      this.FILTER_BY_RATING(0);
    } else {
      this.FILTER_BY_RATING(Number(rating));
    }
  }
}
</script>
