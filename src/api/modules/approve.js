import http from '../http';

const userId = localStorage.getItem("userId")
const roleId = localStorage.getItem("roleId")
const urlPart = userId+'/'+roleId+"/14";


function set(data, state) {
    return http({
        url: `${urlPart}/approve/${state}`,
        method: 'post',
        data: data,
    })
}

function gets(pageIndex, pageSize, data) {
    return http({
        url: `${urlPart}/approve/${pageIndex}/${pageSize}`,
        method: 'post',
        data: data,
    })
}

export default {
    set,
    gets,
}