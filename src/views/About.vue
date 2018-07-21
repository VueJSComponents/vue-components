<template>
  <div class="about">
    <slide-left duration="500">
      <h1>This is an about page</h1>
    </slide-left>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import SlideLeft from '../Transitions/SlideLeft.vue';

@Component({
  components: {
    SlideLeft
  }
})
export default class About extends Vue {}
</script>