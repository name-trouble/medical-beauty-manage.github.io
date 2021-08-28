<template>
    <div style="position:relative;height:100%" class="system-role">

        <div class="tree">
            <!-- <el-input class="selectTree" placeholder="输入关键字进行过滤" v-model="filterText" size="small"></el-input> -->
            <el-tree v-loading="loading" :data="treeData" :props="defaultProps" :indent="20" :default-expand-all="false" node-key="Id" :default-expanded-keys="openNodes"
            :current-node-key="0" :highlight-current="true" :expand-on-click-node="true" :render-content="renderContent" @node-click="nodeClick">
            </el-tree>
        </div>
        <div class="form">
            <el-form label-width="100px" ref="dataForm" :model="formData" class="demo-dynamic" :rules="rules">
                <el-form-item label="菜单名称：" prop="FullName">
                    <el-input v-model="formData.FullName" size="small"></el-input>
                </el-form-item>

                <el-form-item label="菜单编号：" prop="Id">
                    <el-input v-model="formData.Id" size="small" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="父级编号：" prop="ParentId">
                    <el-input v-model="formData.ParentId" size="small"></el-input>
                </el-form-item>

                <el-form-item label="菜单页面：">
                    <el-input v-model="formData.NavigateUrl" size="small"></el-input>
                </el-form-item>

                 <el-form-item label="排序：" prop="SortCode">
                    <el-input v-model="formData.SortCode" size="small"></el-input>
                </el-form-item>

                <el-form-item label="图标字段：">
                    <el-input v-model="formData.ImageUrl" size="small"></el-input>
                </el-form-item>

                <el-form-item label="描述：">
                    <el-input type="textarea" v-model="formData.Description"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" :loading="subLoad" width="200" @click="Save">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>

import { getModuleAll, addModule, deleteModule, updateModule } from '@/api/myData'
import { ArrayToTree } from './lib/data'
import { getCookie} from '@/config/mUtils'
import './lib/role.less'

export default {
    data() {
        return {
            loading:false,
            treeData: [],
            formData: {},
            subLoad: false,
            defaultProps: {
                children: 'children',
                label: 'FullName'
            },
            openNodes: [0],
            rules: {
                FullName: [
                    { required: true, message: '请输入编号', trigger: 'blur' },
                    { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
                ]
            }
        }
    },


    mounted() {
        this.GetMenu()
    },

    methods: {
        async deleteModule(pid, name) {
        },

        async GetMenu() {
            this.loading = true
            let data = await getModuleAll()
            //转化成树结构   data.slice(1)
            this.treeData = ArrayToTree(data, "Id", "ParentId", this.defaultProps.children)
            this.loading = false
        },


        append(store, data) {
            let MenuModel = {
                "Enabled": 1,
                "DeletionStateCode": 0,
                "IsPublic": 1,
                "Expand": 1,
                "AllowEdit": 1,
                "AllowDelete": 1,
                "Id": "",
                "ParentId": 10144,
                "FullName": '',  //页面名称
                "ImageUrl": "",
                "SystemCode": "base",
                "NavigateUrl": "",   //页面url,
                //'SortCode':this.formData.SortCode
            }

            var event = event || window.event
            event.stopPropagation()//取消事件冒泡
            //this.addModule()

            this.$prompt('请输入菜单名称', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', })
                .then(({ value }) => {
                    MenuModel.ParentId = data["Id"]
                    MenuModel.FullName = value

                    this.addMenu(MenuModel, store, data)
                    this.$message({ type: 'success', message: '添加成功' })
                })
                .catch(() => {
                    this.$message({ type: 'info', message: '取消输入' })
                })
        },

        async addMenu(MenuModel, store, data) {
            let res = await addModule(MenuModel)

            store.append({ Id: res, FullName: MenuModel.FullName, ParentId: MenuModel["ParentId"], children: [] }, data)
            this.GetMenu()
            this.openNodes = [0, MenuModel["ParentId"]]
        },

        remove(store, data) {

            var event = event || window.event
            event.stopPropagation()//取消事件冒泡
            if (data.children && data.children.length > 0) {
                this.$message({ type: 'warning', message: '请先删除子菜单！' })
                return
            }

            this.$confirm('是否删除', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
                .then(() => {
                    let res = deleteModule(data["Id"])
                    store.remove(data);
                    this.$message({ type: 'success', message: '删除成功!' })
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消删除！' })
                })
        },

        renderContent(h, { node, data, store }) {
            return (
                <span class={'node_level' + node.level} draggable="true">
                    <i class={'icon iconfont icon-' + node.data.ImageUrl} ></i>
                    <span class="node_word">{node.label} </span>
                    <span class="node_btn" style="float: right; margin-right: 5px;display:none">
                        <el-button size="mini" icon="plus" on-click={() => this.append(store, data)} >添加节点</el-button>
                        <el-button size="mini" icon="delete" on-click={() => this.remove(store, data)}>删除节点</el-button>
                    </span>
                </span>);
        },

        nodeClick(data, node, ele) {
            for (let item in data) {
                this.$set(this.formData, item, data[item])
            }
        },

        async updateMenu() {
            let param = {
                "Enabled": 1,
                "DeletionStateCode": 0,
                "IsPublic": 1,
                "Expand": 1,
                "AllowEdit": 1,
                "AllowDelete": 1,
                "Id": this.formData.Id,
                "ParentId": this.formData.ParentId,
                "FullName": this.formData.FullName,  //页面名称
                "ImageUrl": this.formData.ImageUrl,
                "NavigateUrl": this.formData.NavigateUrl,  //页面url
                "Description": this.formData.Description,
                'SortCode':this.formData.SortCode,
                "createUserId": getCookie("userId"),
                "createBy": getCookie("userName"),
            }
            let res = await updateModule(param)

            let _this = this
            setTimeout(function() {
                _this.subLoad = false
                _this.sendMsg(res)
            }, 600)
        },

        sendMsg(res) {
            if (typeof res == "number" && res > 0) {
                this.GetMenu()
                this.$message({ type: 'success', message: '保存成功！' })
            }
            else this.$message({ type: 'warning', message: '保存失败！' })
        },

        Save() {
            this.subLoad = true
            this.$refs["dataForm"].validate((valid) => {
                if (valid) this.updateMenu()
                else return false;
            })
        },
    }
};
</script>

<style scoped lang="less">
.el-tree {
    padding: 10px;
    border-radius: 10px;
    position: absolute;
    top: 5px; //  right: 60%;
    bottom: 0px;
    left: 10px;
    width: 400px;
    overflow: auto;
}

.selectTree {
    position: absolute;
    top: 0;
    left: 5%;
    width: 30%;
}

.form {
    border: 1px solid #d1dbe5;
    position: absolute;
    top: 5px;
    bottom: 0px;
    left: 450px;
    border-radius: 10px;
    min-width: 250px;
    width: 50%;
    overflow: auto;
    padding: 0 10px;
}
</style>
