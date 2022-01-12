<template>
  <div>
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          size="small"
          @click="$manage.search(vc, 'busExpend')"
          ><i class="el-icon-search"></i> 查询搜索</el-button
        >
        <!-- <el-button style="float: right; margin-right: 15px" size="small"
          >重置</el-button
        > -->
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small" label-width="100px">
          <el-form-item label="车牌号:">
             <el-autocomplete
              class="inline-input"
              v-model="form.busCode"
              :fetch-suggestions=" (queryString, cb) => {
                  return $manage.querySearch(queryString, cb, vc, 'busCodes');
                }"
              placeholder="请输入内容"
              @select="$manage.handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="发票号:">
            <el-input
              v-model="form.invoiceCode"
              class="input-width"
              placeholder=""
              clearable
              style="width:250px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="费用类型">
            <el-select
              v-model="form.typeName"
              placeholder="请选择"
              style="width: 100px"
            >
              <el-option key="全部" label="全部" :value="null"></el-option>
              <el-option
                v-for="item in typeNames"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态:">
            <el-select
              v-model="form.state"
              placeholder="请选择"
              style="width: 100px"
            >
              <el-option key="全部" label="全部" :value="null"></el-option>
              <el-option key="0" label="待审核" :value="0"></el-option>
              <el-option key="1" label="未通过" :value="1"></el-option>
              <el-option key="2" label="已通过" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审批人:">
            <el-autocomplete
              class="inline-input"
              v-model="form.approverUserName"
              :fetch-suggestions="(queryString, cb) => {
                  return $manage.querySearch(queryString, cb, vc, 'approverUserNames');
                }"
              placeholder="请输入内容"
              @select="$manage.handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="创建人:">
            <el-autocomplete
              class="inline-input"
              v-model="form.creatorUserName"
              :fetch-suggestions="(queryString, cb) => {
                  return $manage.querySearch(queryString, cb, vc, 'creatorUserNames');
                }"
              placeholder="请输入内容"
              @select="$manage.handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="创建时间段:">
            <el-date-picker
              v-model="form.startCreateTime"
              type="datetime"
              placeholder="选择时间"
              style="width: 190px"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
            到
            <el-date-picker
              v-model="form.endCreateTime"
              type="datetime"
              placeholder="选择时间"
              style="width: 190px"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        size="mini"
        type="primary"
        class="btn-add"
        style="margin-left: 20px"
        @click="$manage.handleAdd(vc)"
        ><i class="el-icon-plus"></i> 添加</el-button
      >
    </el-card>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="$manage.handleSelectionChange($event,vc)"
      @sort-change="(column)=>{$manage.sort(column, vc, 'busExpend')}"
    >
      <el-table-column fixed type="selection" width="50"></el-table-column>
      <el-table-column prop="expId" label="记录id" width="100"></el-table-column>
      <el-table-column prop="busCode" label="车牌号" width="120"></el-table-column>
      <el-table-column prop="invoiceCode" label="发票号" width="120" ></el-table-column>
      <el-table-column prop="expendType.typeName" label="费用类型" width="120"></el-table-column>
      <el-table-column prop="amount" label="费用金额" width="120"></el-table-column>
      <el-table-column prop="state" label="审核状态" width="120">
        <template slot-scope="scope">
        <el-tag
          :type="scope.row.state == 0 ? 'primary' :(scope.row.state == 2? 'success':'warning')"
          disable-transitions>{{scope.row.state == 0 ? '待审核' :(scope.row.state == 1? '未通过':'已通过')}}</el-tag>
        </template> 
      </el-table-column>
      <el-table-column prop="approverUser.userName" label="审批人" width="120"></el-table-column>
      <el-table-column prop="des"  label="备注信息" width="320"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间" 
      sortable="custom"
      width="170" :formatter="(row, column)=>{ return $manage.dateFormat(row, column, 'createTime')}"></el-table-column>
      <el-table-column prop="updateTime" label="修改时间" 
      sortable="custom"
      width="170" :formatter="(row, column)=>{ return $manage.dateFormat(row, column, 'updateTime')}">  </el-table-column>
      <el-table-column prop="creatorUser.userName" label="创建人" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="$manage.handleEdit(scope.$index, scope.row, vc)"
            size="mini"
            type="success"
            plain
            ><i class="el-icon-edit"></i> 编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-card class="operate-container" shadow="never">
      <el-button
        size="mini"
        type="primary"
        class="btn-delete"
        style="margin-left: 20px"
        @click="$manage.deletes(vc,'busExpend', 'expId')"
        ><i class="el-icon-delete"></i> 删除选中</el-button
      >
    </el-card>

    <el-card shadow="never">
      <el-pagination
        background
        :total="pageConfig.resultSize"
        :page-size="pageConfig.pageSize"
        :current-page.sync="pageConfig.pageIndex"
        @current-change="$manage.pageClick($event, vc, 'busExpend')"
        layout="total,  prev, pager, next, jumper"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
import {manageMixin} from '../../../mixin/mixin'

export default {
  data() {
    return {
      form: {
        busCode: null,
        invoiceCode: null,
        typeName: null,
        state: null,
        approverUserName: null,
        creatorUserName: null,
        startCreateTime: null,
        endCreateTime: null,
      },
      typeNames: [],
      approverUserNames: [],
      creatorUserNames: [],
      busCodes: [],
    };
  },
  mixins:[manageMixin],
  methods: {
  },
  mounted() {
    //请求数据
    this.$manage.search(this, 'busExpend')
    //请求经费类别列表
    this.$api.expendType.gets(0,0,null)
    .then(response => {
      response.data.data.forEach(item => {
          this.typeNames.push(item.typeName)
      })
       
    })
    .catch(error => {
      console.log(error)
    })
    
    //请求审批人用户名列表
    this.$manage.getListObj(this, 'busExpend', 'approverUserNames', 'getApproverUserNames')
    //请求创建人用户名列表
    this.$manage.getListObj(this, 'busExpend', 'creatorUserNames', 'getCreatorUserNames')
    //请求车牌号
    this.$manage.getListObj(this, 'busExpend', 'busCodes', 'getBusCodes')
  },
};
</script>
<style scoped>
.btn-add,
.btn-delete {
  float: right;
}
.btn-delete {
  margin-bottom: 20px;
}
.input-width {
  width: 100px;
}
</style>