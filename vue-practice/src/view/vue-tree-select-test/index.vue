<template>
    <div class="content">
      <TreeSelect :limit="3" :limitText="limitText" :flat="true" :allowClearingDisabled="true" :normalizer="normalizer" :showCount="true" :value="value" :searchable="true" :multiple="true" :options="options">
        <div slot="value-label" slot-scope="{ node }">
          <span style="color:red;">{{node.raw.id}}</span>
        </div>
        <label slot="option-label" slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }" :class="labelClassName">
          {{ node.isBranch ? 'Branch' : 'Leaf' }}: {{ node.label }}
          <span v-if="shouldShowCount" :class="countClassName">({{ count }})</span>
        </label>
      </TreeSelect>
      <TreeSelect
        :options="options1"
        value="111"
        placeholder="Open the menu..."
      />
      <el-select v-model="selectValue" placeholder="请选择">
        <el-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <TreeSelect :value="singleValue" :searchable="true" :options="optionsEmpty">
      </TreeSelect>
      <div id="vue-treeselect-container" style="display: inline-block;width:60px;height: 30px;background-color: #409EFF;" @mousedown ="divClicked">xxxxx</div>
      <div style="width: 100%;height:200px;">
        <iframe src="https://www.baidu.com/" :frameborder="0"></iframe>
      </div>
      <el-button @click="value2 = !value2">ModalDialog</el-button>
      <vxe-modal v-model="value2" resize iframeUrl="https://www.baidu.com/" contentId="page-content">
        <template v-slot:operateBtn>
          <vxe-button size="mini">啦啦啦</vxe-button>
        </template>
        <iframe src="https://www.baidu.com/" :frameborder="0" width="100%" height="100%"></iframe>
      </vxe-modal>
      <el-button @click="$XModal.alert({ message: 'info 提示框', status: 'info' })">info提示框</el-button>
      <el-button duration="30000" @click="$XModal.message({ message: 'info 消息提示', status: 'info' })">info消息提示--自定义</el-button>
      <el-button duration="30000" @click="$XModal.message({ message: 'info 消息提示', status: 'info' })">info消息提示</el-button>
      <el-button @click="value5 = !value5">vxe-modal</el-button>
      <vxe-modal v-model="value5" :position="{top: 10, left: 0}">
        <template v-slot:operateBtn>
          <vxe-button size="mini" @click="value2 = !value2">啦啦啦</vxe-button>
        </template>
        <div>xxxxxxxxx</div>
        <div>xxxxxxxxxx</div>
      </vxe-modal>
    </div>
</template>

<script>
  export default {
      name: "index",
      data () {
          return {
            value2: false,
            value5: false,
            selectOptions: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
            selectValue: '选项3',
            singleValue: null,
            // define the default value
            value: ['aa', 'ab'],
            optionsEmpty: [],
            options1: [
              {
                id: '111',
                label: '111',
                children: [
                  {
                    id: '222',
                    label: '222'
                  }
                ]
              },
              {
                id: '333',
                label: '333'
              }
            ],
            // define options
            options: [ {
              id: 'a',
              label: 'A',
              children: [ {
                id: 'aa',
                label: 'AA'
              }, {
                id: 'ab',
                label: 'AB',
                children: []
              } ],
            }, {
              id: 'b',
              label: 'B',
            }, {
              id: 'c',
              label: 'C',
              isNew: true
            } ]
          }
      },
    methods: {
      normalizer (node) {
        return {
          id: node.id,
          label: node.label,
          children: node.children
        }
      },
      limitText (count) {
        return '+' + count;
      },
      async loadOptions ({ action, callback }) {
        console.log('LOAD_ROOT_OPTIONS');
        if (action === LOAD_ROOT_OPTIONS) {
          // console.log('LOAD_ROOT_OPTIONS');
          this.options1 = [ 'a', 'b', 'c', 'd', 'e' ].map(id => ({
            id,
            label: `option-${id}`,
          }));
        }
      },
      divClicked (event) {
        event.stopPropagation();
        event.preventDefault();
        // console.log('divClickeddivClicked');
      }
    }
    }
</script>

<style scoped>

</style>
