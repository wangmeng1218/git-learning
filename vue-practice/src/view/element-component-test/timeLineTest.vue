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
          pchildren: [
            {
              pid: 'd1c1',
              plabel: 'd1c1',
              pchildren: [
                {
                  pid: 'd1c1g1',
                  plabel: 'd1c1g1',
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
          pchildren: [
            {
              pid: 'd2c1',
              plabel: 'd2c1',
              pchildren: [
                {
                  pid: 'd2c1g1',
                  plabel: 'd2c1g1'
                }
              ]
            }
          ]
        }, {
          pid: 'div3',
          plabel: 'div3',
          pchildren: [
            {
              pid: 'd3c1',
              plabel: 'd3c1'
            },
            {
              pid: 'd3c2',
              plabel: 'd3c2'
            },
            {
              pid: 'd3c3',
              plabel: 'd3c3',
              pchildren: [
                {
                  pid: 'd3c3g1',
                  plabel: 'd3c3g1'
                },
                {
                  pid: 'd3c3g2',
                  plabel: 'd3c3g2'
                }
              ]
            }
          ]
        }, {
          pid: 'div4',
          plabel: 'div4',
          pchildren: []
        }, {
          pid: 'div5',
          plabel: 'div5',
          pchildren: [
            {
              pid: 'd5c1',
              plabel: 'd5c1'
            },
            {
              pid: 'd5c2',
              plabel: 'd5c2'
            },
            {
              pid: 'd5c3',
              plabel: 'd5c3',
              pchildren: [
                {
                  pid: 'd5c3g1',
                  plabel: 'd5c3g1'
                },
                {
                  pid: 'd5c3g2',
                  plabel: 'd5c3g2'
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
