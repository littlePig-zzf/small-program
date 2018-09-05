// pages/main/clarify/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentTxt: '没有更多数据',
    tabData: [],
    queryParams: {
      page: 1
    },
    clarifyData: [],
    last_page: 1,
    isBottom: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchCategoryData()
    this.fetchData()
  },

  setActiveTag({ target }) {
    let key = target.dataset.key
    let id = target.id
    let i = target.dataset.i
    let tabData = 'tabData[' + i + '].val'
    this.setData({
      [tabData]: id,
      clarifyData: [],
      isBottom: false      
    })
    this.data.tabData[i].val = id + ''
    this.data.queryParams[key] = id
    this.data.queryParams.page = 1
    this.fetchData()
  },

  fetchCategoryData () {
    app.$http(app.api.home.category, ({data})=>{
      data.map((item) => {
        item.val = -1
        this.data.queryParams[item.key] = -1
      })
      this.setData({
        tabData: data
      })
    })
  },

  fetchData () {
    app.$http(app.api.home.comicList, this.data.queryParams, ({meta, data})=>{
      const { last_page } = meta
      this.setData({
        clarifyData: this.data.clarifyData.concat(data),
        last_page: last_page
      })
      if (this.data.clarifyData.length === 0) {
        this.setData({
          contentTxt: '暂无数据',
          isBottom: true
        })
      } else {
        this.setData({
          contentTxt: '没有更多数据'
        })
      }
    })
  },

  lookDetail({ currentTarget: {id} }) {
    app.utils.navigateTo(`/pages/comic-introduce/index?id=${id}`)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.queryParams.page < this.data.last_page) {
      const setPage = 'queryParams.page'
      this.setData({
        [setPage]: this.data.queryParams.page + 1
      })
      this.fetchData()
    }else {
      this.setData({
        isBottom: true
      })
      app.utils.noMoreData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    app.utils.setShare()
  }
})