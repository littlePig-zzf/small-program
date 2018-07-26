// component/ReadBookCollectLike/index.js
const app = getApp()
var chapterBehavior = require('../../behavior/chapterBehavior.js')

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [chapterBehavior],
  externalClasses: ['text-set'],
  properties: {
    comicDetail: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  attached() {

  },
  /**
   * 组件的方法列表
   */
  methods: {
 
  }
})
