import { baseURL, timeout } from './config.js';

function request(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      success: res => {
        resolve(res.data)
      },
      fail: err => {
        reject(err)
      }
    });
  });
}

export default request;