/**
 * 菜单码格式要求
 * subsystemCode: 子系统编码
 * hidden：此属性用于是否展示菜单码。有：不展示，默认没有
 * menuName: 菜单名称
 * menuCode: 菜单码
 * menuIcon: 菜单图标 
 * menuHerf: 菜单对应的路由地址
 * menuId: 菜单的唯一标识
 * uppMenuCode 父级菜单
 * menuLevel: 菜单级别   9: 按钮级别菜单
 * 
 * title: 菜单名称  通过 menuName 来获取
 * url: 菜单对应的路由地址  通过 menuHerf 来获取
 * children: 子菜单  通过 uppMenuCode 和 menuCode 进行关联
 */

const menuList = [
  {
    subsystemCode: "cw",
    menuName: "个人开发平台",
    menuIcon: '',
    menuHerf: '',
    menuId: 'cw-personal',
    uppMenuCode: "-",
    menuCode: "cw-personal",
    menuLevel: "0",
  },
  // 基础系统
  {
    subsystemCode: "platform",
    menuName: "基础系统",
    menuIcon: '',
    menuHerf: '',
    menuId: 'platform',
    uppMenuCode: "cw-personal",
    menuCode: "platform",
    menuLevel: "1",
  },
  {
    subsystemCode: "platform",
    menuName: "概览",
    menuIcon: 'shouye_1_',
    menuHerf: "/platform/home",
    menuId: "home",
    uppMenuCode: "platform",
    menuCode: "home",
    menuLevel: "2",
  },
  {
    subsystemCode: "platform",
    menuName: "分析台",
    menuIcon: 'shouye_1_',
    menuHerf: "/platform/home/personal",
    menuId: "personal",
    uppMenuCode: "home",
    menuCode: "personal",
    menuLevel: "3",
  },
  {
    subsystemCode: "platform",
    menuName: "驾驶舱",
    menuIcon: 'shouye_1_',
    menuHerf: "/platform/home/jiashi",
    menuId: "jiashi",
    uppMenuCode: "home",
    menuCode: "jiashi",
    menuLevel: "3",
  },
  // 业务系统
  {
    subsystemCode: "bussiness",
    menuName: "业务系统",
    menuIcon: '',
    menuHerf: '',
    menuId: 'bussiness',
    uppMenuCode: "cw-personal",
    menuCode: "bussiness",
    menuLevel: "1",
  },
  {
    subsystemCode: "bussiness",
    menuName: "概览",
    menuIcon: 'shouye_1_',
    menuHerf: "/platform/home",
    menuId: "home12",
    uppMenuCode: "bussiness",
    menuCode: "home12",
    menuLevel: "2",
  },
  {
    subsystemCode: "bussiness",
    menuName: "工作台",
    menuIcon: 'shouye_1_',
    menuHerf: "/platform/home/personal12",
    menuId: "personal12",
    uppMenuCode: "home12",
    menuCode: "personal12",
    menuLevel: "3",
  },
  // {
  //   uppMenuCode: "bank-transactionBank",
  //   menuCode: "bank-basicBusiness",

  //   isAdmin: "1",
  //   isOperator: "1",

  //   menuHerf: null,
  //   menuIcon: null,
  //   menuId: "bank-basicBusiness",
  //   menuLevel: "1",
  //   menuName: "基础业务",
  //   menuDisplay: null,

  //   isKeepAlive: "0",

  //   folderCode: "basicBusiness",
  //   iconFlag: "0",
  //   menuAllot: "2",
  //   menuChecked: null,
  //   menuVerify: null,
  //   sortNo: "010",
  //   subsystemCode: "basicBusiness",
  //   trCode: null,
  //   workflowAssigneeMode: null,
  //   workflowFlag: "0",
  // },
  // {
  //   menuCode: "bank-orgInfo",
  //   menuName: "机构信息",
  //   uppMenuCode: "bank-orgManage",
  //   menuLevel: "3",
  //   menuAllot: "2",
  //   sortNo: "030",
  //   menuId: "bank-orgInfo",
  //   menuIcon: null,
  //   menuHerf: "/basicBusiness/orgManage/orgInfo",
  //   menuScope: "4001",
  //   menuType: "A",
  //   menuKind: null,
  //   menuVerify: null,
  //   menuDisplay: null,
  //   menuChecked: null,
  //   trCode: null,
  //   subsystemCode: "basicBusiness",
  //   folderCode: "basicBusiness",
  //   workflowFlag: "0",
  //   workflowAssigneeMode: null,
  //   iconFlag: "0",
  //   isKeepAlive: "1",
  //   isAdmin: "1",
  //   isOperator: "1",
  // },
  // {
  //   menuCode: "bank-orgManage",
  //   menuName: "机构管理",
  //   uppMenuCode: "bank-basicBusiness",
  //   menuLevel: "2",
  //   menuAllot: "2",
  //   sortNo: "010",
  //   menuId: "bank-orgManage",
  //   menuIcon: "jigouguanli1",
  //   menuHerf: null,
  //   menuScope: "4001",
  //   menuType: "A",
  //   menuKind: null,
  //   menuVerify: null,
  //   menuDisplay: null,
  //   menuChecked: null,
  //   trCode: null,
  //   subsystemCode: "basicBusiness",
  //   folderCode: "basicBusiness",
  //   workflowFlag: "0",
  //   workflowAssigneeMode: null,
  //   iconFlag: "0",
  //   isKeepAlive: "0",
  //   isAdmin: "1",
  //   isOperator: "1",
  // },
  // {
  //   menuCode: "bank-orgAuth",
  //   menuName: "机构权限",
  //   uppMenuCode: "bank-orgManage",
  //   menuLevel: "3",
  //   menuAllot: "2",
  //   sortNo: "040",
  //   menuId: "bank-orgAuth",
  //   menuIcon: null,
  //   menuHerf: "/basicBusiness/orgManage/orgAuth",
  //   menuScope: "4001",
  //   menuType: "A",
  //   menuKind: null,
  //   menuVerify: null,
  //   menuDisplay: null,
  //   menuChecked: null,
  //   trCode: null,
  //   subsystemCode: "basicBusiness",
  //   folderCode: "basicBusiness",
  //   workflowFlag: "0",
  //   workflowAssigneeMode: null,
  //   iconFlag: "0",
  //   isKeepAlive: "1",
  //   isAdmin: "1",
  //   isOperator: "0",
  // },
  // {
  //   menuCode: "bank-orgRole",
  //   menuName: "机构角色",
  //   uppMenuCode: "bank-orgManage",
  //   menuLevel: "3",
  //   menuAllot: "2",
  //   sortNo: "050",
  //   menuId: "bank-orgRole",
  //   menuIcon: null,
  //   menuHerf: "/basicBusiness/orgManage/orgRole",
  //   menuScope: "4001",
  //   menuType: "A",
  //   menuKind: null,
  //   menuVerify: null,
  //   menuDisplay: null,
  //   menuChecked: null,
  //   trCode: null,
  //   subsystemCode: "basicBusiness",
  //   folderCode: "basicBusiness",
  //   workflowFlag: "0",
  //   workflowAssigneeMode: null,
  //   iconFlag: "0",
  //   isKeepAlive: "1",
  //   isAdmin: "1",
  //   isOperator: "0",
  // },
];

export default menuList;