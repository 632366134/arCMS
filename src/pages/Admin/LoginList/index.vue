<template>
  <div class="loginList">
    <el-form :inline="true">
      <el-form-item label="日期:">
        <el-date-picker
          v-model="time"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          value-format="yyyy-MM-dd"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="24">
        <el-table :data="list" border style="width: 100%">
          <el-table-column label="登录时间">
            <template slot-scope="{ row }">
              <div>
                {{ row.loginTime | changeDate }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="endTime" label="登出时间">
            <template slot-scope="{ row }">
              <div>
                {{ row.endTime | changeDate }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="登录类型">
            <template slot-scope="scope">
              <div>{{ loginTypeList[scope.row.loginType] }}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="pagination ma10">
        <el-pagination
          @size-change="fetchList"
          @current-change="fetchList"
          :current-page.sync="page"
          :page-sizes="[10, 15, 20, 25]"
          :page-size.sync="pageNum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { adminModuleApi as adminApi } from '@/API'
export default {
  name: 'LoginList',
  data() {
    let time = [
      this.$getDate(
        new Date().setDate(new Date(this.$getServerDate()).getDate() - 7)
      ).date,
      this.$getDate(this.$getServerDate()).date
    ]
    return {
      showInfo: false,
      data: [],
      page: 1,
      pageNum: 10,
      total: 0,
      list: [],
      time: time,
      loginTypeList: ['', '账号密码', ''],
      userCode: ''
    }
  },
  methods: {
    fetchList() {
      adminApi
        .loginLog({
          json: JSON.stringify({
            page: this.page,
            pageNum: this.pageNum,
            pagination: '1',
            userCode: this.userCode || sessionStorage.userCode,
            selectOpenTime: this.time ? this.time[0] + ' 00:00:00' : '',
            selectExitTime: this.time ? this.time[1] + ' 23:59:59' : ''
          })
        })
        .then((res) => {
          this.list = res.data.list || []
          this.total = res.data.total
        })
    }
  },
  created() {
    this.$nextTick(() => {})
  },
  activated() {
    const { userName, name, userCode } = this.$route.params
    if (userName) {
      this.data = [
        { label: '姓名:', value: this.$decode(name), prop: 'name' },
        { label: '工号:', value: this.$decode(userName), prop: 'gonghao' }
      ]
      this.showInfo = true
      this.userCode = this.$decode(userCode)
    } else {
      this.showInfo = false
    }
    this.fetchList()
  }
}
</script>

<style lang="scss" scoped>
.loginList {
  background: #fff;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
</style>
