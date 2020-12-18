import { api } from '@/sdk/http/httpConfig'

/**
 * projectName：在线云考场
 * author:  lianyutao
 * date: 2020/06/07 21:08
 * version: 1.0.1
 * desc: 测试1 测试-创建
 */
export class MethodCreateRequest {
  constructor(params) {
    this.params = {
      moduleId: undefined,
      name: undefined,
      simpleName: undefined,
      path: undefined,
      fullPath: undefined,
      inputBeanName: undefined,
      outputBeanName: undefined,
      methodType: 'post',
      contentType: 'application/json',
      type: 'out',
      modulePath: undefined,
    }
    this.params = params
  }

  // 参数快捷设置
  setParams(params) {
    this.params = params
    return this
  }

  api() {
    const path = '/method/create'
    const method = 'post'
    return new Promise(resolve => {
      api({ path, method }, this.params)
        .then(response => {
          resolve(response)
        })
    })
  }
}
