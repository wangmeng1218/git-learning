<template>
    <div>
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
        :load-options="loadOptions"
        :options="options1"
        :auto-load-root-options="false"
        :multiple="true"
        placeholder="Open the menu..."
      />
      <TreeSelect :value="singleValue" :searchable="true" :options="optionsEmpty">
      </TreeSelect>
    </div>
</template>

<script>
  export default {
      name: "index",
      data () {
          return {
            singleValue: null,
            // define the default value
            value: [],
            optionsEmpty: [],
            options1: null,
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
      }
    }
    }
</script>

<style scoped>

</style>
