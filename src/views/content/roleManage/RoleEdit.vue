<template>
  <div @mouseover="setCheckedMenus" id="div">
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="4">
        <el-form
          :model="form"
          :rules="rules"
          ref="userEditForm"
          style="width: 100%"
        >
          <el-form-item label="角色id" label-width="110px">
            <el-input disabled v-model="form.roleId"></el-input>
          </el-form-item>
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
            >
            </el-tree>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="16" :offset="8">
                <el-button type="primary" @click="edit">确认修改</el-button>
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
      form: this.$route.query.form,
      rules: {
        roleName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
      },
      vc: this,
      menus: [],
      checkMenus: [],
      props: {
        label: "label",
        children: "children",
        id: "id",
      },
    };
  },
  methods: {
    check(data, nodes) {
      console.log(data, nodes);
      this.checkMenus = [];
      nodes.checkedNodes.forEach((item) => {
        this.checkMenus.push(item.id);
      });
    },
    edit() {
      let checkMenus = [];
      this.$refs.tree.getCheckedKeys().forEach((item) => {
        checkMenus.push(item);
      });
      this.$refs.tree.getHalfCheckedKeys().forEach((item) => {
        checkMenus.push(item);
      });
      this.$api.role
        .edit(this.form, checkMenus)
        .then((response) => {
          if(response.data.state ==1){
            Message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
          this.$router.go(-1);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setCheckedMenus() {
      this.$refs.tree.setCheckedKeys(this.checkMenus);
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
          item.menuChilds.forEach((i) => {
            node.children.push({ label: i.menuName, id: i.menuId });
          });
          this.menus.push(node);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    //默认选择
    this.checkMenus = [];
    this.form.menus.forEach((item) => {
      item.menuChilds.forEach((i) => {
        this.checkMenus.push(i.menuId);
      });
    });
  },
};
</script>
<style scoped>
#div {
  width: 100% !important;
  height: 100%;
}
</style>