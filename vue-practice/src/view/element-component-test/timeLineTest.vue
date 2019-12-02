<template>
  <div>
    <el-input v-model="selectedId" placeholder="输入id"/>
    <div style="position:fixed;width:200px;top:80px;right:5px;">
      <time-line-render itemKey="pid" item-children="pchildren" item-value="plabel" @click="selectedIdChanged" :line-data="lineData" :active-id="selectedId"></time-line-render>
    </div>
  </div>
</template>

<script>
  export default {
    name: "time-line-test",
    data () {
      return {
        selectedId: 'div1',
        lineData: [{
          pid: 'div1',
          plabel: 'div1',
          disabled: false,
          pchildren: [
            {
              pid: 'd1c1',
              plabel: 'd1c1',
              disabled: false,
              pchildren: [
                {
                  pid: 'd1c1g1',
                  plabel: 'd1c1g1',
                  disabled: false,
                  pchildren: [
                    {
                      pid: 'd1c1g1r1',
                      plabel: 'd1c1g1r1',
                      disabled: true
                    }
                  ]
                },
                {
                  pid: 'd1c1g2',
                  plabel: 'd1c1g2',
                  disabled: false,
                  pchildren: [
                    {
                      pid: 'd1c1g2r1',
                      plabel: 'd1c1g2r1',
                      disabled: true
                    }
                  ]
                },
                {
                  pid: 'd1c1g3',
                  plabel: 'd1c1g3',
                  disabled: true
                }
              ]
            }
          ]
        }, {
          pid: 'div2',
          plabel: 'div2',
          disabled: false,
          pchildren: [
            {
              pid: 'd2c1',
              plabel: 'd2c1',
              disabled: false,
              pchildren: [
                {
                  pid: 'd2c1g1',
                  plabel: 'd2c1g1',
                  disabled: false
                }
              ]
            }
          ]
        }, {
          pid: 'div3',
          plabel: 'div3',
          disabled: false,
          pchildren: [
            {
              pid: 'd3c1',
              plabel: 'd3c1',
              disabled: false
            },
            {
              pid: 'd3c2',
              plabel: 'd3c2',
              disabled: false
            },
            {
              pid: 'd3c3',
              plabel: 'd3c3',
              disabled: false,
              pchildren: [
                {
                  pid: 'd3c3g1',
                  plabel: 'd3c3g1',
                  disabled: false
                },
                {
                  pid: 'd3c3g2',
                  plabel: 'd3c3g2',
                  disabled: true
                }
              ]
            }
          ]
        }, {
          pid: 'div4',
          plabel: 'div4',
          disabled: false,
          pchildren: []
        }, {
          pid: 'div5',
          plabel: 'div5',
          disabled: false,
          pchildren: [
            {
              pid: 'd5c1',
              plabel: 'd5c1',
              disabled: false
            },
            {
              pid: 'd5c2',
              plabel: 'd5c2',
              disabled: true
            },
            {
              pid: 'd5c3',
              plabel: 'd5c3',
              disabled: false,
              pchildren: [
                {
                  pid: 'd5c3g1',
                  plabel: 'd5c3g1',
                  disabled: false
                },
                {
                  pid: 'd5c3g2',
                  plabel: 'd5c3g2',
                  disabled: false
                }
              ]
            }
          ]
        }]
      }
    },
    methods: {
      selectedIdChanged(item, id) {
        this.selectedId = id;
        // console.log(item);
      }
    }
  }
</script>

<style scoped>

</style>
