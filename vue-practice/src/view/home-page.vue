<template>
    <div style="height: 100%;position: fixed;width:100%;">
      <el-container  style="height:100%;border: 1px solid #eee">
        <el-aside style="background-color: rgb(238, 241, 246);text-align: left;width:200px;">
          <el-menu router :default-active="defaultActive">
            <el-submenu v-for="(item, index) in $store.state.menu.menuNavData" :index="item.index" :key="index">
              <template slot="title"><i :class="item.icon"></i>{{item.name}}</template>
              <el-menu-item-group v-if="item.children.length !== 0">
                <el-menu-item  v-for="(item1, index1) in item.children" :index="item1.index" :key="index1">
                  {{item1.name}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container style="width:100%;height:100%;">
          <el-main style="padding:0;">
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
    export default {
      name: "home-page",
      data() {
        return{
        }
      },
      computed: {
        defaultActive() {
          return this.$store.state.menu.menuNavData[0].children ? this.$store.state.menu.menuNavData[0].children[0].index : this.$store.state.menu.menuNavData[0].index;
        }
      },
      mounted() {
      },
      methods:{
      }
    }
</script>

<style scoped>

</style>
