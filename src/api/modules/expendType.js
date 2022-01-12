import http from '../http';

const userId = localStorage.getItem("userId")
const roleId = localStorage.getItem("roleId")
const urlPart = userId+'/'+roleId+"/8";
function gets(pageIndex, pageSize, data) {
    return http({ 
        url: `${urlPart}/expendType/${pageIndex}/${pageSize}`,
        method: 'post',
        data: data,
    })
}

function deletes(data) {
    return http({
        url: `${urlPart}/expendType/delete`,
        method: 'post',
        data: data,
    })
}

function add(data) {
    return http({
        url: `${urlPart}/expendType/add`,
        method: 'post',
        data: data,
    })
}

function edit(data) {
    return http({
        url: `${urlPart}/expendType/edit`,
        method: 'post',
        data: data,
    })
}

function getPrincipalUserNames() {
    return http({
        url: `${urlPart}/bus/principalUserNames`,
        method: 'get',
    })
}

function getVendors() {
    return http({
        url: `${urlPart}/bus/vendors`,
        method: 'get',
    })
}

function getTypes() {
    return http({
        url: `${urlPart}/bus/types`,
        method: 'get',
    })
}

function getPurposes() {
    return http({
        url: `${urlPart}/bus/purposes`,
        method: 'get',
    })
}


export default {
    gets,
    deletes,
    add,
    edit,
    getPrincipalUserNames,
    getVendors,
    getTypes,
    getPurposes
}