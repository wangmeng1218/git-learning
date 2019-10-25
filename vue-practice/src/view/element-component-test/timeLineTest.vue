<template>
  <div>
    <el-input v-model="selectedId" placeholder="输入id"/>
    <div style="position:fixed;width:200px;top:80px;right:5px;">
      <time-line-render @click="selectedIdChanged" :line-data="lineData" :active-id="selectedId"></time-line-render>
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
          id: 'div1',
          label: 'div1',
          children: [
            {
              id: 'd1c1',
              label: 'd1c1',
              children: [
                {
                  id: 'd1c1g1',
                  label: 'd1c1g1',
                  children: [
                    {
                      id: 'd1c1g1r1',
                      label: 'd1c1g1r1'
                    }
                  ]
                },
                {
                  id: 'd1c1g2',
                  label: 'd1c1g2',
                  children: [
                    {
                      id: 'd1c1g2r1',
                      label: 'd1c1g2r1'
                    }
                  ]
                },
                {
                  id: 'd1c1g3',
                  label: 'd1c1g3'
                }
              ]
            }
          ]
        }, {
          id: 'div2',
          label: 'div2',
          children: [
            {
              id: 'd2c1',
              label: 'd2c1',
              children: [
                {
                  id: 'd2c1g1',
                  label: 'd2c1g1'
                }
              ]
            }
          ]
        }, {
          id: 'div3',
          label: 'div3',
          children: [
            {
              id: 'd3c1',
              label: 'd3c1'
            },
            {
              id: 'd3c2',
              label: 'd3c2'
            },
            {
              id: 'd3c3',
              label: 'd3c3',
              children: [
                {
                  id: 'd3c3g1',
                  label: 'd3c3g1'
                },
                {
                  id: 'd3c3g2',
                  label: 'd3c3g2'
                }
              ]
            }
          ]
        }, {
          id: 'div4',
          label: 'div4',
          children: []
        }, {
          id: 'div5',
          label: 'div5',
          children: [
            {
              id: 'd5c1',
              label: 'd5c1'
            },
            {
              id: 'd5c2',
              label: 'd5c2'
            },
            {
              id: 'd5c3',
              label: 'd5c3',
              children: [
                {
                  id: 'd5c3g1',
                  label: 'd5c3g1'
                },
                {
                  id: 'd5c3g2',
                  label: 'd5c3g2'
                }
              ]
            }
          ]
        }]
      }
    },
    methods: {
      selectedIdChanged(id, item) {
        this.selectedId = id;
        // console.log(item);
      }
    }
  }
</script>

<style scoped>

</style>
