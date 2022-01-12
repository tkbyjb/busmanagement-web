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
          @click="$manage.search(vc, 'busUse')"
          ><i class="el-icon-search"></i> 查询搜索</el-button
        >
        <!-- <el-button style="float: right; margin-right: 15px" size="small"
          >重置</el-button
        > -->
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small" label-width="110px">
          <el-form-item label="车牌号:">
            <el-autocomplete
              class="inline-input"
              v-model="form.busCode"
              :fetch-suggestions=" (queryString, cb) => {
                  return $manage.querySearch(queryString, cb, vc, 'busCodes');
                }"
              placeholder="请输入内容"
              @select="$manage.handleSelect"
              style="width: 150px"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="领用人:">
            <el-select
              v-model="form.recepientUserName"
              placeholder="请选择"
              style="width: 150px"
            >
              <el-option key="全部" label="全部" :value="null"></el-option>
              <el-option
                v-for="item in recepientUserNames"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起始地点:">
            <el-autocomplete
              class="inline-input"
              v-model="form.startPlace"
              :fetch-suggestions=" (queryString, cb) => {
                  return $manage.querySearch(queryString, cb, vc, 'startPlaces');
                }"
              placeholder="请输入内容"
              @select="$manage.handleSelect"
              style="width: 250px"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="目的地点:">
            <el-autocomplete
              class="inline-input"
              v-model="form.endPlace"
              :fetch-suggestions=" (queryString, cb) => {
                  return $manage.querySearch(queryString, cb, vc, 'endPlaces');
                }"
              placeholder="请输入内容"
              @select="$manage.handleSelect"
              style="width: 250px"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="创建人:">
            <el-select
              v-model="form.creatorUserName"
              placeholder="请选择"
              style="width: 150px"
            >
              <el-option key="全部" label="全部" :value="null"></el-option>
              <el-option
                v-for="item in creatorUserNames"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用车时间段:">
            <el-date-picker
              v-model="form.startUseTime"
              type="datetime"
              placeholder="选择时间"
              style="width: 220px"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
            到
            <el-date-picker
              v-model="form.endUseTime"
              type="datetime"
              placeholder="选择时间"
              style="width: 220px"
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
      @selection-change="$manage.handleSelectionChange($event, vc)"
      @sort-change="(column)=>{$manage.sort(column, vc, 'busUse')}"
    >
      <el-table-column fixed type="selection" width="50"></el-table-column>
      <el-table-column
        prop="regId"
        label="记录id"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="busCode"
        label="车牌号"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="recepientUser.userName"
        label="领用人"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="startPlace"
        label="起始地点"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="endPlace"
        label="目的地点"
        width="120"
      ></el-table-column>
      <el-table-column prop="startOdometer" label="出发里程表" width="120">
      </el-table-column>
      <el-table-column
        prop="endOdometer"
        label="返回里程表"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="useTime"
        label="用车时间"
        width="190"
        :formatter="
          (row, column) => {
            return $manage.dateFormat(row, column, 'useTime');
          }
        "
        sortable="custom"
      >
      </el-table-column>
      <el-table-column prop="useReason" label="用车原因" width="220">
      </el-table-column>
      <el-table-column prop="creatorUser.userName" label="创建者" width="120">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="220"
        :formatter="
          (row, column) => {
            return $manage.dateFormat(row, column, 'createTime');
          }
        "
        sortable="custom"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="修改时间"
        width="220"
        :formatter="
          (row, column) => {
            return $manage.dateFormat(row, column, 'updateTime');
          }
        "
        sortable="custom"
      ></el-table-column>
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
        @click="$manage.deletes(vc, 'busUse', 'regId')"
        ><i class="el-icon-delete"></i> 删除选中</el-button
      >
    </el-card>

    <el-card shadow="never">
      <el-pagination
        background
        :total="pageConfig.resultSize"
        :page-size="pageConfig.pageSize"
        :current-page.sync="pageConfig.pageIndex"
        @current-change="$manage.pageClick($event, vc, 'busUse')"
        layout="total,  prev, pager, next, jumper"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
import { manageMixin } from "../../../mixin/mixin";

export default {
  data() {
    return {
      form: {
        busCode: null,
        startPlace: null,
        endPlace: null,
        startUseTime: null,
        endUseTime: null,
        creatorUserName: null,
        recepientUserName: null,
      },
      startPlaces: [],
      endPlaces: [],
      recepientUserNames: [],
      creatorUserNames: [],
      busCodes: [],
    };
  },
  mixins: [manageMixin],
  methods: {
  },
  mounted() {
    //请求记录数据
    this.$manage.search(this, "busUse");
    //请求起始地点
    this.$manage.getListObj(this, 'busUse', 'startPlaces', 'getStartPlaces')
    //请求目的地点
    this.$manage.getListObj(this, 'busUse', 'endPlaces', 'getEndPlaces')
    //请求领用人
    this.$manage.getList(
      this,
      "busUse",
      "recepientUserNames",
      "getRecepientUserNames"
    );
    //请求创建人
    this.$manage.getList(
      this,
      "busUse",
      "creatorUserNames",
      "getCreatorUserNames"
    );
    //请求车牌号
    this.$manage.getListObj(this, 'busUse', 'busCodes', 'getBusCodes')
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