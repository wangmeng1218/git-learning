<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import views from './view'
import { createRouter } from './router/index'
export default {
  name: 'App',
  data () {
    return {
      views: []
    }
  },
  // 页面加载，请求菜单及路由数据
  created () {
    this.$Get('getMenus').then((data) => {
      data.routerData.forEach((value,index) => {
        value['component'] = views[value.name]
      });
      let redirect = data.menuData[0].children ? data.menuData[0].children[0].index : data.menuData[0].index;
      let router = {
        alias: '/',
        path: '/home-page',
        name: 'HomePage',
        component: views['HomePage'],
        redirect: redirect,
        children: data.routerData
      };

      // 调用addRoutes方法之前，重置当前router对象的matcher属性，防止路由重发添加的错误
      this.$router.matcher = createRouter([], this.$store).matcher;
      this.$router.addRoutes([router]);
      console.log(data.menuData);
      this.$store.commit('menu/setMenuNav',data.menuData);
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './assets/eleStyle.css'

  #app {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }
</style>
