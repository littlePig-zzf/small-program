// pages/search-page/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  search({ detail }) {
    app.utils.navigateTo(`/pages/main/more/index?keyword=${detail}`)
  },

  goBack () {
    wx.navigateBack({
      delta: 1
    })
  },

  goToDetail({ target: {id} }) {
    app.utils.navigateTo(`/pages/comic-introduce/index?id=${id}`)
  }

})