import { api } from '@/sdk/http/httpConfig'

/**
* projectName：在线云考场
* author:  lianyutao
* date: 2020/06/07 21:08
* version: 1.0.1
* desc: 测试1 测试-列表(分页)
*/
export class Test1PageRequest{

}
// export class Test1PageRequest extends BaseRequest{
//   constructor(params) {
//     super();
//     this.params = {
//     // 姓名
//       name: undefined,
//       // 年龄
//       age: undefined,
//       // 生日
//       birthday: undefined,
//       // 创建时间
//       createTime: undefined,
//       // 信息
//       info: undefined,
//       // 状态
//       status: undefined,
//       // 头像
//       headImg: undefined,
//       // 删除标记（1正常，0删除）
//       deleteFlag: undefined,
//       // 更新时间
//       updateTime: undefined
//     }
//     this.params = params
//   }
//   // 设置 姓名
//   setName(name) {
//     this.params.name = name
//     return this
//   }
//   // 设置 年龄
//   setAge(age) {
//     this.params.age = age
//     return this
//   }
//   // 设置 生日
//   setBirthday(birthday) {
//     this.params.birthday = birthday
//     return this
//   }
//   // 设置 创建时间
//   setCreateTime(createTime) {
//     this.params.createTime = createTime
//     return this
//   }
//   // 设置 信息
//   setInfo(info) {
//     this.params.info = info
//     return this
//   }
//   // 设置 状态
//   setStatus(status) {
//     this.params.status = status
//     return this
//   }
//   // 设置 头像
//   setHeadImg(headImg) {
//     this.params.headImg = headImg
//     return this
//   }
//   // 设置 删除标记（1正常，0删除）
//   setDeleteFlag(deleteFlag) {
//     this.params.deleteFlag = deleteFlag
//     return this
//   }
//   // 设置 更新时间
//   setUpdateTime(updateTime) {
//     this.params.updateTime = updateTime
//     return this
//   }
//   // 参数快捷设置
//   setParams(params) {
//     this.params = params
//     return this
//   }

//   api() {
//     const path = '/test1/page'
//     const method = 'post'
//     return new Promise(resolve => {
//       api({ path, method }, this.params)
//         .then(response => {
//           resolve(response)
//         })
//     })
//   }
// }

// 引用链接
// import {Test1PageRequest} from '@/sdk/modules/test1/page'
/*
//快捷参数使用方式（params需满足如下格式,可设置在Vue的data()中）
data() {
return {
test1PageRequest: {
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

let request = new Test1PageRequest();
request.setParams(test1PageRequest)
.api().then(res => {
console.log("Test1PageRequest res:", res)
})

*/
