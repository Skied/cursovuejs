<template>
  <div class="header-component">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand>Chat</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Language" right>
            <b-dropdown-item active-class="active">
              Language
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              Username
            </template>
            <b-dropdown-item>
              Logout
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class HeaderComponent extends Vue {

  }
</script>

<style lang="scss" scoped>
  .header-component {

  }
</style>
