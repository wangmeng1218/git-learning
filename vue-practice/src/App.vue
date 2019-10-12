<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import views from './view'
export default {
  name: 'App',
  data () {
    return {
      views: []
    }
  },
  created () {
    this.$Get('getMenus').then((data) => {
      console.log(data.routerData);
      data.routerData.forEach((value,index) => {
        console.log(value.path.replace(/\//g,''));
        console.log(views);
        value['component'] = views[value.name]
      });

      let router = {
        alias: '/',
        path: '/home-page',
        name: 'HomePage',
        component: views['HomePage'],
        redirect: 'alert-test',
        children: data.routerData
      };
      this.$router.addRoutes([router]);

      this.$store.commit('setMenuNav',data.menuData);
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
