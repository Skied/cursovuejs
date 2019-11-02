<template>
  <div class="home-component">
    <Header></Header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 text-left" style="padding-left: 0px">
          <Aside></Aside>
        </div>
        <div class="col-sm-9">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import HeaderComponent from '@/views/home/header/header.component.vue';
  import FooterComponent from '@/views/home/footer/footer.component.vue';
  import AsideComponent from '@/views/home/aside/aside.component.vue';

  @Component({
    components: {
      Header: HeaderComponent,
      Footer: FooterComponent,
      Aside: AsideComponent,
    },
  })
  export default class HomeComponent extends Vue {

  }
</script>

<style lang="scss" scoped>
  .home-component {
    height: 100%;

    .container-fluid {
      height: calc(100% - 110px);

      .row {
        height: 100%;

        .col-sm-3 {
          height: 100%;
        }

        .col-sm-9 {
          height: 100%;
        }
      }
    }
  }
</style>
