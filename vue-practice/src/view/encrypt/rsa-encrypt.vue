<template>
    <div>
      <el-col>
        <el-card>
          <span>加密前：{{beforeEncrypt}}</span>
        </el-card>
        <el-card>
          <span>加密后： {{afterEncrypt}}</span>
        </el-card>
        <el-card>
          <span>解密后： {{afterDecrypt}}</span>
        </el-card>
      </el-col>
      <el-button @click="showLoading">请求数据</el-button>

      <el-col>
        <el-card>
          <span>加密前：{{beforeEncrypt}}</span>
        </el-card>
        <el-card>
          <span>加密后： {{afterEncrypt}}</span>
        </el-card>
        <el-card>
          <span>解密后： {{afterDecrypt}}</span>
        </el-card>
      </el-col>
    </div>
</template>

<script>
  import { privateKey,publicKey } from './config';
  import JSEncrypt from 'jsencrypt/bin/jsencrypt';
  import { EncryptECB } from '../../utils/secret';
  import { DecryptECB } from "../../utils/secret";
  import Loading from '../../components/Loading/loading';

  export default {
    name: "rsa-encrypt",
    data () {
      return {
        //私玥
        privateKey: privateKey,
        //公玥
        publicKey: publicKey,
        beforeEncrypt: '鬼灭之刃',
        afterEncrypt: '',
        afterDecrypt: ''
      }
    },
    mounted () {
      // this.afterEncrypt = EncryptECB(this.beforeEncrypt);
      // this.afterDecrypt = DecryptECB(this.afterEncrypt);
      //新建jsencrypt对象
      let encryptor = new JSEncrypt();
      // 设置公玥
      encryptor.setPublicKey(this.publicKey);
      //加密
      this.afterEncrypt = encryptor.encrypt(this.beforeEncrypt);
      // 设置私玥
      encryptor.setPrivateKey(this.privateKey);
      // 解密
      this.afterDecrypt = encryptor.decrypt(this.afterEncrypt);
    },
    methods: {
      showLoading () {
        Loading.show();
        setTimeout(() => {
          Loading.hide();
        }, 3000);
      },
      requestData () {
        // this.$Get('http://192.168.100.107:3000/',{}).then(response => {
        //   console.log(response);
        // }).catch();
        let param = {
          name: 'Levi',
          age: '23'
        };
        //新建jsencrypt对象
        let encryptor = new JSEncrypt();
        // 设置公玥
        encryptor.setPublicKey(this.publicKey);
        //加密
        let paramEncrypt = encryptor.encrypt(JSON.stringify(param));
        this.$Post('http://192.168.100.107:3000/encrypt', {data: paramEncrypt}).then(response => {
          console.log(response);
        });
        this.$Get('http://192.168.100.107:3000/decrypt').then(response => {
          //新建jsencrypt对象
          let decryptor = new JSEncrypt();
          // 设置私钥
          decryptor.setPrivateKey(this.privateKey);
          //解密
          let data = decryptor.decrypt(response);
          console.log(data);
        });
      }
    }
  }
</script>

<style scoped>
  span {
    display: inline-block;
    word-break: break-all;
    word-wrap: break-word;
    overflow: hidden;
  }
</style>
