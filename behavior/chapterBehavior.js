const app = getApp()
module.exports = Behavior({
  behaviors: [],
  properties: {

  },
  data: {

  },
  attached: function () { },
  methods: {
    toggleBookmark() {
      const { id } = this.data.comicDetail
      const api = this.data.comicDetail.is_bookmarked ? 'deleteComic' : 'comic'
      const setBookmark = 'comicDetail.is_bookmarked'
      app.$http(app.api.common[api], id + '/bookmark', (res) => {
        app.globalData.comic.is_bookmarked = res.data.is_bookmarked
        this.setData({
          [setBookmark]: res.data.is_bookmarked
        })
        this.triggerEvent('bookmarkHandle', this.data.comicDetail.is_bookmarked)
      })
    },

    toggleLike() {
      const { id } = this.data.comicDetail
      const api = this.data.comicDetail.is_liked ? 'deleteComic' : 'comic'
      const setLiked = 'comicDetail.is_liked'
      const setLikeNum = 'comicDetail.likes'
      app.$http(app.api.common[api], id + '/like', (res) => {
        app.globalData.comic.is_liked = res.data.is_liked
        this.setData({
          [setLiked]: res.data.is_liked,
          [setLikeNum]: res.data.is_liked === 0 || !res.data.is_liked ? this.data.comicDetail.likes - 1 : this.data.comicDetail.likes + 1
        })
        this.triggerEvent('likeHandle', { is_liked: this.data.comicDetail.is_liked, likes: this.data.comicDetail.likes})
      })
    },
  }
})