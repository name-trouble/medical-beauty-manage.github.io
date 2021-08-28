<template>
  <div class="header_container">
    <div class="platform" separator="/">
      <div class="imgWrap">
        <img src="../assets/img/top_logo.png" alt="" />
      </div>
    </div>

    <div class="mes_container">
      <div class="customerIpt">
        <input
          v-model="customerCode"
          ref="inptFocus"
          placeholder="扫描客户二维码"
          @keydown="iptChange"
          class="customerSear"
        />
      </div>
      <div>
        <el-dropdown @command="handleCommand" menu-align="start" class="person">
          <div class="flex-start-center">
            <div class="avator imgWrap pointer">
              <img src="../assets/img/man.jpg" width="36" height="36px" />
            </div>
			 <div class="name">{{ name }}</div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="home">首页</el-dropdown-item>
            <el-dropdown-item command="editPass">修改密码</el-dropdown-item>
            <el-dropdown-item command="feedBack">问题反馈</el-dropdown-item>
            <el-dropdown-item command="singout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
//import { signout } from '@/api/getData'
import { baseImgPath } from "@/config/env";
import { mapActions, mapState } from "vuex";
import {
  delCookie,
  getCookie,
  removeStore,
  delCookieAll,
} from "@/config/mUtils";
import { UpdateUserPassword } from "@/api/myData";

export default {
  data() {
    return {
      baseImgPath,
      imgPath: "",
      name: "",
      customerCode: "",
      cusMes: {},
      userImg: getCookie("userImg"),
    };
  },

  computed: {
    ...mapState(["userInfo"]),
  },
  created() {},
  mounted() {
    this.name = getCookie("userName");
    if (
      getCookie("userImg") &&
      getCookie("userImg") != "null" &&
      getCookie("userImg") != "undefined"
    ) {
      this.imgPath = getCookie("userImg");
    } else {
      this.imgPath = false;
    }
  },
  methods: {
    ...mapActions(["getAdminData"]),
    async handleCommand(command) {
      if (command == "home") {
        this.$router.push("/menu/index");
      }
      if (command == "singout") {
        //				const res = await signout()

        if (1 == 1) {
          this.$message({
            type: "success",
            message: "退出成功",
          });
          //退出删除 cookie
          this.delCookie();
          this.$router.push("/login");
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      }
      if (command == "editPass") {
        this.$emit("editPass");
      }
      if (command == "feedBack") {
        this.$emit("feedBack", {
          code: 15430,
          icon: "null",
          index: "questionF",
          parentCode: 11233,
          text: "问题反馈",
        });
        this.$router.push("/menu/questionF");
      }
    },
    delCookie() {
      delCookie("userName");
      delCookie("pass");
      delCookie("userId");
      delCookie("userImg");
      delCookie("tabs");
      delCookie("lastPage");
      delCookie("index");
      removeStore("typeCode");
      delCookieAll();
      sessionStorage.clear();
      window.localStorage.clear();
    },

    iptChange(val) {
      if (val.code == "Enter") {
        let _this = this;
        setTimeout(() => {
          _this.$emit("openCustomer", _this.customerCode);
        }, 50);
      }
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
@import "../style/mixin";
.header_container {
  position: relative;
  background: #2a58ad;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  // display: flex;
}

.avator {
  overflow: hidden;
  border-radius: 50%;
  margin-right: 8px;
}

.el-dropdown-menu__item {
  text-align: center;
}

.platform {
  width: 260px;
  font-size: 18px;
  color: #e1b087;
  line-height: 50px;
  .imgWrap {
    width: 220px;
    height: 64px;
  }
}

.person {
  // background: url("../assets/img/person.jpg") no-repeat center;
  background-size: 100%;
  border-radius: 50%;
  margin-left: 37px;
  /*margin-top: -10px;*/
}
.mes_container {
  position: relative;
  display: flex;
  align-items: center;
  .avator.imgWrap {
    width: 24px;
    height: 24px;
  }
}
.name {
  font-size: 12px;
  height: 17px;
  overflow: hidden;
  color: #fff;
  margin-right: 20px;
  text-align: center;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  cursor: pointer;
}
.customerSear {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #a5a8b326;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #a5a8b326;
  box-sizing: border-box;
  color: #c5c9cc;
  font-size: inherit;
  height: 30px;
  width: 170px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.customerSear::-webkit-input-placeholder {
  color: #c5c9cc;
}
.customerSear::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #c5c9cc;
}
.customerSear:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #c5c9cc;
}
.customerSear:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #c5c9cc;
}
</style>
