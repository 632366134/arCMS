
import Index from "@/Layout/Index"
export default [
  {
    path: "/HomePage2",
    name: "HomePage2",
    redirect: "/Home",
    component: Index,
    hidden: true,
    meta: {
      title: "我的信息",
      icon: "menu",
    },
    children: [
      {
        path: "/Home",
        name: "Home",
        component: () => import("@/pages/Home/Home.vue"),
        meta: {
          title: "我的信息1",
          showRouter: "/Home", // 左侧选中的菜单
          keepAlive: true,// 是否需要缓存
          showInBar: true, // 是否在上面菜单显示
        }
      },


    ]
  },
]