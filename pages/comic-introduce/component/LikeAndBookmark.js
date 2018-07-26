// pages/book-introduce/LikeAndBookmark.js
const app = getApp()
const chapterBehavior = require('../../../behavior/chapterBehavior.js')

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [chapterBehavior],
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    comicDetail: {}
  },

  attached () {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setComicData () {
      this.setData({
        comicDetail: app.globalData.comic
      })
    }
  }
})
