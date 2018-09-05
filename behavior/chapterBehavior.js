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
      const { comicDetail } = this.data
      const { id } = comicDetail
      const api = comicDetail.is_bookmarked ? 'deleteComic' : 'comic'
      const setBookmark = 'comicDetail.is_bookmarked'
      app.$http(app.api.common[api], id + '/bookmark', ({data}) => {
        app.globalData.comic.is_bookmarked = data.is_bookmarked
        this.setData({
          [setBookmark]: data.is_bookmarked
        })
        this.triggerEvent('bookmarkHandle', comicDetail.is_bookmarked)
      })
    },

    toggleLike() {
      const { comicDetail } = this.data
      const { id } = comicDetail
      const api = comicDetail.is_liked ? 'deleteComic' : 'comic'
      const setLiked = 'comicDetail.is_liked'
      const setLikeNum = 'comicDetail.likes'
      app.$http(app.api.common[api], id + '/like', ({data}) => {
        app.globalData.comic.is_liked = data.is_liked
        this.setData({
          [setLiked]: data.is_liked,
          [setLikeNum]: data.is_liked === 0 || !data.is_liked ? comicDetail.likes - 1 : comicDetail.likes + 1
        })
        this.triggerEvent('likeHandle', { is_liked: comicDetail.is_liked, likes: comicDetail.likes})
      })
    },
  }
})