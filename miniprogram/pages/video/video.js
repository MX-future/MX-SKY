// miniprogram/pages/video/video.js
import getdata from '../../utils/getData.js'  //引入封装好的请求数据的工具函数

Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: '',  //搜索框数据
    movieData: [], //数据
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  toSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //搜索框的值变化时调用
  onChange(e){
    this.setData({
      value: e.detail  //e.detail为当前搜索框的值
    });
  },
  //搜索
  search(){
    wx.navigateTo({
      url: `/pages/search/search?value=${this.data.value}`
    })
  }
  // //监听分页变化，使用ES6语法，按需获取参数，detail为事件对象中的参数
  // handleChange({ detail }){
  //   console.log(detail.type)
  // }
})