<template>
  <div class="container step-cont">
    <div class="step-all">
      <div class="step-del">
        <p>可用步数</p>
        <p class="step-total">{{step_total}}</p>
        <navigator url="/pages/step/main" hover-class="none" class="step-record">步数记录</navigator>
      </div>
      <template v-for="(item, index) in steps" wx:key="index">
        <div class="step-item" v-if="index<2" :key="index" :style="{top: 90*index-30 +'px', left: 20*index+'px', 'animation-delay': index+'s'}" @click="getStep(item.id)">
          <p>{{item.step}}</p>
          <p>{{item.type === 0 ? '今日步数' : '邀请好友'}}</p>
        </div>
        <div class="step-item" v-else-if="index<4" :key="index" :style="{top: 50*(index-2)-20 +'px', right: 20*(index-2)+20+'px', 'animation-delay': (index-2)+'s'}" @click="getStep(item.id)">
          <p>{{item.step}}</p>
          <p>{{item.type === 0 ? '今日步数' : '邀请好友'}}</p>
        </div>
      </template>
    </div>
    <div class="sign-invite-btn">
      <button open-type="share">邀请好友奖励3000步</button>
      <button @click="openPecket">消耗3000步打开红包</button>
    </div>

    <redPecket ref="redPecket" @getRunData="getRunData"></redPecket>
  </div>
</template>

<script>
import showSetting from '@/mixins'
import redPecket from '@/components/redPecket'
export default {
  mixins: [showSetting],
  components: {
    redPecket
  },
  data () {
    return {
      step_total: 0,
      steps: [],
      inviteCode: ''
    }
  },

  onLoad () {
    this.inviteCode = this.$root.$mp.query.inviteCode
    this.$store.dispatch('setInviteCode', this.inviteCode)
    wx.checkSession({
      success: (r) => {
        console.log(r, wx.getStorageSync('code'))
      },
      fail: () => {
        wx.login({
          timeout: 1000,
          success: (r) => {
            console.log(r)
            wx.setStorageSync('code', r.code)
          }
        })
      }
    })
  },

  async onPullDownRefresh () {
    await this.getRunData()
    // 停止下拉刷新
    await wx.stopPullDownRefresh()
  },

  onShareAppMessage () {
    return this.shareMessage()
  },

  methods: {
    getStep (id) {
      new Promise((resolve, reject) => {
        this.$api.main.step(id).then(() => {
          resolve()
        })
      }).then(r => {
        this.getRunData()
      })
    },
    getRunData () {
      wx.getWeRunData({
        scope: 'scope.werun',
        success: (data) => {
          const {encryptedData, iv} = data
          const res = this.$api.main.home({
            'encrypted_data': encryptedData,
            'iv': iv
          })
          res.then((res) => {
            const {data} = res
            Object.assign(this, data)
          })
        },
        fail: (err) => {
          console.log(err)
        }
      })
    },
    openPecket () {
      this.$refs.redPecket.showModal()
      this.$refs.redPecket.getReward()
    }
  }

}
</script>

<style lang="less" scoped>
.step-cont {
  text-align: center;
  .step-all {
    position: relative;
    display: block;
    margin: 50px 0;
    text-align: center;
    color: #fff;
    .step-del {
      width: 140px;
      height: 140px;
      padding-top: 20px;
      margin: 0 auto;
      border: 1rpx solid #eee;
      border-radius: 100%;
      background: @primary-color;
      box-sizing: border-box;
      font-size: 14px;
      p {
        margin: 10px 0 15px;
      }
      .step-total {
        font-size: 24px;
      }
      .step-record {
        font-size: 12px;
        color: #5186fa;
      }
    }
    .step-item {
      position: absolute;
      top: -20px;
      padding-top: 10px;
      box-sizing: border-box;
      width: 54px;
      height: 54px;
      font-size: 12px;
      border: 1px solid #eee;
      border-radius: 100%;
      background: rgba(255, 140, 120, .8);
      animation: bounce 3s linear infinite;
      p:last-child {
        font-size: 10px;
      }
    }
  }
  button {
    &:first-child {
      margin-right: 5px;
    }
  }
}

@keyframes bounce {
  0% {
    margin-top: 3px;
  }
  30% {
    margin-top: 0px;
  }
  60% {
    margin-top: -3px;
  }
  100% {
    margin-top: 3px;
  }
}
</style>
