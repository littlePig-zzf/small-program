const API_PATH = 'https://comic.alaskamob.com'
// const API_PATH = 'https://test-manhua.alaskamob.com'
const API_FULL = API_PATH + '/api/v1/'
export const SERVER_URL = API_FULL

export const api = {
  // 获取token
  token: API_FULL + 'token',

  // 获取微信账户信息
  login: API_PATH + '/user/login',

  // 关注公众号
  qrcode: API_PATH + '/qrcode',

  // 公共的接口
  common: {
    // 点赞-收藏
    comic: {
      type: 'POST',
      url: API_FULL + 'comic/',
      query: true,
    },

    // 取消点赞-收藏
    deleteComic: {
      type: 'DELETE',
      url: API_FULL + 'comic/',
      query: true,
    },

    // 排行榜
    rank: {
      type: 'GET',
      url: API_FULL + 'rank/',
      query: true,
    },

    // 热门搜索标签
    searchHot: {
      type: 'GET',
      url: API_FULL + 'search/hot',
    },

    // 搜索
    search: {
      type: 'POST',
      url: API_FULL + 'search',
    },
  },

  // 首页
  home: {
    index: {
      type: 'GET',
      url: API_FULL + 'home',
    },

    // 更多
    more: {
      type: 'GET',
      url: API_FULL + 'section/',
      query: true,
    },

    // 漫画类别
    category: {
      type: 'GET',
      url: API_FULL + 'category',
    },

    // 漫画列表
    comicList: {
      type: 'GET',
      url: API_FULL + 'comic',
    },

    // 漫画详情
    comicDetail: {
      type: 'GET',
      url: API_FULL + 'comic/',
      query: true,
    },

    // 章节详情
    chapters: {
      type: 'GET',
      url: API_FULL + 'chapter/',
      query: true,
    },

    // 章节购买
    chapterBuy: {
      type: 'POST',
      url: API_FULL + 'chapter/',
      query: true,
      params: true,
    },
  },
  recommend: {
    type: 'GET',
    url: API_FULL + 'comic/recommend',
  },
  book: {
    // 漫画收藏列表
    likesList: {
      type: 'GET',
      url: API_FULL + 'comic/bookmark',
    },

    // 漫画历史列表
    historyList: {
      type: 'GET',
      url: API_FULL + 'comic/history',
    },

    // 删除历史列表
    delHistory: {
      type: 'DELETE',
      url: API_FULL + 'comic/history',
    },

    // 删除收藏
    delLike: {
      type: 'DELETE',
      url: API_FULL + 'comic/bookmark',
    },
  },
  user: {
    // 用戶信息
    index: {
      type: 'GET',
      url: API_FULL + 'user',
    },

    // 充值选项列表
    topup: {
      type: 'GET',
      url: API_FULL + 'topup',
    },

    // 订单
    order: {
      type: 'POST',
      url: API_PATH + '/order',
    },

    // 消费记录
    expend: {
      type: 'GET',
      url: API_FULL + 'user/transaction/expend',
    },

    // 阅币记录
    income: {
      type: 'GET',
      url: API_FULL + 'user/transaction/income',
    },

    // 签到--不能使用patch的方式
    sign: {
      type: 'PATCH',
      url: API_FULL + 'user/sign-in',
    },

    // 联系我们
    contact: {
      type: 'GET',
      url: API_FULL + 'contact',
    },

    // 自动购买
    toggleAutoBuyChapter: {
      type: 'POST',
      url: API_FULL + 'user/toggle-auto-buy-chapter',
    },
  },
}
