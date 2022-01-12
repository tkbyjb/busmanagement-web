<template>
  <div>
    <el-card class="filter-container card2" shadow="never">
      <el-form :inline="true" size="small" label-width="100px">
      <!-- <el-form-item label="选择备份对象:">


          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0"></div>
          <el-checkbox-group
            v-model="form.tables"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox v-for="item in all" :label="item" :key="item">{{
              item
            }}</el-checkbox>
          </el-checkbox-group>


        </el-form-item> -->
        <el-button type="primary" @click="backup">备份所有表数据</el-button>
        <el-form-item label="选择下载的备份文件" label-width="200px">
            <el-select
              v-model="checkedFileName"
              placeholder="请选择"
              style="width: 270px"
            >
              <el-option
                v-for="item in fileNames"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
            
        </el-form-item>
        <el-button type="primary" style="margin-left:30px;" @click="download">下载备份数据</el-button>
      </el-form>

      
      
    </el-card>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
      //   form: {
      //     tables: [],
      //   },
      //   checkAll: false,
      //   all: ["用户表", "公车表", "广州", "深圳"],
      //   isIndeterminate: true,
      fileNames: null,
      checkedFileName: null,
    };
  },
  methods: {
    // handleCheckAllChange(val) {
    //   this.form.tables = val ? this.all : [];
    //   this.isIndeterminate = false;
    // },
    // handleCheckedCitiesChange(value) {
    //   let checkedCount = value.length;
    //   this.checkAll = checkedCount === this.cities.length;
    //   this.isIndeterminate =
    //     checkedCount > 0 && checkedCount < this.cities.length;
    // },
    backup() {
      this.$api.backup
        .backup()
        .then((response) => {
          if (response.data.state == 1) {
            Message({
              showClose: true,
              message: "备份成功",
              type: "success",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    download() {
        this.$api.backup
        .download(this.checkedFileName)
        .then((response) => {
          this.$manage.downloadFile2(response.data, this.checkedFileName)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  mounted() {
      this.$api.backup.getFileList()
      .then((response) => {
          console.log(response.data.data)
          this.fileNames = response.data.data
        })
        .catch((error) => {
          console.log(error);
        });
  }
};
</script>

<style scoped>
</style>