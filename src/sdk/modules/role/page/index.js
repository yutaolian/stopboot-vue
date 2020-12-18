import {api} from '@/sdk/http/httpConfig'

/**
 * projectName：stop-boot jssdk
 * author: Lianyutao
 * date: 2019/11/04 19:54
 * version: 1.0.1
 * desc: 分页
 */
export class RolePageRequest {

  constructor(params) {
    this.params = {
      // 第几页
      pageNum: undefined,
      // 页面大小
      pageSize: undefined,
      // 字典名称
      name: undefined,
    }
    this.params = params
  }

  setId(id) {
    this.params.id = id
    return this;
  }

  setDicKey(dicKey) {
    this.params.dicKey = dicKey
    return this;
  }

  setStatus(status) {
    this.params.status = status
    return this;
  }

  //参数快捷设置
  setParams(params) {
    this.params = params
    return this;
  }

  api() {
    const path = '/role/page'
    const method = 'post'
    return new Promise(resolve => {
      api({path, method}, this.params)
        .then(response => {
          resolve(response)
        })
    })
  }
}
