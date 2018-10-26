<template>
  <div v-if="showAlert" class='modal'>
    <div class='modal-mask'>
    </div>
    <div class='modal-layer'>
      <div :class="['pecket-bg', !isAuth.werun ? 'pecket-poster': '']">
        <span v-show="isAuth.userInfo && isAuth.werun" class="close-btn" @click="hideModal">×</span>
        <button v-if="!isOpen && !isAuth.userInfo" class="open-pecket" open-type="getUserInfo" @getuserinfo="openPecket">開</button>
        <button v-if="!isOpen && isAuth.userInfo && !isAuth.werun" class="open-pecket" open-type="openSetting" @opensetting="openSetting">開</button>
        <div v-if="isOpen && !inviteTips" class="pecket-detail">
          <p class="pecket-info">请到【我的】页面查看奖励</p>
          <p class="reward">{{gain}} 元</p>
          <button class="continue-open" @click="getReward">继续开红包</button>
        </div>
        <div v-if="inviteTips" class="pecket-detail">
          <p class="invite-info">{{inviteTips}}</p>
          <button class="continue-open" open-type="share">邀请好友</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import showSetting from '@/mixins'
export default {
  mixins: [showSetting],
  data () {
    return {
      isAuth: {
        userInfo: false,
        werun: false
      },
      showAlert: true,
      gain: 0,
      isOpen: false,
      inviteTips: ''
    }
  },
  methods: {
    hideModal () {
      this.$emit('getRunData')
      this.showAlert = false
      this.gain = ''
    },
    openPecket (e) {
      if (!e.mp.detail.userInfo) {
        wx.showModal({
          title: '提示',
          content: '获取用户信息失败，需要授权才能继续使用',
          showCancel: false,
          confirmText: '确定',
          success: (res) => {
            console.log(res)
          }
        })
      } else {
        const {detail} = e.mp
        const data = {
          code: wx.getStorageSync('code'),
          invite_code: wx.getStorageSync('inviteCode'),
          signature: detail.signature,
          raw_data: detail.rawData
        }
        this.isAuth.userInfo = true
        this.$api.login(data).then((res) => {
          if (res.code !== 0 && typeof res.data !== 'object') {
            this.showToast(res.error)
            return
          }
          this.$store.dispatch('setOpenid', res.data.openid)
          this.$store.dispatch('setInviteCode', res.data.invite_code)
          this.getRunData()
        })
      }
    },
    getRunData () {
      wx.getWeRunData({
        scope: 'scope.werun',
        success: (data) => {
          this.isAuth.werun = true
          const {encryptedData, iv} = data
          const res = this.$api.main.home({
            'encrypted_data': encryptedData,
            'iv': iv
          })
          res.then((res) => {
            if (res.code !== 0) {
              this.showToast(res.error)
              return
            }
            const {data} = res
            Object.assign(this, data)
            this.getReward()
          })
        },
        fail: (err) => {
          console.log(err)
        }
      })
    },
    openSetting (e) {
      this.isAuth.werun = e.mp.detail.authSetting['scope.werun']
      this.isAuth.userInfo = e.mp.detail.authSetting['scope.userInfo']
      this.getRunData()
    },
    getReward () {
      this.isOpen = true
      this.$api.main.bonus().then((res) => {
        const {data} = res
        if (res.code !== 0) {
          this.inviteTips = res.error
          return
        }
        this.inviteTips = ''
        this.$store.dispatch('setBalance', data.balance)
        this.gain = data.gain
      })
    }
  }
}
</script>

<style lang="less" scoped>
.pecket-poster {
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    width: 100%;
    height: 100%;
    display: inline-block;
    border: 1px solid #000;
    opacity: .2;
    border-radius: 100%;
    box-shadow: 0 0 1px 0 ;
    z-index: 1;
  }
}
.pecket-bg {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 220px;
  margin: 0 auto;
  background: rgb(212, 22, 22);
  border-radius: 20px;
  z-index: 0;
  animation: scaleAnit .3s ease-in;
  overflow: hidden;
  .close-btn {
    position: absolute;
    top: -5px;
    right: 10px;
    font-size: 28px;
    color: #dfdfdf;
  }
  .open-pecket {
    display: inline-block;
    width: 60px;
    height: 60px;
    line-height: 60px;
    border-radius: 100%;
    background: #faad56;
    color: #fff;
    z-index: 2;
  }
  .pecket-detail {
    display: flex;
    flex-direction: column;
    padding: 20px;
    font-size: 14px;
    color: #fff;
    .pecket-info {
      position: absolute;
      top: 30px;
      left: 50%;
      margin-left: -84px;
    }
    .reward {
      font-size: 24px;
    }
    .continue-open {
      position: absolute;
      bottom: 10px;
      left: 50%;
      margin-left: -45px;
    }
  
  }
}


</style>
