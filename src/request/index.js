import { API_URL } from './api'

export default function getClient (method, url, data, isLoading = true) {
  if (isLoading) {
    wx.showLoading({
      title: '加载中...'
    })
  }
  const client = new Promise((resolve, reject) => {
    wx.request({
      url: API_URL + url,
      data: data,
      method: method,
      header: {
        'openid': wx.getStorageSync('openid')
      },
      success (res) {
        resolve(res.data)
      },
      fail (res) {
        reject(res)
        console.log(res)
      },
      complete () {
        if (isLoading) {
          wx.hideLoading()
        }
      }
    })
  })
  return client
}
