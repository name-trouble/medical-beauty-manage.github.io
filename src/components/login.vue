<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin" style="background-color:#eee;">
        <!-- <div class="manage_header">
          <div class="top">
            <i class="icon iconfont icon-xinmeixin" style="font-size: 30px;"></i>
            <span class="manage_tit">波士邦后台管理系统</span>
          </div>
        </div> -->
        <el-col class="manage_mid">
          <el-col class="manage_form">
            <div class="mini_header">
              <div class="imgWrap">
                <img src="../assets/img/login_logo.png" alt="">
              </div>
            </div>
            <div class="form">
              <div>
                <p class="login-tip">欢迎登录</p>
              </div>
              <el-form :model="loginForm" :rules="rules" ref="loginForm">
                <el-form-item prop="username">
                  <el-input
                    v-model="loginForm.username"
                    placeholder="用户名"
                    @keyup.enter.native="submitForm('loginForm')"
                    size="large"
                  ></el-input>
                    <el-button class="primary">获取验证码</el-button>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" name="txtPassword" style="display:none"></el-input>
                  <el-input
                    v-model="loginForm.password"
                    type="password"
                    name="txtPassword"
                    placeholder="验证码"
                    autocomplete="off"
                    size="large"
                    @keyup.enter.native="submitForm('loginForm')"
                  ></el-input>
                  <!-- <el-input type="text" placeholder="验证码" v-model="loginForm.password" @focus="changeType" @keyup.enter.native="submitForm('loginForm')"></el-input> -->
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="submitForm('loginForm')"
                    class="submit_btn full_btn"
                    :loading="loading"
                  >登陆</el-button>
                </el-form-item>
                <!-- <el-form-item>
                  <span style="font-size: 12px;color: #AAAAAA;float:right;line-height: 1">忘记验证码</span>
                </el-form-item> -->
              </el-form>
            </div>
          </el-col>
        </el-col>
        <!-- <footer class="manage_footer">
          <p class="footer_tit">波士邦线上管理平台</p>
          <p class="footer_tit">ADD：南京市溧水区永阳街道秦淮大道288号</p>
          <p class="footer_tit">copyright©2019 XXX</p>
        </footer> -->
      </section>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import { login, getUserById, getMenuByUserId, GetToken } from "../api/myData";
import { mapState } from "vuex";
import {
  setStore,
  getStore,
  setCookie,
  getCookie,
  delCookie
} from "@/config/mUtils";
import { xmxUrl } from "@/config/env";
export default {
  data() {
    return {
      loading: false,
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      showLogin: false
    };
  },
  mounted() {
    this.showLogin = true;
    // this.checkLogin()
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    changeType(event) {
      event.target.type = "password";
    },

    // checkLogin(){
    //     if(getCookie("userName")&&getCookie("userId")){
    //         let _this = this
    //         this.$message({
    //             message: '检测到您已登录,一秒后进行转跳',
    //             type: 'success',
    //             duration:1000
    //         });
    //         setTimeout(()=>{
    //             _this.$router.push('/menu/index')
    //         },1000)
    //     }
    // },
    // ...mapActions(['getAdminData']),

    async submitForm(formName) {
      this.loading = true;
      try {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            let res = await login(
              this.loginForm.username,
              this.loginForm.password
            );
            this.loading = false;
            if (res.UserId) {
              // this.$message({ type: 'success',duration:1000, message: '登录成功,正在进行转跳' });

              this.$store.commit("saveUserInfo", res);
              setCookie("userName", res.RealName);
              setCookie("realName", res.UserName);
              setCookie("pass", this.loginForm.password);
              setCookie("userId", res.UserId);
              setCookie("userImg", res.ImgUrl);
              setCookie("BranchCode", res.BranchCode);
              setCookie("userCode", res.UserCode);
              setCookie("hospitalCode", res.HospitalCode);
              setStore("typeCode", res.TypeCode);
              setCookie("reportClass", res.ReportClass);
              setCookie("serTypeCode", res.SerTypeCode); //职位code
              setCookie("isSpecial", res.IsSpecial + "");
              setCookie("serviceManCode", res.ServiceManCode);
              this.getMenus(res.UserId, res.SignToken);
            } else this.$message({ type: "error", message: res.messge });
          } else {
            this.loading = false;
            this.$notify.error({
              title: "错误",
              message: "请输入正确的用户名验证码",
              offset: 100
            });
            return false;
          }
        });
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },

    async getMenus(userId, params) {
      setCookie("token", params);
      delCookie("bread");
      sessionStorage.clear();
      // let res = await getMenuByUserId(userId)
      // if (res && res.length > 0) {
      //     let menus = []
      //     res.forEach(item => {
      //         menus.push(item["NavigateUrl"])
      //     })
      //     this.$store.commit('saveUserMenu', menus)
      //     //  console.log("登录开始转跳",new Date())
      //     this.$router.push('/menu/index')
      // }
      this.$router.push("/menu/index");
    },
    async getToken() {
      try {
        let res = await GetToken({ userid: getCookie("userId") });
        this.getMenus(getCookie("userId"), res);
      } catch (err) {}
    }
  }
};
</script>

<style lang="less" scoped>
@import "../style/mixin.less";

.login_page {
  min-height: 800px;
  background-color: #3d404b;
}

.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;

  p {
    font-size: 34px;
    color: #fff;
  }
}

.form_contianer {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .mini_header{
    .imgWrap{
      width:394px;
      height:57px;
    }
  }
}

.tip {
  font-size: 12px;
  color: red;
  text-align: center;
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}

.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}

.login-tip {
  font-size: 40px;
  color: #111;
  font-weight: bold;
  line-height: 40px;
  margin: 0px 0 24px 0;
}

.platform-mes {
  text-align: left;
  padding: 0 40px 0 20px;
  line-height: 26px;
}

.manage_header {
  width: 100%;
  height: 80px;
  background: #fff;
  line-height: 80px;
  color: #dba688;
  overflow: hidden;
}

.top {
  margin-left: 20px;
  float: left;
}

.manage_tit {
  font-size: 26px;
}

.back_home {
  float: right;
  font-size: 14px;
  color: #231f20;
  margin-right: 20px;
}

.manage_footer {
  width: 100%;
  height: 174px;
  // margin-top: -174px;
  clear: both;
  padding: 30px 0 0 120px;
  box-sizing: border-box;
  background: #32373f;
}

.footer_tit:nth-child(1) {
  font-size: 16px;
  color: #9b9ea0;
  margin-bottom: 10px;
  line-height: 22px;
}

.footer_tit:nth-child(2) {
  font-size: 12px;
  color: #ffffff;
  margin-bottom: 10px;
}

.footer_tit:nth-child(3) {
  font-size: 12px;
  color: #ffffff;
}

.manage_pic {
  float: left;
  width: auto;
  margin: 69px 0 0 168px;
}

.manage_form {
  margin-top: 105px;
  padding-left:124px;
}
.form {
  width: 380px;
  // margin: 0 auto;
  margin-top:100px;
  padding: 45px 25px 0 25px;
  box-sizing: border-box;
  // background: #fff;
  height: 345px;
}
@media (max-width: 768px) {
  .manage_form {
    margin-top: -20px;
  }
}
.full_btn {
  width: 100%;
  margin-top:18px;
  background: #1890FF;
  border-color: #d6d4d4;
  font-size: 14px;
  height: 50px;
  outline: none;
  color: #fff;
}

.manage_mid {
  height: 100%;
  width: 100%;
  background:url('../assets/img/login_img_bg@2x.png');
  background-origin: content-box;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 800px;
  box-sizing: border-box;
}
</style>
