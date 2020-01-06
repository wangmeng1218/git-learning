<template>
  <div>
    <el-card shadow="hover" style="text-align: left;">
      闭包就是指有权访问另一个函数作用域中的变量的函数。<br/>
      <span style="color:#f56c6c;">外部函数调用之后其变量对象本应该被销毁，但闭包的存在使我们仍然可以访问外部函数的变量对象，这就是闭包的重要概念。<br/></span>
      闭包作用：<br/>
      1. 设计私有的方法和变量
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "closure",
    mounted () {
      let closureArr = this.closureTest();
      closureArr[0]();
      closureArr[1]();
      closureArr[2]();
    },
    methods: {
      // 闭包结合for循环时，通过var声明的变量，存在问题；使用let声明就没有问题
      //使用var声明，i的作用域将是全局的，最终执行i*i时，会取i最终的值，也就是4，所以打印结果都是16
    closureTest () {
        var arr = [];
        for (var i=1; i<=3; i++) {
          arr.push(function () {
            console.log(i * i);
            return i * i;
          });
        }
        return arr;
      }
    }
  }
</script>

<style scoped>

</style>
