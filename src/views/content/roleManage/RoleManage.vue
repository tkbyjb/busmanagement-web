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
          @click="$manage.search(vc, 'role')"
          ><i class="el-icon-search"></i> 查询搜索</el-button
        >
        <!-- <el-button style="float: right; margin-right: 15px" size="small"
          >重置</el-button
        > -->
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small" label-width="100px">
          <!-- <el-form-item label="角色名:">
            <el-select
              v-model="form.roleName"
              placeholder="请选择"
              style="width: 150px"
            >
              <el-option key="全部" label="全部" :value="null"></el-option>
              <el-option
                v-for="item in roleNames"
                :key="item"
                :label="item.roleName"
                :value="item.roleName"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="权限">
            <el-cascader
              
              :options="menuNames"
              @change="handleChange"
            ></el-cascader>
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
    >
      <el-table-column fixed type="selection" width="50"></el-table-column>
      <el-table-column
        prop="roleId"
        label="角色id"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="roleNote"
        label="备注"
        width="220"
      ></el-table-column>
      <el-table-column  label="权限" width="220">
        <template slot-scope="scope">
          <el-dropdown>
            <span class="el-dropdown-link">
              角色权限<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in scope.row.menus"
                :key="item.menuId"
              >
                <el-dropdown>
                  <span class="el-dropdown-link">
                    {{ item.menuName
                    }}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="i in item.menuChilds"
                      :key="i.menuId"
                      >{{ i.menuName }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
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
        @click="null"
        disabled
        ><i class="el-icon-delete"></i> 删除选中</el-button
      >
    </el-card>

    <el-card shadow="never">
      <el-pagination
        background
        :total="pageConfig.resultSize"
        :page-size="pageConfig.pageSize"
        :current-page.sync="pageConfig.pageIndex"
        @current-change="$manage.pageClick($event, vc, 'role')"
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
        roleName: null,
        menuName: null,
      },
      roleNames: [],
      menuNames: [
        {
          label: '全部',
          value: null,
        }
      ],
    };
  },
  methods: {
     handleChange(value) {
        this.form.menuName = value[1];
      }
  },
  mixins: [manageMixin],
  mounted() {
    this.$manage.search(this, "role");
    this.$manage.getList(this, "role", "roleNames", "getRoles");
    this.$api.menu.gets()
    .then(response => {
        response.data.data.forEach(c => {
          let cate = {
            value: c.menuId,
            label: c.menuName,
            children: []
          }
          for(let i=0;i<c.menuChilds.length;i++){
            cate.children.push({
              value: c.menuChilds[i].menuName,
              label: c.menuChilds[i].menuName,
            })
          }
          this.menuNames.push(cate);
        })
    })
    .catch(error => {
      console.log(error)
    })
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