<template>
  <div class="containerOrders">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="orderMana">
      <div class="orderTop">
        <el-form inline class="searchForm">
          <el-form-item class="formItem">
            <el-select v-model="value" placeholder="请选择订单状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="formItem">
            <el-input placeholder="请输入内容" />
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search"
            >搜索</el-button
          >

          <el-button type="danger" icon="el-icon-delete" @click="resetSearch"
            >清空</el-button
          >
        </el-form>
      </div>

      <!-- 表格 -->
      <div class="tabHeight">
        <el-table
          header-align="center"
          style="width: 1140px,height:50px;box-sizing: border-box"
          :data="users"
          :header-cell-style="{ color: '#000', background: '#FBFBFB' }"
          :header-row-style="{ height: '50px' }"
          :row-style="{ height: '50px' }"
        >
          <el-table-column
            prop="orderNum"
            label="订单号"
            align="center"
            width="190"
          />
          <el-table-column
            prop="orderName"
            label="商品名称"
            align="center"
            width="190"
          />
          <el-table-column
            prop="createTime"
            label="下单时间"
            align="center"
            width="190"
          />
          <el-table-column
            prop="price"
            label="金额（元）"
            align="center"
            width="190"
          />
          <el-table-column
            prop="state"
            label="订单状态"
            align="center"
            width="190"
          />

          <el-table-column label="操作" width="190" align="center">
            <template slot-scope="{ row }">
              <el-button
                size="mini"
                type="primary"
                v-if="row.state == '待支付'"
                @click="getNoPay()"
                >支付</el-button
              >

              <el-button
                round
                size="mini"
                type="primary"
                v-if="row.state == '待结算'"
                @click="getNoPay()"
                >结算</el-button
              >

              <el-button size="mini" round>取消</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页组件 -->

      <!-- <el-pagination
        :total="total"
        :page-sizes="[5, 10, 20]"
        style="padding: 20px 0"
        layout="prev, pager, next, jumper, ->, sizes, total"
        @current-change="getUsers"
        @size-change="handleSizeChange"
      /> -->
      <el-pagination
        :current-page="page"
        @size-change="handleSizeChange"
        @current-change="getUsers"
        style="padding: 20px 0"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="limit"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: [
        {
          value: '选项1',
          label: '待支付'
        },
        {
          value: '选项2',
          label: '待结算'
        },
        {
          value: '选项3',
          label: '已完成'
        }
      ],
      listLoading: false,
      searchObj: {
        // 包含请求搜索条件数据的对象
        userAccount: '',
        companyName: ''
      },
      tempSearchObj: {
        // 收集搜索条件输入的对象
        userAccount: '',
        companyName: ''
      },
      users: [
        {
          orderNum: 120,
          orderName: '12aa20',

          price: '20',
          createTime: '2022-11-11',
          state: '待结算'
        }
      ],
      page: 1, // 当前页码
      limit: 12, // 每页数量
      total: 0, // 总数量
      user: {}, // 当前要操作的user
      userRules: {
        // 用户添加/修改表单的校验规则
        companyName: [
          {
            // required: true,
            message: '用户名必须输入'
          },
          { min: 4, message: '用户名不能小于4位' }
        ],
        password: [{ required: true, validator: this.validatePassword }]
      },
      loading: false // 是否正在提交请求中
      //   roles:{}
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    // rowStyle() {
    //   return { height: '50px' }
    // },
    getNoPay() {
      this.toPage('/MyOrder/OrdersManage/NoPay')
    },
    /*
    异步获取用户的角色列表
    */
    // async getRoles() {
    //   const result = await this.$API.user.getRoles(this.user.userCode)
    //   const { allRolesList, assignRoles } = result.data
    //   this.allRoles = allRolesList
    //   this.userRoleIds = assignRoles.map((item) => item.userCode)
    //   this.checkAll = allRolesList.length === assignRoles.length
    //   this.isIndeterminate =
    //     assignRoles.length > 0 && assignRoles.length < allRolesList.length
    // },

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
        companyName: ''
      }
      this.tempSearchObj = {
        userAccount: '',
        companyName: ''
      }
      this.getUsers()
    },
    /*
    显示更新用户的界面
    */
    showUpdateUser(user) {
      this.user = cloneDeep(user)
      this.dialogUserVisible = true
    },
    /*
    处理pageSize发生改变的监听回调
    */

    handleSizeChange(pageSize) {
      this.limit = pageSize
      this.getUsers()
    },

    getUsers() {}
  }
}
</script>
<style lang="scss" >
.containerOrders {
  height: 100%;
  background: #fff;
  padding: 0;
  box-sizing: border-box;
  overflow: auto;
}
.orderMana {
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // box-sizing: border-box !important;
  // // width: 62.5%;
  // // height: 74%.07;
  // height: 800px;
  // max-width: 1200px;
  // margin-left: 40px;
  // margin-top: -10px;
  // box-shadow: 0px 2px 13px 3px rgba(0, 0, 0, 0.05);
  // position: relative;
  .orderTop {
    height: 70px;
    .searchForm {
      height: 70px;
      position: absolute;
      right: 60px;
      display: flex;
      align-items: center;
      text-align: center;
      .formItem {
        margin: 0;
        margin-right: 20px;
      }
    }
  }

  .el-table {
    color: #000000;
    box-sizing: border-box !important;
    border: 1px solid #eeeeee;
    border-bottom: none;
    border-radius: 10px 10px 0px 0px;
  }

  .el-pagination {
    position: fixed;
    bottom: 24px;
  }
  ::v-deep el-table__row {
    height: 50px !important;
  }
}
</style>