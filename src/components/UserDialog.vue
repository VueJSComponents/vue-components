<template>
<v-layout row justify-center>
  <v-dialog
      :value="showDialog"
      @input="HIDE_USER_PROFILE()"
      max-width="450"
    >
      <v-card v-if="selectedUser">
        <v-card-title class="headline">
          {{selectedUser.name}} 
        </v-card-title>
        <v-card-text v-if="selectedUser.bio" class="bio">
          <v-icon>format_quote</v-icon>
          {{selectedUser.bio}}
          <v-icon>format_quote</v-icon>
        </v-card-text>
        <v-card-text>
          <span class="user-id">
            <v-btn flat color="green" @click="openNewTab(selectedUser.user_url)">
              <v-icon color="green lighten-3">link</v-icon>&nbsp;Github (
                <span class="link-detail">
                  {{selectedUser.id}}
                </span>
              )
            </v-btn>
          </span>

          <span class="user-id" v-if="selectedUser.blog">
            <v-btn flat color="green" @click="openNewTab(`mailto:${selectedUser.blog}`)">
              <v-icon color="green lighten-3">mode_comment</v-icon>&nbsp;Blog (
              <span class="link-detail">
                {{selectedUser.blog}}
              </span>
              )
            </v-btn>
          </span>

          <span class="user-id" v-if="selectedUser.email">
            <v-btn flat color="green" @click="openNewTab(selectedUser.email)">
              <v-icon color="green lighten-3">mail_outline</v-icon>&nbsp;Email (
              <span class="link-detail">
                {{selectedUser.email}}
              </span>
              )
            </v-btn>
          </span>

          <span class="user-id" v-if="selectedUser.location">
            <v-btn flat color="green" @click="openNewTab(`https://www.google.com/maps/search/${selectedUser.location}`)">
              <v-icon color="green lighten-3">location_city</v-icon>&nbsp;Location (
              <span class="link-detail">
                {{selectedUser.location}}
              </span>
              )
            </v-btn>
          </span>
        </v-card-text>

        <div class="avatar">
          <img :src="selectedUser.avatar_url">
        </div>


        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            @click="HIDE_USER_PROFILE()"
          >
            <v-icon color="green lighten-3">
              check_circle
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else> 
        <v-card-media
          src="/img/404.png"
          height="200px"
        ></v-card-media>
        <v-card-text>
          Sorry, user profile information for the user <b>{{show}}</b> couldn't be found.
        </v-card-text>
                <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            @click="HIDE_USER_PROFILE()"
          >
            <v-icon color="red lighten-3">
              highlight_off
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>  
    </v-dialog>
</v-layout>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import { fk } from 'firemodel';
import { User } from '@/models/User';
const Users = namespace('users');

@Component({})
export default class UserDialog extends Vue {
  @Prop() public id!: fk;
  @Users.State public show: fk;
  @Users.Getter public selectedUser: User;
  @Users.Mutation public HIDE_USER_PROFILE: () => void;

  public get showDialog() {
    return this.show === null ? false : true;
  }

  public try() {
    console.log('dismissed');
    this.HIDE_USER_PROFILE();
  }

  public openNewTab(url: string) {
    if (url) {
      window.open(url, '_external');
    } else {
      const snack = {
        color: '',
        mode: '',
        timeout: 6000,
        text: 'No URL found'
      };
    }
  }
}
</script>

<style scoped>
.avatar img {
  width: 125px;
  top: 8px;
  right: 10px;
  position: absolute;
  border-radius: 50%;
}
.user-id {
  color: rgb(15%, 15%, 15%);
}
.bio {
  padding-right: 120px;
}

.link-detail {
  font-size: smaller;
  color: darkslategrey;
}
</style>
