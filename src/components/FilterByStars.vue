<template>
<v-flex xs12 md6 class="py-2 px-0">
    <v-flex xs12>
        Github Stars
    </v-flex>
    <v-flex xs12 sm6>
        <v-btn-toggle xs12 :input-value="stars === 0 ? undefined : stars.toString()" depressed=true>
            <v-btn flat value="1" @click="changeFilter($event.target.value)">
                1
            </v-btn>                
            <v-btn flat value="25" @click="changeFilter($event.target.value)">
                25
            </v-btn>
            <v-btn flat value="45" @click="changeFilter($event.target.value)">
                45
            </v-btn>
            <v-btn flat value="65" @click="changeFilter($event.target.value)">
                65
            </v-btn>
        </v-btn-toggle>
    </v-flex>
</v-flex>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, namespace, Mutation, State } from 'vuex-class';
import { ISearchCriteria } from '@/store/SearchCriteria';
const SearchCriteria = namespace('searchCriteria');

@Component
export default class FilterByStars extends Vue {
  @SearchCriteria.State public stars!: number;
  @SearchCriteria.Mutation public filterByStars!: (stars: number) => void;

  changeFilter(stars: string) {
    if (Number(stars) === this.stars) {
      this.filterByStars(0);
    } else {
      this.filterByStars(Number(stars));
    }
  }
}
</script>
