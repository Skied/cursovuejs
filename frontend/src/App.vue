<template>
  <div class="app-component">
    <router-view></router-view>
    <notifications position="top right"></notifications>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class App extends Vue {
  }
</script>

<style lang="scss" scoped>
  .app-component {
    width: 100%;
    height: 100%;
  }
</style>
