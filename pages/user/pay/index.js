// pages/user/pay-page/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curType: 0, // 当前类型
    money: 0, // 剩余金额
    topup_id: '', // 充值id
    hash: '#/user',
    topupData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({id} = '') {
    this.fetchData(id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  fetchData (id) {
    app.$http(app.api.user.topup, { chapter_id: id }, ({data}) => {
      this.setData({
        topupData: data
      })
    })
  },

  selectPay({ currentTarget: { dataset} }) {
    this.setData({
      curType: index
    })
  },
})