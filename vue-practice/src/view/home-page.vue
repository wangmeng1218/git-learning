<template>
    <div style="height: 100%;position: fixed;width:100%;">
      <el-container  style="height:100%;border: 1px solid #eee">
        <el-aside style="background-color: rgb(238, 241, 246);text-align: left;width:200px;">
          <el-menu router default-active="alert-test">
            <el-submenu v-for="(item, index) in $store.state.menuNavData" :index="item.index" :key="index">
              <template slot="title"><i :class="item.icon"></i>{{item.name}}</template>
              <el-menu-item-group v-if="item.children.length !== 0">
                <el-menu-item  v-for="(item1, index1) in item.children" :index="item1.index" :key="index1">
                  {{item1.name}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container style="width:100%;">
          <el-main>
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
      mounted() {
      },
      methods:{
      }
    }
</script>

<style scoped>

</style>
