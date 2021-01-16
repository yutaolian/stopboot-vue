import {BaseRequest2} from "../../base/base_request2";


export class TestCreateRequest extends BaseRequest2{

    constructor(params) {
        super("/project/list","post");
        this.params = {
            author: undefined,
            description: undefined,
            name: undefined,
            simpleName: undefined,
            version: undefined
        }
        this.params = params;
    }

    // 参数快捷设置
    setParams(params) {
        super.setParams(params);
        return this;
    }

    call() {
        if (this.params.author == undefined){
            console.log("author不能为空")
            return ;
        }
        return super.call();
    }
}

/// user:{
//             author: undefined,
//             description: undefined,
//             name: undefined,
//             simpleName: undefined,
//             version: undefined
//         },
