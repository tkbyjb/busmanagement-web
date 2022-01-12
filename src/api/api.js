//定义数据请求的唯一入口,在这里引入其他分模块,类似main.js的作用
//吧axios请求和vue的代码分离开了,和后端分离很像
import user from './modules/user';
import role from './modules/role'
import bus from './modules/bus'
import expendType from './modules/expendType';
import menu from './modules/menu'
import busUse from './modules/busUse'
import busExpend from './modules/busExpend'
import approve from './modules/approve'
import stat from './modules/stat'
import backup from './modules/backup'

//然后就能在各个vue文件使用这个api模块了,也可以单独引user.js个api
export default { 
    user,
    role,
    bus,
    expendType,
    menu,
    busUse,
    busExpend,
    approve,
    stat,
    backup,
}