const app = getApp();
Component({
  externalClasses: ['bg-color', 'box-height', 'search-bg', 'search-position', 'search-icon-box', 'search-icon-set'],
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    isNavigate: {
      type: Boolean,
      value: true
    },
    showTab: {
      type: Boolean,
      value: true,
    },
    showSearch: {
      type: Boolean,
      value: true
    },
    curTitle: {
      type: String,
      value: '首页',
    },
    typeTitle: {
      type: String,
      value: '分类'
    },
    cur: {
      type: String,
      value: '0'
    },
    curUrl: {
      type: String,
      value: '/pages/main/index/index'
    },
    typeUrl: {
      type: String,
      value: '/pages/main/clarify/index'
    },
  },
  data: {
    // 这里是一些组件内部数据
  },
  methods: {
    // 这里是一个自定义方法
    tabClick: function (e) {
      this.setData({
        cur: e.target.dataset.index
      })
      let url = this.data.cur === '0' ? this.data.curUrl : this.data.typeUrl;
      console.log(url)
      this.triggerEvent('setCur', this.data.cur)

      if (!this.data.isNavigate) return
      if (this.data.cur === '1') 
        app.utils.navigateTo(url);
      else {
        wx.switchTab({
          url: url
        })
      }
    },
    lintTo: function () {
      wx.navigateTo({
        url: '/pages/search-page/index',
      })
    }
  }
})