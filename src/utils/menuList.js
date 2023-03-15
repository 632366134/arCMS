
import { publicRouter, testRouter } from "@/router/module/perosonlRouter/index"

import { publicRouter as adminPublicUser, UserManagee as adminClever } from "@/router/module/adminRouter/index"



//模块展示
export const admiTopMenuList = [

    {
        name: "", icon: "/static/images/xingzheng.png", permissionCode: "00002", router: adminClever
    }
]
export const peopleTopMenuList = [
    // { name: "公共模块", icon: "/static/images/xingzheng.png", permissionCode: "00001", router: publicRouter },
    // {
    //     name: "测试模块", icon: "/static/images/xingzheng.png", permissionCode: "00002", router: testRouter
    // },
]

export const getRoutes = function () {
    let permission = sessionStorage.permission
    let routes = {}
    switch (permission) {
        case '0': routes = admiTopMenuList; break;
        case '1': routes = peopleTopMenuList; break;
        default:
            break;
    }
    return routes
}