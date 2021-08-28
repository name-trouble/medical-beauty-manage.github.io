<template>
  <div>
    <div class="select" id="userinfo_select">
      <el-input  v-model="filterWord" v-on:keyup.enter.native="init" placeholder="用户名/真实名称" style="width:200px"></el-input>
      <el-button type="primary" size="small" icon="search" @click="init">搜索</el-button>
      <span style="margin-left:20px;">已选中：</span> <el-tag type="success" style="font-size:14px" v-show="Realname!=''">{{Realname}}</el-tag>
    </div>
    <el-table :data="tableData" ref="multipleTable"  v-loading="loading"
    style="width: 100%;margin-top:10px;margin-bottom:10px;" border row-key="id" @selection-change="selectChange" @row-click="rowClick" highlight-current-row>

      <el-table-column prop="Code" label="编号" width="100">
      </el-table-column>

      <el-table-column prop="UserName" label="用户名" min-width="80">
      </el-table-column>

        <el-table-column prop="UserName" label="机构名称" min-width="100">
            <template slot-scope="scope">
                <span v-if="scope.row.TypeCode == '01'">平台</span>
                <span v-else>
                     {{scope.row.HospitalName}}
                     <!-- {{scope.row.HospitalCode}} -->
                </span>
            </template>
        </el-table-column>

        <el-table-column prop="UserName" label="代理商" min-width="100">
            <template slot-scope="scope">
                {{scope.row.BranchName}}<br/>
                {{scope.row.BranchCode}}
            </template>
        </el-table-column>

      <el-table-column prop="Realname" label="真实姓名" min-width="100">
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange" :total="dataCount" :current-page.sync="currentPage" :page-size="pageSize" row-class-name="tbRow" :page-sizes="[10, 20, 50, 100,500]" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import { getUserInfoByPage } from '@/api/myData'
import '../lib/role.less'

export default {
  props: {
    userClick: Function
  },

  data() {
    return {
      loading:false,
      userInfo: {},
      filterWord: "",
      Realname:"",
      tableData: [],
      selectData: [],
      dataCount: 0, //总数
      currentPage: 1,   //当前页面index
      pageSize: 10  //每页显示条数
    }
  },

  mounted() {
    this.getUserInfo()
  },

  methods: {
    async getUserInfo() {
      let data = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        keywords: this.filterWord.removeSP(),
          HospitalCode:"",
          BranchCode:"",
          typecode:""
      }
      this.loading = true
      this.tableData = await getUserInfoByPage(data)
      this.loading = false
      this.dataCount = parseInt(this.tableData[0]["RecordCount"])
    },

    //checkbox选择事件
    selectChange(val) {
      alert(1)
      this.selectData = val
    },

    //row单击事件
    rowClick(row, event, column) {
      this.Realname=row["Realname"]
      this.userClick && this.userClick(row["Id"])
    },

    pageIndexChange(index) {
      this.getUserInfo()
    },

    pageSizeChange(size) {
      this.pageSize = size
      this.getUserInfo()
    },

    init() {
      this.getUserInfo()
      this.currentPage = 1
    }

  }

}
</script>

<style lang="less" scoped>
.select {
  .el-input {
    position: static;
    width: 60px;
    float: none;
  }

  .el-input,
  .el-input__inner {
    width: auto;
  }

  .el-select {
    padding-right: 0;
    float: none;
  }
}

.block {
  float: right;
  margin-right: 30px;
  padding-right: 0!important;
}

.tbRow {
  cursor: pointer
}
</style>
