/**
 * 菜单码格式要求
 * 
 * hidden：此属性用于是否展示菜单码。有：不展示
 * title: 菜单名称
 * menuIcon: 菜单图标
 * url: 菜单对应的路由地址
 * menuId: 菜单的唯一标识
 * children: 子菜单
 */

const menuList = [
  {
    uppMenuCode: "bank-transactionBank",
    menuCode: "bank-basicBusiness",

    isAdmin: "1",
    isOperator: "1",

    menuHerf: null,
    menuIcon: null,
    menuId: "bank-basicBusiness",
    menuLevel: "1",
    menuName: "基础业务",
    menuDisplay: null,

    isKeepAlive: "0",

    folderCode: "basicBusiness",
    iconFlag: "0",
    menuAllot: "2",
    menuChecked: null,
    menuVerify: null,
    sortNo: "010",
    subsystemCode: "basicBusiness",
    trCode: null,
    workflowAssigneeMode: null,
    workflowFlag: "0",
  },
  {
    menuCode: "bank-orgInfo",
    menuName: "机构信息",
    uppMenuCode: "bank-orgManage",
    menuLevel: "3",
    menuAllot: "2",
    sortNo: "030",
    menuId: "bank-orgInfo",
    menuIcon: null,
    menuHerf: "/basicBusiness/orgManage/orgInfo",
    menuScope: "4001",
    menuType: "A",
    menuKind: null,
    menuVerify: null,
    menuDisplay: null,
    menuChecked: null,
    trCode: null,
    subsystemCode: "basicBusiness",
    folderCode: "basicBusiness",
    workflowFlag: "0",
    workflowAssigneeMode: null,
    iconFlag: "0",
    isKeepAlive: "1",
    isAdmin: "1",
    isOperator: "1",
  },
  {
    menuCode: "bank-orgManage",
    menuName: "机构管理",
    uppMenuCode: "bank-basicBusiness",
    menuLevel: "2",
    menuAllot: "2",
    sortNo: "010",
    menuId: "bank-orgManage",
    menuIcon: "jigouguanli1",
    menuHerf: null,
    menuScope: "4001",
    menuType: "A",
    menuKind: null,
    menuVerify: null,
    menuDisplay: null,
    menuChecked: null,
    trCode: null,
    subsystemCode: "basicBusiness",
    folderCode: "basicBusiness",
    workflowFlag: "0",
    workflowAssigneeMode: null,
    iconFlag: "0",
    isKeepAlive: "0",
    isAdmin: "1",
    isOperator: "1",
  },
  {
    menuCode: "bank-orgAuth",
    menuName: "机构权限",
    uppMenuCode: "bank-orgManage",
    menuLevel: "3",
    menuAllot: "2",
    sortNo: "040",
    menuId: "bank-orgAuth",
    menuIcon: null,
    menuHerf: "/basicBusiness/orgManage/orgAuth",
    menuScope: "4001",
    menuType: "A",
    menuKind: null,
    menuVerify: null,
    menuDisplay: null,
    menuChecked: null,
    trCode: null,
    subsystemCode: "basicBusiness",
    folderCode: "basicBusiness",
    workflowFlag: "0",
    workflowAssigneeMode: null,
    iconFlag: "0",
    isKeepAlive: "1",
    isAdmin: "1",
    isOperator: "0",
  },
  {
    menuCode: "bank-orgRole",
    menuName: "机构角色",
    uppMenuCode: "bank-orgManage",
    menuLevel: "3",
    menuAllot: "2",
    sortNo: "050",
    menuId: "bank-orgRole",
    menuIcon: null,
    menuHerf: "/basicBusiness/orgManage/orgRole",
    menuScope: "4001",
    menuType: "A",
    menuKind: null,
    menuVerify: null,
    menuDisplay: null,
    menuChecked: null,
    trCode: null,
    subsystemCode: "basicBusiness",
    folderCode: "basicBusiness",
    workflowFlag: "0",
    workflowAssigneeMode: null,
    iconFlag: "0",
    isKeepAlive: "1",
    isAdmin: "1",
    isOperator: "0",
  },
];

export default menuList;