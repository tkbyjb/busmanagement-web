<template>
  <div id="div">
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="4">
        <el-form :model="form" :rules="rules" ref="userEditForm" style="width: 100%;">
          <el-form-item label="角色名" label-width="110px" prop="roleName">
            <el-input v-model="form.roleName"></el-input>
          </el-form-item>
          <el-form-item label="备注" label-width="110px">
            <el-input v-model="form.roleNote" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="权限" label-width="110px">
            <el-tree
              ref="tree"
              :props="props"
              :data="menus"
              show-checkbox
              @check="check"
              node-key="id"
              default-expand-all
              :default-checked-keys="checkMenus"
            >
            </el-tree>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="16" :offset="8">
                <el-button
                  type="primary"
                  @click="add"
                  >添加角色</el-button
                >
                <!-- <el-button type="primary" plain @click="reset">重置</el-button> -->
                <el-button @click="$manage.cancle(vc)">取消</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
      form: {
        roleId: null,
        roleName: null,
        roleNote: null,
      },
      rules: {
        roleName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      },
      vc: this,
      menus: [],
      checkMenus:[],
      props: {
        label: "label",
        children: "children",
        id: "id",
      },
    };
  },
  methods: {
    check(data, nodes) {
      console.log(nodes)
      this.checkMenus = []
      nodes.checkedNodes.forEach(item => {
        this.checkMenus.push(item.id)
      })
    },
    add() {
      let checkMenus = []
      this.$refs.tree.getCheckedKeys().forEach(item => {
        checkMenus.push(item)
      })
      this.$refs.tree.getHalfCheckedKeys().forEach(item => {
        checkMenus.push(item)
      })
      this.$api.role.add(this.form, checkMenus)
      .then(response => {
        if(response.data.state == 1){
          Message({
            showClose: true,
            message: "添加成功",
            type: "success",
          });
          this.$router.go(-1);
        }
        
      })
      .catch(error => {
        console.log(error)
      })
    },
  },
  mounted() {
    //初始化权限列表
    this.$api.menu
      .gets()
      .then((response) => {
        response.data.data.forEach((item) => {
          let node = {
            label: item.menuName,
            id: item.menuId,
            children: [],
          };
          item.menuChilds.forEach(i => {
            node.children.push({label: i.menuName, id: i.menuId})
          });
          this.menus.push(node)
        });
        
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
#div{
  width: 100% !important;
  height: 100%;
}
</style>