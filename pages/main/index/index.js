//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    resData: {},
  },
  
  onLoad () {
    this.fetchData()
  },

  fetchData () {
    app.$http(app.api.home.index, ({data}) => {
      this.setData({
        resData: data
      })
    })
  },

  lintTo (e) {
    const data = e.currentTarget.dataset
    const which = data.item
    let url = '/pages/'
    if (which === 'type') {
      url = url + `main/rank/index?index=${data.index}`
    }
    if (which === 'more') {
      url = url + `main/more/index?id=${e.currentTarget.id}`
    }
    if (which === 'lookDetail') {
      url = url + `comic-introduce/index?id=${e.currentTarget.id}`
    }
    if (which === 'poster') {
      url = `e.target.dataset.url`
    }
    
    app.utils.navigateTo(url)
  },

  clarifyPage () {
    wx.switchTab({
      url: '/pages/main/clarify/index',
    })
  },

  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    setTimeout(()=>{
      this.fetchData()
      wx.stopPullDownRefresh();
    }, 1000)
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    app.utils.setShare()
  }

})
