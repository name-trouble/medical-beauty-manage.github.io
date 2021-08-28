<template>
    <div  class="system-role">
        <el-row :gutter="24" style="width:100">
            <el-col :span="8">
                <p>用户</p>
                <el-table ref="multipleTable" :data="data" border tooltip-effect="dark" fit stripe height="500" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection"   align="center" width="50">
                    </el-table-column>
                    <el-table-column prop="Code" label="用户名">
                    </el-table-column>
                    <el-table-column prop="UserName" label="姓名">
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="12">
                <p>菜单</p>
                <el-table ref="multipleTable" :data="data" border tooltip-effect="dark" fit stripe height="500" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection"   align="center" width="50">
                    </el-table-column>
                    <el-table-column prop="Code" label="用户名">
                    </el-table-column>
                    <el-table-column prop="UserName" label="姓名">
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="4">
                <el-button type="info">确定 </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            SelectData: [],
            filterText: ""
        }
    },
    props: {
        data: Object
    },

    watch: {
        filterText(val) {
            this.$refs.menuTree.filter(val);
        }
    },

    methods: {
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        renderContent(h, { node, data, store }) {
            return (
                <span>
                    <span>
                        <span>{node.label}</span>
                    </span>
                    <span style="float: right; margin-right: 20px">
                        <el-button size="mini" on-click={() => this.append(store, data)}>Append</el-button>
                        <el-button size="mini" on-click={() => this.remove(store, data)}>Delete</el-button>
                    </span>
                </span>);
        },

        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    }
}
</script>

<style lang="less" scoped>
.x-box {
    border: 1px solid #d1dbe5;
    height: 500px;
    width: 100%;
    overflow: scroll;
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
</style>