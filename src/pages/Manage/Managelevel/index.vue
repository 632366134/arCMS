<template>
  <!-- 用户管理 -->
  <div class="app-container">
    <el-form inline>
      <el-form-item>
        <el-input v-model="tempSearchObj.userAccount" placeholder="用户名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="tempSearchObj.companyName" placeholder="公司名" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="search"
        >查询</el-button
      >

      <el-button type="default" @click="resetSearch">清空</el-button>
    </el-form>

    <div style="margin-bottom: 20px">
      <!-- <el-button type="primary" @click="showAddUser">添 加</el-button> -->

      <!-- <el-button
        type="danger"
        @click="revomveUsers"
        :disabled="selectedIds.length === 0"
        >批量删除</el-button
      > -->
    </div>

    <el-table
      border
      stripe
      :data="users"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />

      <el-table-column type="index" label="序号" width="80" align="center" />

      <el-table-column prop="userAccount" label="账户用户名" width="120" />

      <el-table-column prop="mobile" label="联系电话" width="120" />
      
      <el-table-column prop="companyName" label="公司名称" width="200" />

      <el-table-column prop="memberType" label="权限等级"  width="120"/>

      <el-table-column prop="createTime" label="创建时间" width="180" />

      <el-table-column prop="modifyTime" label="更新时间" width="180" />

      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="{ row }">
          <!-- <el-button
            type="info"
            size="mini"
            icon="el-icon-user-solid"
            title="分配角色"
            @click="showAssignRole(row)"
          /> -->

          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            title="修改用户"
            @click="showUpdateUser(row)"
          />

          <el-popconfirm
            :title="`确定删除 ${row.userAccount} 吗?`"
            @confirm="removeUser(row.userAccount)"
          >
            <el-button
              style="margin-left: 10px"
              slot="reference"
              type="danger"
              size="mini"
              icon="el-icon-delete"
              title="删除用户"
            />
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 20px 0"
      layout="prev, pager, next, jumper, ->, sizes, total"
      @current-change="getUsers"
      @size-change="handleSizeChange"
    />

    <el-dialog
      :title="user.userCode ? '修改用户' : '添加用户'"
      :visible.sync="dialogUserVisible"
    >
      <el-form
        ref="userForm"
        :model="user"
        :rules="userRules"
        label-width="120px"
      >
        <el-form-item label="账户用户名" >
          <el-input v-model="user.userAccount" />
        </el-form-item>

        <!-- <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="user.mobile" />
        </el-form-item>

        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="user.companyName" />
        </el-form-item> -->

        <el-form-item label="权限等级" prop="mobile">
          <el-input v-model="user.memberType" />
        </el-form-item>

        <el-form-item v-if="!user.userCode" label="用户密码" prop="password">
          <el-input v-model="user.password" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="addOrUpdate"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="设置角色"
      :visible.sync="dialogRoleVisible"
      :before-close="resetRoleData"
    >
      <el-form label-width="80px">
        <el-form-item label="公司名称">
          <el-input disabled :value="user.companyName"></el-input>
        </el-form-item>

        <el-form-item label="角色权限列表">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >

          <div style="margin: 15px 0"></div>

          <el-checkbox-group
            v-model="userRoleIds"
            @change="handleCheckedChange"
          >
            <el-checkbox
              v-for="role in allRoles"
              :key="role.userCode"
              :label="role.userCode"
              >{{ role.memberType }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button :loading="loading" type="primary" @click="assignRole"
          >保存</el-button
        >

        <el-button @click="resetRoleData">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
// import { adminPeopleApi, adminPermissionApi } from '@/API'
import { ManageUserAPI } from '@/API'
// import {getPageList} from '@/API/Manage/user.js'
export default {
  name: 'Managelevel',
  data() {
    return {
      listLoading: false, // 是否显示列表加载的提示
      searchObj: {
        // 包含请求搜索条件数据的对象
        userAccount: '',
        companyName:'',
      },
      tempSearchObj: {
        // 收集搜索条件输入的对象
        userAccount: '',
        companyName:'',
      },
      selectedIds: [], // 所有选择的user的id的数组
      users: [
        {
          userCode: 120,
          userAccount: '12aa20',
          userName: '某某公司0',
          roleName: '一般管理员0',
          gmtCreate: '2022-11-11',
          gmtModified: '2022-11-12'
        },
        // {
        //   userCode: 121,
        //   userAccount: '12aa21',
        //   userName: '某某公司1',
        //   roleName: '一般管理员1',
        //   gmtCreate: '2022-11-11',
        //   gmtModified: '2022-11-12'
        // },
        // {
        //   userCode: 122,
        //   userAccount: '12aa22',
        //   userName: '某某公司2',
        //   roleName: '一般管理员2',
        //   gmtCreate: '2022-11-11',
        //   gmtModified: '2022-11-12'
        // },
        // {
        //   userCode: 123,
        //   userAccount: '12aa23',
        //   userName: '某某公司3',
        //   roleName: '一般管理员3',
        //   gmtCreate: '2022-11-11',
        //   gmtModified: '2022-11-12'
        // },
        // {
        //   userCode: 124,
        //   userAccount: '12aa24',
        //   userName: '某某公司4',
        //   roleName: '一般管理员4',
        //   gmtCreate: '2022-11-11',
        //   gmtModified: '2022-11-12'
        // },
        // {
        //   userCode: 125,
        //   userAccount: '12aa25',
        //   userName: '某某公司5',
        //   roleName: '一般管理员5',
        //   gmtCreate: '2022-11-11',
        //   gmtModified: '2022-11-12'
        // }
      ], // 当前页的用户列表
      page: 1, // 当前页码
      limit: 5, // 每页数量
      total: 0, // 总数量
      user: {}, // 当前要操作的user
      dialogUserVisible: false, // 是否显示用户添加/修改的dialog
      userRules: {
        // 用户添加/修改表单的校验规则
        companyName: [
          { 
            // required: true,
           message: '用户名必须输入' },
          { min: 4, message: '用户名不能小于4位' }
        ],
        password: [{ required: true, validator: this.validatePassword }]
      },
      loading: false, // 是否正在提交请求中
      dialogRoleVisible: false, // 是否显示角色Dialog
      allRoles: [], // 所有角色列表
      userRoleIds: [], // 用户的角色ID的列表
      isIndeterminate: false, // 是否是不确定的
      checkAll: false // 是否全选
    }
  },

  created() {
    this.getUsers()
  },

  methods: {
    /*
    显示指定角色的界面
    */

    showAssignRole(user) {
      this.user = user
      this.dialogRoleVisible = true
      this.getRoles()
    },

    /*
    全选勾选状态发生改变的监听
    */
    handleCheckAllChange(value) {
      // value 当前勾选状态true/false
      // 如果当前全选, userRoleIds就是所有角色id的数组, 否则是空数组
      this.userRoleIds = value ? this.allRoles.map((item) => item.userCode) : []
      // 如果当前不是全选也不全不选时, 指定为false
      this.isIndeterminate = false
    },

    /*
    异步获取用户的角色列表
    */
    async getRoles() {
      const result = await this.$API.user.getRoles(this.user.userCode)
      const { allRolesList, assignRoles } = result.data
      this.allRoles = allRolesList
      this.userRoleIds = assignRoles.map((item) => item.userCode)
      this.checkAll = allRolesList.length === assignRoles.length
      this.isIndeterminate =
        assignRoles.length > 0 && assignRoles.length < allRolesList.length
    },

    /*
    角色列表选中项发生改变的监听
    */
    handleCheckedChange(value) {
      const { userRoleIds, allRoles } = this
      this.checkAll =
        userRoleIds.length === allRoles.length && allRoles.length > 0
      this.isIndeterminate =
        userRoleIds.length > 0 && userRoleIds.length < allRoles.length
    },

    /*
    请求给用户进行角色授权
    */
    async assignRole() {
      const userId = this.user.userCode
      const roleIds = this.userRoleIds.join(',')
      this.loading = true
      const result = await this.$API.user.assignRoles(userId, roleIds)
      this.loading = false
      this.$message.success(result.message || '分配角色成功')
      this.resetRoleData()
      // console.log(this.$store.getters.name, this.user)
      if (this.$store.getters.name === this.user.companyName) {
        window.location.reload()
      }
    },

    /*
    重置用户角色的数据
    */

    resetRoleData() {
      this.dialogRoleVisible = false
      this.allRoles = []
      this.userRoleIds = []
      this.isIndeterminate = false
      this.checkAll = false
    },

    /*
    自定义密码校验
    */

    validatePassword(rule, value, callback) {
      if (!value) {
        callback('密码必须输入')
      } else if (!value || value.length < 6) {
        callback('密码不能小于6位')
      } else {
        callback()
      }
    },

    /*
    根据输入进行搜索
    */
    search() {
      this.searchObj = { ...this.tempSearchObj }
      this.getUsers()
    },
    /*
    重置输入后搜索
    */
    resetSearch() {
      this.searchObj = {
        userAccount: '',
        companyName:''

      }
      this.tempSearchObj = {
        userAccount: '',
        companyName:''
      }
      this.getUsers()
    },

    /*
    显示添加用户的界面
    */
    showAddUser() {
      this.user = {}
      this.dialogUserVisible = true
      this.$nextTick(() => this.$refs.userForm.clearValidate())
    },

    /*
    删除所有选中的用户
    */
    revomveUsers() {
      this.$confirm('确定删除吗?')
        .then(async () => {
          await this.$API.user.removeUsers(this.selectedIds)
          this.$message.success('删除成功')
          this.getUsers()
        })
        .catch(() => {
          this.$message.info('取消删除')
        })
    },

    /*
    列表选中状态发生改变的监听回调
    */
    handleSelectionChange(selection) {
      this.selectedIds = selection.map((item) => item.userCode)
    },
    /*
    显示更新用户的界面
    */
    showUpdateUser(user) {
      this.user = cloneDeep(user)
      this.dialogUserVisible = true
    },

    /*
    删除某个用户
    */
    async removeUser(userCode) {
      console.log('删除某个用户',111)
      return await ManageUserAPI.delUserByAdmin({userAccount:userAccount}).then((res)=>{
        console.log("rescccccc",res)
        if(res.data.code === 1000){
          this.$message.success('删除成功')
          // this.getUsers(this.users.length === 1 ? this.page - 1 : this.page)
        }
      })
      
      
    },
    /*
    获取分页列表
    */
    // async getUsers(page = 1) {
    //   this.page = page
    //   const { limit, searchObj } = this
    //   this.listLoading = true
    //   const result = await getPageList(page, limit, searchObj.userAccount)
         
      // this.listLoading = false
      // const { items, total } = result.data   
      // this.users = items.filter((item) => item.userAccount !== 'admin')
      // const resList = result.data.data
      // console.log(resList,"lllllll")
      // this.users = resList.filter((item) => item.userAccount !== 'admin')
      // this.total = total - 1
    //   this.selectedIds = []
    // },
    async getUsers(page = 1) {
      this.page = page

      if(this.searchObj.userAccount == ''&&this.searchObj.companyName==''){
        return await ManageUserAPI.getPageList({
        pageNum:this.page, 
        pageSize:this.limit, 
        userAccount:this.searchObj.userAccount,
        // companyName:this.searchObj.companyName
        })
        .then((res)=>{
          this.page = page
      const { limit, searchObj } = this
      this.listLoading = true
      // console.log(res,"1212ceshi")
          if(res.data.code === 1000){
            this.items = res.data.data.list
            // console.log(this.items,"111  items")
            this.listLoading = false 
            this.users = this.items
            // this.users = this.items.filter((item) => item.memberType !== 4)
            this.total = res.data.data.total 
            // this.total = total - 1   // 去掉了自己
            this.selectedIds = []
          }
        }).catch((err)=>{
          this.$message(err)
        })
      }else if(this.searchObj.userAccount != ''&&this.searchObj.companyName==''){

        return await ManageUserAPI.getPageList({
        pageNum:this.page, 
        pageSize:this.limit, 
        userAccount:this.searchObj.userAccount,
        // companyName:this.searchObj.companyName
        })
        .then((res)=>{
          this.page = page
      const { limit, searchObj } = this
      this.listLoading = true
      // console.log(res,"1212ceshi")
          if(res.data.code === 1000){
            this.items = res.data.data.list
            // console.log(this.items,"111  items")
            this.listLoading = false 
            this.users = this.items
            // this.users = this.items.filter((item) => item.memberType !== 4)
            this.total = res.data.data.total 
            // this.total = total - 1   // 去掉了自己
            this.selectedIds = []
          }
        }).catch((err)=>{
          this.$message(err)
        })
      }else if(this.searchObj.userAccount == ''&&this.searchObj.companyName!=''){
        return await ManageUserAPI.getPageList2({
        pageNum:this.page, 
        pageSize:this.limit, 
        // userAccount:this.searchObj.userAccount,
        companyName:this.searchObj.companyName
        })
        .then((res)=>{
          this.page = page
      const { limit, searchObj } = this
      this.listLoading = true
      // console.log(res,"1212ceshi")
          if(res.data.code === 1000){
            this.items = res.data.data.list
            // console.log(this.items,"111  items")
            this.listLoading = false 
            this.users = this.items
            // this.users = this.items.filter((item) => item.memberType !== 4)
            this.total = res.data.data.total 
            // this.total = total - 1   // 去掉了自己
            this.selectedIds = []
          }
        }).catch((err)=>{
          this.$message(err)
        })
      }else if(this.searchObj.userAccount != ''&&this.searchObj.companyName!=''){
        this.$message('请选择其中一个')
      }



        

    
    },

    /*
    处理pageSize发生改变的监听回调
    */

    handleSizeChange(pageSize) {
      this.limit = pageSize
      this.getUsers()
    },

    /*

    取消用户的保存或更新

    */

    cancel() {
      this.dialogUserVisible = false
      this.user = {}
    },

    /*

    保存或者更新用户

    */

    addOrUpdate() {
      console.log("修改或",111)
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          const { user } = this
          this.loading = true
          return ManageUserAPI[user.userCode ? 'update' : 'add']({
            userAccount:user.userAccount,
            memberType:user.memberType
            }).then((res) => {
              console.log("res...",res.code)
              if(res.code === 1000)
            this.loading = false
            console.log("可修改",res.data)
            this.$message.success('保存成功!')
            this.getUsers(user.userCode ? this.page : 1)
            this.user = {}
            this.dialogUserVisible = false
          })
        }
      })
    }
  }
}
</script>

<style></style>
