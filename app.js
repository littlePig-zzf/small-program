//app.js
import {api} from '/request/api';
import $http from '/request/index';
import utils from './utils/util';
App({
  onLaunch: function () {
    this.utils = utils;
    // 用户登录
    // wx.login({
    //   success: function (res) {
    //     console.log(res)
    //     if (res.code) {
    //       //发起网络请求
         
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  },
  globalData: {
    comic: {},
    chapterId: '',
    comicSaleTab: ''
  },
  api,
  $http,
  utils
})