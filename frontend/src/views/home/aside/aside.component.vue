<template>
  <div class="aside-component">
    <div class="section">
      <div>
        <router-link to="/users">
          <font-awesome-icon icon="user"></font-awesome-icon>
          Users
        </router-link>
      </div>
      <ul class="user-list">
        <template v-for="(messages, idUser) in newMessages">
          <li v-if="showUserMessages(idUser, messages)">
            {{ getUserById(idUser) != null ? getUserById(idUser).name : '' }}
            <span class="badge badge-pill badge-primary fa-pull-right">
              {{ messages.length }}
            </span>
          </li>
        </template>
      </ul>
    </div>
    <span class="section">
      <div>
      <router-link to="/rooms">
        <font-awesome-icon icon="comments"></font-awesome-icon>
        Rooms
      </router-link>
      </div>
    </span>
    <ul></ul>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {UserMessage} from "@/classes/user-message";
  import {namespace} from "vuex-class";
  import {User} from "@/classes/user";

  const userMessagesModule = namespace("userMessagesModule");
  const usersModule = namespace("usersModule");

  @Component
  export default class AsideComponent extends Vue {

    @userMessagesModule.State("newMessages") public newMessages!: { [idSender: number]: UserMessage[] };
    @usersModule.Getter("getUserById") public getUserById!: (idUser: number) => User;

    public showUserMessages(idUser: number, messages: UserMessage[]): boolean {
      return messages.length > 0 && this.$route.fullPath.indexOf(`chat/${idUser}`) === -1;
    }

  }
</script>

<style lang="scss" scoped src="./aside.component.scss"></style>
