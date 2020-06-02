// pages/cartsearch/cartsearch.js
import getCartData from '../../utils/getCartData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searValue: '',
    searchData: []
  },

  onLoad: function (options) {
    this.setData({
      searValue: options.value
    });
    wx.showLoading({
      title: '搜索中',
    })
    getCartData(options.value).then(res => {
      this.setData({
        searchData: res
      });
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
    })
  },
  //下拉刷新
  onPullDownRefresh() {
    getCartData(this.data.searValue).then(res => {
      this.setData({
        movieData: res
      });
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '刷新成功',
      });
    }).catch(err => {
      wx.showToast({
        title: '刷新失败',
      });
      console.log(err);
    })
  }
})