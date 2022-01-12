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
          @click="$manage.search(vc, 'bus')"
          ><i class="el-icon-search"></i> 查询搜索</el-button
        >
        <!-- <el-button style="float: right; margin-right: 15px" size="small"
          >重置</el-button
        > -->
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small" label-width="100px">
          <el-form-item label="车牌号:">
            <el-input
              v-model="form.busCode"
              class="input-width"
              placeholder=""
              clearable
              style="width:150px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备编号:">
            <el-input
              v-model="form.instrumentNumber"
              class="input-width"
              placeholder=""
              clearable
              style="width:150px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="负责人:">
            <el-select
              v-model="form.principalUserName"
              placeholder="请选择"
              style="width: 150px"
            >
              <el-option key="全部" label="全部" :value="null"></el-option>
              <el-option
                v-for="item in principalUserNames"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生产商:">
            <el-select
              v-model="form.vendor"
              placeholder="请选择"
              style="width: 150px"
            >
              <el-option key="全部" label="全部" :value="null"></el-option>
              <el-option
                v-for="item in vendors"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型:">
            <el-select
              v-model="form.type"
              placeholder="请选择"
              style="width: 150px"
            >
              <el-option key="全部" label="全部" :value="null"></el-option>
              <el-option
                v-for="item in types"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="型号:">
            <el-input
              v-model="form.model"
              class="input-width"
              placeholder=""
              clearable
              style="width:150px;"
            ></el-input>
          </el-form-item>
           <el-form-item label="用途:">
            <el-select
              v-model="form.purpose"
              placeholder="请选择"
              style="width: 150px"
            >
              <el-option key="全部" label="全部" :value="null"></el-option>
              <el-option
                v-for="item in purposes"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公车名:">
            <el-input
              v-model="form.busName"
              class="input-width"
              placeholder=""
              clearable
              style="width:150px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="停车地点:">
            <el-autocomplete
              class="inline-input"
              v-model="form.pakingPlace"
              :fetch-suggestions="(queryString, cb) => {
                  return $manage.querySearch(queryString, cb, vc, 'pakingPlaces');
                }"
              placeholder="请输入内容"
              @select="$manage.handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="购置时间段:">
            <el-date-picker
              v-model="form.startPurchaseDate"
              type="datetime"
              placeholder="选择时间"
              style="width: 220px"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
            到
            <el-date-picker
              v-model="form.endPurchaseDate"
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
      @selection-change="$manage.handleSelectionChange($event,vc)"
       @sort-change="(column)=>{$manage.sort(column, vc, 'bus')}"
    >
      <el-table-column fixed type="selection" width="50"></el-table-column>
      <el-table-column prop="busId" label="公车id" width="100"></el-table-column>
      <el-table-column prop="busName" label="公车名" width="120"></el-table-column>
      <el-table-column prop="busCode" label="车牌号" width="120" ></el-table-column>
      <el-table-column  width="150" label="图片" prop="photo">
        <template slot-scope="scope">
        <el-image :src="'/bus_photo/'+scope.row.photo" fit="fit"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="engine" label="发动机编号" width="220"></el-table-column>
      <el-table-column prop="chassis" label="车架号" width="220"></el-table-column>
      <el-table-column prop="instrumentNumber" label="设备编号" width="220"> </el-table-column>
      <el-table-column prop="principalUser.userName" label="负责人" width="120"></el-table-column>
      <el-table-column prop="vendor"  label="生厂商" width="120"> </el-table-column>
      <el-table-column prop="pakingPlace" label="停车地点" width="420"> </el-table-column>
      <el-table-column prop="displace" label="排量" width="120"> </el-table-column>
      <el-table-column prop="model" label="型号" width="220"></el-table-column>
      <el-table-column prop="type"  label="类别" width="220"></el-table-column>
      <el-table-column prop="purpose" label="用途" width="220"> </el-table-column>
      <el-table-column prop="purchaseDate" label="购置时间" 
      sortable="custom"
      width="170" :formatter="(row, column)=>{ return $manage.dateFormat(row, column, 'purchaseDate')}"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"
      sortable="custom"
       width="170" :formatter="(row, column)=>{ return $manage.dateFormat(row, column, 'createTime')}"></el-table-column>
      <el-table-column prop="updateTime" 
      sortable="custom"
      label="修改时间" width="170" :formatter="(row, column)=>{ return $manage.dateFormat(row, column, 'updateTime')}">  </el-table-column>
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
        @click="$manage.deletes(vc,'bus', 'busId')"
        ><i class="el-icon-delete"></i> 删除选中</el-button
      >
    </el-card>

    <el-card shadow="never">
      <el-pagination
        background
        :total="pageConfig.resultSize"
        :page-size="pageConfig.pageSize"
        :current-page.sync="pageConfig.pageIndex"
        @current-change="$manage.pageClick($event, vc, 'bus')"
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
        busId: null,
        busCode: null,
        instrumentNumber: null,
        principalUserName: null,
        vendor: null,
        model: null,
        type: null,
        purpose: null,
        busName: null,
        pakingPlace: null,
        displace: null,
        startPurchaseDate: null,
        endPurchaseDate: null,
        orderBy: null,
        upDown: null,
      },
      principalUserNames:[],
      vendors: [],
      types: [],
      purposes: [],
      pakingPlaces:[],
    };
  },
  mixins:[manageMixin],
  methods: {
  },
  mounted() {
    //请求公车数据
    this.$manage.search(this, 'bus')
    //请求负责人
    this.$manage.getList(this, 'bus', 'principalUserNames', 'getPrincipalUserNames')
    //请求生产商
    this.$manage.getList(this, 'bus', 'vendors', 'getVendors')
    //请求类型
    this.$manage.getList(this, 'bus', 'types', 'getTypes')
    //请求用途
    this.$manage.getList(this, 'bus', 'purposes', 'getPurposes')
    //请求停车地点
    this.$manage.getListObj(this, 'bus', 'pakingPlaces', 'getPakingPlaces')
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