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
          @click="$manage.search(vc, 'approve')"
          ><i class="el-icon-search"></i> 查询搜索</el-button
        >
        <!-- <el-button style="float: right; margin-right: 15px" size="small"
          >重置</el-button
        > -->
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small" label-width="100px">
          <el-form-item label="审核状态:">
            <el-select
              v-model="form.appState"
              placeholder="请选择"
              style="width: 100px"
            >
              <el-option key="全部" label="全部" :value="null"></el-option>
              <el-option key="0" label="待审核" :value="0"></el-option>
              <el-option key="1" label="未通过" :value="1"></el-option>
              <el-option key="2" label="已通过" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间段:">
            <el-date-picker
              v-model="form.startTime"
              type="datetime"
              placeholder="选择时间"
              style="width: 190px"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
            到
            <el-date-picker
              v-model="form.endTime"
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
    </el-card>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="$manage.handleSelectionChange($event, vc)"
      @sort-change="
        (column) => {
          $manage.sort(column, vc, 'approve');
        }
      "
    >
      <!-- <el-table-column fixed type="selection" width="50"></el-table-column> -->
      <el-table-column prop="appState" label="审核状态" width="80">
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.appState == 0
                ? 'primary'
                : scope.row.appState == 2
                ? 'success'
                : 'warning'
            "
            disable-transitions
            >{{
              scope.row.appState == 0
                ? "待审核"
                : scope.row.appState == 1
                ? "未通过"
                : "已通过"
            }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="appId"
        label="记录id"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="busCode"
        label="车牌号"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="appTime"
        label="时间"
        sortable="custom"
        :formatter="
          (row, column) => {
            return $manage.dateFormat(row, column, 'appTime');
          }
        "
        width="180"
      ></el-table-column>
      <!-- <el-table-column
        prop="expId"
        label="被审核记录id"
        width="120"
      ></el-table-column> -->
      <el-table-column
        prop="busExpenditure.amount"
        label="金额"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="busExpenditure.des"
        label="备注"
        width="320"
      ></el-table-column>
    <el-table-column
        prop="creatorUser.userName"
        label="创建人"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="approverUser.userName"
        label="审核人"
        width="320"
      ></el-table-column>
    </el-table>

    <el-card shadow="never">
      <el-pagination
        background
        :total="pageConfig.resultSize"
        :page-size="pageConfig.pageSize"
        :current-page.sync="pageConfig.pageIndex"
        @current-change="$manage.pageClick($event, vc, 'approve')"
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
        appState: null,
        startTime: null,
        endTime: null,
      },
    };
  },
  mixins: [manageMixin],
  methods: {},
  mounted() {
    this.$manage.search(this, "approve");
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