// pages/cartplay/cartplay.js
import request from '../../service/request.js'  //引入封装好的请求库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgData: [] //漫画图片数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.getData(options.url);
    wx.hideLoading();
  },
  //获取漫画图片数据
  getData(url) {
    request({
      url: `/?mhurl2=${url}`
    }).then(res => {
      let _data = [];
      for(let i=0;i<=res.list.length-1;i++){
        _data.push({
          'img': res.list[i].img
        });
      }
      _data.push({
        "img": res.list.img,
      });
      this.setData({
        imgData: _data
      });
      console.log(this.data.imgData)
    }).catch(err => {
      console.log(err)
    });;
  }

})