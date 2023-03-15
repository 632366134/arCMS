import pulic from './public'
import Index from "@/Layout/Index"
export default [
    ...pulic,
    {
      path: "/Manage",
      name: "Manage",
      // redirect: "/Manage", 
      component: () => import("@/pages/Manage/index.vue"),    
      // component: Index,
      hidden: true,
      meta: {
        title: "权限管理",
        icon: "el-icon-user",
        keepAlive: true,// 是否需要缓存
        showInBar: true, // 是否在上面菜单显示
      //   isOne: true
      },
      children: [
        {
          path: "/Manage/Managelevel",
          name: "用户管理",   
          component: () => import("@/pages/Manage/Managelevel/index.vue"),        
          meta: {
            icon: "el-icon-user",
            title: "用户管理",
            showRouter: "/Manage/Managelevel", // 左侧选中的菜单
            keepAlive: true,// 是否需要缓存
            showInBar: true, // 是否在上面菜单显示
          }
        },
        {
          path: "/Manage/ManageRole",
          name: "角色管理",   
          component: () => import("@/pages/Manage/ManageRole/index.vue"),        
          meta: {
            icon: "el-icon-user",
            title: "角色管理",
            showRouter: "/Manage/ManageRole", // 左侧选中的菜单
            keepAlive: true,// 是否需要缓存
            showInBar: true, // 是否在上面菜单显示
          },
          // children:[
            
          // ]
        },
        {
          path: "/Manage/ManageRole/RoleAuth",
          name: "角色选择权限",   
          component: () => import("@/pages/Manage/ManageRole/RoleAuth/index.vue"),        
          meta: {
            icon: "el-icon-user",
            title: "角色选择权限",
            showRouter: "/Manage/ManageRole/RoleAuth", // 左侧选中的菜单
            keepAlive: true,// 是否需要缓存
            showInBar: true, // 是否在上面菜单显示
          }
        },
      
      ]
    },
    // {
    //     path: "/UserManage",
    //     name: "UserManage",
    //     redirect: "/User",
    //     component: Index,
    //     meta: {
    //         title: "用户管理",//一级菜单
    //         icon: "el-icon-user",
    //         isOne: true
    //     },
    //     children: [
    //         {
    //             path: "/User",
    //             name: "User",
    //             component: () => import("@/pages/Admin/UserManage/index.vue"),
    //             meta: {
    //                 title: "子账户管理",
    //                 showRouter: "/User", // 左侧选中的菜单
    //                 keepAlive: true,// 是否需要缓存
    //                 showInBar: true, // 是否在上面菜单显示
    //                 icon: "el-icon-user",
    //             }
    //         },
    //         {
    //             path: "/addUser",
    //             name: "addUser",
    //             component: () => import("@/pages/Admin/AddChild/index.vue"),
    //             meta: {
    //                 title: "子用户添加",
    //                 showRouter: "/User", // 左侧选中的菜单
    //                 keepAlive: true,// 是否需要缓存
    //                 showInBar: true, // 是否在上面菜单显示
    //                 icon: "el-icon-user",
    //             },
    //             hidden: true
    //         },
    //     ]
    // },
    // {
    //     path: "/TaskManage",
    //     name: "TaskManage",
    //     redirect: "/Task",
    //     component: Index,
    //     meta: {
    //         title: "项目管理",
    //         icon: "el-icon-folder",
    //         isOne: false
    //     },
    //     children: [
    //         {
    //             path: "/Task",
    //             name: "Task",
    //             component: () => import("@/pages/TaskManage/index.vue"),
    //             meta: {
    //                 title: "项目管理",
    //                 showRouter: "/Task",
    //                 keepAlive: true,
    //                 showInBar: true,
    //                 icon: "el-icon-tickets"
    //             }
    //         },
    //         {
    //             path: "/TaskUpLoad",
    //             name: "TaskUpLoad",
    //             component: () => import("@/pages/upload3/index.vue"),
    //             meta: {
    //                 title: "项目资源上传",
    //                 showRouter: "/TaskList",
    //                 keepAlive: true,
    //                 showInBar: true,
    //                 icon: "el-icon-tickets"
    //             },
    //             hidden: true
    //         },

    //         {
    //             path: "/TaskSel/:projectCode/:basePicCode/:cloudTargetId",
    //             name: "TaskSel",
    //             component: () => import("@/pages/TaskList/components/index.vue"),
    //             meta: {
    //                 title: "项目资源查看",
    //                 showRouter: "/TaskList",
    //                 keepAlive: true,
    //                 showInBar: true,
    //                 icon: "el-icon-tickets"
    //             },
    //             hidden: true
    //         },
    //         {
    //             path: "/TaskList",
    //             name: "TaskList",
    //             component: () => import("@/pages/TaskList/index.vue"),
    //             meta: {
    //                 title: "项目资源列表",
    //                 showRouter: "/TaskList",
    //                 keepAlive: true,
    //                 showInBar: true,
    //                 icon: "el-icon-tickets"
    //             }
    //         },
    //         {
    //             path: "/Download",
    //             name: "Download",
    //             component: () => import("@/pages/Download/index.vue"),
    //             meta: {
    //                 title: "识别文件下载",
    //                 showRouter: "/Download",
    //                 keepAlive: true,
    //                 showInBar: true,
    //                 icon: "el-icon-tickets"
    //             }
    //         },
    //     ]
    // },
]