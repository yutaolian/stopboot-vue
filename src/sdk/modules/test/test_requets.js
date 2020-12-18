import {BaseRequest2} from "../../base/base_request2";


export class TestCreateRequest extends BaseRequest2{

    constructor(params) {
        super("/api/","get");
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
}
