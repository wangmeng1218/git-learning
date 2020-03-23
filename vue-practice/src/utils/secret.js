// 引用AES源码js
const CryptoJS =  require('crypto-js');
// 十六位十六进制数作为密钥
const key = CryptoJS.enc.Utf8.parse('123456');
// 十六位十六进制数作为密钥偏移量
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');

// 加密方法
export function EncryptECB(word) {
  let ke = CryptoJS.enc.Utf8.parse(key);
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, ke, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

//解密方法
export function DecryptECB(word) {
  let ke = CryptoJS.enc.Utf8.parse(key);
  let decrypt = CryptoJS.AES.decrypt(word, ke, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

// 加密方法
export function EncryptCBC(word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}

//解密方法
export function DescryptCBC(word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let descrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let descryptedStr = descrypt.toString(CryptoJS.enc.Utf8);
  return descryptedStr.toString();
}
