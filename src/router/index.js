import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
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
      }
    ]
  },
  {
    path: '/Manager',
    component: Layout,
    redirect: '/Manager/ManagerAll',
    name: 'Manager',
    meta: { title: '人员管理', icon: 'el-icon-s-help' ,roles:['manager']},
    children: [
      {
        path: 'ManagerAll',
        name: 'ManagerAll',
        component: () => import('@/views/manager/ManagerAll'),
        meta: { title: 'ManagerAll', icon: 'table',roles:['manager']},
      },
      {
        path: 'ManagerAdd',
        name: 'ManagerAdd',
        component: () => import('@/views/manager/ManagerAdd'),
        meta: { title: 'ManagerAdd', icon: 'tree' ,roles:['manager']},
      },
      {
        path: 'OwnerAll',
        name: 'OwnerAll',
        component: () => import('@/views/manager/OwnerAll'),
        meta: { title: 'OwnerAll', icon: 'tree' ,roles:['manager']},
      },
      {
        path: 'OwnerAdd',
        name: 'OwnerAdd',
        component: () => import('@/views/manager/OwnerAdd'),
        meta: { title: 'OwnerAdd', icon: 'tree' ,roles:['manager']},
      },
    ]
  },
  {
    path: '/Charge',
    component: Layout,
    redirect: '/Charge/ChargeAll',
    name: 'Charge',
    meta: { title: 'Charge', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'ChargeAll',
        name: 'ChargeAll',
        component: () => import('@/views/charge/ChargeAll'),
        meta: { title: 'ChargeAll', icon: 'table' }
      },
      {
        path: 'ChargeRecordAll',
        name: 'ChargeRecordAll',
        component: () => import('@/views/charge/ChargeRecordAll'),
        meta: { title: 'ChargeRecordAll', icon: 'tree' }
      }
    ]
  },
  {
    path: '/HouseM',
    component: Layout,
    redirect: '/HouseM/HouseAll',
    name: 'HouseM',
    meta: { title: 'HouseM', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'HouseAll',
        name: 'HouseAll',
        component: () => import('@/views/housem/HouseAll'),
        meta: { title: 'HouseAll', icon: 'table' }
      },
      {
        path: 'ResidentAll',
        name: 'ResidentAll',
        component: () => import('@/views/housem/ResidentAll'),
        meta: { title: 'ResidentAll', icon: 'table' }
      },
    ]
  },
  {
    path: '/ParkO',
    component: Layout,
    redirect: '/ParkO/CarinfoGet',
    name: 'ParkO',
    meta: { title: 'ParkO', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'CarinfoGet',
        name: 'CarinfoGet',
        component: () => import('@/views/parko/CarinfoGet'),
        meta: { title: 'CarinfoGet', icon: 'table' }
      },
      {
        path: 'CarinfoBuy',
        name: 'CarinfoBuy',
        component: () => import('@/views/parko/CarinfoBuy'),
        meta: { title: 'CarinfoBuy', icon: 'tree' }
      },
      {
        path: 'Parkinfo',
        name: 'Parkinfo',
        component: () => import('@/views/parko/Parkinfo'),
        meta: { title: 'Parkinfo', icon: 'tree' }
      },
      {
        path: 'ParkBuy',
        name: 'ParkBuy',
        component: () => import('@/views/parko/ParkBuy'),
        meta: { title: 'ParkBuy', icon: 'tree' }
      },
    ]
  },
  {
    path: '/ParkM',
    component: Layout,
    redirect: '/ParkM/CarinfoAll',
    name: 'ParkM',
    meta: { title: 'ParkM', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'CarinfoAll',
        name: 'CarinfoAll',
        component: () => import('@/views/parkm/CarinfoAll'),
        meta: { title: 'CarinfoAll', icon: 'table' }
      },
      {
        path: 'ParkinfoAll',
        name: 'ParkinfoAll',
        component: () => import('@/views/parkm/ParkinfoAll'),
        meta: { title: 'ParkinfoAll', icon: 'tree' }
      },
      {
        path: 'ParkAll',
        name: 'ParkAll',
        component: () => import('@/views/parkm/ParkAll'),
        meta: { title: 'ParkAll', icon: 'tree' }
      },
      {
        path: 'ParkAdd',
        name: 'ParkAdd',
        component: () => import('@/views/parkm/ParkAdd'),
        meta: { title: 'ParkAdd', icon: 'tree' }
      },
    ]
  },
  {
    path: '/Complaint',
    component: Layout,
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
    path: '/Repair',
    component: Layout,
    redirect: '/Repair/RepairAll',
    name: 'Repair',
    meta: { title: 'Repair', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'RepairAll',
        name: 'RepairAll',
        component: () => import('@/views/repair/RepairAll'),
        meta: { title: 'RepairAll', icon: 'table' }
      },
    ]
  },
  {
    path: '/Expressage',
    component: Layout,
    redirect: '/Expressage/ExpressageAll',
    name: 'Expressage',
    meta: { title: 'Expressage', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'ExpressageAll',
        name: 'ExpressageAll',
        component: () => import('@/views/expressage/ExpressageAll'),
        meta: { title: 'ExpressageAll', icon: 'table' }
      },
      {
        path: 'ExpressageCreate',
        name: 'ExpressageCreate',
        component: () => import('@/views/expressage/ExpressageCreate'),
        meta: { title: 'ExpressageCreate', icon: 'table' }
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
