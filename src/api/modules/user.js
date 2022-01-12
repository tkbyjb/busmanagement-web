import http from '../http';

const userId = localStorage.getItem("userId")
const roleId = localStorage.getItem("roleId")
const urlPart = userId+'/'+roleId+"/6";
function gets(pageIndex, pageSize, data) {
    return http({ 
        url: `${urlPart}/user/${pageIndex}/${pageSize}`,
        method: 'post',
        data: data,
    })
}

function deletes(data) {
    return http({
        url: `${urlPart}/user/delete`,
        method: 'post',
        data: data,
    })
}

function add(data) {
    return http({
        url: `${urlPart}/user/add`,
        method: 'post',
        data: data,
    })
}

function edit(data) {
    console.log("@@@@@@@@@@",data)
    return http({
        url: `${urlPart}/user/edit`,
        method: 'post',
        data: data,
    })
}

function setUserRole(userIds, roleId) {
    return http({
        url: `${urlPart}/user/userRole/${roleId}`,
        method: 'post',
        data: userIds,
    })
}

export default {
    gets,
    deletes,
    add,
    edit,
    setUserRole,
}