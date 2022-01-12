import http from '../http';

const userId = localStorage.getItem("userId")
const roleId = localStorage.getItem("roleId")
const urlPart = userId+'/'+roleId+"/10";

function gets() {
    return http({
        url: `${urlPart}/menu/all`,
        method: 'post',
    })
}



export default {
    gets
}