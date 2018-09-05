// component/HotBook/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showDate: {
      type: Boolean,
      value: false
    },
    booklist: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: 6,
    date: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    dateArr: [],
  },

  /**
   * 组件的方法列表
   */
  attached() {
    this.getDate();
    const { comicSaleTab } = app.globalData
    let index = 6
    if (comicSaleTab) {
      index = app.utils.findIndex(this.data.dateArr, comicSaleTab, 'v')
      this.setData({
        selected: index
      })
    }
    this.setScroll(index);
  },

  methods: {
    getDate() {
      let day = new Date().getDay()
      let arr = [];
      for (let i = 0; i < 7; i++) {
        // let w_index = (day - i) >= 0 ? (day - i) : (day - i + 7);
        let wIndex = (day - i + 7) % 7
        let s = i === 0 ? '今天' : (i === 1 ? '昨天' : this.data.date[wIndex])
        let d = {
          v: i, s: s,
        }
        arr.unshift(d)
      }
      this.setData({
        dateArr: arr
      })
    },

    setScroll(index) {
      this.setData({
        toScrollView: `data-${index}`
      }) 
    },

    setTab({currentTarget: { dataset } }) {
      this.setData({
        selected: dataset.index,
        toScrollView: 'data-' + dataset.index
      })

      app.globalData.comicSaleTab = dataset.v
      console.log(app.globalData.comicSaleTab)
      this.triggerEvent('setDate', dataset.v)
    }
  }
})
