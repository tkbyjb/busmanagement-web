<template>
  <div>
    <el-card class="filter-container" shadow="never">
      <el-row>
        <el-col :span="5" >
          <el-card class="filter-container card1" shadow="never">
            <el-row>
              <el-col :span="19">
                <div class="cardValue">{{ todayNum }}</div>
                <div class="cardLabel">今日使用次数</div>
              </el-col>
              <el-col :span="5">
                <i class="el-icon-s-data cardIcon"></i>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-card class="filter-container card2" shadow="never">
            <el-row>
              <el-col :span="19">
                <div class="cardValue">{{ todayOdometer }}</div>
                <div class="cardLabel">今日使用总里程</div>
              </el-col>
              <el-col :span="5">
                <i class="el-icon-s-ticket cardIcon"></i>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-card class="filter-container card3" shadow="never">
            <el-row>
              <el-col :span="19">
                <div class="cardValue">{{ thisMounthOdometer }}</div>
                <div class="cardLabel">本月使用总里程</div>
              </el-col>
              <el-col :span="5">
                <i class="el-icon-s-marketing cardIcon"></i>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-card class="filter-container card4" shadow="never">
            <el-row>
              <el-col :span="19">
                <div class="cardValue">{{ preMounthOdometer }}</div>
                <div class="cardLabel">上月使用总里程</div>
              </el-col>
              <el-col :span="5">
                <i class="el-icon-menu cardIcon"></i>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="filter-container" shadow="never">
      <div style="margin-bottom: 40px">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          size="small"
          @click="search"
          >查询搜索</el-button
        >
      </div>
      <div>
        <el-form :inline="true" size="small" label-width="100px">
          <el-form-item label="时间段:">
            <el-date-picker
              v-model="form.startTime"
              type="date"
              placeholder="选择日期"
              style="width: 130px"
            >
            </el-date-picker>
            到
            <el-date-picker
              v-model="form.endTime"
              type="date"
              placeholder="选择日期"
              style="width: 130px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="车牌号:">
            <el-autocomplete
              class="inline-input"
              v-model="form.busCode"
              :fetch-suggestions="
                (queryString, cb) => {
                  return $manage.querySearch(queryString, cb, vc, 'busCodes');
                }
              "
              placeholder="请输入"
              @select="$manage.handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="领用人:">
            <el-autocomplete
              class="inline-input"
              v-model="form.recepientUserName"
              :fetch-suggestions="
                (queryString, cb) => {
                  return $manage.querySearch(
                    queryString,
                    cb,
                    vc,
                    'recepientUserNames'
                  );
                }
              "
              placeholder="请输入"
              @select="$manage.handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="起始地点:">
            <el-autocomplete
              class="inline-input"
              v-model="form.startPlace"
              :fetch-suggestions="
                (queryString, cb) => {
                  return $manage.querySearch(
                    queryString,
                    cb,
                    vc,
                    'startPlaces'
                  );
                }
              "
              placeholder="请输入"
              @select="$manage.handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="目的地点:">
            <el-autocomplete
              class="inline-input"
              v-model="form.endPlace"
              :fetch-suggestions="
                (queryString, cb) => {
                  return $manage.querySearch(queryString, cb, vc, 'endPlaces');
                }
              "
              placeholder="请输入"
              @select="$manage.handleSelect"
            ></el-autocomplete>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="filter-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据展示</span>
      <el-button
        style="float: right; margin-right: 30xp"
        type="primary"
        size="mini"
        @click="download"
      >
        <i class="el-icon-download"></i>下载当前统计数据
      </el-button>
    </el-card>
    <el-card class="filter-container" shadow="never">
      <div ref="chart" :style="{ width: '1300px', height: '500px' }"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import moment from "moment";
export default {
  data() {
    return {
      form: {
        startTime: null,
        endTime: null,
        busCode: null,
        recepientUserName: null,
        startPlace: null,
        endPlace: null,
      },
      busCodes: [],
      recepientUserNames: [],
      startPlaces: [],
      endPlaces: [],
      intervalInfo: [],
      todayNum: 0,
      todayOdometer: 0,
      thisMounthOdometer: 0,
      preMounthOdometer: 0,
      vc: this,
    };
  },
  methods: {
    search() {
      this.$api.busUse
        .getIntervalInfo(this.form)
        .then((response) => {
          response.data.data.forEach((item) => {
            item.date = moment(item.date).format("YYYY-MM-DD");
          });
          this.intervalInfo = response.data.data;
          this.setChart(this.intervalInfo);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    download() {
      this.$api.busExpend.download(this.form).then((response) => {
        console.log(response);
        this.$manage.downloadFile(response.data)
      });
    },
    setChart(intervalInfo) {
      let chart = echarts.init(this.$refs.chart);
      chart.setOption({
        title: {
          text: "公车使用统计",
        },
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ["date", "totalOdometer", "totalNum"],
          source: intervalInfo,
        },
        xAxis: { type: "category" },
        yAxis: [
          {
            name: "公里",
          },
          {
            name: "次数",
          },
        ],
        series: [
          {
            type: "line",
            name: "总里程",
            yAxisIndex: 0,
          },
          {
            type: "line",
            name: "使用次数",
            yAxisIndex: 1,
          },
        ],
      });
    },
  },
  mounted() {
    //请求车牌号列表
    this.$manage.getListObj(this, 'busUse', 'busCodes', 'getBusCodes')
    this.$manage.getListObj(this, 'busUse', 'recepientUserNames', 'getRecepientUserNames')
    this.$manage.getListObj(this, 'busUse', 'startPlaces', 'getStartPlaces')
    this.$manage.getListObj(this, 'busUse', 'endPlaces', 'getEndPlaces')
    //初始化请求统计表本月第一天到今天的数据
    this.form.startTime = moment().startOf("month");
    this.form.endTime = new Date();
    this.$api.busUse
      .getIntervalInfo(this.form)
      .then((response) => {
        let amount = 0;
        response.data.data.forEach((item) => {
          item.date = moment(item.date).format("YYYY-MM-DD");
          amount += item.totalOdometer;
        });
        this.intervalInfo = response.data.data;
        this.setChart(this.intervalInfo);
        this.thisMounthOdometer = amount;
      })
      .catch((error) => {
        console.log(error);
      });
    //请求数据
    let form2 = {
      startTime: moment().startOf("day"),
      endTime: moment().startOf("day"),
      busCode: null,
      recepientUserName: null,
      startPlace: null,
      endPlace: null,
    };
    let form3 = {
      startTime: moment()
        .month(moment().month() - 1)
        .startOf("month")
        .format("YYYY-MM-DD"),
      endTime: moment()
        .month(moment().month() - 1)
        .endOf("month")
        .format("YYYY-MM-DD"),
      busCode: null,
      recepientUserName: null,
      startPlace: null,
      endPlace: null,
    };
    ////////////////
    this.$api.busUse
      .getIntervalInfo(form2)
      .then((response) => {
        this.todayNum = response.data.data[0].totalNum;
        this.todayOdometer = response.data.data[0].totalOdometer;
      })
      .catch((error) => {
        console.log(error);
      });
    //////////////////
    this.$api.busUse
      .getIntervalInfo(form3)
      .then((response) => {
        let amount = 0;
        response.data.data.forEach((item) => {
          amount += item.totalOdometer;
        });
        this.preMounthOdometer = amount;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.card1 {
  background-color: #17a2b7ff;
}
.card2 {
  background-color: #27a844ff;
}
.card3 {
  background-color: #fec107ff;
  color: black;
}
.card4 {
  background-color: #dc3546ff;
}
.cardLabel {
  font-size: 80%;
  color: rgb(241, 241, 241);
}

.cardValue {
  color: rgb(241, 241, 241);
  font-size: 130%;
  font-weight: bold;
}
.cardIcon {
  font-size: 250%;
}

.card1 .cardIcon {
  color: rgb(12, 125, 142);
}
.card2 .cardIcon {
  color: #24963eff;
}
.card3 .cardIcon {
  color: #d9a40aff;
}
.card4 .cardIcon {
  color: #bb2d3bff;
}
.card3 .cardLabel,
.card3 .cardValue {
  color: #202636ff;
}
</style>