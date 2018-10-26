<template>
  <div class="step-cont">
    <div class="step-item" v-for="(item, index) in steps" :key="index">
        <div class="user-info">
            <div>
                <p class="type">{{ item.type === 0? '微信运动' : '邀请' }}</p>
                <p class="time">{{item.created_at}}</p>
            </div>
        </div>
        <p class="step-detail">{{item.step}} 步</p>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      page: 1,
      last_page: 0,
      steps: []
    }
  },

  onReachBottom () {
    this.nextPage()
  },

  methods: {
    getStepRecord () {
      this.$api.main.stepRecord(this.page).then(({data, meta}) => {
        this.steps = data
        this.last_page = meta.last_page
      })
    },
    nextPage () {
      if (this.page < this.last_page) {
        this.page += 1
        this.getStepRecord()
      } else {
        this.showToast('没有更多数据')
      }
    }
  },

  mounted () {
    this.getStepRecord()
  }

}
</script>

<style lang="less" scoped>
.step-cont {
  .step-item {
    padding: 0 15px 0 25px;
    border-bottom: 1px solid @border-color;
    background: #fff;
    overflow: hidden;
    .user-info {
      display: table;
      padding: 9px 0;
      float: left;
      .type {
          font-size: 14px;
      }
      .time {
          margin-top: 4px;
          color: #999;
          font-size: 12px;
      }
    }
    .step-detail {
      margin: 26px 10px 0 0;
      float: right;
      font-size: 16px;
      color: rgb(247, 117, 117);
    }
  }
}

</style>
