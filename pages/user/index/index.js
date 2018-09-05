// pages/user/index.js
const app = getApp ()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    money_change: '',
    menuList: [
      { title: '我要充值', path: 'pay' },
      { title: '消费记录', path: 'record', query: 0 },
      { title: '阅币记录', path: 'record', query: 1 },
      { title: '自动购买付费章节', types: 'set' },
      { title: '联系我们', path: 'contact' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
  },

  fetchData () {
    app.$http(app.api.user.index, ({data})=>{
      this.setData({
        userInfo: data
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.Modal = this.selectComponent("#Modal");
  },

  goSign () {
    if (this.data.userInfo.signed_in_today) return 
    const setMoney = 'userInfo.money'
    new Promise((resolve, reject)=>{
      app.$http(app.api.user.sign, ({ data }) => {
        const { money, money_change } = data
        this.setData({
          [setMoney]: money,
          money_change: money_change
        })
        resolve()
      })
    }).then(()=>{
      this.Modal.show()
      setTimeout(() => {
        this.Modal.hide()
      }, 1500)
    })
  },

  gotoDetail({ currentTarget: { dataset }}) {
    const { path, index } = dataset
    if (dataset.path) {
      app.utils.navigateTo(`/pages/user/${path}/index?query=${this.data.menuList[index].query}`)
    }
  },

  switchChange (e) {
    // app.$http(app.api.user.toggleAutoBuyChapter, ({data})=>{
    //   console.log(data)
    // })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
})