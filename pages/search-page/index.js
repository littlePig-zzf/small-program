// pages/search-page/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTxt: '搜索漫画名或作者',
    hotData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchHotData()
  },

  fetchHotData () {
    app.$http(app.api.common.searchHot, ({data}) => {
      this.setData({
        hotData: data
      })
    })
  },

  search (e) {
    app.utils.navigateTo(`/pages/main/more/index?keyword=${e.detail}`)
  },

  goBack () {
    wx.navigateBack({
      delta: 1
    })
  },

  goToDetail (e) {
    app.utils.navigateTo(`/pages/comic-introduce/index?id=${e.target.id}`)
  }

})