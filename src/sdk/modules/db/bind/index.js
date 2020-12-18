import { api } from '@/sdk/http/httpConfig'

/**
 * projectName：在线云考场
 * author:  lianyutao
 * date: 2020/06/07 21:08
 * version: 1.0.1
 * desc: 测试1 测试-创建
 */
export class DbBindRequest {
  constructor(params) {
    this.params = {
      projectId: undefined,
      dbName: undefined,
      dbPassword: undefined,
      dbType: undefined,
      dbUrl: undefined,
      dbUserName: undefined
    }
    this.params = params
  }

  // 参数快捷设置
  setParams(params) {
    this.params = params
    return this
  }

  api() {
    const path = '/db/bind'
    const method = 'post'
    return new Promise(resolve => {
      api({ path, method }, this.params)
        .then(response => {
          resolve(response)
        })
    })
  }
}

// 引用链接
// import {Test1CreateRequest} from '@/sdk/modules/test1/create'
/*
//快捷参数使用方式（params需满足如下格式,可设置在Vue的data()中）
data() {
return {
test1CreateRequest: {
    // 姓名
    name: undefined,
    // 年龄
    age: undefined,
    // 生日
    birthday: undefined,
    // 创建时间
    createTime: undefined,
    // 信息
    info: undefined,
    // 状态
    status: undefined,
    // 头像
    headImg: undefined,
    // 删除标记（1正常，0删除）
    deleteFlag: undefined,
    // 更新时间
    updateTime: undefined,
},
}
},

let request = new Test1CreateRequest();
request.setParams(test1CreateRequest)
.api().then(res => {
console.log("Test1CreateRequest res:", res)
})

*/
