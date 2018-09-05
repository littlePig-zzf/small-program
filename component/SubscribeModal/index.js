const app = getApp();
Component({
  externalClasses: [],
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    userInfo: {
      type: Object,
      value: []
    },
    hidden: {
      type: Boolean,
      value: false
    }
  },
  data: {
    // 这里是一些组件内部数据
    checkIcon: ['/images/check.png', '/images/checked.png'],
    isCheck: true
  },
  methods: {
    // 这里是一个自定义方法
    checkFun () {
      this.setData({
        isCheck: !this.data.isCheck
      })
    },
    hideModal () {
      this.setData({
        hidden: true
      })
    },
    goRecharge () {
      app.utils.navigateTo(`/pages/user/pay/index?id=${app.globalData.chapterId}`)
    },
    payFun () {
      app.$http(app.api.home.chapterBuy, app.globalData.chapterId + '/buy', { auto_buy_chapter: this.data.userInfo.user.auto_buy_chapter },
       (res) => {
        this.hideModal()
        if (res.code === 1002) return
        wx.showToast({
          title: '扣费成功',
          icon: 'none'
        })
        setTimeout(()=>{
          app.utils.navigateTo(`/pages/comic-detail/index?id=${app.globalData.chapterId}`)
        }, 2000)
      })
    }
  }
})