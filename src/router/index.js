import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import UserManage from '../views/content/userManage/UserManage.vue'
import UserEdit from '../views/content/userManage/UserEdit.vue'
import UserAdd from '../views/content/userManage/UserAdd.vue'
import { Message } from 'element-ui'


const userId = localStorage.getItem("userId")
const roleId = localStorage.getItem("roleId")
const urlPart = userId + '/' + roleId + '/';
//权限需要的请求部分

//公共路由
const publicRouterMap = [
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: {
            title: '登录',
            isLogin: false,
        },
    },
    {
        path: '/',
        redirect: '/home',
        component: Home,
        meta: {
            isLogin: true,
        },
        children: [
            {
                path: 'home',
                component: () => import('../views/HomeContent'),
                name: 'home',
                meta: {
                    isLogin: true,
                    title: ['首页'],
                }
            },
            //用户信息管理routes
            {
                name: 'userManage',
                path: urlPart + '6',
                component: UserManage,
                meta: {
                    title: ['系统管理', '用户信息管理'],
                    roles: [1],
                    isLogin: true,
                    menuId: 6,
                },
            },
            {
                name: 'userEidt',
                path: urlPart + '6/edit',
                component: UserEdit,
                meta: {
                    title: ['系统管理', '用户信息管理', '用户编辑'],
                    roles: [1],
                    isLogin: true,
                    menuId: 6,
                },
            },
            {
                name: 'userAdd',
                path: urlPart + '6/add',
                component: UserAdd,
                meta: {
                    title: ['系统管理', '用户信息管理', '用户添加'],
                    roles: [1],
                    isLogin: true,
                    menuId: 6,
                },
            },
            //公车信息管理routes
            {
                name: 'busManage',
                path: urlPart + '7',
                component: () => import('../views/content/busManage/BusManage'),
                meta: {
                    title: ['系统管理', '公车信息管理'],
                    roles: [1],
                    isLogin: true,
                    menuId: 7,
                },
            },
            {
                name: 'busEidt',
                path: urlPart + '7/edit',
                component: () => import('../views/content/busManage/BusEdit'),
                meta: {
                    title: ['系统管理', '公车信息管理', '公车编辑'],
                    roles: [1],
                    isLogin: true,
                    menuId: 7,
                },
            },
            {
                name: 'busAdd',
                path: urlPart + '7/add',
                component: () => import('../views/content/busManage/BusAdd'),
                meta: {
                    title: ['系统管理', '公车信息管理', '公车添加'],
                    roles: [1],
                    isLogin: true,
                    menuId: 7,
                },
            },
            //公车经费支出类别管理routes
            {
                name: 'expendTypeManage',
                path: urlPart + '8',
                component: () => import('../views/content/expendTypeManage/ExpendTypeManage'),
                meta: {
                    title: ['系统管理', '支出类别管理'],
                    roles: [1],
                    isLogin: true,
                    menuId: 8,
                },
            },
            {
                name: 'expendTypeEidt',
                path: urlPart + '8/edit',
                component: () => import('../views/content/expendTypeManage/ExpendTypeEdit'),
                meta: {
                    title: ['系统管理', '支出类别管理', '支出类别编辑'],
                    roles: [1],
                    isLogin: true,
                    menuId: 8,
                },
            },
            {
                name: 'expendTypeAdd',
                path: urlPart + '8/add',
                component: () => import('../views/content/expendTypeManage/ExpendTypeAdd'),
                meta: {
                    title: ['系统管理', '支出类别管理', '支出类别添加'],
                    roles: [1],
                    isLogin: true,
                    menuId: 8,
                },
            },
            //角色信息管理routes
            {
                name: 'roleManage',
                path: urlPart + '10',
                component: () => import('../views/content/roleManage/RoleManage'),
                meta: {
                    title: ['权限管理', '角色信息管理'],
                    roles: [1],
                    isLogin: true,
                    menuId: 10,
                },
            },
            {
                name: 'roleEidt',
                path: urlPart + '10/edit',
                component: () => import('../views/content/roleManage/RoleEdit'),
                meta: {
                    title: ['权限管理', '角色信息管理', '角色编辑'],
                    roles: [1],
                    isLogin: true,
                    menuId: 10,
                },
            },
            {
                name: 'roleAdd',
                path: urlPart + '10/add',
                component: () => import('../views/content/roleManage/RoleAdd'),
                meta: {
                    title: ['权限管理', '角色信息管理', '角色添加'],
                    roles: [1],
                    isLogin: true,
                    menuId: 9,
                },
            },
            {
                name: 'roleAdd2',
                path: urlPart + '9',
                redirect: urlPart + '10/add',
            },
            //用户角色管理
            {
                name: 'userRole',
                path: urlPart + '11',
                component: () => import('../views/content/roleManage/UserRole'),
                meta: {
                    title: ['权限管理', '用户角色管理'],
                    roles: [1],
                    isLogin: true,
                    menuId: 11,
                },
            },
            //公车使用登记管理routes
            {
                name: 'expendTypeManage',
                path: urlPart + '12',
                component: () => import('../views/content/busUseManage/BusUseManage'),
                meta: {
                    title: ['公车登记管理', '公车使用登记'],
                    roles: [1],
                    isLogin: true,
                    menuId: 12,
                },
            },
            {
                name: 'expendTypeEidt',
                path: urlPart + '12/edit',
                component: () => import('../views/content/busUseManage/BusUseEdit'),
                meta: {
                    title: ['公车登记管理', '公车使用登记', '公车使用编辑'],
                    roles: [1],
                    isLogin: true,
                    menuId: 12,
                },
            },
            {
                name: 'expendTypeAdd',
                path: urlPart + '12/add',
                component: () => import('../views/content/busUseManage/BusUseAdd'),
                meta: {
                    title: ['公车登记管理', '公车使用登记', '公车使用添加'],
                    roles: [1],
                    isLogin: true,
                    menuId: 12,
                },
            },
            //公车经费支出管理routes
            {
                name: 'expendExpendManage',
                path: urlPart + '13',
                component: () => import('../views/content/busExpendManage/BusExpendManage'),
                meta: {
                    title: ['公车登记管理', '经费支出管理'],
                    roles: [1],
                    isLogin: true,
                    menuId: 13,
                },
            },
            {
                name: 'expendExpendEidt',
                path: urlPart + '13/edit',
                component: () => import('../views/content/busExpendManage/BusExpendEdit'),
                meta: {
                    title: ['公车登记管理', '经费支出管理', '经费支出编辑'],
                    roles: [1],
                    isLogin: true,
                    menuId: 13,
                },
            },
            {
                name: 'expendExpendAdd',
                path: urlPart + '13/add',
                component: () => import('../views/content/busExpendManage/BusExpendAdd'),
                meta: {
                    title: ['公车登记管理', '经费支出管理', '经费支出添加'],
                    roles: [1],
                    isLogin: true,
                    menuId: 13,
                },
            },
            //管理部门审批
            {
                name: 'approve',
                path: urlPart + '14',
                component: () => import('../views/content/approve/Approve'),
                meta: {
                    title: ['审批管理', '管理部门审批'],
                    roles: [1],
                    isLogin: true,
                    menuId: 14,
                },
            },
            //查看登录用户审批记录
            {
                name: 'approveLog',
                path: urlPart + '15',
                component: () => import('../views/content/approve/ApproveLog'),
                meta: {
                    title: ['审批管理', '审批条目管理'],
                    roles: [1],
                    isLogin: true,
                    menuId: 15,
                },
            },
            //统计
            {
                name: 'useStat',
                path: urlPart + '16',
                component: () => import('../views/content/stat/UseStat'),
                meta: {
                    title: ['统计管理', '公车使用信息统计'],
                    roles: [1],
                    isLogin: true,
                    menuId: 16,
                },
            },
            {
                name: 'expendStat',
                path: urlPart + '17',
                component: () => import('../views/content/stat/ExpendStat'),
                meta: {
                    title: ['统计管理', '公车经费支出信息统计'],
                    roles: [1],
                    isLogin: true,
                    menuId: 17,
                },
            },
            //数据备份
            {
                name: 'backup',
                path: urlPart + '19',
                component: () => import('../views/content/backup/Backup'),
                meta: {
                    title: ['数据备份', '选择备份'],
                    roles: [1],
                    isLogin: true,
                    menuId: 19,
                },
            },
        ],
    },
    
]
const router = new VueRouter({
    routes: publicRouterMap,
});
//此router每个路由跳转前,路由前守卫
import { getCookie } from '../utils/cookie';
router.beforeEach(function (to, from, next) {
    //检查登录
    let userId = localStorage.getItem("userId");
    let require = to.matched.some(function (item) {
        return item.meta.isLogin
    })
    let cookie = getCookie("Authorization")
    if(!userId && require /*&& !cookie*/) {
        next({
            name: 'login',
            params: { redirect: to },
        })
    }
    else if(userId && to.name=='login' && cookie ){
        Message({
            message: '请退出再登录',
            type: 'error',
            duration: 2 * 1000,
        })
    } 
    else {
        if (localStorage.getItem("menuIds") && localStorage.getItem("menuIds").indexOf(to.meta.menuId) == -1 
        && require && to.name != 'home') {
            Message({
                message: '没有权限访问此页面',
                type: 'error',
                duration: 2 * 1000,
            })
            // this.$router.go(-1);
        } else {
            next()
        }
    }
});
//路由跳转后守卫
router.afterEach(function (to) {
    document.title = to.meta.title
})
export default router;

