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
          @click="$manage.search(vc, 'user')"
          ><i class="el-icon-search"></i> 查询搜索</el-button
        >
        <!-- <el-button style="float: right; margin-right: 15px" size="small"
          @click="$manage.resetForm(vc,'form')">重置</el-button
        > -->
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small" label-width="100px" ref="form">
          <el-form-item label="角色:" prop="roleId">
            <el-select
              v-model="form.roleId"
              placeholder="请选择"
              style="width: 100px"
            >
              <el-option key="全部" label="全部" :value="null"></el-option>
              <el-option
                v-for="role in roles"
                :key="role.roleId"
                :label="role.roleName"
                :value="role.roleId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名:" prop="userName">
            <el-input
              v-model="form.userName"
              class="input-width"
              placeholder=""
              clearable
              style="width:150px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="真名:" prop="realName">
            <el-input
              v-model="form.realName"
              class="input-width"
              placeholder=""
              clearable
              style="width:150px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别:" prop="sex">
            <el-select
              v-model="form.sex"
              placeholder="请选择"
              style="width: 100px"
            >
              <el-option key="全部" label="全部" :value="null"></el-option>
              <el-option key="男" label="男" value="男"></el-option>
              <el-option key="女" label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话:" prop="tel">
            <el-input
              v-model="form.tel"
              class="input-width"
              placeholder=""
              clearable
              style="width:180px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建人:">
            <el-input
              v-model="form.creatorUserName"
              class="input-width"
              placeholder=""
              clearable
              style="width:150px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建时间段:" prop="startCreateTime">
            <el-date-picker
              v-model="form.startCreateTime"
              type="datetime"
              placeholder="选择时间"
              style="width: 200px"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
            到
            <el-date-picker
              v-model="form.endCreateTime"
              type="datetime"
              placeholder="选择时间"
              style="width: 200px"
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
      @sort-change="(column)=>{$manage.sort(column, vc, 'user')}"
    >
      <el-table-column fixed type="selection" width="50"></el-table-column>
      <el-table-column
        prop="userId"
        label="用户id"
        width="100"
      ></el-table-column>
      <el-table-column prop="role.roleName" label="角色" width="120"
      :formatter="(row,column)=>{ return (row.roleId==0)?'无权限':row.role.roleName}"
      >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="120"
      ></el-table-column>
      <el-table-column prop="userPassword" label="密码" width="120">
      </el-table-column>
      <el-table-column
        prop="realName"
        label="真名"
        width="120"
      ></el-table-column>
      <el-table-column prop="sex" label="性别" width="120"> </el-table-column>
      <el-table-column prop="idCard" label="身份证号" width="220">
      </el-table-column>
      <el-table-column prop="birth"  :formatter="(row, column)=>{ return $manage.dateFormatDate(row, column, 'birth')}"  label="生日" width="180"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="120"> </el-table-column>
      <el-table-column prop="tel" label="电话" width="120"> </el-table-column>
      <el-table-column prop="createTime" 
      sortable="custom" 
      :formatter="(row, column)=>{ return $manage.dateFormat(row, column, 'createTime')}" label="创建时间" width="220">
      </el-table-column>
      <el-table-column prop="updateTime"  
      sortable="custom"
      :formatter="(row, column)=>{ return $manage.dateFormat(row, column, 'updateTime')}" label="修改时间" width="220">
      </el-table-column>
      <el-table-column prop="creatorUser.userName" label="创建人" width="120">
      </el-table-column>
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
        @click="$manage.deletes(vc,'user', 'userId')"
        ><i class="el-icon-delete"></i> 删除选中</el-button
      >
    </el-card>

    <el-card shadow="never">
      <el-pagination
        background
        :total="pageConfig.resultSize"
        :page-size="pageConfig.pageSize"
        :current-page.sync="pageConfig.pageIndex"
        @current-change="$manage.pageClick($event, vc, 'user')"
        layout="total,  prev, pager, next, jumper"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
import {manageMixin} from '../../../mixin/mixin'


export default {
  mixins:[manageMixin],
  data() {
    return {
      form: {
        roleName: null,
        userName: null,
        realName: null,
        sex: null,
        tel: null,
        creatorUserName: null,
        startCreateTime: null,
        endCreateTime: null,
        roleId: null,
        orderBy: null,
        upDown: null,
      },
      roles: [],
    };
  },
  methods: { 
  },
  mounted() {
    this.$manage.search(this, 'user')
    this.$manage.getList(this, 'role', 'roles', 'getRoles')
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