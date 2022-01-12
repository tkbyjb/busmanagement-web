
const checkUserName = (rule, value, callback) => {
    if(!value || value == '' || value.length <4 || value.length>32 ){
        return callback("请输入长度4-32个字符的用户名")
    }else{
        callback()
    }
}
const checkUserPassword = (rule, value, callback) => {
    if(!value || value == '' || value.length <6 || value.length>32  || /[:alnum:]/.test(value)){
        return callback("请输入长度6-32个可包含数字,大小写字母的密码")
    }else{
        callback()
    }
}

const checkIdCard = (rule, value, callback) => {
    if(!value || value == '' || value.length != 18 || /^[0-9]{17}[0-9]|X$/.test(value) ){
        return callback("请输入长度18的中国公民身份证号")
    }else{
        callback()
    }
}
const checkTel = (rule, value, callback) => {
    if(!value || value == '' || /[0-9]/.test(value) || value.length <6 || value.length>32){
        return callback("请输入合法的电话号码")
    }else{
        callback()
    }
}

const checkBusName = (rule, value, callback) => {
    if(!value || value == '' || /[0-9]/.test(value) ){
        return callback("请输入长度4-32个字符的公车名")
    }else{
        callback()
    }
}

const checkBusCode = (rule, value, callback) => {
    if(!value || value == '' || value.length != 7 ){
        return callback("请输入正确的车牌号")
    }else{
        callback()
    }
}

const checkEngine = (rule, value, callback) => {
    if(!value || value == '' || value.length != 17 ){
        return callback("请输入正确的车牌号")
    }else{
        callback()
    }
}

export default {
    user:{
        checkUserName,
        checkUserPassword,
        checkIdCard,
        checkTel,
    },
    bus:{
        checkBusName,
        checkBusCode,
        checkEngine,
    },
    
    
}