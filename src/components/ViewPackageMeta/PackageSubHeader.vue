<template>
<v-card-text class="repo-attributes flexbox space-around v-center">
  <span>
    <v-icon large>star</v-icon>
    <b>{{selected.starsCount || 0}}</b>&nbsp; github stars
  </span>
  <span>
    <v-icon large>call_split</v-icon>
    <b>{{selected.forksCount || 0}}</b>&nbsp; forks
  </span>
  <span>
    <v-icon large>error_outline</v-icon>
    <span><strong>&nbsp;{{ selected.issues.open || 0}}&nbsp;</strong> open issues, &nbsp;<b>{{selected.issues.closed || 0}}</b>&nbsp; closed</span>
  </span>
</v-card-text>

</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import { Package } from '@/models/Package';

@Component
export default class PackageSubHeader extends Vue {
  @Prop() public selected: Package;

  public get packageName() {
    return this.selected.id.replace('!!!', '/').replace('%2E', '.');
  }
}
</script>

<style scoped>
.repo-attributes {
  border-bottom: 2px solid black;
}

.repo-attributes span {
  display: flex;
  align-items: center;
}

.repo-attributes span > .icon {
  margin-right: 5px;
}
</style>

