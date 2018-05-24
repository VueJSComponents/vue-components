<template>
<v-flex xs12 md6 class="py-2 px-0">
    <v-flex xs12>
        Github Stars
    </v-flex>
    <v-flex xs12 sm6>
        <v-btn-toggle xs12 v-model="stars">
            <v-btn flat value="Number(1)">
                1
            </v-btn>                
            <v-btn flat value="Number(10)">
                10
            </v-btn>
            <v-btn flat value="Number(25)">
                25
            </v-btn>
            <v-btn flat value="Number(100)">
                100
            </v-btn>
        </v-btn-toggle>
    </v-flex>
</v-flex>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FilterByStars extends Vue {
  public stars: number = 1;
}
</script>
