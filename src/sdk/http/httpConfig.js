import { get, post } from '@/sdk/http/http'
// 自定义api地址
// const baseURL = 'https://www.stopboot.com/api'
// const baseURL = 'http://localhost:10100/api'
const baseURL = 'http://192.168.1.104:10100/api'
// let baseURL
// if (process.env.NODE_ENV == 'production') {
//   baseURL =  'http://kw.banyuankeji.com/api'
// } else {
//   baseURL = 'http://localhost:10100/api'
// }

// const CONTENT_TYPE_JSON = ''
// const CONTENT_TYPE_FORM = ''
// const CONTENT_TYPE_FILE = ''

export function api({ path, method }, params = {}) {
  return new Promise((resolve, reject) => {
    if (method === 'get') {
      get(baseURL + path, params).then(response => {
        resolve(response)
      }, error => {
        reject(error)
      }).catch(err => {
        reject(err)
      })
    } else {
      // 默认使用post
      post(baseURL + path, params).then(response => {
        resolve(response)
      }, error => {
        reject(error)
      }).catch(err => {
        reject(err)
      })
    }
  })
}
