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
    <el-button @click="showButton = !showButton">自定义指令测试</el-button>
    <el-button v-cusshow="showButton">自定义show指令</el-button>

    <!--<div style="height: 100px;width: 100%;"></div>-->
    <!--<el-button @click="ifButton = !ifButton">自定义指令测试</el-button>-->
    <!--<el-button v-cusif="ifButton">自定义if指令</el-button>-->
    <!--<div id="example4">-->
      <!--<vxe-grid-->
        <!--border-->
        <!--row-key-->
        <!--ref="xTable"-->
        <!--:columns="tableColumn"-->
        <!--:data="tableTreeData"-->
        <!--:tree-config="{ children: 'children' }">-->
      <!--</vxe-grid>-->
    <!--</div>-->
  </div>
</template>

<script>
  import Sortable from 'sortablejs';
  export default {
    name: "examples",
    data () {
      return {
        showButton: true,
        ifButton: true,
        showHelpTip: false,
        tableColumn: [
          // {
          //   width: 60,
          //   slots: {
          //     default: () => {
          //       return [
          //         <span class="drag-btn">
          //           <i class="vxe-icon-menu"></i>
          //         </span>
          //       ];
          //     },
          //     header: () => {
          //       return [
          //         <vxe-tooltip v-model={ this.showHelpTip } content="按住后可以上下拖动排序" enterable>
          //           <i class="vxe-icon--question" onClick={() => { this.showHelpTip = !this.showHelpTip;] }}></i>
          //         </vxe-tooltip>
          //       ];
          //     }
          //   }
          // },
          // {
          //   field: 'name',
          //   title: 'Name',
          //   treeNode: true
          // },
          // {
          //   field: 'age',
          //   title: 'Age'
          // }
        ],
        tableTreeData: [
          {
            name: '',
            age: '',

          },
          {
            name: '',
            age: ''
          },
          {
            name: '',
            age: ''
          },
          {
            name: '',
            age: ''
          },
          {
            name: '',
            age: ''
          },
          {
            name: '',
            age: ''
          }
        ]
      }
    },
    created () {
      console.log(this.$XEUtils.parseUrl('/api/v1?name=123'));
      this.$nextTick(function () {
        new Sortable(document.getElementById('example1'), {
          animation: 150,
          ghostClass: 'blue-background-class',
          onEnd (event) {
            // 移动结束
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
    },
    directives: {
      throttle: {
        bind: (el, binding) => {
          console.log(binding);
          let throttleTime = binding.value;
          if (!throttleTime) {
            throttleTime = 2000;
          }
          let cbFun;
          el.addEventListener('click', event => {
            if (!cbFun) {
              cbFun = setTimeout(() => {
                cbFun = null;
              }, throttleTime);
            } else {
              event && event.stopImmediatePropagation();
            }
          }, true);
        }
      },
      cusshow: {
        bind: (el, binding) => {
          el.dataset.displayValue = el.style.display;
        },
        update: (el, binding) => {
          if (!binding.value) {
            el.style.display = 'none';
          } else {
            el.style.display = el.dataset.displayValue;
          }
        }
      },
      cusif: {
        inserted: (el, binding) => {
          el.dataset.parentNode = el.parentNode.appendChild;
        },
        update: (el, binding) => {
          console.log(el.dataset.parentNode);
          if (!binding.value) {
            el.parentNode.removeChild(el);
          } else {
            el.dataset.parentNode.appendChild(el);
          }
        }
      }
    },
    methods: {
      handleClick () {
        console.log('click...click...');
      }
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
