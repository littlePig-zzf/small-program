const app = getApp()

Component({
  externalClasses: [],
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    bookList: {
      type: Array,
      value: []
    },
    showTag: { // 是否显示漫画的类别标签
      type: Boolean,
      value: false
    },
    showDetail: { // 是否显示点赞和阅读量icon
      type: Boolean,
      value: true
    },
    hasData: {
      type: Boolean,
      value: true
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    goToRead (e) {
      app.utils.navigateTo(`/pages/comic-introduce/index?id=${e.currentTarget.id}`)
    }
  }
})