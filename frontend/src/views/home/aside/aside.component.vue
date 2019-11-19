<template>
  <div class="aside-component">
    <div class="section">
      <div>

        <font-awesome-icon icon="user"></font-awesome-icon>
        Users

      </div>
      <ul class="user-list">
        <li v-for="(idSender) in newMessages" :key="idSender" @click="irChat(idSender)">
            <span class="badge badge-pill badge-primary fa-pull-right"></span>
            {{getUserById(idSender).name}}
        </li>
      </ul>
    </div>
    <span class="section">
      <div>

        <font-awesome-icon icon="comments"></font-awesome-icon>
        Rooms

      </div>
    </span>
    <ul></ul>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {namespace} from 'vuex-class';
  import { UserMessage } from '@/classes/user-message';
  import { User } from '@/classes/user';

  const userMessagesModule = namespace('userMessagesModule');
  const usersModule = namespace('usersModule');

  @Component
  export default class AsideComponent extends Vue {

    @userMessagesModule.State('newMessages') public newMessages!: {[idSender: number]: UserMessage[]};
    @usersModule.Getter('getUserById') public getUserById!: (idUser: number) => User;

    irChat(idSender) {
      this.$router.push('/chat/' + idSender);
    }

  }
</script>

<style lang="scss" scoped src="./aside.component.scss"></style>
