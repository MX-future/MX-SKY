// miniprogram/pages/cartoon/cartoon.js
import getCartData from '../../utils/getCartData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',  //搜索框数据
    cartData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
   getCartData('鬼灭之刃').then(res => {
     this.setData({
       cartData: res
     });
     console.log(this.data.cartData)
     wx.hideLoading();
   }).catch(err => {
     console.log(err);
   });
  },
  //搜索框的值变化时调用
  onChange(e) {
    this.setData({
      value: e.detail  //e.detail为当前搜索框的值
    });
  },
  //搜索
  search() {
    wx.navigateTo({
      url: `/pages/cartsearch/cartsearch?value=${this.data.value}`
    })
  },
  onPullDownRefresh: function () {

  }
})