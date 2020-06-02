// miniprogram/pages/search/search.js
import getdata from '../../utils/getData.js'  //引入封装好的请求数据的工具函数
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searValue: '',
    searchData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      searValue: options.value
    });
    wx.showLoading({
      title: '搜索中',
    })
    getdata(options.value).then(res => {
      console.log('res',res)
      this.setData({
        searchData: res
      });
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
    })
  },
  toDetail(e){
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '/pages/detail/detail?url=' + url,
    })
  },
  //下拉刷新
  onPullDownRefresh(){
    getdata(this.data.searValue).then(res => {
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