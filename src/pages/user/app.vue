<template>
  <div class="container user-cont">
    <div class="user-info-cont">
      <div class="user-info">
        <open-data type="userAvatarUrl" class="user-avatar"></open-data>
        <open-data type="userNickName" class="user-name"></open-data>
      </div>
      <div class="user-money">
        <div class="user-money-total">
          <p>{{balance}} 元</p>
          <p class="user-reward">我的现金奖励</p>
        </div>
        <button class="user-extract" @click="extractHandle">立即提现</button>
      </div>
    </div>
    <button class="contact" open-type="contact">联系客服 <span class="arrow">&gt;</span></button>
    <extractModal ref="extractModal" :tips="tips"></extractModal>
  </div>
</template>

<script>
import extractModal from '@/components/extractModal'
import showSetting from '@/mixins'

export default {
  props: ['tips'],
  mixins: [showSetting],
  components: {
    extractModal
  },
  data () {
    return {
      balance: 0,
      tips: ''
    }
  },

  onShow () {
    this.balance = wx.getStorageSync('balance') || 0
  },

  onShareAppMessage () {
    return this.shareMessage()
  },

  methods: {
    extractHandle () {
      this.$api.user.withdraw().then((res) => {
        if (!wx.getStorageSync('openid')) {
          this.showToast(res.error)
          return
        }
        if (res.code === 1000) {
          this.tips = res.error
          this.$refs.extractModal.showModal()
          return
        }
        this.showToast('喵~ 提现成功，现金已发放至您的微信钱包~')
        const {balance} = res.data
        this.$store.dispatch('setBalance', balance)
        this.balance = balance
      })
    }
  }

}
</script>

<style lang="less" scoped>
.user-cont {
  margin-top: 20px;
  box-sizing: border-box;
  .user-info-cont {
    padding: 5px 15px;
    border: 1px solid #eee;
    .user-info {
      width: 100%;
      display: flex;
      .user-avatar {
        width: 70px;
        height:70px;
        margin-top: -45px;
        border-radius: 100%;
        overflow: hidden;
        border: 1px solid @border-color;
      }
      .user-name {
        margin-left: 10px;
        font-size: 16px;
      }
    }
    .user-money {
      margin-top: 20px;
      .user-money-total {
        display: inline-block;
        line-height: 1.5;
        text-align: center;
        .user-reward {
          font-size: 14px;
        }
      }
      .user-extract {
        float: right;
      }
    }
  }
  .contact {
    display: inline-block;
    width: 100%;
    margin-top: 20px;
    padding: 5px 15px;
    font-size: 14px;
    text-align: left;
    box-sizing: border-box;
  }
}
</style>
