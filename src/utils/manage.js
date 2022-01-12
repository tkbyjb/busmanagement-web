import { Message } from 'element-ui'
import moment from 'moment'


//分页点击
function pageClick(event, vm, objName) {
  vm.$api[objName]
    .gets(event, vm.pageConfig.pageSize, vm.form)
    .then((response) => {
      vm.tableData = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

//数据查询
function search(vm, objName) {//参数  vc对象,操作对象名
  //先获取所有的,用于设置分页
  vm.$api[objName]
    .gets(0, 0, vm.form)
    .then((response) => {
      vm.pageConfig.resultSize = response.data.data.length;
      vm.pageConfig.pageNum = parseInt(vm.pageConfig.resultSize / vm.pageConfig.pageSize);
      if (vm.pageConfig.resultSize % vm.pageConfig.pageSize != 0) vm.pageConfig.pageNum++;
      //获取第一页
      vm.$api[objName]
        .gets(vm.pageConfig.pageIndex, vm.pageConfig.pageSize, vm.form)
        .then((response) => {
          vm.tableData = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

//获取选中数据行
function handleSelectionChange(val, vm) {
  vm.selectRows = val;
}

//删除数据
function deletes(vm, objName, id) {
  vm.$confirm("确认删除选中数据行?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      //处理选中行数据
      let ids = []
      vm.selectRows.forEach(item => {
        ids.push(item[id])
      })
      vm.$api[objName]
        .deletes(ids)
        .then((response) => {
          //刷新数据
          // this.searchUsers();这儿改成自动触发查询按钮点击事件
          // vm.$manage.search(vm , objName)
          console.log(response.data.data);
          if (response.data.state == 1) {
            // location.reload();
            Message({
              showClose: true,
              message: "删除成功",
              type: "success",
            });
            vm.$manage.search(vm, objName)
          }

        })
        .catch((error) => {
          console.log(error);
        });

    })
    .catch((error) => {
      console.log(error)
      Message({
        type: "info",
        message: "已取消删除",
      });
    });
}
//跳转到编辑组件
function handleEdit(index, row, vm) {
  vm.$router.push({
    path: vm.$route.path + "/edit",
    query: {
      form: row,
    },
  });
}
//跳转到添加页面
function handleAdd(vm) {
  vm.$router.push({
    path: vm.$route.path + "/add",
  });
}
//时间戳转换为时间格式
function dateFormat(row, column, prop) {
  var time = row[prop];
  if (time === undefined) {
    return ''
  }
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}
//时间戳转换为时间格式
function dateFormatDate(row, column, prop) {
  var time = row[prop];
  if (time === undefined) {
    return ''
  }
  return moment(time).format('YYYY-MM-DD')
}

//编辑数据
function edit(vm, objName, data) {
  vm.$api[objName].edit(data)
    .then(response => {
      if (response.data.state == 1) {
        Message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        });
        vm.$router.go(-1);
      }

    })
    .catch(error => {
      console.log(error)
    })
}
//请求某单个数据列表
function getList(vm, objName, prop, func) {
  vm.$api[objName][func]()
    .then(response => {
      vm[prop] = response.data.data
    })
    .catch(error => {
      console.log(error)
    })
}
//用于请求下拉列表的字段list
function getListObj(vm, objName, prop, func) {
  vm.$api[objName][func]()
    .then(response => {
      response.data.data.forEach(item => {
        vm[prop].push({ value: item })
      })
    })
    .catch(error => {
      console.log(error)
    })
}

//添加
function add(vm, objName, data) {
  vm.$api[objName].add(data)
    .then(response => {
      if (response.data.state == 1) {
        Message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        });
        vm.$router.go(-1);
      }

    })
    .catch(error => {
      console.log(error)
    })
}
//输入查询的search和filter
// function querySearch(queryString, cb) {
//   var restaurants = this.approverUserNames;
//   var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
//   // 调用 callback 返回建议列表的数据
//   cb(results);
// }
function createFilter(queryString) {
  return (restaurant) => {
    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
  };
}

function handleSelect(item) {
  console.log(item);
}

function resetForm(vc, formName) {
  vc.$refs[formName].resetFields();
}

//输入框提示
function querySearch(queryString, cb, vc, name) {
  var restaurants = vc[name];
  var results = queryString ? restaurants.filter(vc.$manage.createFilter(queryString)) : restaurants;
  cb(results);
}
//cancle
function cancle(vc) {
  vc.$router.go(-1);
}
//排序
function sort(column, vm, objName) {
  if (column.order == "ascending") {
    vm.form.upDown = 'asc'
  } else if (column.order == "descending") {
    vm.form.upDown = 'desc'
  } else {
    vm.form.upDown = null
  }
  vm.form.orderBy = column.prop
  vm.$manage.search(vm, objName)
}
//axios文件下载
function downloadFile(data) {
  // 文件导出
  if (!data) {
    return;
  }
  let url = window.URL.createObjectURL(new Blob([data]));
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", "统计数据.xlsx");
  document.body.appendChild(link);
  link.click();
}

function downloadFile2(data, fileName) {
  // 文件导出
  if (!data) {
    return;
  }
  let url = window.URL.createObjectURL(new Blob([data]));
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
}



export default {
  pageClick,
  search,
  handleSelectionChange,
  deletes,
  handleEdit,
  handleAdd,
  dateFormat,
  edit,
  getList,
  add,
  createFilter,
  handleSelect,
  resetForm,
  querySearch,
  cancle,
  sort,
  downloadFile,
  dateFormatDate,
  getListObj,
  downloadFile2,
}