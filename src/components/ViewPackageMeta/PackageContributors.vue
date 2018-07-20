<template>
<v-card class="sidebar-info contributors xs12">
  <v-card-title class="brown lighten-4">Contributors</v-card-title>
  <v-card-text>
      <v-data-table
        :headers="contributorHeaders"
        :items="contributorArray"
        hide-actions
        class="contributors-table"
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
          <td class="contributor-id text-xs-left" >
            {{ props.item.username }}
          </td>
          <td class="contributor-commits text-xs-right">{{ props.item.commitsCount }}</td>

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
    return hashToArray(this.contributors).sort(
      (a, b) => (a.commitsCount > b.commitsCount ? -1 : 1)
    );
  }

  public contributorHeaders = [
    { text: '', value: 'avatar', align: 'left', sortable: false, width: '32px' },
    {
      text: 'Name',
      value: 'name',
      align: 'left',
      sortable: false,
      class: 'user-name'
    },
    { text: 'Commits', value: 'commits', align: 'right', width: '30px', sortable: false }
  ];
}
</script>


<style scoped>
.v-card.contributors {
  max-width: 30%;
  cursor: pointer;
}
.contributors-table {
  overflow-x: hidden;
}

/* table.table td:first-child,
table.table thead th:first-child {
  padding: 0 12px !important;
}

table.table td:last-child,
table.table thead th:not(:first-child) {
  padding: 0 12px !important;
} */

td.contributor-avatar,
td.contributor-commits,
td.contributor-id,
table.v-table thead th.user-name {
  padding: 0 6px !important;
}
</style>
