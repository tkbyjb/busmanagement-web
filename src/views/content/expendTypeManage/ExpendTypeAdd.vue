<template>
  <div>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="4">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="类别名" label-width="110px" prop="typeName">
            <el-input v-model="form.typeName"></el-input>
          </el-form-item>
          <el-form-item label="备注" label-width="110px" >
            <el-input v-model="form.typeNote" type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="16" :offset="8">
                <el-button type="primary" @click="$manage.add(vc, 'expendType', form)">添加数据</el-button>
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
export default {
  data() {
    return {
      form: {
        typeId: null,
        typeName: null,
        typeNote: null,
      },
      rules: {
        typeName: [
          { required: true, message: "请输入类别名", trigger: "blur" },
        ],
      },
      vc: this,
    };
  },
};
</script>
<style scoped>

</style>