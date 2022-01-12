<template>
  <div>
    <el-card class="filter-container" shadow="never">
      <el-row>
        <el-col :span="5">
          <el-card class="filter-container card1" shadow="never">
            <el-row>
              <el-col :span="17">
                <div class="cardValue">{{ todayNum }}</div>
                <div class="cardLabel">今日支出数量</div>
              </el-col>
              <el-col :span="7">
                <i class="el-icon-s-data cardIcon"></i>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-card class="filter-container card2" shadow="never">
            <el-row>
              <el-col :span="17">
                <div class="cardValue">{{ todayAmount }}</div>
                <div class="cardLabel">今日支出总额</div>
              </el-col>
              <el-col :span="7">
                <i class="el-icon-s-ticket cardIcon"></i>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-card class="filter-container card3" shadow="never">
            <el-row>
              <el-col :span="17">
                <div class="cardValue">{{ thisMounthAmount }}</div>
                <div class="cardLabel">本月支出总额</div>
              </el-col>
              <el-col :span="7">
                <i class="el-icon-s-marketing cardIcon"></i>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-card class="filter-container card4" shadow="never">
            <el-row>
              <el-col :span="17">
                <div class="cardValue">{{ preMounthAmount }}</div>
                <div class="cardLabel">上月支出总额</div>
              </el-col>
              <el-col :span="7">
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
          ><i class="el-icon-search"></i> 查询搜索</el-button
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
          <el-form-item label="费用类型">
            <el-select
              v-model="form.typeName"
              placeholder="请选择"
              style="width: 170px"
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
          <el-form-item label="车牌号:">
            <el-autocomplete
              class="inline-input"
              v-model="form.busCode"
              :fetch-suggestions=" (queryString, cb) => {
                  return $manage.querySearch(queryString, cb, vc, 'busCodes');
                }"
              placeholder="请输入车牌号"
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
        typeName: null,
        busCode: null,
      },
      typeNames: [],
      busCodes: [],
      intervalInfo: [],
      todayNum: 0,
      todayAmount: 0,
      thisMounthAmount: 0,
      preMounthAmount: 0,
      vc:this,
    };
  },
  methods: {
    search() {
      this.$api.busExpend
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
      // echarts.registerTheme("essos", essos);
      let chart = echarts.init(this.$refs.chart); //, "customed");
      chart.setOption({
        title: {
          text: "经费支出统计",
        },
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ["date", "totalAmount", "totalNum"],
          source: intervalInfo,
        },
        xAxis: { type: "category" },
        yAxis: [
          {
            name: "元",
          },
          {
            name: "个",
          },
        ],
        series: [
          {
            type: "line",
            name: "经费支出总额",
            yAxisIndex: 0,
          },
          {
            type: "line",
            name: "经费支出登记数量",
            yAxisIndex: 1,
          },
        ],
      });
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
    //请求车牌号列表
    this.$manage.getListObj(this, 'busExpend', 'busCodes', 'getBusCodes')
    //初始化请求统计表本月第一天到今天的数据
    this.form.startTime = moment().startOf("month");
    this.form.endTime = new Date();
    this.$api.busExpend
      .getIntervalInfo(this.form)
      .then((response) => {
        let amount = 0;
        response.data.data.forEach((item) => {
          item.date = moment(item.date).format("YYYY-MM-DD");
          amount += item.totalAmount;
        });
        this.intervalInfo = response.data.data;
        this.setChart(this.intervalInfo);
        this.thisMounthAmount = amount;
      })
      .catch((error) => {
        console.log(error);
      });
    //请求数据
    let form2 = {
      startTime: moment().startOf("day"),
      endTime: moment().startOf("day"),
      typeName: null,
      busCode: null,
    };
    console.log("$$$$$",form2)
    let form3 = {
      startTime: moment()
        .month(moment().month() - 1)
        .startOf("month")
        .format("YYYY-MM-DD"),
      endTime: moment()
        .month(moment().month() - 1)
        .endOf("month")
        .format("YYYY-MM-DD"),
      typeName: null,
      busCode: null,
    };
    ////////////////
    this.$api.busExpend
      .getIntervalInfo(form2)
      .then((response) => {
        console.log("********",response)
        this.todayNum = response.data.data[0].totalNum;
        this.todayAmount = response.data.data[0].totalAmount;
      })
      .catch((error) => {
        console.log(error);
      });
    //////////////////
    this.$api.busExpend
      .getIntervalInfo(form3)
      .then((response) => {
        let amount = 0;
        response.data.data.forEach((item) => {
          amount += item.totalAmount;
        });
        this.preMounthAmount = amount;
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