<template>
  <div>
    <el-input
      class="input-role"
      v-model="inputRoleName"
      placeholder="角色名称"
    ></el-input>
    <el-button class="btn-role" type="primary" @click="searchRole">
      <i class="el-icon-search"></i>
      查询
    </el-button>
    <el-button class="btn-role" @click="clearRole">清空</el-button>
    <div style="margin: 20px 0"></div>
    <el-button class="add-role" type="primary" @click="addRoleVisible = true">
      添加
    </el-button>
    <el-button
      class="del-role"
      type="danger"
      @click="multiDelRole"
      :disabled="isDisabled"
      >批量删除</el-button
    >
    <div style="margin: 20px 0"></div>

    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="addRoleVisible" width="30%">
      <span>请输入新名称</span>
      <div style="margin: 20px 0"></div>
      <el-input v-model="newRoleName"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableDataList"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column prop="roleId" label="序号"> </el-table-column>
      <el-table-column prop="roleName" label="角色名称"> </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="data">
          <el-button type="info">
            <i class="el-icon-info"></i>
          </el-button>
          <el-button type="primary" @click="editRole(data.row.roleName)">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-popconfirm
            title="这是一段内容确定删除吗？"
            @confirm="delRole(data.row.roleId)"
          >
            <el-button type="danger" slot="reference">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="perPageNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoleMana",
  data() {
    return {
      inputRoleName: "",
      multipleTable: [],
      tableData: [
        {
          roleId: "1",
          roleName: "string1",
        },
        {
          roleId: "2",
          roleName: "string2",
        },
        {
          roleId: "3",
          roleName: "string3",
        },
        {
          roleId: "4",
          roleName: "string4",
        },
        {
          roleId: "5",
          roleName: "string5",
        },
      ],
      tableDataList: [],
      rolePermissVisible: false,
      addRoleVisible: false,
      newRoleName: "",
      isDisabled: true,
      multipleSelectList: [],
      currentPage: 1,
      perPageNum: 5,
    };
  },
  mounted() {
    this.tableDataList = JSON.parse(JSON.stringify(this.tableData));
    this.tableDataList = this.tableData.slice(
      (this.currentPage - 1) * this.perPageNum,
      this.currentPage * this.perPageNum
    );
  },
  methods: {
    //   查询角色
    searchRole() {
      if (this.inputRoleName == "") {
        this.tableDataList = JSON.parse(JSON.stringify(this.tableData));
        return false;
      }
      let newList = [];
      this.tableDataList.forEach((item) => {
        if (this.inputRoleName == item.roleName) {
          newList.push(item);
        }
      });
      this.tableDataList = newList;
    },
    //   清空角色输入框
    clearRole() {
      this.inputRoleName = "";
    },
    // 添加角色
    addRole() {
      this.addRoleVisible = false;
      this.roleId = this.tableData.length + 1;
      let newRole = {
        roleId: this.roleId,
        roleName: this.newRoleName,
      };
      this.tableDataList.push(newRole);
      this.tableData.push(newRole);
      this.tableDataList = this.tableData.slice(
        (this.currentPage - 1) * this.perPageNum,
        this.currentPage * this.perPageNum
      );
      this.newRoleName = "";
    },

    // 批量删除，注意，两层foreach的位置不能调换
    multiDelRole() {
      let newList = [];
      this.tableDataList.forEach((tableItem) => {
        let flag = 0;
        this.multipleSelectList.forEach((multiItem) => {
          if (multiItem.roleId != tableItem.roleId) {
            flag += 1;
          }
        });
        if (flag == this.multipleSelectList.length) {
          newList.push(tableItem);
        }
      });
      this.tableDataList = newList;
      this.tableData = newList;
    },
    // 编辑角色 todo
    editRole(roleName) {
      console.log(roleName);
    },

    // 删除角色:删除当前行的数据
    delRole(roleId) {
      console.log(roleId);
      let list = [];
      // this.tableDataList.forEach(item => {
      //     if(item.roleId != roleId){
      //         list.push(item)
      //     }
      // })
      list = this.tableDataList.filter((item) => {
        return item.roleId != roleId;
      });
      this.tableDataList = list;
    },

    // 获取多选框中，选中的数据，存储在列表中，如果选中，则批量删除按钮可以点击
    handleSelectionChange(val) {
      this.multipleSelectList = val;
      console.log(val);
      if (val.length == 0) {
        this.isDisabled = true;
        return;
      }
      this.isDisabled = false;
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.perPageNum = val;
      this.tableDataList = this.tableData.slice(
        (this.currentPage - 1) * this.perPageNum,
        this.currentPage * this.perPageNum
      );
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.tableDataList = this.tableData.slice(
        (this.currentPage - 1) * this.perPageNum,
        this.currentPage * this.perPageNum
      );
    },
  },
};
</script>

<style scoped>
.input-role {
  margin-left: 20px;
  width: 190px;
}
.btn-role,
.del-role {
  margin-left: 10px;
  width: 90px;
}
.add-role {
  margin-left: 20px;
  width: 90px;
}
</style>