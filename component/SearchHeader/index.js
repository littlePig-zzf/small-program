// component/SearchHeader/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholdertxt: {
      type: String,
      value: '搜索漫画名或作者'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    isAutoFocus: {
      type: Boolean,
      value: false
    },
    isNavigateTo: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchParams: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    lintTo () {
      if (!this.data.isNavigateTo) return
      const url = '/pages/search-page/index'
      app.utils.navigateTo(url)
    },
    search (e) {
      this.triggerEvent('search', e.detail.value)
    }
  }
})
