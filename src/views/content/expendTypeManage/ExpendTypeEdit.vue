<template>
  <div>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="4">
        <el-form :model="row" :rules="rules" ref="userEditForm">
          <el-form-item label="类别id" label-width="110px">
            <el-input disabled :value="form.typeId"></el-input>
          </el-form-item>
          <el-form-item label="类别名" label-width="110px" prop="expendTypeName">
            <el-input :value="form.typeName"></el-input>
          </el-form-item>
          <el-form-item label="备注" label-width="110px" prop="expendTypeCode">
            <el-input v-model="form.typeNote" type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="16" :offset="8">
                <el-button type="primary" @click="$manage.edit(vc, 'expendType', form)">确认修改</el-button>
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
export default {
  data() {
    return {
      form: this.$route.query.form,
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        realName: [{ required: true, message: "请输入真名", trigger: "blur" }],
        idCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        tel: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
      },
      vc: this,
    };
  },
};
</script>
<style scoped>

</style>