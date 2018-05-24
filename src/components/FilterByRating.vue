<template>
<v-flex xs12 md6 class="py-2 px-0">
    <v-flex xs12 >
        NPM Rating
    </v-flex>
    <v-flex xs12>
        <v-btn-toggle xs12 v-model="rating">
            <v-btn flat value="Number(35)">
                35
            </v-btn>                
            <v-btn flat value="Number(50)">
                50
            </v-btn>
            <v-btn flat value="Number(75)">
                75
            </v-btn>
            <v-btn flat value="Number(90)">
                90
            </v-btn>
        </v-btn-toggle>
    </v-flex>
</v-flex>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FilterByRating extends Vue {
  public rating: number = 0;
}
</script>
