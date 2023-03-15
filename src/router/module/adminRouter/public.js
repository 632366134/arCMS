import Index from '@/Layout/Index'
export default [
  {
    path: '/ProjectMenu',
    name: 'ProjectMenu',
    redirect: '/ProjectManage/ProjectList',
    // redirect: "/ProjectMenu",
    component: Index,
    meta: {
      title: '项目管理1',
      icon: 'el-icon-user',
      isOne: true,
      showInBar: true // 是否在上面菜单显示
    },
    children: [
      // 项目管理
      {
        path: '/ProjectManage/ProjectList',
        name: 'ProjectList',
        component: () =>
          import('@/pages/Admin/ProjectManage/ProjectList/index.vue'),
        meta: {
          icon: 'el-icon-s-home',
          title: '项目管理2',
          showRouter: '/ProjectManage/ProjectList', // 左侧选中的菜单
          keepAlive: true, // 是否需要缓存
          showInBar: true // 是否在上面菜单显示
        }
      },

      {
        path: '/ProjectManage/ProjectPic/:projectCode/:projectName',
        name: 'ProjectPic',
        component: () =>
          import('@/pages/Admin/ProjectManage/ProjectPic/index.vue'),
        hidden: true,
        meta: {
          icon: 'el-icon-user',
          title: '项目',
          showRouter: '/ProjectManage/ProjectPic', // 左侧选中的菜单
          keepAlive: true, // 是否需要缓存
          showInBar: true // 是否在上面菜单显示
        }
      },
      {
        path: '/ProjectManage/ProjectPicApp/:projectCode/:projectName',
        name: 'ProjectPicApp',
        component: () =>
          import('@/pages/Admin/ProjectManage/ProjectPicApp/index.vue'),
        hidden: true,
        meta: {
          icon: 'el-icon-user',
          title: '项目',
          showRouter: '/ProjectManage/ProjectPicApp', // 左侧选中的菜单
          keepAlive: true, // 是否需要缓存
          showInBar: true // 是否在上面菜单显示
        }
      },
      {
        path: '/ProjectManage/ProjectPicInfo/:projectCode/:basePicCode/:projectName',
        name: 'ProjectPicInfo',
        component: () =>
          import('@/pages/Admin/ProjectManage/ProjectPicInfo/index.vue'),
        hidden: true,
        meta: {
          icon: 'el-icon-user',
          title: '项目详情',
          showRouter: '/ProjectManage/ProjectPicInfo', // 左侧选中的菜单
          keepAlive: true, // 是否需要缓存
          showInBar: true // 是否在上面菜单显示
        }
      },
      {
        path: '/ProjectManage/ProjectPicInfoApp/:projectCode/:projectName/:mediaData',
        name: 'ProjectPicInfoApp',
        component: () =>
          import('@/pages/Admin/ProjectManage/ProjectPicInfoApp/index.vue'),
        hidden: true,
        meta: {
          icon: 'el-icon-user',
          title: '项目详情',
          showRouter: '/ProjectManage/ProjectPicInfoApp', // 左侧选中的菜单
          keepAlive: true, // 是否需要缓存
          showInBar: true // 是否在上面菜单显示
        }
      },
      {
        path: '/ProjectManage/CreateInfoApp/:projectCode/:projectName/:mediaData?',
        name: 'CreateInfoApp',
        component: () =>
          import('@/pages/Admin/ProjectManage/CreateInfoApp/index.vue'),
        hidden: true,
        meta: {
          icon: 'el-icon-user',
          title: '创建',
          showRouter: '/ProjectManage/CreateInfoApp', // 左侧选中的菜单
          keepAlive: true, // 是否需要缓存
          showInBar: true, // 是否在上面菜单显示
          hiddenLeftBar: true // 隐藏左侧菜单栏
        }
      },
      {
        path: '/ProjectManage/CreateInfoMini/:projectCode/:projectName/:mediaData?',
        name: 'CreateInfoMini',
        component: () =>
          import('@/pages/Admin/ProjectManage/CreateInfoMini/index.vue'),
        hidden: true,
        meta: {
          icon: 'el-icon-user',
          title: '创建',
          showRouter: '/ProjectManage/CreateInfoMini', // 左侧选中的菜单
          keepAlive: true, // 是否需要缓存
          showInBar: true, // 是否在上面菜单显示
          hiddenLeftBar: true // 隐藏左侧菜单栏
        }
      },
      {
        path: '/ProjectManage/EditProjectInfoApp/:projectCode/:projectName/:mediaData?/:appType?',
        name: 'EditProjectInfoApp',
        component: () =>
          import('@/pages/Admin/ProjectManage/EditProjectInfoApp/index.vue'),
        hidden: true,
        meta: {
          icon: 'el-icon-user',
          title: '创建',
          showRouter: '/ProjectManage/EditProjectInfoApp', // 左侧选中的菜单
          keepAlive: true, // 是否需要缓存
          showInBar: true, // 是否在上面菜单显示
          hiddenLeftBar: true // 隐藏左侧菜单栏
        }
      },
      {
        path: '/ProjectManage/EditProjectInfoMini/:projectCode/:classCode?',
        name: 'EditProjectInfoMini',
        component: () =>
          import('@/pages/Admin/ProjectManage/EditProjectInfoMini/index.vue'),
        hidden: true,
        meta: {
          icon: 'el-icon-user',
          title: '创建',
          showRouter: '/ProjectManage/EditProjectInfoMini', // 左侧选中的菜单
          keepAlive: true, // 是否需要缓存
          showInBar: true, // 是否在上面菜单显示
          hiddenLeftBar: true // 隐藏左侧菜单栏
        }
      }
    ]
  },
  {
    path: '/MyOrder',
    name: 'MyOrder',
    // redirect: '/MyOrder/OrdersManage',
    component: Index,
    meta: {
      title: '我的订单',
      icon: 'el-icon-user',
      //   isOne: true,
      showInBar: true // 是否在上面菜单显示
    },
    children: [
      {
        path: '/MyOrder/OrdersManage',
        name: 'OrdersManage',
        component: () => import('@/pages/MyOrder/OrdersManage/index.vue'),
        meta: {
          title: '订单管理',
          showRouter: '/MyOrder/OrdersManage', // 左侧选中的菜单
          icon: false,
          showInBar: true // 是否在上面菜单显示
        },


      },
      {
        path: '/MyOrder/InvoiceManage',
        name: 'InvoiceManage',
        component: () => import('@/pages/MyOrder/InvoiceManage/index.vue'),
        meta: {
          icon: false,
          title: '发票管理',
          showInBar: true, // 是否在上面菜单显示
          showRouter: '/MyOrder/InvoiceManage', // 左侧选中的菜单
          // keepAlive: true // 是否需要缓存
        }
      }, {
        path: '/MyOrder/OrdersManage/NoPay',
        name: 'NoPay',
        component: () => import('@/pages/MyOrder/NoPay/index.vue'),
        // meta: {
        //   title: '待支付订单',

        // showInBar: true, // 是否在上面菜单显示
        // }
      }

    ]
  }
]
