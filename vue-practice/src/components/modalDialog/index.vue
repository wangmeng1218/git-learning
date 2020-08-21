
<script>
  import CusModal from './modal.js';
  export default {
    name: "VxeModal",
    extends: CusModal
  }
</script>

<style scoped>
  .vxe-modal--wrapper {
      position: absolute;
  }
  .vxe-modal--wrapper.type--message {
      position: fixed;
  }
  .vxe-modal--wrapper.is--mask:before, .vxe-modal--wrapper.lock--view:before{
      position: absolute;
  }
  .vxe-modal--wrapper.type--message.is--mask:before, .vxe-modal--wrapper.type--message.lock--view:before{
      position: fixed;
  }
  .vxe-modal--operate {
    display: inline-block;
    float: right;
    margin-right: 5px;
  }
</style>
