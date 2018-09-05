// pages/main/rank/index.js
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    selected: '0',
    curTitle: '',
    comics: [],
    recommend: [],
    comicData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({index}) {
    this.setData({
      id: Number(index) + 1
    })
    this.fetchData()
  },

  fetchData () {
    if (this.data.comics && this.data.comics.length) return
    app.$http(app.api.common.rank, this.data.id, ({data})=>{
      this.setData({
        curTitle: data.title,
        comics: data.comics
      })
    })
  },

  recommedData (date) {
    const { recommend } = this.data
    if (recommend[date] && recommend[date].length) {
      this.setData({
        comicData: recommend[date]
      })
      return
    }
    app.$http(app.api.recommend, {day: date}, ({data}) => {
      const recommendTxt = 'recommend[' + date + ']'
      this.setData({
        [recommendTxt]: data,
        comicData: data
      })
    })   
  },

  setDate ({detail}) {
    this.recommedData(detail);
  },

  setCur({detail: select}) {
    this.setData({
      selected: select
    })
    if (select === '1') {
      this.recommedData(app.globalData.comicSaleTab || 0);
    } else {
      this.fetchData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})