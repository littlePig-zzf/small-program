const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 跳转页面(不包括tabbar页面)
const navigateTo = url => {
  wx.navigateTo({
    url: url,
  })
}

// 匹配对应的index
const findIndex = (arr, id, which = 'id') => {
  let i = ''
  arr.map((item, index) => {
    if (item[which] === id) {
      i = index
    }
  })
  return i
}

// 全局的分享配置--分享当前所在页
const setShare = () => {
  const pages = getCurrentPages()
  return {
    title: '漫画剧透社',
    path: `/${pages[pages.length-1].route}`
  }
}

const noMoreData = () => {
  wx.showToast({
    title: '暂无更多数据',
    icon: 'none'
  })
}

module.exports = {
  formatTime: formatTime,
  navigateTo: navigateTo,
  findIndex: findIndex,
  noMoreData: noMoreData,
  setShare: setShare
}