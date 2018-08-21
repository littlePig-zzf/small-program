import { SERVER_URL, api } from './api'

function toastShow(msg, time = 2000) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: time
  })
}

function errorHandler(error) {
  const {data, statusCode} = error
  const {code, message} = (data && data.errors) || {}
  console.log(statusCode === 419)
  if (statusCode === 200) {
    return
  }
  if (statusCode === 419) {
    console.log('身份过期')
    toastShow('身份过期')
    return
  }
  if (statusCode === 404) {
    toastShow('页面对象不存在')
    return
  }
  const actions = {
    1001: () => {
      toastShow('验证失败')
    },

    1002: () => {
      toastShow('验证过期')
    },

    2000: () => {
      toastShow('请授权登录用户信息')
      window.location.href = `${api.login}${window.location.hash}`
    },

    2001: () => {
      toastShow('请关注微信公众号')
      window.location.href = api.qrcode
    },

    2002: () => {
      toastShow(message)
    },

    3000: () => {
      toastShow('漫画已购买')
    },
  }

  if (actions[code]) {
    actions[code].call()
    return
  } else {
    toastShow(message || '服务异常', 3000)
  }
}

function axiosHandler(url, params, successCallback, failCallback, completeCallback, method) {
  wx.showLoading({
    title: '加载中...',
  })
  wx.request({
    url: url,
    data: params,
    method: method,
    header: {
      'X-CSRF-TOKEN': 'rOT0p6y00zqaiYC4t8Uyhxc1NknD5x1X1DfH0eKy',
      'X-Requested-With': 'XMLHttpRequest',
      'Cookie': 'openid=eyJpdiI6IlRjWUI5clArT3VcL3FQXC8wb2tIRGR4Zz09IiwidmFsdWUiOiJRV21zSStHa0kwVEFjNEFZZzhGdjZDXC9IeGZsTFF6RDhkTGFwUWpQV2s2UTRPWll0NXBVdGZENmM4MzJNQU1GViIsIm1hYyI6IjY0ZWVlZTdlMTFmNGQyMjUzN2MyNDUyZjQyYTYwNDVlNjlkMGI3ZGVmZjIwMDE5MDhkM2Y2MzI2YTVmOGE3MGMifQ%3D%3D; XSRF-TOKEN=eyJpdiI6ImcwTkVHbWZ0eVwvd2lud2hvSnpFU25BPT0iLCJ2YWx1ZSI6IlJtclc0NndoNG9RbjIwWVl5UjVLQzNPeklGNnYySGdSVnNSZ0lPbjBFYmNhWThqc0FsNzBuQlZzVm5hMHNaY1RUWDh4MDlNdGgrZm55RXJPdExVTkxnPT0iLCJtYWMiOiJlNjAzNzc0YjBkNTczNjg3Zjk4MmYyNGZjNmEwYjM1YzRhNTM2NGEyNzE5ZGZhNzBmNmI0NGNjMWU0NTQyYmRhIn0%3D; laravel_session=eyJpdiI6IjlpUXlrSTB6dGNUM2crWDM5VkJjK3c9PSIsInZhbHVlIjoiZnlxTHZ3aHZwMXlZV2Y1bzFyS3ZRNzJ4c25uc3g4TWdaRmhSdW1QcmhpVmNLSHY2MlFsaU1NTkNaVjNLK2NjNGQ1bUVOdXpVNDlucWM0Y1k3TmVcLyt3PT0iLCJtYWMiOiI2NzBlMjQxYWRmYmQwYjM2NDFkYWVmYzYyODRmOGY2ZGU4MDUzM2E3YWI4YTRlMTI0NDY1MGJkYjE2N2UxNTU4In0%3D'
    },
    success (res) {    
      errorHandler(res)
      successCallback(res.data)
    },
    fail (res) {    
      if (failCallback) failCallback(res)
    },
    complete () {
      wx.hideLoading()
      if (completeCallback) completeCallback()
    }
  });
}

const https = {}
const methods = ['GET', 'POST', 'DELETE', 'PATCH']
for (let method of methods) {
  https[method] = (url, params = {}, successCb, errorCb, completeCb) => {
    if (method === 'GET' && params) {
      params._ = Date.parse(new Date()) // 设置请求不缓存
    }
    axiosHandler(url, params, successCb, errorCb, completeCb, method)
  }
}

export default function (...args) {
  let route, rParams, params, successCb, failureCb, completeCb

  // eg. this.$http(Foo, successCb)
  if (typeof args[1] === 'function') {
    [route, successCb, failureCb, completeCb] = args
  }

  // eg. this.$http(Foo, 'bar', successCb)
  if (typeof args[2] === 'function') {
    [route, rParams, successCb, failureCb, completeCb] = args
  }

  // eg. this.$http(Foo, 'bar', {a: 'b'}, successCb)
  if (typeof args[3] === 'function') {
    [route, rParams, params, successCb, failureCb, completeCb] = args
  }
  const t = typeof rParams
  if (t === 'object') {
    params = rParams
  }

  // 拼接链接
  const url = (t === 'string' || t === 'number') ? `${route.url}${rParams}` : route.url

  // 加上 location.hash 用于重定向
  if (params === undefined || params.hash === undefined) {
    // const hash = window.location.hash 小程序中不存在hash值
    const hash = ''
    params = Object.assign({}, params, { hash })
  }

  return https[route.type](url, params, successCb, failureCb, completeCb)
}

