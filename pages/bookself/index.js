// pages/book/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: '1',
    isEdit: true,
    comic_ids: [], // 删除的漫画id
    defaultCheck: false,
    historyData: [],
    likeData: [],
    bookData: [],
    page: 1,
    last_page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
  },
  
  fetchData (isRefresh) {
    const url = this.data.selected === '1' ? 'historyList' : 'likesList'
    const data = this.data.selected === '1' ? 'historyData' : 'likeData'
    app.$http(app.api.book[url], { page: this.data.page }, (res)=>{
      const { last_page } = res.meta
      this.setData({
        [data]: isRefresh || this.data.page === 1 ? res.data : this.data[data].concat(res.data),
        bookData: isRefresh || this.data.page === 1 ? res.data : this.data[data].concat(res.data),
        last_page: last_page
      })
    })
  },

  editFun (e) {
    this.setData({
      isEdit: e.currentTarget.dataset.index === 1
    })
  },

  switchTab (e) {
    this.setData({
      isEdit: true,
      defaultCheck: false
    })
    this.data.bookData.map((item) => {
      item.isCheck = false
    })
    this.setData({
      selected: e.currentTarget.dataset.tab
    })
    this.fetchData()
  },

  checkFun (e) {
    let checkNum = 0
    let len = this.data.bookData.length
    let feild = 'bookData[' + e.currentTarget.dataset.index + '].isCheck'
    this.setData({
      [feild]: !e.currentTarget.dataset.ischeck,
      defaultCheck: false
    })
    this.data.bookData.map((item) => {
      if (item.isCheck) {
        checkNum += 1
      }
      this.setData({
        defaultCheck: len === checkNum
      })
    })
  },

  comicDetail (e) {
    app.utils.navigateTo(`/pages/comic-introduce/index?id=${e.currentTarget.id}`)
  },

  continueRead (e) {
    app.utils.navigateTo(`/pages/comic-detail/index?id=${e.currentTarget.dataset.chapterid}&comicId=${e.currentTarget.id}`)
  },

  allCheck () {
    this.setData({
      defaultCheck: !this.data.defaultCheck
    })
    this.data.bookData.map((item, index)=>{
      const feild = 'bookData[' + index + '].isCheck'
      this.setData({
        [feild]: this.data.defaultCheck
      })
    })
  },

  deleteFun () {
    let arr = [];
    this.data.bookData.map((item) => {
      if (item.isCheck) {
        arr.push(item.id)
      }
    })
    this.setData({
      comic_ids: arr
    })
    if (arr.length === 0) {
      wx.showModal({
        content: '请至少选择一项',
        showCancel: false
      })
      return
    }
    this.sureDelete()
  },

  sureDelete () {
    const that = this;
    wx.showModal({
      content: '你确定删除吗？',
      success: function (res) {
        if (res.confirm) {
          that.fetchDelete()
        }
      }
    })
  },

  fetchDelete () {
    const url = this.data.selected === '1' ? 'delHistory' : 'delLike'
    app.$http(app.api.book[url], { comic_ids: this.data.comic_ids }, (res) => {
      this.fetchData(true)
      this.setData({
        defaultCheck: false,
        isEdit: true
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      isEdit: true
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.page < this.data.last_page) {
      this.setData({
        page: this.data.page + 1
      })
      this.fetchData()
    }else {
      app.utils.noMoreData()
    }
  },

})