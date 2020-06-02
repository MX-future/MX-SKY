import request from '../service/request.js'  //引入封装好的请求库

//获取数据
function getCartData(name) {
  return new Promise((resolve, reject) => {
    request({
      url: `/?mhname=${name}`
    }).then(res => {
      if (res.message === '成功!') {
        if (res.code === 0) {
          let urlData = [];  //存放url地址
          for (let i = 0; i <= res.list.length - 1; i++) {
            urlData.push({
              'name': res.list[i].name,
              'url': res.list[i].url,
              'img': res.list[i].cover,
              'classify':'1'   //1代表漫画
            });
            if (i === res.list.length - 1) {
              resolve(urlData)
            }
          }
        }
      } else {
        let none = [];
        resolve(none);
      }
    }).catch(err => {
      console.log(err)
    });
  });

}

//根据获取到的url去请求相应数据
function getHomeData(url) {
  return new Promise((resolve, reject) => {
    let newData = [];   //存放重组后的数据
    request({
      url: `/?mhurl1=${url}`
    }).then(res => {
      if (res.code === 0) {
        newData.push({
          "url": urlData[i].url,
          "img": res.data.cover,
          "name": res.data.name,
          "classify": '1'   //1代表漫画
        });
        resolve(newData);
      }
    }).catch(err => {
      console.log(err);
      reject(err);
    });
  });

}

export default getCartData;