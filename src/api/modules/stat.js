import http from '../http';

const userId = localStorage.getItem("userId")
const roleId = localStorage.getItem("roleId")
const urlPart = userId+'/'+roleId+"/17";

function getRoles() {
    return http({
        url: 'role/all',
        method: 'get',

    })
}

function gets(pageIndex, pageSize, searchData) {
    return http({
        url: `${urlPart}/role/${pageIndex}/${pageSize}`,
        method: 'post',
        data: searchData,
    })
}

function edit(role, menus) {
    return http({
        url: `${urlPart}/role/edit`,
        method: 'post',
        data: {
            role: role,
            menus: menus,
        },
    })
}

function add(role, menus) {
    console.log(role,menus)
    return http({
        url: `${urlPart}/role/add`,
        method: 'post',
        data: {
            role: role,
            menus: menus,
        },
    })
}



export default {
    getRoles,
    gets,
    edit,
    add,
}