// pages/like/like.js
//初始化数据库
const db = wx.cloud.database();
const collect = db.collection('mycollect');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieData: [],  //收藏的影视
    cartData: []    //收藏的漫画
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  onShow: function () {
    this.getData();
  },
  //下拉刷新
  onPullDownRefresh: function () {
    this.getData();
  },
  getData(){
    let data1 = [];  //临时存放影视数据
    let data2 = []   //临时存放影视数据
    collect.get().then(res => {
      for (let i = 0; i <= res.data.length - 1; i++) {
        if (res.data[i].classify === '0') {
          data1.push(res.data[i]);
        } else if (res.data[i].classify === '1') {
          data2.push(res.data[i]);
        }
      }
      this.setData({
        movieData: data1,
        cartData: data2
      });
    }).catch(err => {
      console.log('获取收藏数据失败',err)
    });
  }
})