import {api} from '@/sdk/http/httpConfig'

/**
 * projectName：stop-boot jssdk
 * author: Lianyutao
 * date: 2019/11/04 19:54
 * version: 1.0.1
 * desc: 分页
 */
export class DictionaryPageRequest {

  constructor(params) {
    this.params = {
      // 第几页
      pageNum: undefined,
      // 页面大小
      pageSize: undefined,
      // 字典名称
      dicName: undefined,
    }
    this.params = params
  }
  //参数快捷设置
  setParams(params) {
    this.params = params
    return this;
  }

  api() {
    const path = '/dictionary/page'
    const method = 'post'
    const contentType = 'application/json'
    return new Promise(resolve => {
      api({path, method}, this.params)
        .then(response => {
          resolve(response)
        })
    })
  }
}
