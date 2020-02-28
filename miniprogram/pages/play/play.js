// miniprogram/pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playUrl: '',
    onlineUrl: '',
    downUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      playUrl: options.url,
      onlineUrl: options.onlineurl,
      downUrl: options.download
    });
  },
  getOnline(){
   this.copy(this.data.onlineUrl);
  },
  getDown(){
    let url = this.data.downUrl;
    if(url === '无'){
      wx.showToast({
        title: '暂无下载地址...',
      })
    }else{
      this.copy(url); 
    }
  },
  copy(data){
    //微信API,调用系统剪贴板
    wx.setClipboardData({
      data: data,
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              title: '已复制到剪贴板'
            })
          },
          fail(err) {
            wx.showToast({
              title: '复制失败'
            }),
              console.log(err)
          }
        })
      }
    })
  }
})