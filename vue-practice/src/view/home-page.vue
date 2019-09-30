<template>
    <div style="height: 100%;position: fixed;width:100%;">
      <el-container  style="height:100%;border: 1px solid #eee">
        <el-aside style="background-color: rgb(238, 241, 246);text-align: left;width:200px;">
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-eleme"></i>组件使用测试</template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="goToSubPage('1-1')">alert使用</el-menu-item>
                <el-menu-item index="1-2" @click="goToSubPage('1-2')">表格行列合并</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-thumb"></i>Vue</template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="goToSubPage('2-1')">渲染函数</el-menu-item>
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
        return{}
      },
      mounted() {
        this.$router.replace('alert-test');
      },
      methods:{
        goToSubPage (position) {
          if (position === '1-1') {
            this.$router.replace('alert-test');
          } else if (position === '1-2') {
            this.$router.replace('table-row-merge');
          } else if (position === '2-1') {
            this.$router.replace('render-learning');
          }
        }
      }
    }
</script>

<style scoped>

</style>
