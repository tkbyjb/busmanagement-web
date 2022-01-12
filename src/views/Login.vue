<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>公车系统 - 用户登录</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="userName">
            <!-- <i class='el-icon-user-solid'></i> -->
            <el-input
              v-model="loginForm.userName"
              placeholder="用户名"
              prefix-icon="iconfont el-icon-user-solid"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input
              type="password"
              placeholder="密码"
              v-model="loginForm.userPassword"
              prefix-icon="iconfont el-icon-key"
            ></el-input>
          </el-form-item>
          <el-form-item prop="verifyCode">
            <el-row :gutter="2">
              <el-col :span="9">
                <el-input placeholder="验证码" v-model="loginForm.verifyCode">
                </el-input>
              </el-col>
              <el-col :span="7">
                <el-image
                  style="width: 120px; height: 40px"
                  :src="verifyCode"
                ></el-image>
              </el-col>
              <el-col :span="7">
                <a href="javascript:false" @click="changeverifyCode">换一张</a>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitLoginFrom"
              class="submit_btn"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { Message } from "element-ui";

export default {
  name: "Home",
  data() {
    return {
      verifyCode: "/verifyCode",
      loginForm: {
        userName: null,
        userPassword: null,
        verifyCode: null,
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      showLogin: true,
    };
  },
  methods: {
    changeverifyCode() {
      this.verifyCode = "/verifyCode?time=" + new Date();
    },
    submitLoginFrom() {
      axios
        .post("/login", JSON.stringify(this.loginForm), {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        })
        .then((response) => {
          let state = response.data.state;
          if (state != 1) {
            this.changeverifyCode();
          }
          // if (state == -1) this.$message.error("验证码错误");
          // else if (state == -2) this.$message.error("用户名或密码错误");
          else {
            Message({
              showClose: true,
              message: "登录成功",
              type: "success",
            });
            localStorage.setItem("userName", response.data.data.userName);
            localStorage.setItem("userId", response.data.data.userId);
            localStorage.setItem("roleId", response.data.data.roleId);
            localStorage.setItem("roleName", response.data.data.roleName);
            document.cookie = `Authorization=${
              response.data.data.Authorization
            };path=/;expires=${moment().add(2, "hours")}`;
            // //请求当前角色获取到菜单的同时设置此用户能访问的前端路由,通过修改meta.roles,不是动态加载路由
            // console.log("********** ",this.$router.options.routes[1].children[0].meta.roles)
            // this.$router.options.routes[1].children.forEach(item => {
            //     item.meta.roles.push(response.data.data.roleId)
            // })
            // console.log("********** ",this.$router.options.routes[1].children[0].meta.roles)
            //通过获取角色对应菜单id匹配路由对应菜单id实现前端路由权限控制
            const userId = localStorage.getItem("userId");
            const roleId = localStorage.getItem("roleId");
            const urlPart = userId + "/" + roleId;
            axios
              .get(urlPart + "/api/" + response.data.data.roleId)
              .then((response) => {
                let menuIds = [];
                response.data.data.forEach((item) => {
                  menuIds.push(item.menuId);
                  item.menuChilds.forEach((i) => {
                    menuIds.push(i.menuId);
                  });
                });
                localStorage.setItem("menuIds", menuIds);
                window.name = 1
                this.$router.push({
                  path:'/home',})
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
          this.changeverifyCode();
        });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
@import "../style/mixin";
.login_page {
  background-color: #324057;
  width: 100%;
  height: 1000px;
  padding: 0;
  margin: 0;
}
.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
  p {
    font-size: 34px;
    color: #fff;
  }
}
.form_contianer {
  .wh(320px, 250px);
  .ctp(320px, 210px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
}
.tip {
  font-size: 12px;
  color: red;
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>
