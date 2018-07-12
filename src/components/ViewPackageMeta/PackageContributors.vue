<template>
<v-card class="sidebar-info contributors xs12">
  <v-card-title class="brown lighten-4">Contributors</v-card-title>
  <v-card-text>
      <v-data-table
        :headers="contributorHeaders"
        :items="contributorArray"
        hide-actions
      >
        <template slot="items" slot-scope="props" >
          <tr @click.stop="SHOW_USER_PROFILE(props.item.id)">
          <td class="contributor-avatar">
            <v-avatar size=25>
              <img 
                v-if="lookupUser(props.item.id).avatar_url" 
                :src="lookupUser(props.item.id).avatar_url">
              <v-gravatar v-else :email="lookupUser(props.item.id).email" default-img="mm" />
            </v-avatar>
          </td>
          <td class="text-xs-left" >
            &nbsp;&nbsp;
            {{ props.item.username }}
          </td>
          <td class="text-xs-right">{{ props.item.commitsCount }}</td>

          </tr>
        </template>
      </v-data-table>
  </v-card-text>
</v-card>
</template>


<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import { fk, IDictionary } from 'common-types';
import { User } from '@/models/User';
import { IContributors } from '@/models/Package';
import { hashToArray } from 'typed-conversions';
const Users = namespace('users');

@Component
export default class PackageContributors extends Vue {
  @Prop() public contributors: IDictionary<IContributors>;
  @Users.Getter public lookupUser: (id: fk) => User;
  @Users.Mutation public SHOW_USER_PROFILE: (id: fk) => void;
  @Users.Mutation public HIDE_USER_PROFILE: () => void;

  public get contributorArray() {
    return hashToArray(this.contributors).sort((a, b) => (a.commitsCount > b.commitsCount ? 0 : 1));
  }

  public contributorHeaders = [
    { text: '', value: 'avatar', align: 'left', sortable: false, width: '28px' },
    { text: 'Name', value: 'name', align: 'left', sortable: false },
    { text: 'Commits', value: 'commits', align: 'right', sortable: false }
  ];
}
</script>


<style scoped>
.v-card.contributors {
  max-width: 30%;
  cursor: pointer;
}
</style>
