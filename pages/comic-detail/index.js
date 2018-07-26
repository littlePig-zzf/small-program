const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', // 章节id
    comicId: '', // 漫画id
    currentNo: '',
    currentTitle: '',
    remain_num: '',
    isHideModal: true,
    chapters: [], // 书的详情
    comic: {}, // 全部章节
    showBar: false, // 是否点击工具栏
    timer: '' // 工具栏的定时器任务
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.fetchChapter()
  },

  showCharpterTips (e) {
    const currentIndex = e.currentTarget.dataset.index
    this.setNavigationBarTitle(currentIndex)
    this.setData({ 
      showBar: !this.data.showBar
    })

    if (!this.data.showBar) {
      clearTimeout(this.data.timer)
    } else {
      this.setData({
        timer: setTimeout(() => {
          this.setData({
            showBar: false
          })
        }, 3000)
      })
    }
  },

  fetchComicData () {
    app.$http(app.api.home.comicDetail, this.data.comicId, (res) => {
      app.globalData.comic = res.data
      this.setData({
        comic: res.data
      })
    })
  },

  fetchChapter(e) {
    new Promise((resolve, reject)=>{
      app.$http(app.api.home.chapters, this.data.id, (res) => {
        this.isPaided(res, e)
        resolve()
        
        if (this.data.comic.chapters) return
        this.fetchComicData();
      }, '', ()=>{
        if (e || this.data.chapters.length > 1 ) {
          wx.showToast({
            title: '已为你加载下一话',
            icon: 'none'
          })
        }
      })
    }).then(()=>{
      this.setNavigationBarTitle()
    })
  },

  isPaided (res, e) {
    if (res.data.is_paid) {
      if (e) {
        this.setData({
          chapters: []
        })
      }
      this.setData({
        chapters: this.data.chapters.concat([res.data]),
        comicId: res.data.comic_id
      })
    } else if (!res.data.is_paid) {
      this.setData({
        isHideModal: false
      })
      return
    }
  },

  lintTo (e) {
    if (e.currentTarget.dataset.type === 'index') {
      wx.switchTab({
        url: '/pages/main/index/index',
      })
    } else {
      app.utils.navigateTo(`/pages/main/chapter-buy/index?comicId=${this.data.comicId}`)
    }
  },

  setNavigationBarTitle (index) {
    const { chapters } = this.data
    const { length: len } = chapters
    const currentClickChapterIndex = index >= 0 ? index : len - 1
    this.setData({
      currentNo: chapters[currentClickChapterIndex].no,
      currentTitle: chapters[currentClickChapterIndex].title,
      remain_num: chapters[currentClickChapterIndex].remain_num
    })
  },

  nextFun (e) {
    const { length: len } = this.data.comic.chapters
    if (Number(this.data.id) === this.data.comic.chapters[len-1].id) {
      wx.showToast({
        title: '到底了哦',
        icon: 'none'
      })
      return
    }
    this.getNextId()
    this.fetchChapter(e)
  },

  getNextId () {
    const { length: len } = this.data.chapters
    const { length: comicLen } = this.data.comic.chapters
    const currentId = this.data.chapters[len - 1].id
    const currentI = app.utils.findIndex(this.data.comic.chapters, Number(currentId))
    const nextId = this.data.comic.chapters[currentI + 1].id
    this.setData({
      id: nextId
    })
  },

  likeHandle (params) {
    const { is_liked, likes } = params.detail
    const set_Is_liked = 'comic.is_liked'
    const setLikes = 'comic.likes'
    this.setData({
      [set_Is_liked]: is_liked,
      [setLikes]: likes
    })
  },

  bookmarkHandle (params) {
    const setBookmarked = 'comic.is_bookmarked'
    this.setData({
      [setBookmarked]: params.detail
    })
  },

  onReachBottom () {
    this.nextFun()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    app.utils.setShare()
  }
})