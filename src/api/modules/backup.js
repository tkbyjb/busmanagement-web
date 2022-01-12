import http from '../http';

const userId = localStorage.getItem("userId")
const roleId = localStorage.getItem("roleId")
const urlPart = userId+'/'+roleId+"/19";


function backup() {
    return http({
        url: `${urlPart}/backup`,
        method: 'get',
    })
}

function download(fileName) {
    return http({
        url: `${urlPart}/backup/download`,
        method: 'post',
        data: fileName,
    })
}

function getFileList() {
    return http({
        url: `${urlPart}/backup/list`,
        method: 'get',
    })
}

export default {
    backup,
    download,
    getFileList,
}