<template>
  <div>
    <HeadNav></HeadNav>
    <!-- <LeftMenu></LeftMenu> -->
    <!-- <el-row class="tac Mleft">
      <el-col >
        <h5>默认颜色</h5>
        <el-menu
          default-active="this.$router.path"
          class="el-menu-vertical-demo"
          router
        >
          <el-submenu index="1" title="">
            <template slot="title" >
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>           
              <el-menu-item index="/Manage/ManageRole">用户权限</el-menu-item>
              <el-menu-item index="/Manage/Managelevel">角色权限主页</el-menu-item>
              <el-menu-item index="/Manage/ManageRole/RoleAuth">选择</el-menu-item>
            
          </el-submenu>
          
        </el-menu>
      </el-col>
    </el-row> -->

    <div>
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">
      <Managelevel></Managelevel>
    </el-tab-pane>
    
    <el-tab-pane label="角色管理" name="third">
      <ManageRole>
      </ManageRole>
    </el-tab-pane>
    <el-tab-pane label="跳转到项目管理页面" name="second" ></el-tab-pane>
    <!-- <el-tab-pane label="树形结构" name="fourth"> -->
      <!-- <RoleAuth>
      </RoleAuth> -->
    <!-- </el-tab-pane> -->
  </el-tabs>
    </div>
  <!-- <div class="contain">
    <router-view></router-view>
  </div> -->
  </div>
  
  <!-- <div>
    超管权限
    <div>对用户权限进行修改
    <div>获取所有的用户以及对应的level</div>
    
    </div>
  </div> -->
</template>

<script>
import HeadNav from '../../Layout/Index/modules/HeadNav.vue';
// import LeftMenu from '../../Layout/Index/modules/LeftMenu.vue';
import Managelevel from './Managelevel/index.vue'
import ManageRole from './ManageRole/index.vue'
// import RoleAuth from './ManageRole/RoleAuth/index.vue'
  export default {
  components: { HeadNav,Managelevel,ManageRole },
   data() {
      return {
        activeName2: 'first'
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClick(tab, event) {
        console.log(tab, event);
        if(tab.index==2){
          this.$router.push('/ProjectManage/ProjectList')
        }
      }
      
    }
  }
</script>

<style lang="scss">
.Mleft{
    top:0;
    left:0;
    width: 150px;
    height: 100%;   
}

.el-submenu .el-menu-item {
    height: 50px;
    line-height: 50px;
    /* padding: 0 45px; */
    /* min-width: 200px; */
}
v::deep li.el-menu-item,li.el-menu-item.is-active{
  width: 150px;
}
.el-menu-item {
        height: 30px;
        text-align: left;
        width: 150px;
        // line-height: 30px;
        border-radius: 2px 2px 0 0;
        // border: 1px solid #01c2e8;
        margin-right: 1px;
        font-size: 16px;
        color: #000;
      }

.el-row::after, .el-row::before {
    display: none;
}
li.el-menu-item.is-active{
  width: 100%;
}
li.is-active{
  background-color: transparent;
  width: 100%;
}
.el-menu-item:not(.is-disabled):hover {
        background-color: transparent;
        width: 100%;
        // color: #829fff;
      }
.el-menu-item:not(.is-disabled):active {
        background-color: #fff;
        // width: 100px;
        // color: #829fff;
      } 


.contain{
    display: inline-block;
}
</style>
