import axios from 'axios'
// element vue消息提示
import {Message} from 'element-ui'
// import {getToken, setToken, removeToken} from '@/utils/tokenUtil'
// import defaultSettings from '@/config/settings'
// import {Msg} from '../msg/index'
//

axios.defaults.timeout = 15000
// 请求头信息是为post请求设置
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


/**
 * Content-Type: application/json ： 请求体中的数据会以json字符串的形式发送到后端
 Content-Type: application/x-www-form-urlencoded：请求体中的数据会以普通表单形式（键值对）发送到后端
 Content-Type: multipart/form-data： 它会将请求体的数据处理为一条消息，以标签为单元，用分隔符分开。既可以上传键值对，也可以上传文件。
 * @type {string}
 */

const projectName = "stopboot-vue";

axios.interceptors.request.use(
  config => {
    const token = 'ccccc';//getToken()
    token && (config.headers.Authorization = token)
    //测出可添加公共参数
    const defaultParams = {}
    // 默认参数设置：所有接口都必须传的值（比如：userId）
    config.data = Object.assign({}, config.data, defaultParams)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    // hideLoading();
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  }, error => {
    // hideLoading();
    return Promise.reject(error)
  }
)

export function post(url, params = {}) {

  return new Promise((resolve, reject) => {
    axios.post(url, params).then(response => {
      if (response.data['code'] == 'SUCCESS') {
        console.info('---------------------成功 start--------------------------')
        console.info('✅ ' + projectName + ' js sdk url:️', url)
        console.info('✅ ' + projectName + ' js sdk params:️', params)
        console.info('✅ ' + projectName + ' js sdk success data️:', response.data)
        console.info('----------------------成功 end-------------------------')
        resolve(response.data)
      } else if (response.data['code'] == 'FAIL') {
        Message.error(response.data['failMsg'])
        console.info('----------------------失败 start-------------------------')
        console.info('❌ ' + projectName + ' js sdk url:️', url)
        console.info('❌ ' + projectName + ' js sdk params:️', params)
        console.info('❌ ' + projectName + ' js sdk fail data️:', response)
        console.info('-----------------------失败 end-----------------------')
        reject(response)
      } else if (response.data['code'] == 'UNAUTHC') {
        // this.$router.push({
        //   path: "/login"
        // });
        Message.error(response.data['failMsg'])
        console.info('----------------------权限验证失败 start-------------------------')
        console.info('❌ ' + projectName + ' js sdk url:️', url)
        console.info('❌ ' + projectName + ' js sdk params:️', params)
        console.info('❌ ' + projectName + ' js sdk unauth data️:', response)
        console.info('-----------------------权限验证失败 end-----------------------')
        // removeToken()
        // reject(response)
      } else {
        Message.error('未知错误:', response.data)
        console.info('----------------------未知错误 start-------------------------')
        console.info('❌ ' + projectName + ' js sdk url:️', url)
        console.info('❌ ' + projectName + ' js sdk params:️', params)
        console.info('❌ ' + projectName + ' js sdk unknown error data️:', response.data)
        console.info('-----------------------未知错误 end-----------------------')
        reject(response)
      }
    }).catch(function (error) {
      Message.error('网络异常:', error)
      console.info('----------------------网络异常 start-------------------------')
      console.info('❌ ' + projectName + ' js sdk url:️', url)
      console.info('❌ ' + projectName + ' js sdk params:️', params)
      console.info('❌ ' + projectName + ' js sdk other error:', error)
      console.info('-----------------------网络异常 end-----------------------')
      reject(error)
    });
  })
}


export function get(url, params = {}) {


}

