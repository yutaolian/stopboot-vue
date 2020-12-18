import {api} from '@/sdk/http/httpConfig'

/**
 * projectName：stop-boot jssdk
 * author: Lianyutao
 * date: 2019/11/04 19:54
 * version: 1.0.1
 * desc: 列表
 */
export class PermissionListRequest {

  constructor(params) {
    this.params = {
      menuId: undefined,
    }
    this.params = params
  }

  // 参数快捷设置
  setParams(params) {
    this.params = params
    return this
  }

  api() {
    const path = '/permission/list'
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

