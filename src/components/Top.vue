<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <!-- <el-breadcrumb-item v-for="(item, index) in $route.meta.title" :key="index">
          {{item}}
      </el-breadcrumb-item> -->
      <el-breadcrumb-item v-for="(item, index) in $route.meta.title" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown   class="avator">
      <el-avatar icon="el-icon-user-solid" style="background-color: #17A2B7FF;" ></el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item >{{roleName}}: {{userName}}</el-dropdown-item>
        <el-dropdown-item ><div @click="exit">退出</div></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>

export default {
    name: 'Top',
    data() {
        return {
            userName: localStorage.getItem("userName"),
            roleName: localStorage.getItem("roleName")
        }
    },
    methods:{
      exit(){
        document.cookie = `Authorization=null;path=/;expires=${new Date()}`
        localStorage.removeItem("userName")
        localStorage.removeItem("userId")
        localStorage.removeItem("roleId")
        localStorage.removeItem("roleName")
        localStorage.removeItem("menuIds")
        this.$router.push({
                  path: "/login",
            })
      },
    },
};
</script>

<style lang="less">
@import "../style/mixin";
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator {
    margin-right: 50px;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
