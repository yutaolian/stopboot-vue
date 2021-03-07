<template>
  <el-dialog
    width="50%"
    title="方法列表"
    :visible.sync="innerVisible"
    destroy-on-close
    append-to-body
    @open="handleOpen"
    @close="handleClose"
  >
    <el-table
      ref="multipleTable"
      :data="rowData.methodList"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="方法名(汉语)" align="center" fixed />
      <el-table-column
        prop="simpleName"
        label="方法名(英语)"
        align="center"
        fixed
      />
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: "GeneratorDialog",
  props: {
    rowData: {},
    modifySubmittedData: {
      type: Function,
      default: function() {}
    },
    generatorInfo: {}
  },
  data() {
    return {
      innerVisible: false,
      methodMultipleSelection: []
    };
  },
  methods: {
    handleOpen() {
      this.$nextTick(() => {
        this.checkedMethod();
      });
    },
    checkedMethod() {
      let contrastList = this.generatorInfo.modules.filter(item => {
        if (item.moduleId === this.rowData.id) return item;
      })[0].methodIds;
      this.rowData.methodList.forEach((row, index) => {
        this.$refs.multipleTable.toggleRowSelection(
          this.rowData.methodList[index],
          contrastList.includes(row.id)
        );
      });
    },
    handleSelectionChange(val) {
      this.methodMultipleSelection = val;
    },
    handleClose() {
      var multipleSelected = this.methodMultipleSelection.map(item => {
        return item.id;
      });
      if(this.rowData.methodList.length === 0){
        multipleSelected =[]
      }
      this.$emit("modifySubmittedData", this.rowData.id, multipleSelected);
    }
  }
};
</script>

<style></style>
