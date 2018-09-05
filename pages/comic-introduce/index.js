const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curTab: 0,
    isHideModal: true,
    comicDetail: {},
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad (options) {
    this.likeAndBookmark = this.selectComponent("#likeAndBookmark");
    app.$http(app.api.home.comicDetail, options.id, ({data})=>{
      this.setData({
        comicDetail: data,
      })
      app.globalData.comic = data
      this.likeAndBookmark.setComicData()
    })
  },

  switchTab (e) {
    this.setData({
      curTab: e.target.dataset.tab
    })
  },

  handleFun(e) {
    const dataset = e.currentTarget.dataset
    const { index:curIndex, types:curType } = dataset
    const { comicDetail } = this.data.comicDetail
    const url = curIndex ? '/bookmark' : '/like'
    const setFeild = 'comicDetail.' + curType
    this.setData({
      [setFeild]: !comicDetail[curType]
    })
    const api = comicDetail[curType] ? 'comic' : 'deleteComic'
    console.log(comicDetail.id, 'id')
    app.$http(app.api.common[api], comicDetail.id+url, (res)=>{
      console.log(res.data)
    })
  },

  getDialogData (data) {
    this.setData({
      userInfo: data.detail
    })
    if (this.data.userInfo.is_paid) {
      app.utils.navigateTo(`/pages/comic-detail/index?id=${this.data.userInfo.id}`)
    } else {
      this.setData({
        isHideModal: false        
      })
    }
  },

  goBackHome () {
    wx.switchTab({
      url: '/pages/main/index/index',
    })
  },

  startRead () {
    const { length } = this.data.comicDetail.chapters
    if (!length) return
    const id = this.data.comicDetail.chapters[0].id
    this.subscribeBuy.subscribeFun(id)
  },

  goSubscribeBuy () {
    app.utils.navigateTo(`/pages/main/chapter-buy/index?comicId=${this.data.comicDetail.id}`)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.subscribeBuy = this.selectComponent("#buy");
  },
})