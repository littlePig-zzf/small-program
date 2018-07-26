const app = getApp();
Component({
  externalClasses: [],
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    chapterData: {
      type: Array,
      value: []
    }
  },
  data: {
    // 这里是一些组件内部数据
  },
  methods: {
    // 这里是一个自定义方法
    subscribeFun (e) {
      let id = ''
      if(typeof e === 'number') id = e
      else id = e.currentTarget.id
      app.$http(app.api.home.chapters, id, (res)=>{
        console.log(res)
        app.globalData.chapterId = res.data.id
        this.triggerEvent('getDialogData', res.data)
      })
    }
  }
})