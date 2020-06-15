import VXETable from 'vxe-table';

VXETable.renderer.add('MyExpand', {
  renderExpand (h, renderOpts, params) {
    let { row,rowIndex,column,columnIndex,$table } = params;
    // console.log(row);
    // console.log($table);
    console.log(renderOpts);
    let listeners = {};
    Object.keys(renderOpts.events).forEach(key => {
      let val = renderOpts.events[key];
      if (typeof val === 'function') {
        const uniformItem = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        listeners[uniformItem] = val;
      }
    });
    return h(
      'vxe-grid',
      {
        props: renderOpts.props,
        attrs: renderOpts.attrs,
        on: listeners
      }
    );
  }
});
