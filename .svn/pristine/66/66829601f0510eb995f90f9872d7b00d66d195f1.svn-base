<template>
    <div  class="system-role">
        <el-row :gutter="24" style="width:100">
            <el-col :span="11" class="user_box">
                <p>用户</p>
                <small-user :user-click="userClick"></small-user>
            </el-col>
            <el-col :span="10">
                <div class="x-box">
                    <p>菜单</p>
                    <div class="searchDiv">
                        <el-input size="small" v-model="filterWord"></el-input>
                        <el-button type="primary" size="small" icon="search" @click="search">搜索</el-button>
                        <el-button type="primary" size="small" @click="addMenu" :loading="btnLoad">
                            <i class="icon iconfont icon-baocun" style="font-size:12px"></i>保存</el-button>
                    </div>
                    
                    <el-tree v-loading="loading" :data="treeData" ref="menuTree" :props="defaultProps" :indent="20" :filter-node-method="filterNode" show-checkbox
                    :default-checked-keys="defaultSelect" :default-expand-all="false" node-key="Id" :render-content="renderContent"
                    :default-expanded-keys="openNodes" :current-node-key="0" :highlight-current="true" :expand-on-click-node="true">
                    </el-tree>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import { getModuleAll, GetMenuByUserId, AddMenuByUserRole } from '../../api/myData'
import { ArrayToTree } from './lib/data'
import SmallUser from './com/se_user'
import { getCookie} from '@/config/mUtils'
import './lib/role.less'
export default {
    data() {
        return {
            loading:false,
            SelectData: [],
            filterWord: "",
            sourceData: [],
            treeData: [],
            parentIds: [],
            defaultProps: {
                children: 'children',
                label: 'FullName'
            },
            openNodes: [0],
            defaultSelect: [],
            selectNodes: [],
            btnLoad: false,
            userId: "",
        }
    },

    components: {
        SmallUser
    },

    props: {
        data: Object
    },

    mounted() {
        this.GetMenu()
    },

    watch: {
        filterWord(val) {
            this.$refs.menuTree.filter(val);
        }
    },

    methods: {
        async GetMenu() {
            this.loading = true
            this.sourceData = await getModuleAll()
            //转化成树结构   data.slice(1)
            this.treeData = ArrayToTree(this.sourceData, "Id", "ParentId", this.defaultProps.children)
            this.loading = false

        },

        /**
         * 点击回调事件   判断父节点，避免被el-tree错误渲染
         */
        async userClick(uerId) {
            this.userId = uerId
            let res = await GetMenuByUserId(uerId)
            let arr = []
            let _this = this
            if ((res instanceof Array) && res.length > 0) {
                res.forEach(item => {
                    arr.push(item["Id"])
                })
            }

            let alldata = []
            this.sourceData.forEach(item => {
                arr.forEach((value, index) => {
                    if (item["ParentId"] == value) {
                        arr.splice(index, 1)
                    }
                })
            })
            this.$refs.menuTree.setCheckedKeys(arr)
        },

        filterNode(value, data) {
            if (!value) return true;
            return data.FullName.indexOf(value) !== -1;
        },

        renderContent(h, { node, data, store }) {
            return (
                <span class={'node_level' + node.level}>
                    <i class={'icon iconfont icon-' + node.data.ImageUrl} ></i>
                    <span class="node_word">{node.label} </span>
                </span>);
        },

        //获取 勾选的 checkbox
        getCheckedKeys() {
            thsi.selectNodes = this.$refs.menuTree.getCheckedKeys()
        },

        search() {
            //this.$refs.menuTree.setCheckedKeys([])
        },


        /**
         * 递归获取各个节点的父级节点  去重复，合并数组,最后提交节点数据
         */
        getParentId(nodes, child) {
            let pid = ""
            //let _this = this
            this.sourceData.forEach(item => {
                if (item["Id"] == child) {
                    pid = item["ParentId"]
                }
            })

            if (pid == 0 || pid == '' || pid == 'undefined') return
            else {
                if (this.parentIds.indexOf(pid) == -1 || nodes.indexOf(pid) == -1) {
                    this.parentIds.push(pid)
                }
                this.getParentId(nodes, pid)
            }
        },

        async addMenu() {
            if (this.userId == "") {
                this.$message({
                    message: '请选择用户！',
                    type: 'info'
                });
                return
            }
            this.btnLoad = true
            let param = []
            this.parentIds = []
            let nodes = this.$refs.menuTree.getCheckedKeys()
            let nodeData = this.$refs.menuTree.getCheckedNodes()
            let _this = this

            if (nodes.length == 0) {
                param.push({ ResourceCategory: "BaseUser", ResourceId: this.userId, Enabled: "1", TargetId: "","createUserId": getCookie("userId"),
                "createBy": getCookie("userName")})
            }
            else {
                nodeData.forEach(item => {
                    if (nodes.indexOf(item["ParentId"]) == -1) {
                        _this.getParentId(nodes, item["Id"]) //得到 父节点数组
                    }
                })
                let arrs = nodes.concat(this.parentIds)
                arrs.forEach(item => {
                    param.push({ ResourceCategory: "BaseUser", ResourceId: this.userId, Enabled: "1", TargetId: item,"createUserId": getCookie("userId"),
                "createBy": getCookie("userName")})
                })
            }

            let res = await AddMenuByUserRole(JSON.stringify(param))
            setTimeout(function () {
                _this.sendMsg(res)
                _this.btnLoad = false
            }, 800)
        },

        sendMsg(res) {
            if (typeof res == 'number' && res > 0) {
                this.$message({
                    message: '保存成功！',
                    type: 'success'
                });
            }
            else {
                this.$message({
                    message: '保存失败！',
                    type: 'error'
                });
            }
        }
    }
}
</script>

<style lang="less" scoped>
.x-box {
    border: 1px solid #d1dbe5;
    height: 798px;
    width: 100%;
    overflow: auto;
    padding-left: 10px;
}

.el-tree {
    cursor: default;
    background: #fff;
    border: none;
}

p {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: #99805e;
    margin-bottom: 5px;
}

.el-input {

    width: 100%;
    margin: -1px -1px 0 -1px;
}

.user_box {
    border: 1px solid #d1dbe5;
    height: 800px; // width: 100%;
    overflow: auto;
}

.el-input {
    position: static;
    width: 160px;
    float: none;
}
.searchDiv{
    margin: 10px 0 ;
}
</style>
