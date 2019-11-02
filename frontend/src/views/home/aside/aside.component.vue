<template>
  <div class="aside-component">
    <div class="section">
      <div>

        <font-awesome-icon icon="user"></font-awesome-icon>
        Users

      </div>
      <ul class="user-list">

          <li>

              <span class="badge badge-pill badge-primary fa-pull-right">

              </span>

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

  @Component
  export default class AsideComponent extends Vue {

  }
</script>

<style lang="scss" scoped src="./aside.component.scss"></style>
