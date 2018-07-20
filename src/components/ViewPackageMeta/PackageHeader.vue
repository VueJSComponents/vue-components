<template>
<v-container fill-height fluid>
  <v-layout fill-height>
    <v-flex xs9 align-start flexbox column>
      <span class="headline flexbox">
        {{ packageName }}
        <br>
      </span>
      <span class="normal author">{{ selected.author.name }}</span>
    </v-flex>
    <v-flex xs3 flexbox flex-end space-between npm-version>
      <span class="headline slugify flexbox column">
        <span class="headline flex-end flexbox">{{selected.version}}</span>
        <span class="caption">npm version </span>
      </span>
      <span>
        <span class="headline flexbox column flex-end">
        <span class="caption npm-score-title">npm score </span>
        <span class="display-1 flex-end flexbox">
          <v-tooltip right>
            <span slot="activator" class="npm-score">{{selected.score.final}}</span>
            <span>
              quality: {{selected.score.details.quality}},<br/>
              popularity: {{selected.score.details.popularity}},<br/>
              maintenance: {{selected.score.details.maintenance}}
            </span>
          </v-tooltip>
        </span>
      </span>
      </span>
    </v-flex>
  </v-layout>
</v-container>  
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import { Package } from '@/models/Package';
const Packages = namespace('packages');

@Component
export default class PackageHeader extends Vue {
  @Prop() public selected: Package;

  public get packageName() {
    return this.selected.id.replace('!!!', '/').replace('%2E', '.');
  }
}
</script>

<style scoped>
.package-meta > .flex {
  min-width: 860px;
}
.npm-version {
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
.npm-version .caption {
  margin-top: -10px;
  color: #d7ccc8;
}

.author {
  margin-top: -4px;
  color: #d7ccc8;
}

.npm-score-title {
  padding: 0;
  margin-bottom: -8px;
}

.npm-score {
  cursor: pointer;
}

.npm-score:hover {
  font-weight: 700;
  margin-right: -2px;
  transition: all 0.5s;
}
</style>
