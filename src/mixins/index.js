import { DictionaryListRequest } from '@/sdk/modules/dictionary/list'

export default {
  data() {
    return {
      dictValueMap: {}
    }
  },
  methods: {
    dict(dicKey) {
      if (dicKey) {
        let request = new DictionaryListRequest()
        request.setParams({ 'dicKey': dicKey }).api().then(res => {
          this.$set(this.dictValueMap, dicKey, res.data.list)
        })
      }
    }
  }
};

