<template>
  <div style="min-height: 800px">
    <el-menu
      style="width: 230px; min-height: 100%"
      :collapse="false"
      background-color="#1f2d3d"
      text-color="#bfcbd9"
      active-text-color="#3579c0"
      router
      :default-active="activeMenu"
      :default-openeds="defaultOpen"
    >
      <div id="logo">北京理工大学公车系统</div>
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>首页
      </el-menu-item>
      <el-submenu
        v-for="(menu, index) in menus"
        :key="menu.menuId"
        :index="index+''"  
      >
        <template slot="title">
          <i :class="menu.icon"></i>{{ menu.menuName }}
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="child in menu.menuChilds"
            :key="child.menuId"
            :index="'/' + userId + '/' + roleId + child.url"
          >
            <i :class="child.icon"></i>{{ child.menuName }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Menu",
  data() {
    return {
      menus: null,
      activeMenu: this.$route.path,
      userId: localStorage.getItem("userId"),
      roleId: localStorage.getItem("roleId"),
      defaultOpen:[],
    };
  },
  computed: {},
  mounted() {
    const userId = localStorage.getItem("userId");
    const roleId = localStorage.getItem("roleId");
    const urlPart = userId + "/" + roleId;
    //获取api
    axios
      .get(urlPart+"/api/" + this.roleId)
      .then((response) => {
        this.menus = response.data.data;
        for(let i =0; i<this.menus.length; i++){
          this.defaultOpen.push(i+"")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>


<style lang="less" >
// @import '../style/mixin';
#logo {
  height: 40px;
  text-align: center;
  padding-top: 15px;
  color: rgb(16, 177, 202); //#39fa96;
  font-size: 120%;
}
.el-submenu__title{
  background-color: #2c3e52 !important;
}
</style>
