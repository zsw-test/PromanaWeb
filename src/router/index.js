import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import Cookies from 'js-cookie'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path:'/black',
    component:()=>import('@/views/black')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/homeO',
    component: Layout,
    hidden: Cookies.get('role')!='owner',
    redirect: '/homeO/dashboardO',
    children: [{
      path: 'dashboardO',
      name: 'dashboardO',
      component: () => import('@/views/dashboard/dashboardO'),
      meta: { title: '业主主页', icon: 'dashboard' }
    }]
  },

  {
    path: '/homeM',
    hidden: Cookies.get('role')!='manager',
    component: Layout,
    redirect: '/homeM/dashboardM',
    children: [{
      path: 'dashboardM',
      name: 'dashboardM',
      component: () => import('@/views/dashboard/dashboardM'),
      meta: { title: '管理员主页', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    hidden: Cookies.get('role')!='manager',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help',roles:['manager','owner']},
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' ,roles:['manager','owner']},
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' ,roles:['manager','owner']},
      },
      {
        path: 'photo',
        name: 'photo',
        component: () => import('@/views/repairo/PhotoUp'),
        meta: { title: 'photo', icon: 'tree' ,roles:['manager','owner']},
      }
    ]
  },

  {
    path: '/EntranceGuard',
    component: Layout,
    redirect: '/EntranceGuard/index',
    hidden: Cookies.get('role')!='owner',
    name: 'EntranceGuard',
    meta: { title: '门禁系统', icon: 'el-icon-s-help' ,roles:['owner']},
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/entranceguard/index'),
        meta: { title: '上传图片', icon: 'table',roles:['owner']},
      },
      {
        path: 'confirm',
        name: 'confirm',
        component: () => import('@/views/entranceguard/confirm'),
        meta: { title: '门禁确认', icon: 'table',roles:['owner']},
      },
    ]
  },

  {
    path: '/StuffManage',
    component: Layout,
    redirect: '/StuffManage/ManagerAll',
    hidden: Cookies.get('role')!='manager',
    name: 'StuffManage',
    meta: { title: '人员管理', icon: 'el-icon-s-help' ,roles:['manager']},
    children: [
      {
        path: 'ManagerAll',
        name: 'ManagerAll',
        component: () => import('@/views/stuffmanage/ManagerAll'),
        meta: { title: '所有管理员', icon: 'table',roles:['manager']},
      },
      {
        path: 'ManagerAdd',
        name: 'ManagerAdd',
        component: () => import('@/views/stuffmanage/ManagerAdd'),
        meta: { title: '添加管理员', icon: 'tree' ,roles:['manager']},
      },
      {
        path: 'OwnerAll',
        name: 'OwnerAll',
        component: () => import('@/views/stuffmanage/OwnerAll'),
        meta: { title: '所有业主', icon: 'tree' ,roles:['manager']},
      },
      {
        path: 'OwnerAdd',
        name: 'OwnerAdd',
        component: () => import('@/views/stuffmanage/OwnerAdd'),
        meta: { title: '添加业主', icon: 'tree' ,roles:['manager']},
      },
    ]
  },
  {
    path: '/Charge',
    hidden: Cookies.get('role')!='manager',
    component: Layout,
    redirect: '/Charge/ChargeAll',
    name: 'Charge',
    meta: { title: '收费管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'ChargeAll',
        name: 'ChargeAll',
        component: () => import('@/views/charge/ChargeAll'),
        meta: { title: '所有费用', icon: 'table' }
      },
      {
        path: 'ChargeRecordAll',
        name: 'ChargeRecordAll',
        component: () => import('@/views/charge/ChargeRecordAll'),
        meta: { title: '缴费记录', icon: 'tree' }
      }
    ]
  },
  {
    path: '/HouseM',
    hidden: Cookies.get('role')!='manager',
    component: Layout,
    redirect: '/HouseM/HouseAll',
    name: 'HouseM',
    meta: { title: '房屋管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'HouseAll',
        name: 'HouseAll',
        component: () => import('@/views/housem/HouseAll'),
        meta: { title: '所有房屋', icon: 'table' }
      },
      {
        path: 'ResidentAll',
        name: 'ResidentAll',
        component: () => import('@/views/housem/ResidentAll'),
        meta: { title: '所有住户', icon: 'table' }
      },
    ]
  },
  {
    path: '/HouseO',
    hidden: Cookies.get('role')!='owner',
    component: Layout,
    redirect: '/HouseO/HouseResidents',
    name: 'HouseO',
    meta: { title: '我的房屋', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'HouseResidents',
        name: 'HouseResidents',
        component: () => import('@/views/houseo/HouseResidents'),
        meta: { title: '房屋住户', icon: 'table' }
      },
      {
        path: 'HouseFee',
        name: 'HouseFee',
        component: () => import('@/views/houseo/HouseFee'),
        meta: { title: '房屋费用', icon: 'table' }
      },
      {
        path: 'HouseAddResident',
        name: 'HouseAddResident',
        component: () => import('@/views/houseo/HouseAddResident'),
        meta: { title: '添加住户', icon: 'table' }
      },
    ]
  },

  {
    path: '/ParkO',
    hidden: Cookies.get('role')!='owner',
    component: Layout,
    redirect: '/ParkO/CarinfoGet',
    name: 'ParkO',
    meta: { title: '停车管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'CarinfoGet',
        name: 'CarinfoGet',
        component: () => import('@/views/parko/CarinfoGet'),
        meta: { title: '查询车辆信息', icon: 'table' }
      },
      {
        path: 'CarinfoBuy',
        name: 'CarinfoBuy',
        component: () => import('@/views/parko/CarinfoBuy'),
        meta: { title: '购买停车卡', icon: 'tree' }
      },
      {
        path: 'Parkinfo',
        name: 'Parkinfo',
        component: () => import('@/views/parko/Parkinfo'),
        meta: { title: '模拟停车', icon: 'tree' }
      },
      {
        path: 'ParkBuy',
        name: 'ParkBuy',
        component: () => import('@/views/parko/ParkBuy'),
        meta: { title: '购买停车位', icon: 'tree' }
      },
    ]
  },
  {
    path: '/ParkM',
    hidden: Cookies.get('role')!='manager',
    component: Layout,
    redirect: '/ParkM/CarinfoAll',
    name: 'ParkM',
    meta: { title: '停车管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'CarinfoAll',
        name: 'CarinfoAll',
        component: () => import('@/views/parkm/CarinfoAll'),
        meta: { title: '所有车辆信息', icon: 'table' }
      },
      {
        path: 'ParkinfoAll',
        name: 'ParkinfoAll',
        component: () => import('@/views/parkm/ParkinfoAll'),
        meta: { title: '所有停车信息', icon: 'tree' }
      },
      {
        path: 'ParkAll',
        name: 'ParkAll',
        component: () => import('@/views/parkm/ParkAll'),
        meta: { title: '所有车位信息', icon: 'tree' }
      },
      {
        path: 'ParkAdd',
        name: 'ParkAdd',
        component: () => import('@/views/parkm/ParkAdd'),
        meta: { title: '添加停车位', icon: 'tree' }
      },
    ]
  },
  {
    path: '/Complaint',
    component: Layout,
    hidden: Cookies.get('role')!='manager',
    redirect: '/Complaint/ComplaintAll',
    name: 'Complaint',
    meta: { title: 'Complaint', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'ComplaintAll',
        name: 'ComplaintAll',
        component: () => import('@/views/complaint/ComplaintAll'),
        meta: { title: 'ComplaintAll', icon: 'table' }
      },
    ]
  },
  {
    path: '/RepairM',
    hidden: Cookies.get('role')!='manager',
    component: Layout,
    redirect: '/RepairM/RepairAll',
    name: 'RepairM',
    meta: { title: '投诉管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'RepairAll',
        name: 'RepairAll',
        component: () => import('@/views/repairm/RepairAll'),
        meta: { title: '所有报修', icon: 'table' }
      },
      {
        path: 'RepairGetM',
        name: 'RepairGetM',
        component: () => import('@/views/repairm/RepairGet'),
        meta: { title: '待处理的报修', icon: 'table' }
      },
    ]
  },
  {
    path: '/RepairO',
    hidden: Cookies.get('role')!='owner',
    component: Layout,
    redirect: '/RepairO/RepairAdd',
    name: 'RepairO',
    meta: { title: '报修管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'RepairAdd',
        name: 'RepairAdd',
        component: () => import('@/views/repairo/RepairAdd'),
        meta: { title: '上报报修', icon: 'table' }
      },
      {
        path: 'RepairGetO',
        name: 'RepairGetO',
        component: () => import('@/views/repairo/RepairGet'),
        meta: { title: '我的报修', icon: 'table' }
      },
      {
        path: 'RepairEdit',
        name: 'RepairEdit',
        hidden:true,
        component: () => import('@/views/repairo/RepairEdit'),
        meta: { title: '修改报修', icon: 'table' }
      },
    ]
  },
  {
    path: '/Expressage',
    component: Layout,
    hidden: Cookies.get('role')!='manager',
    redirect: '/Expressage/ExpressageAll',
    name: 'Expressage',
    meta: { title: '快件管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'ExpressageAll',
        name: 'ExpressageAll',
        component: () => import('@/views/expressage/ExpressageAll'),
        meta: { title: '所有快件', icon: 'table' }
      },
      {
        path: 'ExpressageCreate',
        name: 'ExpressageCreate',
        component: () => import('@/views/expressage/ExpressageCreate'),
        meta: { title: '快件录入', icon: 'table' }
      },
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
