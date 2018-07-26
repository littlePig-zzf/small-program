// pages/main/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    keyword: '',
    bookList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options可获取路由参数
    this.setData({
      id: options.id || '',
      keyword: options.keyword || ''
    })
    this.fetchData()
  },

  fetchData () {
    const url = this.data.id ? app.api.home.more : app.api.common.search
    const params = this.data.id || { 'keyword': this.data.keyword }
    app.$http(url, params, ({data}) => {
      this.setData({
        bookList: data
      })
    })
  },
})