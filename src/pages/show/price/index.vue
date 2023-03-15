<template>
<!-- 价格页 -->
  <div>
    <div id="container">
            <!-- 头部 -->
            <header class="header clearfix" id="header">
                <div class="container1">
                    <div class="logo">
                        <router-link title="无锡英领之途信息科技有限公司" :to="{path:'/showPage'}">
                            <img title="EintooAR" alt="" src="@assets/showPage/ARlogo.png" />
                            <span>EintooAR</span>
                        </router-link>
                    </div>
                    <div class="header-right">
                        <router-link class="price" :to="{path:'/showPrice'}">版本套餐</router-link>
                        <router-link
              class="toLogin"
              v-if="!isLogin"
              :to="{ path: '/Login' }"
              >登录</router-link
            >
            <router-link
              class="toConsole"
              v-else-if="isLogin"
              :to="{ path: '/ProjectMenu' }"
              >去后台</router-link
            >
                    </div>
                </div>
            </header>

            <!-- 中部 -->
            <div id="main">
                <div class="container1 clearfix">
                    <div class="main-top">选择适合您的版本</div>
                    <div class="types">
                        <ul>
                            <li class="tab active">
                                基础版
                            </li>
                        </ul>
                    </div>
                    <div class="detail wow fadeInUp2">
                        <div class="basic">
                            <div class="title">AR宣传册基础版</div>
                            <div class="info">空间定位与跟踪，让你的场景呈现在地面、桌面、墙面以及空间中，与现实环境紧密结合</div>
                            <div class="price"><b>5000</b>元起</div>
                            <div><a class="toPay" href="#immConsult" @click="toggle()">立即咨询</a></div>
                        </div>
                        <div class="include">
                            <div class="title">包含服务</div>
                            <ul>
                                <li class="items">数据识别</li>
                                <li class="items">数据储存</li>
                                <li class="items">模块化使用</li>
                                <li class="items">后台管理系统</li>
                            </ul>
                        </div>
                    </div>
                    <div class="added wow fadeInUp2">
                        <div class="title">增值服务</div>
                        <div class="choose-all" @click="chooseAll">全选
                            <div class="box-out">
                                <div class="box-in" v-show="isChooseAll"></div>
                            </div>
                        </div>
                        <ul>
                            <li v-for="(item,index) in addedList" class="border clearfix" :key="index">
                                <div class="pic" @click="videoShow()"><img :src="item.img" alt=""></div>
                                <div class="item">{{item.title}}</div>
                                <div class="price"> <b>{{item.price}}</b>元/年</div>
                                <div class="buy" @click="chooseAdded(item)"> <text>选购</text>
                                    <div class="pic"><img v-show="item.choose" src="../../../assets/showPage/gou.png" alt=""></div>
                                </div>

                            </li>
                        </ul>
                        <div class="total">
                            <span> 合计: <b>{{total}}</b> 元</span>
                            <a href="#" @click="subscribe()">提交</a>
                        </div>
                    </div>
                    <!-- <div class="mask" @click="close()" v-show="videoControlPlay">
                        <video :src="videoSrc" autoplay muted width="800" height="600"></video>
                    </div> -->
                </div>
                <div class="clear"></div>


            </div>
            <!-- 立即咨询 -->
            <div id="immConsult" v-if="show">
                <div class="container1 conRegist">
                    <p class="conTitle">
                        咨询表单登记
                    </p>
                    <form class="conForm" >
                        <div class="common">
                            <div class="conClass">姓名</div>
                            <input  class="onInp" v-model="form.name" type="text" placeholder="请输入您的姓名" required @blur="checkName(form.name)">
                            </input>
                        </div>
                        <div class="common">
                            <div class="conClass">电话</div>
                            <input  class="onInp" v-model="form.tel" type="tel" placeholder="请输入您的电话" required @blur="checkTel(form.tel)">
                            </input>
                        </div>
                        <div class="common">
                            <div class="conClass">公司</div>
                            <input  class="onInp" v-model="form.company" type="text" placeholder="请输入您的公司单位名称" required @blur="checkCom(form.company)">
                            </input>
                        </div>
                        <div class="common">
                            <div class="conClass">留言</div>
                            <textarea  class="onQue" required>请输入想咨询的问题
                            </textarea>
                        </div>
                    </form>
                   <div class="formButtom">
                            <div class="submitButtom" @click="subit()">
                                提交
                            </div>
                            <div class="cancleButtom" @click="cancle()">
                                取消
                            </div>
                    </div>
                </div>
            </div>


            <!-- 底部 -->
            <div class="footer">
                <div class="container1">
                    <div ref="contact" class="contact">
                        <p><b>工作时间</b></p>
                        <p>Mon-Fri 9:00am-17:30pm</p>
                        <p><b>联系方式</b></p>
                        <p>电话：<a href="tel:0510-85168115">(0510)-85168115</a></p>
                        <p>邮箱：<a href="mailto:contact@intooar.cn">contact@intooar.cn</a></p>
                        <p>地址：江苏省无锡市滨湖区建筑西路777号A3栋5层</p>
                    </div>
                    <div class="qrCode wow fadeInUp2" data-wow-delay="1.8s">
                        <div><img src="../../../assets/showPage/er1.jpg" alt=""><br>抖音</div>
                        <div><img src="../../../assets/showPage/er2.jpg" alt=""><br>公众号</div>
                    </div>
                    <div class="copy wow fadeInUp2" data-wow-delay="0.5s">© All rights reserved. 无锡英领之途信息科技有限公司</div>
                    <div class="record wow fadeInUp2" data-wow-delay="1s">苏ICP备18046040号-1</div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      isChooseAll: false,

      addedList: [
        {
          title: '三维模型空间展示',
          price: 2500,
          choose: false,
          img: require('../../../assets/showPage/EintooAR.jpg'),
          video: ''
        },
        {
          title: 'VRShop(虚拟展会)',
          price: 5000,
          choose: false,
          img: require('../../../assets/showPage/shop.png'),
          video: ''
        }
      ],
      total: 5000,
      videoControlPlay: false,
      videoSrc: '',
      testSrc: '',
      isLogin: false,
      form: {
        name: '',
        tel: '',
        company: '',
        message: ''
      }
    }
  },
  methods: {
    //套餐页面，增值服务部分
    chooseAll: function () {
      this.isChooseAll = !this.isChooseAll
      this.addedList.forEach((item) => {
        item.choose = this.isChooseAll
      })
    },
    chooseAdded: function (item) {
      item.choose = !item.choose
    },
    // 提交订单
    subscribe() {
      if (
        localStorage.getItem('userName') &&
        localStorage.getItem('userCode')
      ) {
        // 弹出支付码

        alert('提交成功')
        // 提交次数
      } else {
        alert('请先登录')
      }
    },

    // 视频展示
    videoShow(item) {
      this.videoControlPlay = true
      this.videoSrc = item.video
    },
    close() {
      this.videoControlPlay = false
    },

    // 立即咨询抽屉式打开
    toggle() {
      // var immConsult = document.getElementById("immConsult");
      // if (immConsult.style.display == "none") {
      //   immConsult.style.display = "block";
      // } else if (immConsult.style.display == "block") {
      //   immConsult.style.display = "none";
      // } else {
      //   immConsult.style.display = "none";
      // }
      this.show = !this.show
    },
    // 验证用户名
    checkName(reg_name) {
      let regName = /^[\a-\z\A-\Z0-9\u4e00-\u9fe5]+$/
      if (!regName.test(reg_name)) {
        console.log('名字输入错误')
      }
    },
    // 验证电话
    checkTel(reg_tel) {
      let regTel = / ^1 [3|4|5|6|7|8|9][0-9]\d {8}$/
      if (!regTel.test(reg_tel)) {
        console.log('电话不合规范')
      }
    },
    // 验证公司
    checkCom(reg_com) {
      let regCom = /^[\a-\z\A-\Z0-9\u4e00-\u9fe5]+$/
      if (!regCom.test(reg_com)) {
        console.log('公司名字输入错误')
      }
    },

    // 提交表
    subit() {
      if (
        localStorage.getItem('userName') &&
        localStorage.getItem('userCode')
      ) {
        // console.log("提交成功");
        alert('提交成功')
      } else {
        alert('请先登录')
      }
    },
    // 取消提交
    cancle() {
      alert('你确定取消吗？')
      this.show = false
    }
  },
  watch: {
    addedList: {
      deep: true,
      handler(newVal) {
        var that = this
        let t = 0
        that.total = 5000
        newVal.forEach((item) => {
          t += item.choose ? item.price : 0
        })
        that.total += t
      }
    }
  }
}
</script>

<style lang="scss" scoped>
*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  font-family: 'PingFang SC', '微软雅黑', arial;
}
body,
div,
span,
h1,
h2,
h3,
h4,
h5,
h6,
p,
em,
img,
strong,
b,
small,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
sub,
sup,
tt,
var,
del,
dfn,
ins,
kbd,
q,
s,
samp,
strike,
applet,
object,
iframe,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
mark,
audio,
video,
input,
textarea,
select {
  margin: 0;
  padding: 0;
}
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Microsoft YaHei', arial;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0 auto;
  background: #fff;
  max-width: 1920px;
  -webkit-tap-highlight-color: transparent;
}
a:link,
a:visited {
  text-decoration: none;
  outline: 0;
  color: #666;
}
a:hover,
a:active,
a:focus {
  color: #666;
  text-decoration: none;
}
ul,
li {
  list-style: none;
}
ul {
  padding: 0;
}
li {
  zoom: 1;
  vertical-align: middle;
}
ol {
  margin: 0;
  padding: 0;
  padding-left: 36px;
}
fieldset,
img {
  border: 0;
}
img {
  border: 0;
  max-width: 100%;
}
div {
  outline: 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
  font-size: 100%;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
  border: 0;
  width: 100%;
}
th,
td {
  padding: 0;
}
input,
textarea {
  font-family: arial;
  font-size: 14px;
}
input {
  outline: 0;
}
textarea {
  outline: 0;
}
input[type='reset'],
input[type='button'],
input[type='submit'],
input[type='radio'] {
  cursor: pointer;
  outline: 0;
}
input[type='checkbox'],
input[type='radio'] {
  position: relative;
  vertical-align: middle;
  margin-bottom: 1px;
  margin-left: 5px;
  margin-right: 5px;
}
textarea,
input[type='email'],
input[type='date'],
input[type='password'],
input[type='text'] {
  padding: 0;
  color: #666;
  outline: 0;
}
input,
textarea {
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border-radius: 0;
  overflow-y: hidden;
  overflow-x: hidden;
}
::-webkit-input-placeholder {
  color: #d7d6d6;
}
:-moz-placeholder {
  color: #d7d6d6;
  opacity: 1;
}
::-moz-placeholder {
  color: #d7d6d6;
  opacity: 1;
}
:-ms-input-placeholder {
  color: #d7d6d6;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clear {
  clear: both;
}
.clearfix:after {
  clear: both;
  height: 0;
  content: '';
  line-height: 0;
  font-size: 0;
  display: block;
}
.pic {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.pic img {
  transition: 0.5s;
}
.pic:after {
  content: '';
  display: block;
  padding-bottom: 100%;
}
.middleCenter {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 100%;
  max-height: 100%;
  display: block;
  text-align: center;
  margin: auto;
}
.container1 {
  width: 1200px;
  margin: 0 auto;
}
/* 咨询登记 */
/* #immConsult{
  display: block;
} */
.conRegist {
  margin: 5px auto;
  width: 1200px;
  height: 677px;
  box-shadow: 0px 2px 13px 3px rgba(0, 0, 0, 0.05);
}
.conTitle {
  margin: 0 auto;
  padding-top: 35px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  height: 28px;
  font-size: 30px;
  color: #000;
}
.conForm {
  margin: 0 auto;

  margin-top: 56px;
  width: 550px;
  /* display: flex;
  flex-direction:column;
  flex-wrap:nowrap; */
}
.conForm .common {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.conClass {
  display: inline-block;
  /* width: 29px;
  height: 15px; */
  font-size: 16px;
  color: #000;
  text-align: center;
}

.conForm .onInp {
  margin-left: 51px;
  margin-top: 20px;
  width: 460px;
  height: 60px;
  background: #fbfbfb;
  border: 1px solid #eeeeee;
  border-radius: 10px;
  padding-left: 20px;
  color: #999999;
}

.conForm .onQue {
  margin-left: 50px;
  margin-top: 20px;
  margin-bottom: 60px;
  width: 460px;
  height: 150px;
  background: #fbfbfb;
  border: 1px solid #eeeeee;
  border-radius: 10px;
  padding-left: 20px;
  padding-top: 23px;
  color: #ddd;
  font-size: 14px;
}

.conRegist .formButtom {
  margin: 0 auto;
  height: 48px;
  width: 348px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.submitButtom {
  display: inline-block;
  width: 164px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  background: #829fff;
  border-radius: 24px;
  font-size: 18px;
  color: #ffffff;
}

.cancleButtom {
  display: inline-block;
  width: 164px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  background: #f7f9ff;
  border-radius: 24px;
  font-size: 18px;
  color: #aaa;
}
.video:after {
  content: '';
  width: 100%;
  height: 100%;
  //   background: url(../images/play.png) no-repeat center center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  border-radius: inherit;
  background-size: contain;
}
.video_m {
  display: none;
}
@media screen and (max-width: 768px) {
  .video_pc {
    display: none !important;
  }
  .video_m {
    display: block !important;
  }
}
// @font-face {
//   font-family: 'PingFang SC';
//   src: url('../../../../AR正式/fonts/PingFang-Jian-ChangGuiTi-2.ttf');
// }
#container {
  min-width: 1200px;
  overflow: hidden;
}
#header {
  height: 80px;
}
#header .container1 {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  height: inherit;
  align-items: center;
}
#header .container1 .logo a {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  height: 80px;
}
#header .container1 .logo a img {
  margin-right: 20px;
}
#header .container1 .logo a span {
  font-size: 20px;
  color: #020202;
}
#header .container1 .header-right {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
#header .container1 .header-right .price {
  width: 112px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  border-radius: 36px;
  background-color: #829fff;
  text-align: center;
  color: #fff;
  display: block;
}
#header .container1 .header-right .price:hover {
  background-color: #95aefe;
}
#header .container1 .header-right .price:focus {
  background-color: #698cfd;
}
#header .container1 .header-right .toLogin,
#header .container1 .header-right .toConsole {
  margin-left: 20px;
  padding: 0 15px;
  line-height: 34px;
  border-radius: 18px;
  border: 1px solid #dcdcdc;
}
#main {
  position: relative;
}
#main:after {
  content: '';
  width: 100%;
  height: 500px;
  background-color: #829fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
#main .container1 {
  padding-top: 100px;
  padding-bottom: 50px;
}
#main .container1 .main-top {
  font-size: 44px;
  color: #fff;
  font-weight: bold;
  text-align: center;
}
#main .container1 .types {
  margin-top: 50px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
}
#main .container1 .types .tab {
  width: 160px;
  height: 56px;
  color: #fff;
  font-size: 20px;
  border-radius: 28px;
  margin: 0 20px;
  font-weight: bold;
  text-align: center;
  line-height: 56px;
  cursor: pointer;
}
#main .container1 .types .active {
  background-color: #fff;
  color: #829fff;
}
#main .container1 .detail {
  width: 40%;
  background-color: #f7f9ff;
  padding: 50px 40px;
  border-radius: 10px;
  margin-top: 50px;
  float: left;
}
@media screen and (max-width: 768px) {
  #main .container1 .detail {
    width: 100%;
  }
}
#main .container1 .detail .basic {
  width: 100%;
  text-align: center;
}
#main .container1 .detail .basic .title {
  font-size: 24px;
  color: #020202;
}
#main .container1 .detail .basic .info {
  font-size: 16px;
  color: #999;
  margin: 20px 0;
}
#main .container1 .detail .basic .price {
  font-size: 16px;
}
#main .container1 .detail .basic .price b {
  font-size: 48px;
  color: #020202;
}
#main .container1 .detail .basic .toPay {
  width: 164px;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  border-radius: 48px;
  background-color: #829fff;
  text-align: center;
  color: #fff;
  display: block;
  margin: 30px auto;
  font-size: 18px;
}
#main .container1 .detail .basic .toPay:hover {
  background-color: #95aefe;
}
#main .container1 .detail .basic .toPay:focus {
  background-color: #698cfd;
}
#main .container1 .detail .include {
  border-top: 1px solid #eee;
  padding-top: 20px;
}
#main .container1 .detail .include .title {
  font-size: 24px;
  color: #020202;
  margin-bottom: 20px;
}
#main .container1 .detail .include .items {
  display: block;
  padding-left: 20px;
  margin-bottom: 20px;
  font-size: 20px;
  background: url('../../../assets/showPage/gou.png') no-repeat left center;
  background-size: 15px;
}
#main .container1 .added {
  width: 55%;
  float: right;
  position: relative;
  margin-top: 50px;
  background-color: #fff;
  border-radius: 10px;
  padding: 50px 40px;
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.05);
}
@media screen and (max-width: 768px) {
  #main .container1 .added {
    width: 100%;
    padding: 30px 15px;
  }
}
#main .container1 .added .title {
  font-size: 24px;
  color: #020202;
}
#main .container1 .added .choose-all {
  position: absolute;
  right: 40px;
  top: 50px;
  font-size: 18px;
  line-height: 36px;
  color: #666;
  padding-right: 40px;
}
@media screen and (max-width: 768px) {
  #main .container1 .added .choose-all {
    top: 30px;
  }
}
#main .container1 .added .choose-all .box-out {
  width: 28px;
  height: 28px;
  border: 1px solid #eee;
  position: absolute;
  right: 4px;
  top: 4px;
}
#main .container1 .added .choose-all .box-in {
  width: 16px;
  height: 16px;
  background-color: #829fff;
  margin: 5px;
}
#main .container1 .added .border {
  border: 1px solid #eee;
  padding: 20px;
  margin: 20px 0;
  position: relative;
}
@media screen and (max-width: 768px) {
  #main .container1 .added .border {
    padding: 10px;
  }
}
#main .container1 .added .border > .pic {
  width: 200px;
  height: 200px;
  float: left;
  margin-right: 20px;
  background: rgba(0, 0, 0, 0.05);
}
@media screen and (max-width: 768px) {
  #main .container1 .added .border > .pic {
    width: 150px;
    height: 150px;
  }
}
#main .container1 .added .border > .pic img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
#main .container1 .added .border .item {
  font-size: 20px;
  color: #020202;
}
#main .container1 .added .border .price {
  position: absolute;
  left: 240px;
  bottom: 20px;
  font-size: 16px;
  color: #999;
}
@media screen and (max-width: 768px) {
  #main .container1 .added .border .price {
    left: 180px;
  }
}
#main .container1 .added .border .price b {
  font-size: 44px;
  line-height: 50px;
  color: #020202;
}
@media screen and (max-width: 1200px) {
  #main .container1 .added .border .price b {
    font-size: 30px;
    line-height: 40px;
  }
}
@media screen and (max-width: 768px) {
  #main .container1 .added .border .price b {
    font-size: 22px;
    line-height: 34px;
  }
}
#main .container1 .added .border .buy {
  position: absolute;
  bottom: 25px;
  right: 20px;
  font-size: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
}
@media screen and (max-width: 1200px) {
  #main .container1 .added .border .buy {
    font-size: 16px;
    right: 10px;
  }
}
@media screen and (max-width: 470px) {
  #main .container1 .added .border .buy text {
    display: none;
  }
}
#main .container1 .added .border .buy .pic {
  width: 20px;
  height: 20px;
  margin: 0 10px;
  border: 1px solid #829fff;
  border-radius: 10px;
  background-color: #fff;
}
@media screen and (max-width: 768px) {
  #main .container1 .added .border .buy .pic {
    margin: 0;
  }
}
#main .container1 .added .border .buy .pic img {
  width: 18px;
  height: 18px;
  display: block;
}
#main .container1 .added .total {
  font-size: 18px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
}
#main .container1 .added .total b {
  font-size: 30px;
}
#main .container1 .added .total a {
  width: 164px;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  border-radius: 48px;
  background-color: #829fff;
  text-align: center;
  color: #fff;
  display: block;
  font-size: 18px;
}
#main .container1 .added .total a:hover {
  background-color: #95aefe;
}
#main .container1 .added .total a:focus {
  background-color: #698cfd;
}
#main .container1 .mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
}
#main .container1 .mask video {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #eee;
}

.footer {
  background-color: #020202;
  padding: 80px 0 120px;
  overflow: hidden;
}
.footer .contact {
  text-align: center;
}
.footer .contact p,
.footer .contact p a {
  font-size: 18px;
  line-height: 1.6;
  color: #e8e8e8;
}
.footer .contact p b {
  font-size: 20px;
}
.footer .qrCode {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  margin-top: 40px;
}
.footer .qrCode div {
  margin: 0 15px;
  width: 110px;
  font-size: 16px;
  line-height: 28px;
  color: #e0e0e0;
  text-align: center;
}
.footer .qrCode div img {
  margin-bottom: 15px;
}
.footer .copy {
  margin-top: 80px;
  font-size: 16px;
  line-height: 28px;
  color: #eef6ef;
  text-align: center;
}
.footer .record {
  margin: 20px 0 45px;
  font-size: 16px;
  line-height: 28px;
  color: #eef6ef;
  text-align: center;
}
</style>