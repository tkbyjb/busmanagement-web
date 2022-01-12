<template>
  <div>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="4">
        <el-form :model="form" :rules="rules" ref="userEditForm" label-width="110px" >
          <el-form-item label="登记id:">
            <el-input
            disabled
              v-model="form.regId"
              class="input-width"
              placeholder=""
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="车牌号:" prop="busCode">
            <el-input
              v-model="form.busCode"
              class="input-width"
              placeholder=""
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="领用人:" prop="recepientUserName">
            <el-select
              v-model="form.recepientUser.userName"
              placeholder="请选择"
              style="width: 170px"
            >
              <!-- <el-option key="全部" label="全部" :value="null"></el-option> -->
              <el-option
                v-for="item in recepientUserNames"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起始地点:" >
            <el-autocomplete
              class="inline-input"
              v-model="form.startPlace"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="$manage.handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="目的地点:" >
            <el-autocomplete
              class="inline-input"
              v-model="form.endPlace"
              :fetch-suggestions="querySearch2"
              placeholder="请输入内容"
              @select="$manage.handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="出发里程表:" prop="startOdometer">
            <el-input
              v-model="form.startOdometer"
              class="input-width"
              placeholder=""
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="返回里程表:" prop="endOdometer">
            <el-input
              v-model="form.endOdometer"
              class="input-width"
              placeholder=""
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="用车时间:" prop="useTime">
            <el-date-picker
              v-model="form.useTime"
              type="datetime"
              placeholder="选择日期"
              style="width: 200px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="用车原因:" prop="useReason">
            <el-input
              v-model="form.useReason"
              class="input-width"
              placeholder=""
              clearable
              type="textarea"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建人:" >
            <el-select
              v-model="form.creatorUser.userName"
              placeholder="请选择"
              style="width: 170px"
              disabled
            >
              <el-option key="全部" label="全部" :value="null"></el-option>
              <el-option
                v-for="item in creatorUserNames"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间:">
            <el-date-picker
              v-model="form.createTime"
              type="date"
              placeholder="选择日期"
              style="width: 170px"
              disabled
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="修改时间:">
            <el-date-picker
              v-model="form.updateTime"
              type="date"
              placeholder="选择日期"
              style="width: 170px"
              disabled
            >
            </el-date-picker>
          </el-form-item>


          <el-form-item>
            <el-row>
              <el-col :span="16" :offset="8">
                <el-button type="primary" @click="$manage.edit(vc, 'busUse', form)"
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
        busCode: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        recepientUserName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        startPlace: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        endPlace: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        startOdometer: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        endOdometer: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        useTime: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        useReason: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      },
      vc: this,
      startPlaces: [],
      endPlaces: [],
      recepientUserNames: [],
      creatorUserNames: [],
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.startPlaces;
      var results = queryString
        ? restaurants.filter(this.$manage.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    querySearch2(queryString, cb) {
      var restaurants = this.endPlaces;
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
    //请求记录数据
    this.$manage.search(this, "busUse");
    //请求起始地点
    this.$api.busUse
      .getStartPlaces()
      .then((response) => {
        response.data.data.forEach((item) => {
          this.startPlaces.push({ value: item });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    //请求目的地点
    this.$api.busUse
      .getEndPlaces()
      .then((response) => {
        response.data.data.forEach((item) => {
          this.endPlaces.push({ value: item });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    //请求领用人
    this.$manage.getList(
      this,
      "busUse",
      "recepientUserNames",
      "getRecepientUserNames"
    );
    //请求创建人
    this.$manage.getList(
      this,
      "busUse",
      "creatorUserNames",
      "getCreatorUserNames"
    );
  },
};
</script>
<style scoped>
</style>