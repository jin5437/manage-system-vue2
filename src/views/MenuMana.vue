<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      row-key="id"
      :expand-row-keys="expandKeys"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="名称" prop="menuName"> </el-table-column>
      <el-table-column label="权限值" prop="permissionValue"> </el-table-column>
      <el-table-column label="跳转权限值" prop="descValue"> </el-table-column>
      <el-table-column label="操作" prop="options">
        <template slot-scope="data">
          <el-button
            type="primary"
            class="btn-option"
            :disabled="data.row.type == 'four'"
            @click="changeTitle(data.row.type,data.row.permissionValue)"
          >
            <i class="el-icon-plus"></i>
          </el-button>
          <el-button
            type="primary"
            class="btn-option"
            :disabled="data.row.type == 'one'"
            @click="
              updateMenu(
                data.row.id,
                data.row.menuName,
                data.row.permissionValue
              )
            "
          >
            <i class="el-icon-edit"></i>
          </el-button>

          <el-button
            type="danger"
            slot="reference"
            class="btn-option"
            :disabled="data.row.type == 'one'"
            @click="delMenu(data.row.id)"
          >
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加菜单 -->
    <el-dialog :title="titleName" :visible.sync="addVisible" width="33%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="功能权限值" prop="funcPerValue">
          <el-input v-model="ruleForm.funcPerValue"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMenu()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改二级菜单 -->
    <el-dialog title="修改菜单" :visible.sync="updateVisible" width="33%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" prop="currentMenuName">
          <el-input v-model="ruleForm.currentMenuName"></el-input>
        </el-form-item>
        <el-form-item label="功能权限值" prop="currentFuncPerValue">
          <el-input v-model="ruleForm.currentFuncPerValue"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSecondaryMenu">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除二级菜单 -->
    <el-dialog
      title="提示"
      :visible.sync="delVisible"
      width="33%"
      :before-close="handleClose"
    >
      <i class="el-icon-warning"></i>
      <span>此操作将永久删除该记录, 是否继续?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteSecondaryMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MenuMana",
  data() {
    return {
      expandKeys: ["1"],
      tableData: [
        {
          id: 1,
          menuName: "全部数据",
          permissionValue: "111",
          descValue: "222",
          type: "one", // type为one则编辑和删除按钮禁用
          children: [
            {
              id: 11,
              menuName: "权限管理",
              permissionValue: "Acl",
              descValue: "",
              type: "two",
              children: [
                {
                  id: 111,
                  menuName: "用户管理",
                  permissionValue: "User",
                  descValue: "",
                  type: "three",
                  children: [
                    {
                      id: 1111,
                      menuName: "添加用户",
                      permissionValue: "btn.User.add",
                      descValue: "",
                      type: "four",
                    },
                    {
                      id: 1112,
                      menuName: "删除用户",
                      permissionValue: "btn.User.remove",
                      descValue: "",
                      type: "four",
                    },
                    {
                      id: 1113,
                      menuName: "修改用户",
                      permissionValue: "btn.User.update",
                      descValue: "",
                      type: "four",
                    },
                    {
                      id: 1114,
                      menuName: "分配角色",
                      permissionValue: "btn.User.assgin",
                      descValue: "",
                      type: "four",
                    },
                  ],
                },
                {
                  id: 112,
                  menuName: "角色管理",
                  permissionValue: "Role",
                  descValue: "",
                  type: "three",
                  children: [
                    {
                      id: 1121,
                      menuName: "分配权限",
                      permissionValue: "btn.Role.assgin",
                      descValue: "RoleAuth",
                      type: "four",
                    },
                    {
                      id: 1122,
                      menuName: "添加角色",
                      permissionValue: "btn.Role.add",
                      descValue: "",
                      type: "four",
                    },
                    {
                      id: 1123,
                      menuName: "修改角色",
                      permissionValue: "btn.Role.update",
                      descValue: "",
                      type: "four",
                    },
                    {
                      id: 1124,
                      menuName: "删除角色",
                      permissionValue: "btn.Role.remove",
                      descValue: "",
                      type: "four",
                    },
                  ],
                },
                {
                  id: 113,
                  menuName: "菜单管理",
                  permissionValue: "Permission",
                  descValue: "",
                  type: "three",
                  children: [
                    {
                      id: 1131,
                      menuName: "添加",
                      permissionValue: "btn.Permission.add",
                      descValue: "",
                      type: "four",
                    },
                    {
                      id: 1132,
                      menuName: "修改",
                      permissionValue: "btn.Permission.update",
                      descValue: "",
                      type: "four",
                    },
                    {
                      id: 1133,
                      menuName: "删除",
                      permissionValue: "btn.Permission.remove",
                      descValue: "",
                      type: "four",
                    },
                  ],
                },
                {
                  id: 114,
                  menuName: "登录管理",
                  permissionValue: "Test1",
                  descValue: "",
                  type: "three",
                  children: [
                    {
                      id: 1141,
                      menuName: "角色管理",
                      permissionValue: "Test1",
                      descValue: "6666",
                      type: "four",
                    },
                  ],
                },
              ],
            },
            {
              id: 12,
              menuName: "商品管理",
              permissionValue: "Product",
              descValue: "",
              type: "two",
              children: [
                {
                  id: 121,
                  menuName: "SPU管理",
                  permissionValue: "Spu",
                  descValue: "",
                  type: "three",
                },
                {
                  id: 122,
                  menuName: "Sku管理",
                  permissionValue: "Sku",
                  descValue: "",
                  type: "three",
                },
              ],
            },
            {
              id: 13,
              menuName: "订单管理",
              permissionValue: "Order",
              descValue: "",
              type: "two",
              children: [
                {
                  id: 131,
                  menuName: "订单列表",
                  permissionValue: "OrderList",
                  descValue: "",
                  type: "three",
                  children: [
                    {
                      id: 1311,
                      menuName: "查看订单详情",
                      permissionValue: "btn.OrderList.detail",
                      descValue: "OrderShow",
                      type: "four",
                    },
                    {
                      id: 1312,
                      menuName: "退款",
                      permissionValue: "btn.OrderList.Refund",
                      descValue: "Refund",
                      type: "four",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      tableDataList: "",
      addVisible: false,
      updateVisible: false,
      delVisible: false,
      ruleForm: {
        name: "",
        funcPerValue: "",
        currentMenuName: "",
        currentFuncPerValue: "",
      },
      rules: {
        name: [
          { required: true, message: "名称不能为空！", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        funcPerValue: [
          { required: true, message: "功能权限值不能为空！", trigger: "blur" },
        ],
      },
      currentId: "",
      currentMenuName: "",
      currentFuncPerValue: "",
      titleName: "",
      currentType:"one",
      currentPermission:""

    };
  },
  mounted() {
    this.tableDataList = JSON.parse(JSON.stringify(this.tableData));
  },
  methods: {
    //   添加菜单时，判断标题
    changeTitle(type,permission) {
      this.addVisible = true
      this.currentType = type 
      this.currentPermission = permission
      if (type == "one") {
        this.titleName = "添加二级菜单";
      } else if (type == "two") {
        this.titleName = "添加三级菜单";
      } else if (type == "three") {
        this.titleName = "添加四级菜单";
      }
    },
    //   添加菜单
    addMenu() {
      
      let newId = 0
      switch(this.currentType){
        case "one":
          newId = this.tableData[0]["children"].length + 11;
          break; 
        case "two":
          newId = this.tableData[0]["children"][0]["children"].length + 111;
          break; 
        case "three":
          newId = this.tableData[0]["children"][0]["children"][0]["children"].length + 1111;
          break; 
      }
        
      let newMenu = {
        id: newId,
        type:this.currentType,
        menuName: this.ruleForm.name,
        permissionValue: this.ruleForm.funcPerValue,
        descValue: "",
        children: [],
      };
      this.addVisible = false;
      let currentIndex = 0
      switch(this.currentType){
        case "one":
          this.tableData[0]["children"].push(newMenu);
          break; 
        case "two":
          this.tableData[0]["children"].forEach( (item,index) => {
            // 满足
            if( item.permissionValue == this.currentPermission){
              currentIndex = index
            }
          })
          this.tableData[0]["children"][currentIndex]["children"].push(newMenu);
          break; 
        case "three":
          this.tableData[0]["children"][0]["children"].forEach( (item,index) => {
            // 满足
            if( item.permissionValue == this.currentPermission){
              currentIndex = index
            }
          })
          this.tableData[0]["children"][0]["children"][currentIndex]["children"].push(newMenu);
          break; 
      }
      this.ruleForm.name = '';
      this.ruleForm.funcPerValue = '';

      this.tableDataList = JSON.parse(JSON.stringify(this.tableData));
    },
    updateMenu(id, menuName, permissionValue) {
      // 记录当前正在操作行的id
      this.currentId = id;
      // 获取当前编辑行的名字跟权限，分别赋值给currentMenuName、currentFuncPerValue
      this.ruleForm.currentMenuName = menuName;
      this.ruleForm.currentFuncPerValue = permissionValue;
      this.updateVisible = true;
      // console.log(a, b);
    },
    updateSecondaryMenu() {
      // 编辑二级菜单弹窗确定按钮
      // 需要知道修改的是哪一条数据，即匹配记录下的this.currentId
      this.tableData[0].children.forEach((item) => {
        // 遍历表格，找到当前更新的行，重新赋值
        if (item.id == this.currentId) {
          item.menuName = this.ruleForm.currentMenuName;
          item.permissionValue = this.ruleForm.currentFuncPerValue;
        }
      });
      this.updateVisible = false;
    },
    deleteSecondaryMenu() {
      // 删除二级菜单弹窗确定按钮
      // 需要知道删除的是哪一条数据，即匹配记录下的this.currentId
      let newTableData = [];
      this.tableData[0].children.forEach((item) => {
        // 遍历表格，找到当前删除的行，过滤出去
        if (item.id != this.currentId) {
          // 得到新的二级菜单
          newTableData.push(item);
        }
      });
      // 赋值新的二级菜单
      this.tableData[0].children = JSON.parse(JSON.stringify(newTableData));
      this.delVisible = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    delMenu(id) {
      this.currentId = id;
      this.delVisible = true;
    },
  },
};
</script>

<style scoped>
.btn-option {
  margin-left: 10px;
}
.el-icon-warning {
  color: orange;
}
</style>