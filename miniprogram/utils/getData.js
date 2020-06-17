import request from '../service/request.js'  //引入封装好的请求库

//获取数据
function getData(name) {
  return new Promise((resolve,reject) => {
    request({
      url: `/?ysname=${name}`
    }).then(res => {
      let urlData = [];  //存放url地址
      if (res.code === 0) {
        for (let i = 0; i <= res.list.length - 1; i++) {
          urlData.push({
            'url': res.list[i].url,
            'name': res.list[i].name,
            'genre': res.list[i].genre,
            'time': res.list[i].time
          });
          if (i === res.list.length-1) {
            resolve(urlData)
          }
        }
      } else if (res.code === 1) {
        resolve(urlData)
      }
    }).catch(err => {
      console.log(err)
      reject(err)
    });
  });
  
}

//根据获取到的url去请求相应数据
function getHomeData(url) {
  return new Promise((resolve,reject) => {
    let newData = [];   //存放重组后的数据
      request({
        url: `/?ysurl=${url}`
      }).then(res => {
        if(res.code === 0){
          newData.push({
            "url": urlData[i].url,
            "img": res.data.cover,
            "name": res.data.name,
            "time": res.data.time,
            "classify": '0'   //0代表影视
          });
          resolve(newData)
        }
      }).catch(err => {
        console.log(err);
        reject(err);
      });
  });
  
}

export default getData;