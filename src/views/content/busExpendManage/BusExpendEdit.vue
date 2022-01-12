<template>
  <div>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="4">
        <el-form :model="form" :rules="rules">
          <el-form-item label="记录id" label-width="110px">
            <el-input v-model="form.expId" disabled></el-input>
          </el-form-item>
          <el-form-item label="车牌号" label-width="110px" prop="busCode">
            <el-input v-model="form.busCode"></el-input>
          </el-form-item>
          <el-form-item label="发票号" label-width="110px" prop="invoiceCode">
            <el-input v-model="form.invoiceCode"></el-input>
          </el-form-item>
          <el-form-item
            label="费用类型"
            label-width="110px"
            prop="expendTypeName"
          >
            <el-select
              v-model="form.expendType.typeName"
              placeholder="请选择"
              style="width: 200px"
            >
              <el-option key="全部" label="全部" :value="null"></el-option>
              <el-option
                v-for="item in typeNames"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="费用金额" label-width="110px" prop="amount">
            <el-input v-model="form.amount"></el-input>
          </el-form-item>
          <!-- <el-form-item label="审核状态" label-width="110px">
            <el-select
              v-model="form.state"
              placeholder="请选择"
              style="width: 100px"
            >
              <el-option key="全部" label="全部" :value="null"></el-option>
              <el-option key="0" label="待审核" :value="0"></el-option>
              <el-option key="1" label="未通过" :value="1"></el-option>
              <el-option key="2" label="已通过" :value="2"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="审批人" label-width="110px">
            <el-autocomplete
              class="inline-input"
              v-model="form.approverUser.userName"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="$manage.handleSelect"
              disabled
            ></el-autocomplete>
          </el-form-item>
          <!-- <el-form-item prop="state" label="审核状态" label-width="110px" >
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.state == 0
                    ? 'primary'
                    : scope.row.state == 2
                    ? 'success'
                    : 'warning'
                "
                disable-transitions
                >{{
                  scope.row.state == 0
                    ? "待审核"
                    : scope.row.state == 1
                    ? "未通过"
                    : "已通过"
                }}</el-tag
              >
            </template>
          </el-form-item> -->
          <el-form-item label="备注信息" label-width="110px">
            <el-input type="textarea" v-model="form.des"></el-input>
          </el-form-item>
          <el-form-item label="创建人" label-width="110px">
            <el-autocomplete
              class="inline-input"
              v-model="form.creatorUser.userName"
              :fetch-suggestions="querySearch2"
              placeholder="请输入内容"
              @select="$manage.handleSelect"
              disabled
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="创建时间" label-width="110px">
            <el-date-picker
              v-model="form.createTime"
              type="datetime"
              disabled
              placeholder="选择日期"
              style="width: 200px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="修改时间" label-width="110px">
            <el-date-picker
              disabled
              v-model="form.updateTime"
              type="datetime"
              placeholder="选择日期"
              style="width: 200px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="16" :offset="8">
                <el-button
                  type="primary"
                  @click="$manage.edit(vc, 'busExpend', form)"
                  >确认修改</el-button
                >
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
      form: this.$route.query.form,
      rules: {
        busCode: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        invoiceCode: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        amount: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        expendTypeName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
      },
      vc: this,
      typeNames: [],
      approverUserNames: [],
      creatorUserNames: [],
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.approverUserNames;
      var results = queryString
        ? restaurants.filter(this.$manage.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    querySearch2(queryString, cb) {
      var restaurants = this.creatorUserNames;
      var results = queryString
        ? restaurants.filter(this.$manage.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    cancle() {
      this.$router.go(-1);
    },
  },
  mounted() {
    //请求经费类别列表
    this.$api.expendType
      .gets(0, 0, null)
      .then((response) => {
        response.data.data.forEach((item) => {
          this.typeNames.push(item.typeName);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    //请求审批人用户名列表
    this.$api.busExpend
      .getApproverUserNames()
      .then((response) => {
        response.data.data.forEach((item) => {
          this.approverUserNames.push({ value: item });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    //请求创建人用户名列表
    this.$api.busExpend
      .getCreatorUserNames()
      .then((response) => {
        response.data.data.forEach((item) => {
          this.creatorUserNames.push({ value: item });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
</style>