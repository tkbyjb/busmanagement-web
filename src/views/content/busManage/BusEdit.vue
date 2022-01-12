<template>
  <div>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="4">
        <el-form :model="form" :rules="rules" ref="userEditForm">
          <el-form-item label="公车id" label-width="110px">
            <el-input disabled :value="form.busId"></el-input>
          </el-form-item>
          <el-form-item label="公车名" label-width="110px" prop="busName">
            <el-input v-model="form.busName"></el-input>
          </el-form-item>
          <el-form-item label="车牌号" label-width="110px" prop="busCode">
            <el-input v-model="form.busCode"></el-input>
          </el-form-item>
          <el-form-item
            label="图片"
            :prop="fileList[0].url"
            label-width="100px"
          >
          <el-card class="filter-container card1" shadow="never">
            <el-upload
              class="upload-demo"
              :action="img_url"
              :file-list="fileList"
              list-type="picture"
              :limit="1"
              ref="upload"
              :on-success="uploadSuccess"
              :on-error="uploadError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过2Mb
              </div>
            </el-upload>
          </el-card>
          或从已有图片选择
          <el-card class="filter-container card1" shadow="never">
            <el-select v-model="form.photo" clearable placeholder="请选择" style="width:350px;">
                <el-option :value="null" label="暂不选择"></el-option>
                <el-option
                  v-for="item in photos"
                  :key="item"
                  :label="item"
                  :value="item"
                  style="height:80px;width:350px;"
                >
                  <el-image
                    style="width:100px; "
                    :src="'/bus_photo/'+item"
                    :fit="fit"
                  ></el-image> 
                  <span>{{item}}</span>
                </el-option>
              </el-select>
          </el-card>

          </el-form-item>
          <el-form-item label="发动机编号" label-width="110px" prop="engine">
            <el-input v-model="form.engine"></el-input>
          </el-form-item>
          <el-form-item label="车架号" label-width="110px" prop="chassis">
            <el-input v-model="form.chassis"></el-input>
          </el-form-item>
          <el-form-item
            label="设备编号"
            label-width="110px"
            prop="instrumentNumber"
          >
            <el-input v-model="form.instrumentNumber"></el-input>
          </el-form-item>
          <el-form-item label="负责人:" label-width="110px" >
            <el-autocomplete
              class="inline-input"
              v-model="form.principalUser.userName"
              :fetch-suggestions="
                (queryString, cb) => {
                  return $manage.querySearch(
                    queryString,
                    cb,
                    vc,
                    'principalUserNames'
                  );
                }
              "
              placeholder="请输入内容"
              @select="$manage.handleSelect"
              style="width: 400px"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="生产商:" label-width="110px" >
            <el-autocomplete
              class="inline-input"
              v-model="form.vendor"
              :fetch-suggestions="
                (queryString, cb) => {
                  return $manage.querySearch(queryString, cb, vc, 'vendors');
                }
              "
              placeholder="请输入内容"
              @select="$manage.handleSelect"
              style="width: 400px"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="停车地点:" label-width="110px"> 
            <el-autocomplete
              class="inline-input"
              v-model="form.pakingPlace"
              :fetch-suggestions="
                (queryString, cb) => {
                  return $manage.querySearch(
                    queryString,
                    cb,
                    vc,
                    'pakingPlaces'
                  );
                }
              "
              placeholder="请输入内容"
              @select="$manage.handleSelect"
              style="width: 400px"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="排量" label-width="110px" prop="displace">
            <el-input v-model="form.displace"></el-input>
          </el-form-item>
          <el-form-item label="型号" label-width="110px" prop="model">
            <el-input v-model="form.model"></el-input>
          </el-form-item>
          <el-form-item label="类别" label-width="110px" prop="type">
            <el-input v-model="form.type"></el-input>
          </el-form-item>
          <el-form-item label="用途:" label-width="110px" >
            <el-autocomplete
              class="inline-input"
              v-model="form.purpose"
              :fetch-suggestions="
                (queryString, cb) => {
                  return $manage.querySearch(queryString, cb, vc, 'purposes');
                }
              "
              placeholder="请输入内容"
              @select="$manage.handleSelect"
              style="width: 400px"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="购置时间:" label-width="110px">
            <el-date-picker
              v-model="form.purchaseDate"
              type="datetime"
              placeholder="选择日期"
              style="width: 220px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            label="创建人"
            label-width="110px"
            prop="creatorUser.userName"
          >
            <el-input v-model="form.creatorUser.userName" disabled></el-input>
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
                <el-button type="primary" @click="$manage.edit(vc, 'bus', form)"
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
        busName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        busCode: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        engine: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        chassis: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        instrumentNumber: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        vendor: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        principalUserName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        pakingPlace: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        purpose: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        model: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        displace: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        purchaseDate: [
           { required: true, message: "请输入", trigger: "blur" },
        ]
      },
      fileList: [
        { name: "bus.jpg", url: "/bus_photo/" + this.$route.query.form.photo },
      ],
      vc: this,
      img_url:
        localStorage.getItem("userId") +
        "/" +
        localStorage.getItem("roleId") +
        "/7/bus/uploadBusPhoto",
      principalUserNames: [],
      vendors: [],
      types: [],
      purposes: [],
      pakingPlaces: [],
      photos: null,
    };
  },
  methods: {
    cancle() {
      this.$router.go(-1);
    },
    uploadSuccess(response, file, fileList) {
      this.form.photo = response.data.data;
      console.log(file, fileList);
    },
    uploadError(err, file, fileList) {
      console.log(file, fileList);
    },
    querySearch(queryString, cb) {
      var restaurants = this.pakingPlaces;
      var results = queryString
        ? restaurants.filter(this.$manage.createFilter(queryString))
        : restaurants;
      cb(results);
    },
  },
  mounted() {
    //请求负责人
    this.$manage.getListObj(this, 'bus', 'principalUserNames', 'getPrincipalUserNames')
    //请求生产商
    this.$manage.getListObj(this, "bus", "vendors", "getVendors");
    //请求类型
    this.$manage.getListObj(this, "bus", "types", "getTypes");
    //请求用途
    this.$manage.getListObj(this, "bus", "purposes", "getPurposes");
    //请求停车地点
    this.$manage.getListObj(this, "bus", "pakingPlaces", "getPakingPlaces");
    //请求图片
    this.$manage.getList(this, "bus", "photos", "getPhotos");
  },
};
</script>
<style scoped>
</style>