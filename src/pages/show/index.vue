<template>
  <!-- 展示页 -->
  <div>
    <div id="container">
      <!-- 头部 -->
      <div class="header clearfix" id="header">
        <div class="container1">
          <div class="logo">
            <router-link
              title="无锡英领之途信息科技有限公司"
              :to="{ path: '/showPage' }"
            >
              <img title="EintooAR" alt="" src="@assets/showPage/ARlogo.png" />
              <span>EintooAR</span>
            </router-link>
          </div>

          <div class="header-right">
            <router-link class="price" :to="{ path: '/showPrice' }">
              版本套餐
            </router-link>
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
      </div>

      <!-- 中部 -->
      <div class="banner">
        <div class="container1">
          <!-- <div class="bancon"> -->
          <div class="banner-left wow fadeInLeft">
            <p>AR 画册</p>
            <p>
              EINTOO<br />
              the Future
            </p>
            <a class="toLogin" href="https://www.arsnowslide.com/#/Login"
              >立即体验</a
            >
          </div>
          <div class="banner-right wow fadeInRight">
            <div class="video video_pc">
              <video
                src="../../assets/showPage/videos/02.mp4"
                autoplay
                muted
                loop
                preload="auto"
              ></video>
            </div>
            <!-- <div class="video video_m">
              <video
                src="videos/02.mp4"
                controls
                muted
                loop
                preload="auto"
              ></video>
            </div> -->
          </div>
          <!-- </div> -->
        </div>
      </div>
      <div class="album">
        <div class="container1">
          <ul class="album-left wow fadeInLeft">
            <li
              class="box video"
              :class="ol[index]"
              v-for="(item, index) in olVideos"
              :key="index"
              @click="change(index)"
            >
              <video
                :src="item.src"
                ref="olVideo"
                @ended="onEnded(index)"
                @click="pause(index)"
                preload="auto"
                muted
              ></video>
              <div
                class="playicon"
                :class="{ playiconShow: playiconShow }"
                @click="play(index)"
              >
                <img
                  class="middleCenter"
                  src="../../assets/showPage/play.png"
                  alt=""
                />
              </div>
            </li>
          </ul>
          <div class="album-right">
            <div class="title wow slideInRight" data-wow-delay="0s">
              {{ ol_t }}
            </div>
            <p class="info wow slideInRight" data-wow-delay="0.2s">
              {{ ol_i }}
            </p>
            <div class="package wow slideInRight" data-wow-delay="0.5s">
              套餐价<span class="price">{{ ol_p }}<i>/年</i></span>
            </div>
            <a
              class="toLogin wow slideInRight"
              data-wow-delay="1s"
              href="https://www.arsnowslide.com/#/Login"
              >立即体验</a
            >
          </div>
        </div>
      </div>
      <div class="service">
        <div class="container1">
          <div class="title wow fadeInUp2">服务保障</div>
          <div class="services">
            <ul>
              <li
                class="box wow fadeInUp2"
                v-for="(item, index) in service"
                :key="index"
                :data-wow-delay="index * 0.3 + 's'"
              >
                <img :src="item.src" alt="" />
                <p>{{ item.text }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="brochure">
        <div class="container1">
          <div class="title wow fadeInUp2">AR宣传册</div>
          <div class="info wow fadeInUp2" data-wow-delay="0.2s">
            空间定位与跟踪，让你的场景呈现在地面、桌面、墙面以及空间中，与现实环境紧密结合
          </div>
          <a
            class="toLogin wow fadeInUp2"
            data-wow-delay="0.4s"
            href="https://www.arsnowslide.com/#/Login"
            >立即体验</a
          >
          <div class="video wow fadeInUp2" data-wow-delay="0.6s">
            <video
              :src="brochureVideo"
              controls
              muted
              preload="auto"
              @pause="videoPause"
              @play="videoPlay"
            ></video>
            <div v-if="videoPauseShow" @click="videoPlay" class="play-btn">
              <img src="../../assets/showPage/play.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <div class="footer">
      <div class="container1">
        <div ref="contact" class="contact">
          <p><b>工作时间</b></p>
          <p>Mon-Fri 9:00am-17:30pm</p>
          <p><b>联系方式</b></p>
          <p>电话：<a href="tel:0510-85168115">(0510)-85168115</a></p>
          <p>
            邮箱：<a href="mailto:contact@intooar.cn">contact@intooar.cn</a>
          </p>
          <p>地址：江苏省无锡市滨湖区建筑西路777号A3栋5层</p>
        </div>
        <div class="qrCode wow fadeInUp2" data-wow-delay="1.8s">
          <div>
            <img src="../../assets/showPage/er1.jpg" alt="" /><br />抖音
          </div>
          <div>
            <img src="../../assets/showPage/er2.jpg" alt="" /><br />公众号
          </div>
        </div>
        <div class="copy wow fadeInUp2" data-wow-delay="0.5s">
          © All rights reserved. 无锡英领之途信息科技有限公司
        </div>
        <div class="record wow fadeInUp2" data-wow-delay="1s">
          苏ICP备18046040号-1
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
      videoPauseShow: true,
      brochureVideo: require('../../assets/showPage/videos/07.mp4'),
      service: [
        {
          src: require('@assets/showPage/icon1.png'),
          text: '多重认证可靠安全'
        },
        { src: require('@assets/showPage/icon2.png'), text: '可视化编辑' },
        {
          src: require('../../assets/showPage/icon3.png'),
          text: '多种触发控制'
        },
        {
          src: require('../../assets/showPage/icon4.png'),
          text: '空间定位与跟踪'
        },
        {
          src: require('../../assets/showPage/icon5.png'),
          text: '沉浸式的AR环境'
        }
      ],
      olVideos: [
        {
          src: require('../../assets/showPage/videos/industry.mp4'),
          t: '电子商务',
          i: '从2D图片到现实环境3D体验,更好传达商品独特之处,吸引用户提前加入购物车',
          p: '5000'
        },
        {
          src: require('../../assets/showPage/videos/clothing.mp4'),
          t: '沉浸体验',
          i: '从2D图片到现实环境3D体验,更好传达商品独特之处,吸引用户提前加入购物车',
          p: '6000'
        },
        {
          src: require('../../assets/showPage/videos/car.mp4'),
          t: '营销工具',
          i: '从2D图片到现实环境3D体验,更好传达商品独特之处,吸引用户提前加入购物车',
          p: '8000'
        }
      ],
      ol: ['left', 'center', 'right'],
      ol_t: '电子商务',
      ol_i: '从2D图片到现实环境3D体验,更好传达商品独特之处,吸引用户提前加入购物车',
      ol_p: '5000',
      playiconShow: true,
      isChooseAll: false,
      addedList: [
        {
          title: '三维模型空间展示',
          price: 2500,
          choose: false,
          img: '../images/EintooAR.jpg',
          video: ''
        },
        {
          title: 'VRShop(虚拟展会)',
          price: 5000,
          choose: false,
          img: '../images/shop.png',
          video: ''
        }
      ],
      total: 5000,
      videoControlPlay: false,
      videoSrc: '',
      testSrc: '',
      isLogin: false
    }
  },

  methods: {
    //brochure部分 视频控制
    videoPlay() {
      this.videoPauseShow = false
    },
    videoPause() {
      this.videoPauseShow = true
    },
    //album部分 视频切换及控制
    change(index) {
      var that = this
      var arr = []
      function changeRight() {
        for (var i = 0; i < that.ol.length; i++) {
          that.$refs.olVideo[i].pause()
          that.$refs.olVideo[i].currentTime = 0
          if (i == 0) {
            arr[i] = that.ol[2]
          } else {
            arr[i] = that.ol[i - 1]
          }
        }
      }
      function changeLeft() {
        for (var i = 0; i < that.ol.length; i++) {
          that.$refs.olVideo[i].pause()
          that.$refs.olVideo[i].currentTime = 0
          if (i == 2) {
            arr[i] = that.ol[0]
          } else {
            arr[i] = that.ol[i + 1]
          }
        }
      }
      if (that.ol[index] == 'right') {
        changeRight()
        that.ol_t = that.olVideos[index].t
        that.ol_i = that.olVideos[index].i
        that.ol_p = that.olVideos[index].p
        that.ol = arr
        that.$refs.olVideo[index].play()
        that.playiconShow = false
      } else if (that.ol[index] == 'left') {
        changeLeft()
        that.ol_t = that.olVideos[index].t
        that.ol_i = that.olVideos[index].i
        that.ol = arr
        that.$refs.olVideo[index].play()
        that.playiconShow = false
      }
    },
    pause(index) {
      var that = this
      const video = this.$refs.olVideo[index]
      video.pause()
      that.playiconShow = true
    },
    play(index) {
      var that = this
      const video = this.$refs.olVideo[index]
      video.play()
      that.playiconShow = false
    },
    //album部分 视频轮播
    onEnded(index) {
      var that = this
      var arr = []
      for (var i = 0; i < that.ol.length; i++) {
        that.$refs.olVideo[i].pause()
        that.$refs.olVideo[i].currentTime = 0
        if (i == 0) {
          arr[i] = that.ol[2]
        } else {
          arr[i] = that.ol[i - 1]
        }
      }
      that.ol_t = that.olVideos[index].t
      that.ol_i = that.olVideos[index].i
      that.ol = arr
      index = index == 2 ? 0 : index + 1
      that.$refs.olVideo[index].play()
      that.playiconShow = false
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
  background: url('../../assets/showPage/play.png') no-repeat center center;
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
.banner {
  background: url('../../assets/showPage/bg1.png') no-repeat;
  width: 100%;
  padding-bottom: 570px;
}
.banner .container1 {
  position: relative;
}
.banner .container1 .banner-left {
  position: absolute;
  left: 10px;
  top: 120px;
  width: 30%;
}
.banner .container1 .banner-left p {
  color: #829fff;
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 2px;
  line-height: 50px;
}
.banner .container1 .banner-left p:first-child {
  font-size: 30px;
  letter-spacing: 1px;
}
.banner .container1 .banner-left .toLogin {
  width: 164px;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  border-radius: 48px;
  background-color: #829fff;
  text-align: center;
  color: #fff;
  display: block;
  margin-top: 35px;
}
.banner .container1 .banner-left .toLogin:hover {
  background-color: #95aefe;
}
.banner .container1 .banner-left .toLogin:focus {
  background-color: #698cfd;
}
.banner .container1 .banner-right {
  position: absolute;
  width: 70%;
  top: 55px;
  right: 0;
}
.banner .container1 .banner-right .video {
  width: 100%;
  height: auto;
  border-radius: 25px;
}
.banner .container1 .banner-right .video video {
  width: inherit;
  height: inherit;
  border-radius: inherit;
  display: block;
  object-fit: fill;
}
.banner .container1 .banner-right .video:after {
  background: url('../../assets/showPage/vbg1.png') no-repeat center center;
  background-size: contain;
}
.album {
  background: url('../../assets/showPage/logo-bg.png') no-repeat;
  width: 100%;
  padding-bottom: 80px;
  background-position: center center;
}
.album .container1 {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.album .container1 .album-left {
  margin-top: 70px;
  position: relative;
  width: 594px;
  height: 500px;
}
.album .container1 .album-left .box {
  position: absolute;
  top: 50%;
  transition: all 0.5s ease;
  width: 220px;
}
.album .container1 .album-left .box .playicon {
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 25px;
  position: absolute;
  top: 0;
  left: 0;
}
.album .container1 .album-left .center {
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  z-index: 10;
}
.album .container1 .album-left .center .playiconShow {
  z-index: 20;
}
.album .container1 .album-left .left {
  left: 0;
  transform: translateY(-50%) scale(0.85);
  z-index: 1;
}
.album .container1 .album-left .right {
  left: calc(100% - 220px);
  transform: translateY(-50%) scale(0.85);
  z-index: 1;
}
.album .container1 .album-left .video {
  width: 225px;
  height: 400px;
  border-radius: 25px;
}
.album .container1 .album-left .video video {
  width: inherit;
  height: inherit;
  border-radius: inherit;
  display: block;
  object-fit: fill;
}
.album .container1 .album-left .video:after {
  background: url('../../assets/showPage/vbg2.png') no-repeat;
  background-size: contain;
}
.album .container1 .album-right {
  margin-top: 190px;
  margin-right: 160px;
  text-align: right;
  width: 440px;
}
.album .container1 .album-right .title {
  font-size: 46px;
  text-align: center;
  letter-spacing: 2px;
  color: #020202;
  line-height: 50px;
  text-align: right;
}
.album .container1 .album-right .info {
  font-size: 20px;
  text-align: center;
  letter-spacing: 2px;
  color: #020202;
  line-height: 50px;
  text-align: right;
  letter-spacing: 1px;
  margin-top: 30px;
}
.album .container1 .album-right .package {
  color: #020202;
  font-size: 16px;
  margin-top: 20px;
}
.album .container1 .album-right .package .price {
  color: #829fff;
  font-size: 20px;
}
.album .container1 .album-right .package .price i {
  font-style: normal;
  font-size: 16px;
}
.album .container1 .album-right .toLogin {
  width: 164px;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  border-radius: 48px;
  background-color: #829fff;
  text-align: center;
  color: #fff;
  display: block;
  margin-top: 35px;
  display: inline-block;
}
.album .container1 .album-right .toLogin:hover {
  background-color: #95aefe;
}
.album .container1 .album-right .toLogin:focus {
  background-color: #698cfd;
}
.service {
  position: relative;
  padding-bottom: 100px;
}
.service:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 280px;
  width: 100%;
  background-color: #829fff;
  z-index: -1;
}
.service .container1 {
  padding-top: 20px;
}
.service .container1 .title {
  color: #fff;
  font-size: 30px;
  line-height: 50px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 2px;
}
.service .container1 .services {
  margin-top: 60px;
}
.service .container1 .services ul {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.service .container1 .services ul .box {
  background-color: #fff;
  border-radius: 10px;
  padding: 22px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.05) 2px 0px 12px;
  transition: all 0.5s ease;
}
.service .container1 .services ul .box img {
  width: 150px;
  height: 150px;
  border-radius: 10px;
  margin: 0 auto 15px;
  display: block;
}
.service .container1 .services ul .box p {
  font-size: 14px;
  text-align: center;
  letter-spacing: 2px;
  color: #020202;
  line-height: 50px;
  transition: all 0.5s ease;
}
.service .container1 .services ul .box:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 2px 0px 12px;
}
.service .container1 .services ul .box:hover p {
  color: #829fff;
}
.brochure {
  padding: 50px 0 140px;
}
.brochure .container1 .title {
  font-size: 40px;
  text-align: center;
  letter-spacing: 2px;
  color: #020202;
  line-height: 50px;
}
.brochure .container1 .info {
  font-size: 20px;
  text-align: center;
  letter-spacing: 2px;
  color: #020202;
  line-height: 50px;
}
.brochure .container1 .toLogin {
  width: 164px;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  border-radius: 48px;
  background-color: #829fff;
  text-align: center;
  color: #fff;
  display: block;
  margin: 10px auto 30px;
}
.brochure .container1 .toLogin:hover {
  background-color: #95aefe;
}
.brochure .container1 .toLogin:focus {
  background-color: #698cfd;
}
.brochure .container1 .video {
  width: 1024px;
  height: auto;
  border-radius: 25px;
  margin: 0 auto;
  position: relative;
}
.brochure .container1 .video video {
  width: inherit;
  height: inherit;
  border-radius: inherit;
  display: block;
  object-fit: fill;
}
.brochure .container1 .video:after {
  background: url('../../assets/showPage/vbg5.png') no-repeat center center;
  background-size: 100% 100%;
}
.brochure .container1 .video .play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
@media screen and (max-width: 768px) {
  .brochure .container1 .video .play-btn {
    display: none;
  }
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
@font-face {
  font-family: 'PingFang SC';
  // src: url('../../../AR正式/fonts/PingFang-Jian-ChangGuiTi-2.ttf');
}
@media all and (max-width: 1200px) {
  #container {
    width: 100%;
    min-width: unset;
  }
  .container1 {
    width: 100%;
    padding: 0 10px;
  }
  .banner .container1 .banner-right {
    right: 20px;
  }
}
@media all and (max-width: 768px) {
  .banner {
    padding-bottom: unset;
  }
  .banner .container1 {
    position: unset;
    padding: 0;
  }
  .banner .container1 .banner-left {
    display: none;
  }
  .banner .container1 .banner-right {
    position: unset;
    width: 100%;
    height: 100%;
  }
  .banner .container1 .banner-right .video {
    border-radius: 0;
  }
  .album {
    height: auto;
  }
  .album .container1 {
    flex-wrap: wrap;
    justify-content: center;
  }
  .album .container1 .album-left {
    margin: 0;
  }
  .album .container1 .album-right {
    margin: 20px;
    text-align: center;
  }
  .album .container1 .album-right .info,
  .album .container1 .album-right .title {
    text-align: center;
  }
  .service {
    padding-bottom: 0;
  }
  .service .container1 .services {
    overflow-x: auto;
  }
  .service .container1 .services ul {
    width: 1200px;
  }
  .service .container1 .services ul .box {
    margin: 0 10px 10px;
  }
  .brochure {
    padding-bottom: 0;
  }
  .brochure .container1 {
    padding: 0;
  }
  .brochure .container1 .info {
    font-size: 16px;
    line-height: 1.6;
    margin-top: 10px;
    padding: 0 10px;
  }
  .brochure .container1 .video {
    width: 100%;
    border-radius: 0;
  }
  .footer {
    padding: 30px 10px;
  }
  .footer .qrCode {
    animation-delay: 1s !important;
  }
  .footer .copy {
    margin-top: 20px;
  }
  .footer .record {
    margin-bottom: 0;
  }
}
</style>