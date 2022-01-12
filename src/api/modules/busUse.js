import http from '../http';

const userId = localStorage.getItem("userId")
const roleId = localStorage.getItem("roleId")
const urlPart = userId+'/'+roleId+"/12";
function gets(pageIndex, pageSize, data) {
    return http({
        url: `${urlPart}/busRegisterInfo/${pageIndex}/${pageSize}`,
        method: 'post',
        data: data,
    })
}

function deletes(data) {
    return http({
        url: `${urlPart}/busRegisterInfo/delete`,
        method: 'post',
        data: data,
    })
}

function add(data) {
    return http({
        url: `${urlPart}/busRegisterInfo/add`,
        method: 'post',
        data: data,
    })
}

function edit(data) {
    return http({
        url: `${urlPart}/busRegisterInfo/edit`,
        method: 'post',
        data: data,
    })
}

function getStartPlaces() {
    return http({
        url: `${urlPart}/busRegisterInfo/startPlaces`,
        method: 'get',
    })
}

function getBusCodes() {
    return http({
        url: `${urlPart}/busRegisterInfo/busCodes`,
        method: 'get',
    })
}

function getEndPlaces() {
    return http({
        url: `${urlPart}/busRegisterInfo/endPlaces`,
        method: 'get',
    })
}

function getRecepientUserNames() {
    return http({
        url: `${urlPart}/busRegisterInfo/recepientUserNames`,
        method: 'get',
    })
}

function getCreatorUserNames() {
    return http({
        url: `${urlPart}/busRegisterInfo/creatorUserNames`,
        method: 'get',
    })
}


function getIntervalInfo(data) {
    return http({
        url: `${urlPart}/busRegisterInfo/intervalInfo`,
        method: 'post',
        data: data,
    })
}

function download(data){
    return http({
        url: `${urlPart}/busRegisterInfo/intervalInfo/download`,
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
    getStartPlaces,
    getEndPlaces,
    getRecepientUserNames,
    getCreatorUserNames,
    getBusCodes,
    getIntervalInfo,
    download,
}