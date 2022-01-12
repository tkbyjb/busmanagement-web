import http from '../http';

const userId = localStorage.getItem("userId")
const roleId = localStorage.getItem("roleId")
const urlPart = userId+'/'+roleId+"/13";
function gets(pageIndex, pageSize, data) {
    return http({ 
        url: `${urlPart}/busExpend/${pageIndex}/${pageSize}`,
        method: 'post',
        data: data,
    })
}

function deletes(data) {
    return http({
        url: `${urlPart}/busExpend/delete`,
        method: 'post',
        data: data,
    })
}

function add(data) {
    return http({
        url: `${urlPart}/busExpend/add`,
        method: 'post',
        data: data,
    })
}

function edit(data) {
    return http({
        url: `${urlPart}/busExpend/edit`,
        method: 'post',
        data: data,
    })
}

function getApproverUserNames() {
    return http({
        url: `${urlPart}/busExpend/approverUserNames`,
        method: 'get',
    })
}

function getCreatorUserNames() {
    return http({
        url: `${urlPart}/busExpend/creatorUserNames`,
        method: 'get',
    })
}

function getBusCodes() {
    return http({
        url: `${urlPart}/busExpend/busCodes`,
        method: 'get',
    })
}

function getIntervalInfo(data) {
    return http({
        url: `${urlPart}/busExpend/intervalInfo`,
        method: 'post',
        data: data,
    })
}

function download(data){
    return http({
        url: `${urlPart}/busExpend/intervalInfo/download`,
        method: 'post',
        data: data,
        responseType: 'blob',
    })
}


export default {
    gets,
    deletes,
    add,
    edit,
    getApproverUserNames,
    getCreatorUserNames,
    getBusCodes,
    getIntervalInfo,
    download,
}