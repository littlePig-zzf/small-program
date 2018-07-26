// pages/user/record/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    last_page: 1,
    showNoData: false, // 是否显示无数据
    recordData: [],
    operateType: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      operateType: Number(options.query)
    })
    this.fetchData()
  },

  fetchData() {
    const url = this.data.operateType === 1 ? 'income' : 'expend'
    app.$http(app.api.user[url], { page: this.data.page }, (res) => {
      const { last_page } = res.meta
      this.setData({
        recordData: this.data.recordData.concat(res.data),
        last_page: last_page
      })
    })
  },
  nextPage() {
    if (this.data.page < this.data.last_page) {
      this.setData({
        page: this.data.page + 1
      })
      this.fetchData()
    } else {
      app.utils.noMoreData()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.nextPage()
  },

})