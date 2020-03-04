<template>
    <div>
      <el-upload
        class="upload-demo"
        action=""
        :on-change="handleChange"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        accept=".xls,.xlsx"
        :auto-upload="false">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-table
        :data="outputData"
        style="width: 50%"
        size="medium">
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import XLSX from 'xlsx';
  export default {
    name: "exceltable",
    props: {},
    data () {
      return {
        outputData: [],
        fileTemp: '',
        columnObject: {
          name: '姓名',
          age: '年龄',
          address: '地址'
        }
      }
    },
    mounted() {},
    watch: {},
    methods: {
      //上传文件时处理方法
      handleChange(file, fileList){
        this.fileTemp = file.raw;
        if(this.fileTemp){
          if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            || (this.fileTemp.type == 'application/vnd.ms-excel')){
            this.importfxx(this.fileTemp);
          } else {
            this.$message({
              type:'warning',
              message:'附件格式错误，请删除后重新上传！'
            })
          }
        } else {
          this.$message({
            type:'warning',
            message:'请上传附件！'
          })
        }
      },
      //超出最大上传文件数量时的处理方法
      handleExceed(){
        this.$message({
          type:'warning',
          message:'超出最大上传文件数量的限制！'
        });
      },
      //移除文件的操作方法
      handleRemove(file,fileList){
        this.fileTemp = null
      },
      importfxx(obj) {
        let _this = this;
        // 通过DOM取文件数据
        this.file = event.currentTarget.files[0];

        let rABS = false; //是否将文件读取为二进制字符串
        let f = this.file;

        let reader = new FileReader();
        FileReader.prototype.readAsBinaryString = function(f) {
          let binary = "";
          let rABS = false; //是否将文件读取为二进制字符串
          let pt = this;
          let wb; //读取完成的数据
          let outdata;
          let reader = new FileReader();
          reader.onload = function(e) {
            let bytes = new Uint8Array(reader.result);
            let length = bytes.byteLength;
            for (let i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            //此处引入，用于解析excel
            let XLSX = require("xlsx");
            if (rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), {
                //手动转化
                type: "base64"
              });
            } else {
              wb = XLSX.read(binary, {
                type: "binary"
              });
            }
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            //outdata就是读取的数据（不包含标题行即表头，表头会作为对象的下标）
            //此处可对数据进行处理
            let out = [];
            Object.keys(_this.columnObject).map(key => {
              outdata.map((item, index) => {
                Object.keys(item).map(itemKey => {
                  if (_this.columnObject[key] === itemKey) {
                    if (!out[index]) {
                      out[index] = {};
                    }
                    out[index][key] = item[itemKey];
                  }
                })
              })
            });
            _this.outputData = out;
          };
          reader.readAsArrayBuffer(f);
        };
        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      }
    }
  }
</script>

<style scoped>

</style>
