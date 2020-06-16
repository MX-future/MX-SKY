// miniprogram/pages/detail/detail.js
import request from '../.././service/request.js'  //引入封装好的请求库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.url)
  },
  //获取详情数据
  getData(url){
    request({
      url: `/?ysurl=${url}`
    }).then(res => {
      let _data = [];  //组合数据
      if(res.code === 1) {
        wx.showToast({
          title: '该链接已失效',
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
      } else {
        _data.push({
          "cover": res.data.cover,
          "name": res.data.name,
          "genre": res.data.genre,
          "region": res.data.region,
          "Language": res.data.Language,
          "time": res.data.time,
          "list": res.list
        });
        this.setData({
          detailData: _data
        });
      } 
    }).catch(err => {
      console.log(err)
    });;
  }
})