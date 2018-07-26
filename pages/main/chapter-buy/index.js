// pages/main/subscribe-buy/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHideModal: true,
    allChapterData: [],
    dialogData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      comicId: options.comicId
    })
    this.getComicAllChapter()
  },

  getComicAllChapter () {
    app.$http(app.api.home.comicDetail, this.data.comicId, ({data}) => {
      this.setData({
        allChapterData: data.chapters
      })
      console.log(this.data.allChapterData)
    })
  },

  getDialogData({detail: Res}) {
    console.log('Res',Res)
    if (Res.is_paid) {
      app.utils.navigateTo(`/pages/comic-detail/index?id=${Res.id}`)
    } else {
      this.setData({
        dialogData: Res,
        isHideModal: false
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})