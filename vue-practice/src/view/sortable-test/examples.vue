<template>
  <div style="display: flex;flex-direction: row;flex-wrap: wrap;">
    <div id="example1">
      <div class="example--item item1">item1</div>
      <div class="example--item item1">item2</div>
      <div class="example--item item1">item3</div>
      <div class="example--item item1">item4</div>
    </div>
    <div id="example2">
      <div class="example--item item2">item1</div>
      <div class="example--item item2">item2</div>
      <div class="example--item item2">item3</div>
      <div class="example--item item2">item4</div>
    </div>
    <div id="example3">
      <div class="example--item item3">item1</div>
      <div class="example--item item3">item2</div>
      <div class="example--item item3">item3</div>
      <div class="example--item item3">item4</div>
    </div>
  </div>
</template>

<script>
  import Sortable from 'sortablejs';
  export default {
    name: "examples",
    data () {
      return {}
    },
    created () {
      this.$nextTick(function () {
        console.log(document.getElementById('example1'));
        new Sortable(document.getElementById('example1'), {
          animation: 150,
          ghostClass: 'blue-background-class',
          onEnd (event) {
            console.log(event);
          }
        });
        new Sortable(document.getElementById('example2'), {
          animation: 150,
          group: 'shared',
          ghostClass: 'blue-background-class'
        });
        new Sortable(document.getElementById('example3'), {
          animation: 150,
          group: 'shared',
          ghostClass: 'blue-background-class'
        });
      })
    }
  }
</script>

<style scoped>
  #example1 {
    width: 100%;
  }
  #example2 {
    width: 50%;
  }
  #example3 {
    width: 50%;
  }
  .example--item {
    width: 300px;
    height: 30px;
    border: solid 1px #f8f8f8;
    margin: 10px;
  }
  .item1 {
    background-color: rgb(217, 236, 255);
  }
  .item2 {
    background-color: rgb(253, 246, 236);
  }
  .item3 {
    background-color: rgb(240, 249, 235);
  }
</style>
