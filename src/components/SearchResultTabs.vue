<template>
  <div>
    <v-tabs
    v-model="active"
    color="cyan"
    dark
    slider-color="yellow"
    >
      <v-tab key="search" ripple>
          Search
      </v-tab>
      <v-tab key="recent" ripple>
          Recent
      </v-tab>
      <v-tab key="favs" ripple>
          Favs
      </v-tab>
      <v-tab-item key="search">
          <SearchWindow/>
          <SearchResults 
            :results="searchResults" 
            @repoSelected="selectedRepoChanged" 
            :selectedRepo="selectedRepo"
          />
      </v-tab-item>            
      <v-tab-item key="recent">
          <SearchResults :results="recentResults"/>

      </v-tab-item>
      <v-tab-item key="favs">
          <SearchResults :results="favResults" :selectedRepo="selectedRepo"/>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SearchResults, { ISearchItem } from './SearchResults.vue';
import SearchWindow from './SearchWindow.vue';

@Component({
  components: {
    SearchResults,
    SearchWindow
  }
})
export default class SearchResultTabs extends Vue {
  public active = '0';
  @Prop() public selectedRepo!: string;

  selectedRepoChanged(repo: string) {
    console.log(`SearchResultTabs got ${repo} repo changed to`);
    
    this.$emit('repoSelected', repo);
  }
  public searchResults: ISearchItem[] = [
    {
      repo: 'vue-slider-component',
      version: '2.6.2',
      description: 'Can use the Slider component in vue1.x and vue2.x',
      author: {
        email: '642163903@qq.com'
      }
    },
    {
      repo: 'vue-text-mask',
      version: '6.1.1',
      description: 'Vue component for input masking',
      author: {
        email: 'hello@billcolumbia.com'
      }
    },
    {
      repo: 'atui',
      version: '0.1.32',
      description: 'components built with Vue.js',
      author: {
        email: 'chaoren1641@gmail.com'
      }
    },
    {
      repo: 'vue-json-tree-view',
      version: '2.1.4',
      description: 'a JSON Tree View Component in Vue.js',
      author: {
        email: 'mail@arvidkahl.de'
      }
    }
  ];

  public recentResults: ISearchItem[] = [
    {
      repo: 'vue-recaptcha',
      version: '1.1.1',
      description: 'Upgraded from 1.1.0 to 1.1.1',
      author: {
        email: 'dododavid006@gmail.com'
      }
    },
    {
      repo: 'vue-upload-component',
      version: '6.1.1',
      description: 'Just added to component directory',
      author: {
        email: 'admin@lianyue.org'
      }
    }
  ];

  public favResults: ISearchItem[] = [
    {
      repo: 'atui',
      version: '0.1.32',
      description: 'components built with Vue.js',
      author: {
        email: 'chaoren1641@gmail.com'
      }
    },
    {
      repo: 'vue-json-tree-view',
      version: '2.1.4',
      description: 'a JSON Tree View Component in Vue.js',
      author: {
        email: 'mail@arvidkahl.de'
      }
    }
  ];
}
</script>
