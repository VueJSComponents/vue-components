<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    :css="false"
  >
    <slot></slot>
  </transition>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import anime from 'animejs';

@Component
export default class SlideLeft extends Vue {
  @Prop() public duration: number;
  @Prop() public reverseOnExit: boolean;

  public beforeEnter(el: HTMLElement) {
    el.style.transform = 'translateX(100%)';
    el.style.position = 'absolute';
  }
  public enter(el: HTMLElement, complete: any) {
    const duration = this.duration || 500;
    anime({ targets: el, translateX: 0, duration, complete });
  }
  public leave(el: HTMLElement, complete: any) {
    const duration = this.duration || 500;
    anime({ targets: el, translateX: '100%', duration, complete });
  }
}
</script>
