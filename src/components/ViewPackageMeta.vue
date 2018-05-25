<template>
<div class="package-meta">
  <v-flex xs12 offset-sm1 sm10 md10 offset-md1 lg6 offset-lg3 py-5 >
      <v-card>
        <v-card-media
          class="white--text"
          height="230px"
          src="/img/github.jpg"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs9 align-start flexbox column>
                <span class="headline flexbox">
                  {{ selectedRepo }}
                  <br>
                </span>
                <span class="normal author">Ken Snyder</span>
              </v-flex>
              <v-flex xs3 flexbox flex-end space-between npm-version>
                <span class="headline slugify flexbox column">
                  <span class="headline flex-end flexbox">2.6.2</span>
                  <span class="caption">npm version </span>
                </span>
                <span>
                  <span class="headline flexbox column flex-end">
                  <span class="caption npm-score-title">npm score </span>
                  <span class="display-1 flex-end flexbox">
                    <v-tooltip right>
                      <span slot="activator" class="npm-score">68.2</span>
                      <span>
                        quality: 55,<br/>
                        popularity: 45,<br/>
                        maintenance: 80
                      </span>
                    </v-tooltip>
                  </span>
                </span>
                </span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-text class="repo-attributes flexbox space-around v-center">
          <span>
            <v-icon large>star</v-icon>
            <b>x</b> github stars
          </span>
          <span>
            <v-icon large>face</v-icon>
            <b>x</b> followers
          </span>
          <span>
            <v-icon large>call_split</v-icon>
            <b>x</b> forks
          </span>
          <span>
            <v-icon large>error_outline</v-icon>
            <span><strong>x&nbsp;</strong> open issues, y closed</span>
          </span>
        </v-card-text>
        <v-card-title>
          <div>
            <h3>META Information</h3>
            <p>
              The <i>{{ selectedRepo }}</i>&nbsp; repository has been in existence since <b>8 Jan 2017</b> with the latest update on <b>8 Mar 2017</b>. It is described as: 
            </p>
            <p class="px-3 text-xs-center">
              <v-icon>format_quote</v-icon>
              DESCRIPTION
              <v-icon>format_quote</v-icon>
            </p>
          </div>
        </v-card-title>
        <v-card-text class="pt-3 xs12 flexbox row horizontal-cards">
          <v-card class="xs3">
            <v-card-title class="brown lighten-4">NPM Release Velocity</v-card-title>
            <v-card-text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis at ab recusandae fugiat, saepe molestiae doloribus assumenda rem voluptates non illum nemo dolorem architecto animi obcaecati esse eius et iure
            </v-card-text>
          </v-card>
          <v-card class="xs3">
            <v-card-title class="brown lighten-4">Dependencies</v-card-title>
            <v-card-text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis at ab recusandae fugiat, saepe molestiae doloribus assumenda rem voluptates non illum nemo dolorem architecto animi obcaecati esse eius et iure
            </v-card-text>
          </v-card>
          <v-card class="xs3">
            <v-card-title class="brown lighten-4">Contributors</v-card-title>
            <v-card-text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis at ab recusandae fugiat, saepe molestiae doloribus assumenda rem voluptates non illum nemo dolorem architecto animi obcaecati esse eius et iure
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="green">
            <v-icon color="green lighten-3">link</v-icon> Github
          </v-btn>
          <v-btn flat color="green">
            <v-icon color="green lighten-3">link</v-icon> NPM
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

</div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';

@Component
export default class ViewPackageMeta extends Vue {
  @Prop() public selectedRepo!: string;
}
</script>

<style scoped>
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
