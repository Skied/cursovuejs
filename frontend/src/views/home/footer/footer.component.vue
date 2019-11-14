<template>
  <footer class="bd-footer text-muted docs-border">
    <span>
      Chat <strong>{{version}}</strong>
    </span>
  </footer>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class FooterComponent extends Vue {
    public version: string = process.env.VUE_APP_VERSION;
  }
</script>

<style lang="scss" scoped>
  .bd-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 56px;
    line-height: 52px;
    text-align: right;
    background-color: #eee;
    border: 1px solid lightgray;

    span {
      margin-right: 10px;
    }
  }
</style>
