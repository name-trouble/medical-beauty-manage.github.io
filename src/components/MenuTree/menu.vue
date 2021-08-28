<template>
  <div class="manage_page fillcontain">
    <headTop
      @editPass="editPass"
      @feedBack="feedBack"
      @openCustomer="openCustomer"></headTop>
    <div class="mes-container" v-if="showMenu">
        <div class="collapseMenuBtn" style="position:absolute;top:23px;left:222px;z-index:999;" @click="isCollapse=!isCollapse">
            <img :src="iconMap[isCollapse?'extend':'unextend']" alt="" style="width: 25px">
        </div>
        <div class="body-container">
            <div :class="isCollapse?'menu-container col':'menu-container'">
                <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#2a58ad"
                    mode="vertical"
                    :collapse="isCollapse">
                    <el-submenu
                        :index="item.code + ''"
                        v-for="(item, index) in treeData"
                        :key="index">
                        <template slot="title">
                            <!--<i class="iconfont mgr15" :class="'icon-' + item.icon"></i>-->
                            <img :src="iconMap[item.icon]" alt="">
                            <span slot="title">{{ item.text }}</span>
                        </template>
                        <div v-for="(cmenu, idx) in item.childs" :key="idx">
                            <el-menu-item
                                v-if="!cmenu.childs"
                                :index="cmenu.code + ''"
                                @click="select(cmenu)">
                                <span slot="title">{{ cmenu.text }}</span>
                            </el-menu-item>
                            <el-submenu v-else :index="cmenu.code + ''">
                                <template slot="title"><span style="font-size: 12px">&nbsp;{{ cmenu.text }}&nbsp;&nbsp;&nbsp;&nbsp;</span></template>
                                <el-menu-item
                                    :index="smenu.code + ''"
                                    v-for="(smenu, i) in cmenu.childs"
                                    :key="i"
                                    @click="select(smenu)">
                                    <span slot="title">{{ smenu.text }}</span>
                                </el-menu-item>
                            </el-submenu>
                        </div>
                    </el-submenu>
                </el-menu>
            </div>
            <div class="content-container">
                <div class="tab" style="z-index: 9" ref="tab">
                    <Tabs :flg="flg" @tabChange="tabChange"></Tabs>
                </div>
                <div class="content" ref="content">
                    <div class="nav" v-if="indx">
                        <el-breadcrumb class="bread">
                            <el-breadcrumb-item
                                v-for="(item, index) in breadList"
                                :key="index"
                                v-show="item && item.length > 0 && item != '波士邦'">{{ item }}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <transition name="slide-fade">
                        <keep-alive :include="SavePages">
                            <router-view></router-view>
                        </keep-alive>
                    </transition>
                </div>
            </div>
        </div>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      top="20%"
      size=""
    >
      <el-form
        :rules="rules"
        style="width: 350px"
        :model="form"
        ref="form"
        v-if="dialogFormVisible"
      >
        <el-form-item label="原密码" label-width="85px" prop="oldPass">
          <el-input
            v-model="form.oldPass"
            auto-complete="off"
            class="form_item_ipt220"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="85px" prop="newPass">
          <el-input type="password" name="txtPassword" style="display: none">
          </el-input>
          <el-input
            v-model="form.newPass"
            class="form_item_ipt220"
            type="password"
            name="txtPassword"
            placeholder="请输入密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认新密码"
          prop="copyPass"
          label-width="85px"
          required
        >
          <el-input type="password" name="txtPassword" style="display: none">
          </el-input>
          <el-input
            v-model="form.copyPass"
            class="form_item_ipt220"
            type="password"
            name="txtPassword"
            placeholder="请输入密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editS('form')" v-loading="loading"
          >确 定</el-button
        >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="客户详情"
      :visible.sync="dialogView"
      top="5%"
      size=""
      :close-on-click-modal="false"
    >
      <CustomerView
        :mes="cusMes"
        style="width: 1100px"
        v-if="dialogView"
      ></CustomerView>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMenuByUserId, UpdateUserPassword } from "@/api/myData";
import treeitem from "./item.vue";
import Tabs from "../tabs";
import headTop from "../headTop";
import CustomerView from "@/page/FinanceManage/ReportManage/com/customerDetail.vue";
import { mapActions, mapState } from "vuex";
import { tabsLen } from "@/config/common";
import { iconMap } from "@/config/navigationIcon";
import {
  getCookie,
  setCookie,
  delCookie,
  getSStore,
  setSStore,
  removeStore,
  delCookieAll,
} from "@/config/mUtils";
export default {
  computed: {
    SavePages: function () {
      //路由缓存页
      let page = this.$store.state.SavePages.join(",");
      return page;
    },
    // currentBread(){
    //     return this.$store.state.tabs?JSON.parse(this.$store.state.tabs):[]
    // },
  },
  data() {
    var check = (rule, value, callback) => {
      setTimeout(() => {
        if (value != this.form.newPass) {
          callback(new Error("两次输入不一致"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      iconMap: iconMap,
      isCollapse:true,
      curMenus: [],
      dialogView: false,
      cusMes: {},
      loading: false,
      breadList: [],
      treeData: [],
      childData: [],
      openItems: [],
      currentIndex: "",
      flag: 1,
      tittle: "首页",
      showMenu: false,
      flg: {},
      allData: [],
      selectMes: {},
      active: "",
      indx: true,
      dialogFormVisible: false,
      form: {
        oldPass: "",
        newPass: "",
        copyPass: "",
      },
      rules: {
        oldPass: [{ required: true, message: "请输入", trigger: "blur" }],
        newPass: [{ required: true, message: "请输入", trigger: "blur" }],
        copyPass: [{ validator: check, trigger: "blur" }],
      },
    };
  },
  watch: {
    // 'currentBread':{//路由页面直接转跳修改面包屑内容
    //     handler(curVal,oldVal){
    //         curVal.forEach(ele=>{
    //             if(ele.code == this.$store.state.index){
    //                 this.tabChange(ele)
    //                 return true
    //             }
    //         })
    //     },
    //     deep:true
    // }
  },

  mounted() {
    if (getSStore("bread")) {
      this.breadList = JSON.parse(getSStore("bread"));
    } else {
      this.indx = false;
    }
    let userid = getCookie("userId");
    let userName = getCookie("userName");
    if (userid && userName) {
      this.getMenus(userid);
      if (getSStore("lastPage")) {
        setTimeout(() => {
          this.$router.push("/menu/" + JSON.parse(getSStore("lastPage")).index);
          this.tabChange(JSON.parse(getSStore("lastPage")));
        }, 100);
      }
    } else {
      this.$router.push("/login");
    }
  },

  methods: {
    getMenu() {
      if (getSStore("tabs")) {
        this.curMenus = JSON.parse(getSStore("tabs"));
      } else {
        return [];
      }
    },
    select(item) {
      this.getMenu();
      console.log('点击菜单',item)
      this.$router.push({
          path:'/menu/'+item.index
      })
      this.selectitem && this.selectitem(item);
      this.index = item.code;
      if (this.curMenus.length === 0) {
        this.curMenus.push(item);
      } else {
        for (let i = 0; i < this.curMenus.length; i++) {
          if (this.curMenus[i].text === item.text) {
            break;
          } else {
            if (i >= this.curMenus.length - 1) {
              this.curMenus.push(item);
            }
          }
        }
      }
      // 控制选项卡显示的个数 tabsLen为个数（可直接修改）
      if (this.curMenus.length >= tabsLen) {
        this.curMenus.splice(0, 1);
      }
      setSStore("index", "" + this.index);
      let arr = [];
      this.curMenus.forEach((row) => {
        arr.push({
          code: row.code,
          index: row.index,
          parentCode: row.parentCode,
          text: row.text,
        });
      });
      setSStore("tabs", JSON.stringify(arr));
      this.cookieChange(item);
      setSStore("lastPage", item);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    openCustomer(val) {
      this.cusMes = { customerCode: val };
      this.dialogView = true;
    },
    feedBack(val) {
      this.breadList = ["医院管理", "问题反馈"];
      setSStore("bread", JSON.stringify(this.breadList));
      this.$refs.menuChild.select(val);
    },
    async getMenus(userid) {
      let res = await getMenuByUserId(userid);
      //   console.log("菜单数据", res);
      this.allData = res;
      this.$store.commit("saveModules", res);
      if (res.length > 0) {
        this.treeData = this.getTree(res);
          for (let i = 0; i < this.treeData.length; i++) {
              console.log("外层菜单数据 -- ", i, this.treeData[i].text, this.treeData[i].icon);
          }
        this.menuClick(this.treeData[0], 0);
        this.showMenu = true;
      }
      if (res.length > 0) {
        res.forEach((row) => {
          if (row.NavigateUrl) {
            this.openItems.push(row.NavigateUrl);
          }
          if (row.Id) {
            this.openItems.push(row.Id);
          }
        });
      }
      return this.$store.state.menus;
    },
    getTree(data) {
      let nodesArray = [];
      let menus = [];
      //data.splice(0, 1) //删除 波士邦 根节点
      data.forEach((item, index) => {
        let node = {};
        node["text"] = item["FullName"];
        node["code"] = item["Id"];
        node["parentCode"] = item["ParentId"];
        node["icon"] = item["ImageUrl"];
        if (item["NavigateUrl"] === "" || item["NavigateUrl"] === null) {
          node["index"] = item["Id"] + ""; //没有页面的话，把id赋给 index作为唯一标志
        } else {
          node["index"] = item["NavigateUrl"];
        }
        if (item["Id"] != 0 && item["FullName"] != "波士邦") {
          nodesArray.push(node);
          if (item["Id"] != "") {
            menus.push(item["NavigateUrl"]);
          }
        }
      });
      this.$store.commit("saveUserMenu", menus);
      var i,
        l,
        key = "code",
        parentKey = "parentCode",
        childKey = "childs";
      if (!key || key == "" || !nodesArray) return [];

      if (nodesArray instanceof Array) {
        var r = [];
        var tmpMap = {};
        for (i = 0, l = nodesArray.length; i < l; i++) {
          tmpMap[nodesArray[i][key]] = nodesArray[i];
        }
        for (i = 0, l = nodesArray.length; i < l; i++) {
          if (
            tmpMap[nodesArray[i][parentKey]] &&
            nodesArray[i][key] != nodesArray[i][parentKey]
          ) {
            if (!tmpMap[nodesArray[i][parentKey]][childKey])
              tmpMap[nodesArray[i][parentKey]][childKey] = [];
            tmpMap[nodesArray[i][parentKey]][childKey].push(nodesArray[i]);
          } else {
            r.push(nodesArray[i]);
          }
        }
        return r;
      } else {
        return nodesArray;
      }
    },

    menuClick(item, index) {
      this.childData = [];
      console.log(item, index);
      if (item.childs && item.childs.length > 0) {
        let _this = this;
        item.childs.forEach((item) => {
          _this.childData.push(item);
        });
      }

      this.currentIndex = index;
      this.tittle = item.text;
      if (this.flag === 0) {
        this.toggle();
      }
    },
    //菜单折叠
    toggle() {
      if (this.flag === 1) {
        this.$refs.sMenu.style.width = "0px";
        this.$refs.content.style.left = "60px";
        this.$refs.tab.style.left = "60px";
        this.flag = 0;
      } else {
        this.$refs.sMenu.style.width = "170px";
        this.$refs.content.style.left = "230px";
        this.$refs.tab.style.left = "230px";
        this.flag = 1;
      }
    },
    // 路由缓存控制 <keep-alive :include="SavePages">
    selectItem(item) {
      let arr = JSON.parse(JSON.stringify(this.SavePages)).split(",");
      if (arr.indexOf(item.index) < 0) {
        arr.push(item.index);
      }
      if (arr.length > 9) {
        arr.splice(1, 1);
      }
      // arr.push(item.index)
      this.$store.commit("save", arr);
      // this.SavePage += ("," + item.index)
    },
    beforeEnter: function (el) {
      el.style.opacity = 0;
      el.style.transformOrigin = "left";
    },
    enter: function (el, done) {
      Velocity(el, { opacity: 1, fontSize: "1.4em" }, { duration: 100 });
      Velocity(el, { fontSize: "1em" }, { complete: done });
    },
    leave: function (el, done) {
      Velocity(
        el,
        {
          opacity: 0,
        },
        { complete: done }
      );
    },
    cookieChange(val) {
      this.flg = val;
      this.tabChange(val);
    },
    getParentNode(data, code) {
      let obj = {};
      data.forEach((row) => {
        if (row.Id == code) {
          obj = row;
        }
      });
      return obj;
    },
    //            tab切换菜单联动    面包屑内容切换
    tabChange(val) {
      this.selectItem(val);
      if (!val.code) {
        this.indx = false;
        return false;
      } else {
        this.indx = true;
      }
      let parentS = this.getParentNode(this.allData, val.parentCode);
      let parentF = this.getParentNode(this.allData, parentS.ParentId);
      let vm = this;
      this.breadList = [parentF.FullName, parentS.FullName, val.text];
      setSStore("bread", JSON.stringify(this.breadList));
      if (!parentF.Id) {
        this.fClick(this.treeData, parentS.Id, 1);
        /*  setTimeout(()=>{
                        vm.active = val.index+""
                        console.log(vm.active)
                    },1000)*/
      } else {
        let childNode = this.fClick(this.treeData, parentF.Id, 1);
        parentS = this.fClick(childNode, parentS.Id);
        /* setTimeout(()=>{
                        vm.active = val.index+""
                        console.log(vm.active)
                    },1000)*/
        this.selectMes = {
          parentS: parentS,
        };
      }
    },
    fClick(data, id, ope) {
      let obj = {};
      for (let i = 0; i < data.length; i++) {
        if (data[i].code == id) {
          if (ope) {
            this.menuClick(data[i], i);
            obj = data[i].childs;
          } else {
            obj = data[i];
          }
          break;
        }
      }
      return obj;
    },
    editPass() {
      this.dialogFormVisible = true;
      this.form = {
        oldPass: "",
        newPass: "",
      };
    },
    async UpdateUserPassword() {
      let res = await UpdateUserPassword({
        id: getCookie("userId"),
        oldPassword: this.form.oldPass,
        newPassword: this.form.newPass,
      });
      if (res.status) {
        this.dialogFormVisible = false;
        this.$message({
          type: "success",
          message: "修改成功,即将转跳到登录页面",
        });
        let _this = this;
        this.delCookie();
        setTimeout(() => {
          _this.$router.push("/login");
        }, 1000);
      } else {
        this.$message({
          type: "error",
          message: "修改失败" + res.errorMessage,
        });
      }
      this.loading = false;
    },
    editS(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.UpdateUserPassword();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
  },
  components: {
    treeitem: treeitem,
    Tabs: Tabs,
    headTop: headTop,
    CustomerView,
  },
};
</script>


<style lang="less" scoped>
@import "../../style/mixin";

.icon_lists li {
  color: #bfcbd9;
  float: left;
  width: 60px;
  height: 70px;
  text-align: center;
  cursor: pointer;
  padding-top: 10px;
  box-sizing: border-box;
}

.icon_lists li:hover {
  background: #154394;
  color: #fff;
}

.icon_lists li.active {
  background: #154394;
  color: #fff;
}

.name {
  font-size: 12px;
}

.icon_lists .icon {
  font-size: 28px;
  margin: 10px 0;
  color: #bfcbd9;
}

.el-menu--dark {
  background-color: #154394;
}

.content {
  overflow: auto;
  position: relative;
  padding: 0px 20px 20px 20px;
  position: absolute;
  left: 10px;
  right: 0px;
  top: 0;
  bottom: 0;
  transition: all 0.5s;
}

.content::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: #f5f5f5;
}

.fMenu {
  position: absolute;
  top: 60px;
  bottom: 0px;
  width: 220px;
//   width: fit-content;
  background: #2a58ad;
  float: left;
  overflow: auto;
}


.sMenu {
  position: absolute;
  top: 60px;
  bottom: 0px;
  background: #154394;
  float: left;
  left: 60px;
  transition: all 0.5s;
  overflow: auto;
}

.sMenu::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: #f5f5f5;
}

.tab {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 45px;
  padding-top: 15px;
  box-sizing: border-box;
  background: #fff;
  padding-bottom: 10px;
  transition: all 0.5s;
  background: #f0f2f5;
}

.fold {
  display: block;
  color: #fff;
  z-index: 10;
  position: absolute;
  top: 20px;
  left: 144px;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  line-height: 24px;
  // background: #000;
  text-align: center;
  transition: all 0.5s;
}

.smenu-tittle {
  width: 170px;
  height: 61px;
  line-height: 60px;
  color: #fff;
  font-size: 16px;
  text-indent: 25px;
}

.line {
  border: 1px solid #2a3037;
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.04);
  width: 133px;
  height: 1px;
  margin: 0 auto;
}

.menu-content {
  font-size: 12px;
  overflow: auto;
}

.menu-content::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: #f5f5f5;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.nav {
  text-indent: 10px;
  margin-top: 60px;
}
.mes-container {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.body-container {top: 64px; left: 0; right: 0; bottom: 0; position: absolute; display: flex}
.body-container .menu-container {width: 220px; background-color: #2a58ad; overflow: auto;
    -webkit-transition: width .3s linear;
    -moz-transition: width .3s linear;
    -ms-transition: width .3s linear;
    -o-transition: width .3s linear;
    transition: width .3s linear;}
.body-container .menu-container.col {width: 64px}
.body-container .content-container {flex: 1; position: relative; overflow: auto}
.el-menu-vertical-demo {background: #2a58ad}
.el-menu-vertical-demo::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: #f5f5f5;
}
.body-container .menu-container .el-submenu__title img { width: 16px; height: 16px; margin-right: 5px;
    -webkit-transition: all .3s linear;
    -moz-transition: all .3s linear;
    -ms-transition: all .3s linear;
    -o-transition: all .3s linear;
    transition: all .3s linear;
}
.body-container .menu-container.col .el-submenu__title img {width: 22px; height: 22px}
.body-container .menu-container.col .el-submenu__title span {display: none}
.body-container .menu-container.col .el-submenu__title .el-submenu__icon-arrow {display: none !important;}
/*.el-menu-vertical-demo.col {width: 220px}*/
</style>
