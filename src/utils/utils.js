import { DOWNLOADFILEIP, getSessionStr, AJAXIP } from "./axiosIP"

import qs from "qs"
import axios from "./axios"
export function readASBase(file) {
  return new Promise((resolve, reject) => {
    let fs = new FileReader();
    fs.readAsDataURL(file);
    fs.onload = res => {
      let base64 = res.target.result
      let img = new Image()
      img.src = base64
      let size = parseInt((base64.length - base64.length / 8 * 2) / 1024)
      img.onload = function () {
        resolve({
          base64,
          width: img.width,
          height: img.height,
          type: file.type.replace('image/', ''),
          size
        });
      }
    };
  });
}


/**
 * 获取随机code 17位
 */
export function getCode() {
  let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let id = new Array(4).fill('').map(() => {
    return str[Math.ceil(Math.random() * (str.length - 1))]
  })
  return new Date().getTime() + id.join('')
}

/**
 * 校验身份证号
 * @param {*} code 
 */
export function checkId(code) {
  var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
  var tip = "";
  var pass = true;

  if (!code || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/i.test(code)) {
    tip = "身份证号[" + code + "]格式错误";
    pass = false;
  } else if (!city[code.substr(0, 2)]) {
    tip = "[" + code + "]地址编码错误";
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        tip = "[" + code + "]校验位错误";
        pass = false;
      }
    }
  }
  return pass;
}
//下载文件
export function downLoadFileJava(data, url = 'FileManage/upload/getOssFileStream', ip = AJAXIP) {
  return new Promise((resolve, reject) => {
    url = getSessionStr(url)
    var xhr = new XMLHttpRequest();
    xhr.open('POST', ip + url, true);// 也可以使用POST方式，根据接口
    xhr.responseType = "blob";
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8")
    //   if (sessionStorage.token) {
    //     let buttonToken = ''
    //     xhr.setRequestHeader("buttonToken", buttonToken)
    //     xhr.setRequestHeader("token", sessionStorage.token)
    // }
    xhr.onload = function () {
      var headerName = xhr.getResponseHeader("Content-Disposition");
      var fileName = decodeURIComponent(headerName).substring(16);
      if (fileName.includes('1006')) { // 不能下载
        reject(fileName.split('-')[1])
        return
      }
      if (this.status === 200) {
        var blob = this.response;
        var a = document.createElement("a");
        a.download = fileName;
        a.href = URL.createObjectURL(blob);
        document.body.appendChild(a);
        a.click();
        resolve();
      } else {
        reject()
      }
    };
    xhr.onerror = function () {
      reject()
    }
    console.log(data);
    xhr.send(qs.stringify({
      json: JSON.stringify({
        "ossUrl": data.ossUrl,
        "fileName": data.name
      })
    }))
  })
}

//下载文件
export function downLoadFile({
  url,
  data = {}
}) {
  return new Promise((resolve, reject) => {
    url = getSessionStr(url)
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true); // 也可以使用POST方式，根据接口
    xhr.responseType = "blob";
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8")
    xhr.onload = function () {
      let fileName = data.name
      if (this.status === 200) {
        var blob = this.response;
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function (e) {
          var a = document.createElement('a');
          a.download = fileName;
          a.href = e.target.result;
          document.body.appendChild(a)
          a.click();
          document.body.removeChild(a)
          resolve()
        }
      } else {
        reject()
      }
    };
    xhr.onerror = function () {
      reject()
    }
    xhr.send()
  })
}