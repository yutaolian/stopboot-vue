import { api } from '@/sdk/http/httpConfig'

/**
 * projectName：在线云考场
 * author:  lianyutao
 * date: 2020/06/07 21:08
 * version: 1.0.1
 * desc: 测试1 测试-创建
 */
export class DictionaryDeleteRequest {
  constructor(params) {
    this.params = {
      id: undefined
    }
    this.params = params
  }

  // 参数快捷设置
  setParams(params) {
    this.params = params
    return this
  }

  api() {
    const path = '/dictionary/delete'
    const method = 'post'
    return new Promise(resolve => {
      api({ path, method }, this.params)
        .then(response => {
          resolve(response)
        })
    })
  }
}
