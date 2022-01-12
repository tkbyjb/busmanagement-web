<template>
  <div>
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
    >
      <el-table-column fixed type="selection" width="50"></el-table-column>
      <el-table-column prop="typeId" label="类别id" width="100"></el-table-column>
      <el-table-column prop="typeName" label="类别名" width="120"></el-table-column>
      <el-table-column prop="typeNote" label="备注" width="420" ></el-table-column>
      <el-table-column  label="操作" width="100">
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
        @click="$manage.deletes(vc,'expendType', 'typeId')"
        ><i class="el-icon-delete"></i> 删除选中</el-button
      >
    </el-card>

    <el-card shadow="never">
      <el-pagination
        background
        :total="pageConfig.resultSize"
        :page-size="pageConfig.pageSize"
        :current-page.sync="pageConfig.pageIndex"
        @current-change="$manage.pageClick($event, vc, 'expendType')"
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
        typeId: null,
        typeName: null,
        typeNote: null,
      },
    };
  },
  mixins:[manageMixin],
  mounted() {
    this.$manage.search(this, 'expendType')
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