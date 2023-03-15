<template>
  <div class="containerOrders">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/MyOrder/OrdersManage' }"
          >订单管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>待支付订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="orderMana">
      <div class="top">
        <div class="Topleft">待支付订单</div>
        <div class="Topright">订单号:</div>
      </div>

      <div class="contain">
        <el-table
          :header-row-style="{
            height: '60px',
            background: '#FBFBFB',
            fontSize: '14px',
            color: '#000000'
          }"
          :row-style="{ height: '140px' }"
          :data="tableData"
          style="width: 1100px; font-size: 14px; color: #000000"
          header-align="center"
        >
          <el-table-column
            align="center"
            prop="goodsName"
            label="商品名称"
            width="180"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="Originalcost"
            label="单价（元）"
            width="180"
          >
          </el-table-column>
          <el-table-column align="center" prop="ExpirationDate" label="有效期">
          </el-table-column>

          <el-table-column
            align="center"
            prop="Preferentialprice"
            label="优惠（元）"
          >
            <template slot-scope="scope">
              <span class="gray" v-if="scope.row.Preferentialprice == false"
                >无优惠</span
              >
              <span class="red" v-else>{{ scope.row.Preferentialprice }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" prop="price" label="金额（元）">
          </el-table-column>
        </el-table>
      </div>

      <div class="buttom">
        <div class="left">支付方式</div>
        <div class="right">
          合计 <span class="red">{{ price }}</span
          >元
        </div>
      </div>

      <div class="payBox">
        <div class="Pay">
          <div
            class="paysel"
            :class="selectIndex === index ? 'paysel2' : ''"
            @click="selectPay(index)"
            v-for="(item, index) in payList"
          >
            <el-image
              style="width: 32px; height: 32px"
              :src="item.url"
            ></el-image>
            <div>{{ item.title }}</div>
          </div>
        </div>

        <div class="payBtn">
          <div>立即支付</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: '',
      Preferentialprice2: '无优惠',
      tableData: [
        {
          goodsName: 'AR宣传册基础版',
          Originalcost: '4999',
          ExpirationDate: '2023/01/01--2024/01/01',
          Preferentialprice: '-2000',
          price: '2999'
        }
      ],
      payList: [
        { title: '微信支付', url: require('@assets/images/order/wx.png') },
        { title: '支付宝', url: require('@assets/images/order/zhifubao.png') },
        { title: '银联支付', url: require('@assets/images/order/bank.png') }
      ],
      selectIndex: null
    }
  },
  methods: {
    selectPay(i) {
      console.log(i)
      this.selectIndex = i
    }
  }
}
</script>

<style lang="scss">
.containerOrders {
  height: 100%;
  background: #fff;
  box-sizing: border-box;
  overflow: auto;
}
.orderMana {
  height: 511px;
  box-sizing: border-box;

  padding: 0 50px;
  .top {
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .Topleft {
      font-size: 16px;
      color: #000000;
    }
    .Topright {
      margin-right: 25px;
      font-size: 14px;
      color: #999999;
    }
  }
}
.el-breadcrumb__inner.is-link {
  color: #090a0c;
  font-weight: 400;
}
.contain {
  margin-top: 20px;
  border: 1px solid #eee;
  box-sizing: border-box;
  height: 200px;
  border-radius: 10px;
  border-bottom: 0;
  .red {
    font-size: 16px;
    color: #fc2400;
  }
  .gray {
    font-size: 16px;

    color: #999999;
  }
}
.buttom {
  margin-top: 40px;
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    margin-left: 1px;
  }
  .right {
    margin-right: 25px;
  }
}
.payBox {
  margin-top: 40px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .Pay {
    display: flex;
    width: 70%;
    .paysel {
      margin-right: 20px;
      width: 164px;
      height: 80px;
      background: #f7f9fe;
      border: 1px solid #eeeeee;
      border-radius: 4px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .paysel2 {
      box-sizing: border-box;

      position: relative;
      border: 1px solid #829fff;
      border-radius: 4px;
    }
    .paysel2::after {
      content: '';
      z-index: 99;
      width: 30px;
      height: 30px;
      position: absolute;
      display: block;
      right: 0;
      bottom: 0;
      background-image: url('~@assets/images/order/select.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .el-image {
      margin-right: 7px;
    }
    div {
      font-size: 18px;
      color: #999999;
    }
  }
  .payBtn {
    text-align: center;
    line-height: 50px;
    width: 164px;
    height: 48px;
    background: #829fff;
    border-radius: 24px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
  }
}
</style>
