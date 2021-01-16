import {api} from '@/sdk/http/httpConfig'

export class BaseRequest2 {

    constructor(path, method) {
        this.path = path;
        this.method = method;
    }

    // 参数快捷设置
    setParams(params) {
        this.params = params
        return this
    }

    // 参数快捷设置
    setGetParams(params) {
        this.params = params
        return this
    }

    //设置参数
    setBodyParams(params) {
        this.params = params
        return this
    }

    call() {
        return new Promise(resolve => {
            api({"path": this.path, "method": this.method}, this.params)
                .then(response => {
                    resolve(response)
                })
        })
    }
}
