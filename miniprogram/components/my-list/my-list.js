// components/my-list/my-list.js
//初始化数据库
const db = wx.cloud.database();
const collect = db.collection('mycollect');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coverData: {
      type: Array,
      value: []
    },
    pageUrl: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e){
      let url = e.currentTarget.dataset.url;
      wx.navigateTo({
        url: this.data.pageUrl+url,
      })
    },
    //图片加载失败调用
    errorFun(e){
      console.log(e)
    },
    longClick(e){
      let pages = getCurrentPages(); //获取加载的页面
      let currentPage = pages[pages.length - 1]; //获取当前页面的对象
      let url = currentPage.route; //当前页面url

      let itemData = e.currentTarget.dataset.itemdata;  //封面数据
      //判断当前页面
      if(url === 'pages/like/like'){
        this.deleCollect(itemData, currentPage);
      }else{
        this.addCollect(itemData);
      }
      
    },
    //添加收藏
    addCollect(itemData){
      wx.showModal({
        title: '加入收藏',
        content: `将 "${itemData.name}" 加入收藏?`,
        confirmText: '加入',
        success: res => {
          if (res.confirm) {
            //加入数据库
            collect.add({
              data: itemData
            }).then(res => {
              wx.showToast({
                title: '添加成功',
              })
            }).catch(err => {
              console.log(err, 添加失败)
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    //取消收藏
    deleCollect(itemData, currentPage){
      wx.showModal({
        title: '取消收藏',
        content: '确认将取消收藏',
        confirmText: '确认',
        success: res => {
          if (res.confirm) {
            let id = itemData._id
            console.log(id)
            collect.doc(id).remove({}).then(res => {
              wx.showToast({
                title: '取消成功',
              });
              //调用当前页面对象的onLoad方法刷新页面
              currentPage.onLoad();
            }).catch(err => {
              console.log('取消失败')
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  }
})
