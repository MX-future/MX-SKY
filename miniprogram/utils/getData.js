import request from '../service/request.js'  //引入封装好的请求库

//获取数据
function getData(name) {
  return new Promise((resolve,reject) => {
    request({
      url: `/?ysname=${name}`
    }).then(res => {
      console.log('url数据', res)
      if (res.code === 0) {
        let urlData = [];  //存放url地址
        for (let i = 0; i <= res.list.length - 1; i++) {
          urlData.push({
            'url': res.list[i].url
          });
        }
        getHomeData(urlData).then(res => {
          //console.log('重组数据',res)
          resolve(res);
        }).catch(err => {
          console.log(err);
          reject(err);
        });
      }  
    }).catch(err => {
      console.log(err)
    });
  });
  
}

//根据获取到的url去请求相应数据
function getHomeData(urlData) {
  return new Promise((resolve,reject) => {
    let newData = [];   //存放重组后的数据
    for(let i = 0;i<=urlData.length-1;i++){
      request({
        url: `/?ysurl=${urlData[i].url}`
      }).then(res => {
        if(res.code === 0){
          newData.push({
            "url": urlData[i].url,
            "img": res.data.cover,
            "name": res.data.name,
            "time": res.data.time,
            'classify': '0'   //0代表影视
          });
          if (i === urlData.length - 1){
            resolve(newData);
          }
        }
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    }
  });
  
}

export default getData;