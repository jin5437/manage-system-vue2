<template>
  <div>
    <el-input
      class="input-style"
      v-model="input"
      placeholder="请输入内容"
    ></el-input>
    <el-button type="primary" @click="searchUser">
      <i class="el-icon-search"></i>
      查询
    </el-button>
    <el-button @click="clearInput">清空</el-button>
    <div class="addAndDel">
      <el-button class="add" type="primary" @click="addVisible = true">
        添加
      </el-button>
      <el-button type="danger" @click="MultiDel" :disabled="isDisabled"
        >批量删除</el-button
      >
    </div>
    

    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="addVisible" width="30%">
      <div class="addusers">
        <div class="top-user">
          <span>用户名</span>
        </div>
        <div>
          <el-input v-model="addInputName" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div style="margin: 15px 0"></div>
      <div class="addusers">
        <div class="bottom-user">
          <span>用户昵称</span>
        </div>
        <div>
          <el-input
            v-model="addInputNickName"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 设置表格 -->
    <el-table
      ref="multipleTable"
      :data="tableDataList"
      border
      tooltip-effect="dark"
      style="width: 100%"
      header-align="center"
      @selection-change="handleSelectionChange"
    >
    
      <el-table-column type="selection"> </el-table-column>
      <el-table-column prop="userId" label="序号" align="center" width="100px"> </el-table-column>
      <el-table-column prop="userName" label="用户名" align="center" > </el-table-column>
      <el-table-column
        prop="userNickName"
        label="用户昵称"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="permissionList"
        label="权限列表"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="createDate" label="创建日期" align="center"> </el-table-column>
      <el-table-column prop="upDate" label="更新日期" align="center"> </el-table-column>
      <el-table-column prop="operations" label="操作" align="center">
        <template slot-scope="data">
          <el-button
            class="opera"
            type="info"
            @click="
              showInfo(
                data.row.userName,
                data.row.userId,
                data.row.permissionList
              )
            "
          >
            <i class="el-icon-user"></i>
          </el-button>
          <el-button
            class="opera"
            type="primary"
            @click="
              showEditInfo(
                data.row.userName,
                data.row.userNickName,
                data.row.userId
              )
            "
          >
            <i class="el-icon-edit"></i>
          </el-button>
          <!--   删除当前行 -->
          <el-popconfirm
            title="确定删除该用户吗？"
            @confirm="delUser(data.row.userId)"
          >
            <el-button class="opera" type="danger" slot="reference"
              ><i class="el-icon-delete"></i
            ></el-button>
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
        :page-size="pageData"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.tableData.length"
        @prev-click="handleCurrentChange"
        @next-click="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <!-- 设置角色 -->
    <el-dialog
      title="设置角色"
      :visible.sync="dialogVisible"
      width="30%"
      @close="handlClose"
      :close-on-click-modal="false"
    >
      <span>用户名</span>
      <el-input
        v-model="inputUserName"
        placeholder="当前用户的用户名"
        :disabled="true"
      ></el-input>
      <div style="margin: 15px 0"></div>
      <span>角色列表</span>
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >
        全选
      </el-checkbox>
      <div style="margin: 15px 0"></div>
      <el-checkbox-group
        v-model="checkedRoles"
        @change="handleCheckedRolesChange"
      >
        <el-checkbox v-for="role in roles" :label="role" :key="role">
          {{ role }}
        </el-checkbox>
      </el-checkbox-group>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 修改用户 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editVisible"
      width="30%"
      @close="handlClose"
      :close-on-click-modal="false"
    >
      <div class="edit-user">
        <div class="top-user">
          <span>用户名</span>
        </div>
        <div>
          <el-input
            v-model="currentUserName"
            placeholder="当前用户的用户名"
          ></el-input>
        </div>
      </div>
      <div style="margin: 15px 0"></div>
      <div class="edit-user">
        <div class="bottom-user">
          <span>用户昵称</span>
        </div>
        <div>
          <el-input
            v-model="currentUserNickName"
            placeholder="当前用户的用户昵称"
          ></el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserMana",
  data() {
    return {
      input: "",
      inputUserName: "",
      addInputName: "",
      addInputNickName: "",
      checkedUserId: "",
      currentUserName: "",
      currentUserNickName: "",
      currentUserId: "",
      //   tableData模拟数据库中的数据
      tableData: [
        {
          userId: "1",
          userName: "string",
          userNickName: "string昵称",
          permissionList: "初级管理员",
          createDate: "2021-12-19 12:00",
          upDate: "2021-12-19 12:10",
        },
        {
          userId: "2",
          userName: "string2",
          userNickName: "string昵称2",
          permissionList: "中级管理员",
          createDate: "2021-12-19 12:11",
          upDate: "2021-12-19 12:12",
        },
        {
          userId: "3",
          userName: "12345",
          userNickName: "5346547",
          permissionList: "高级管理员",
          createDate: "2021-12-19 12:21",
          upDate: "2021-12-19 12:22",
        },
        {
          userId: "4",
          userName: "qwrwf",
          userNickName: "vwsgthg",
          permissionList: "高级管理员",
          createDate: "2021-12-21 12:21",
          upDate: "2021-12-21 12:22",
        },
        {
          userId: "5",
          userName: "cscvf",
          userNickName: "wrwetwe",
          permissionList: "高级管理员",
          createDate: "2021-12-21 12:21",
          upDate: "2021-12-21 12:22",
        },
        {
          userId: "6",
          userName: "vfdhbb",
          userNickName: "dswqf",
          permissionList: "高级管理员",
          createDate: "2021-12-21 12:21",
          upDate: "2021-12-21 12:22",
        },
      ],
      multipleSelection: [],
      addVisible: false,
      dialogVisible: false,
      editVisible: false,
      checkedRoles: [],
      roles: ["初级管理员", "中级管理员", "高级管理员"],
      isIndeterminate: false,
      checkAll: false,
      isDisabled: true,
      //   tableDataList当前表格中的数据
      tableDataList: [],
      currentPage: 1,
      pageData: 5,
    };
  },
  mounted() {
    this.tableDataList = JSON.parse(JSON.stringify(this.tableData));
    this.tableDataList = this.tableData.slice(
      (this.currentPage - 1) * this.pageData,
      this.currentPage * this.pageData
    );
  },
  methods: {
    // 查询用户
    searchUser() {
      if (this.input == "") {
        this.tableDataList = JSON.parse(JSON.stringify(this.tableData));
        return false;
      }
      let searchList = [];
      this.tableDataList.forEach((item) => {
        if (this.input == item.userName) {
          console.log(item.userName);
          searchList.push(item);
        }
      });
      this.tableDataList = searchList;
    },

    // 清空输入框
    clearInput() {
      this.input = "";
    },

    // 用户设置角色，点击角色列表，获取所点击的角色数据，
    showInfo(userName, userId, permissionList) {
      // console.log(permissionList)
      // 在弹出框中，渲染当前行的权限角色：
      this.checkedRoles = [];
      // 将权限字符串permissionList，转化为数组，
      let arr = permissionList.split(" ");
      this.checkedRoles = arr;
      // console.log(this.checkedRoles.length)
      // 根据选中角色的数组长度，判断是否全选，进行渲染
      if (this.checkedRoles.length >= this.roles.length) {
        this.checkAll = true; //全选
        this.isIndeterminate = false; //表示 checkbox 的不确定状态:全选
      } else if (this.checkedRoles.length > 0) {
        this.checkAll = false;
        this.isIndeterminate = true; //表示 checkbox 的不确定状态:部分选中
      } else {
        this.checkAll = false; //全不选
        this.isIndeterminate = false; //表示：全不选中
      }

      this.checkedUserId = userId;
      this.inputUserName = userName;
      this.dialogVisible = true;
    },
    showEditInfo(userName, userNickName, id) {
      this.currentUserName = userName;
      this.currentUserNickName = userNickName;
      this.currentUserId = id;
      this.editVisible = true;
    },
    submit() {
      this.editVisible = false;
      // 点击确定，修改当前行的用户名和用户昵称
      this.tableDataList.forEach((item) => {
        if (item.userId == this.currentUserId) {
          item.userName = this.currentUserName;
          item.userNickName = this.currentUserNickName;
        }
      });
      this.tableData = JSON.parse(JSON.stringify(this.tableDataList));
    },
    // 删除当前行的数据
    delUser(userId) {
      // console.log(userId)
      let list = [];
      this.tableDataList.forEach((item) => {
        if (item.userId != userId) {
          list.push(item);
        }
      });
      // list = this.tableDataList.filter(item=>{
      //     return item.userId != userId
      // })
      this.tableDataList = list;
      this.tableData = list;
      this.tableDataList = this.tableData.slice(
        (this.currentPage - 1) * this.pageData,
        this.currentPage * this.pageData
      );
    },
    // 添加用户
    addUser() {
      this.addVisible = false;
      this.userId = this.tableData.length + 1;
      
      let newUser = {
        userId: this.userId,
        userName: this.addInputName,
        userNickName: this.addInputNickName,
      };
      
      this.tableDataList.push(newUser);
      this.tableData.push(newUser);
      
      /* 
        分页的注意事项：
          - 1.本项目中，是模拟的数据
              点击新增按钮吗，新增用户之后，在addUser()中，再执行一次分页操作
          - 2.如果是在实际业务场景中，
              - 用户在页面点击新增按钮，输入数据，
              - 前端带着数据，向后端的接口发请求，如this.$axios.get(url).then( res => {})
              - 后端将数据插入数据库，返回响应
              - 前端再调一次查询接口，获取响应体中的数据，显示最新数据在页面上

        动态数据永远都是发请求，或者说是调接口而得来的，不是自己就会刷新的
       */
      this.tableDataList = this.tableData.slice(
        (this.currentPage - 1) * this.pageData,
        this.currentPage * this.pageData
      );
    },
    // 每行数据的选中/全选/全不选
    handleSelectionChange(val) {
      // console.log(val)
      this.multipleSelection = val;
      if (val.length == 0) {
        this.isDisabled = true;
        return;
      }
      this.isDisabled = false;
    },

    // 批量删除
    MultiDel(val) {
      console.log(val);
      let newList = [];
      this.tableData.forEach((tableItem) => {
        let flag = 0;
        this.multipleSelection.forEach((MultiItem) => {
          if (tableItem.userId != MultiItem.userId) {
            // console.log(tableItem)
            flag += 1;
          }
        });
        if (flag == this.multipleSelection.length) {
          newList.push(tableItem);
        }
      });
      // this.tableDataList = newList;
      this.tableData = newList;
      this.tableDataList = this.tableData.slice(
        (this.currentPage - 1) * this.pageData,
        this.currentPage * this.pageData
      );
    },

    // 控制全选按钮
    handleCheckAllChange(val) {
      // console.log(val)
      this.checkedRoles = val ? this.roles : [];
      this.isIndeterminate = false;
    },
    handleCheckedRolesChange(selectedList) {
      //   console.log(selectedList)
      let checkedCount = selectedList.length;
      this.checkAll = checkedCount === this.roles.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.roles.length;

      this.tableDataList.forEach((item) => {
        if (this.checkedUserId == item.userId) {
          //item.permissionList = item.permissionList+','+selectedList;
          item.permissionList = "";
          selectedList.forEach((items) => {
            item.permissionList += items + " ";
          });
        }
      });
    },
    handlClose() {
      this.dialogVisible = false;
      this.editVisible = false;
    },

    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageData = val;
      this.tableDataList = this.tableData.slice(
        (this.currentPage - 1) * this.pageData,
        this.currentPage * this.pageData
      );
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.tableDataList = this.tableData.slice(
        (this.currentPage - 1) * this.pageData,
        this.currentPage * this.pageData
      );
    },
  },
};
</script>

<style scoped>
.input-style {
  margin-left: 20px;
  width: 190px;
}
.el-button {
  margin-left: 10px;
  width: 90px;
}
.addAndDel {
  margin: 20px;
}
.add {
  margin-left: 0px;
}

.opera {
  width: 60px;
}

.addusers,
.edit-user {
  display: flex;
}
.top-user,
.bottom-user {
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: right;
}
</style>