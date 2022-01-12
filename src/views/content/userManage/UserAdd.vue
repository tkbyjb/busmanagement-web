<template>
  <div>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="4">
        <el-form :model="form" :rules="rules" ref="userEditForm">
          <el-form-item label="角色" label-width="110px" prop="roleName">
            <el-select
              v-model="form.role.roleName"
              placeholder="请选择"
              style="width: 160px"
            >
              <!-- <el-option key="暂不分配" label="暂不分配" :value="null"></el-option> -->
              <el-option
                v-for="role in roles"
                :key="role.roleId"
                :label="role.roleName"
                :value="role.roleName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" label-width="110px" prop="userName">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" label-width="110px" prop="userPassword">
            <el-input v-model="form.userPassword"></el-input>
          </el-form-item>
          <el-form-item label="真名" label-width="110px" prop="realName">
            <el-input v-model="form.realName"></el-input>
          </el-form-item>
          <el-form-item label="性别" label-width="110px" prop="sex">
            <el-select
              v-model="form.sex"
              placeholder="请选择"
              style="width: 100px"
            >
              <el-option key="男" label="男" value="男"></el-option>
              <el-option key="女" label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证号" label-width="110px" prop="idCard" >
            <el-input v-model="form.idCard"></el-input>
          </el-form-item>
          <el-form-item label="生日" label-width="110px" prop="birth">
            <el-date-picker
              v-model="form.birth"
              type="date"
              placeholder="选择日期"
              style="width: 160px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="年龄" label-width="110px" prop="age">
            <el-input-number v-model="form.age" min=1 max=200></el-input-number>
          </el-form-item>
          <el-form-item label="电话" label-width="110px" prop="tel">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="16" :offset="8">
                <el-button type="primary" @click="$manage.add(vc, 'user', form)">添加用户</el-button>
                <!-- <el-button type="primary"  plain @click="reset">重置</el-button> -->
                <el-button @click="cancle">取消</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
            roleId: null,
            userName: null,
            userPassword: null,
            realName: null,
            sex: null,
            idCard: null,
            birth: null,
            age: 18,
            tel: null,
            creator: localStorage.getItem("userId"),
            creatorUser:{
              userName: null,
            },
            role:{
              roleName: null,
            }
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        realName: [
          { required: true, message: "请输入真名", trigger: "blur" },
        ],
        idCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        tel: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
        ],
        birth: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
        ],
        sex: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
        ],
        roleName: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
        ],
        creatorUserName: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
        ],
        age: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
        ],
      },
      vc: this,
      roles: [],
    }
  },
  methods: {
      cancle() {
        this.$router.go(-1);
      }
    },
  mounted() {
      this.$manage.getList(
      this,
      "role",
      "roles",
      "getRoles"
    );
  }
};
</script>


<style scoped>
</style>