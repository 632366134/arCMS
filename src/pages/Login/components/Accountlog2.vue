<template>
    <div>
        <div class="left">
            <img class="phone" src="@/assets/phone.png" />
            <el-input v-model="form.tel" placeholder="手机号"></el-input>

            <img class="pwicon" src="@/assets/pw.png" />
            <div class="yan">
                <el-input
                class="yanzhen"
                v-model="form.sms"
                placeholder="验证码"
            ></el-input>

            <el-button  v-show="sendAuthCode" class="getyanzhen" @click="getAuthCode"
                >获取验证码</el-button
            >
            <el-button v-show="!sendAuthCode" class="auth_text">
                <span>{{ auth_time }} </span>
                s后重新发送</el-button
            >
            </div>
            
        </div>

        <div class="bottom" style="text-align: left">
            <el-checkbox class="auto" v-model="checked" >
                下次自动登录</el-checkbox
            >
        </div>

        <el-button type="primary" class="log" @click="login(form)">
            登录
        </el-button>

        
    </div>
</template>

<script>
import { loginAPI } from '@/API'
export default {
    data() {
        return {
            form: { tel: '', sms: '' },
            sendAuthCode: true,
            auth_time: 0,
            checked: true,
        }
    },
    methods: {
        //
        
        getAuthCode() {
            this.sendAuthCode = false
            this.auth_time = 60
            var auth_timetimer = setInterval(() => {
                this.auth_time--
                if (this.auth_time <= 0) {
                    this.sendAuthCode = true
                    clearInterval(auth_timetimer)
                }
            }, 1000)
        },

        login(form) {
            loginAPI.AdminLogin({
                managerUserAccount: this.form.tel,
                password: this.form.sms,
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.el-button {
    margin-left: 10px;
    border-radius: 5px;
}
.phone {
    position: absolute;
    left: 10px;
    top: 35px;
}
.left {
    text-align: left;
    padding-top: 20px;
}

.pwicon {
    position: absolute;
    left: 10px;
    top: 101px;
}
::v-deep {
    .el-input__inner:hover {
        border-color: gray;
    }
    .el-button {
        margin-top: 22px;
        background: #eeeeee;
        float: right;
    }
    .el-checkbox__inner {
        border: 1.5px solid #829fff;
        border-radius: 2px;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner{
        border-color: #829fff;
    }
}

.el-button--primary {
    border-color: transparent;
}
.el-button--primary:hover {
    border-color: #829fff;
    background: #829fff;
}
.el-tabs__active-bar {
    background-color: #829fff;
}
.el-input__inner {
    height: 46px;
    height: 46px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    padding-left: 40px;
    background-color: transparent;
}

.bottom {
    padding-top: 20px;
    padding-left: 20px;
}

.log {
    width: 360px;
    height: 50px;
    background: #829fff;
    border-radius: 5px;
    text-align: center;
    margin-left: -1px;

    margin-top: 20px;
}

.yanzhen {
    // display: flex;
    // justify-content: right;
    width: 230px;
    padding-top: 20px;
}
.getyanzhen {
    margin-top: 20px;
    height:46px
}
.auth_text{
    margin-top: 20px;
    height:46px
}

.el-checkbox__input.is-checked + .el-checkbox__label {
    color: #8f8e8e;
}
.el-button--text {
    color: #0076fe;
    text-decoration: none;
    padding: 0;
}
.el-button--primary:hover {
    background: #95aefe;
}
.el-button--primary:active {
    background: #698cfd;
}
.el-button--primary:focus {
    background: #829fff;
}

.el-button--primary {
    border-color: #829fff;
    background: #829fff;
}


</style>
