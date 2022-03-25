const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model zd_user -> 表 zd_users)
const ClassList = seq.define('nx_classlist', {
  // id 会被sequelize自动创建, 管理
  className: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
    comment: '课程名称',
    defaultValue: '计算机网络'
  },
  classCover:{
    type: DataTypes.STRING,
    allowNull: true,
    comment: '课程封面',
    defaultValue: ''
  },
  classTeacher: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '任课教师',
    defaultValue: '杨嘉豪'
  },
  classTime: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '0',
    comment: '课时',
    defaultValue: '60'
  },
  totalEnroiment:{
      type:DataTypes.INTEGER,
      allowNull:true,
      comment:"总招收人数",
      defaultValue: 100
  },
  enroimented:{
    type:DataTypes.INTEGER,
    allowNull:true,
    comment:"已招收人数",
    defaultValue: 10
  },
  startTime:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"开课时间",
    defaultValue: '2012:12:10'
  },
  classType:{
    type:DataTypes.INTEGER,
    allowNull:true,
    comment:"课程类别",
    defaultValue: 1
  },
  year:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"年份",
    defaultValue: '2021'
  },
  season:{
    type:DataTypes.INTEGER,
    allowNull:true,
    comment:"学期",
    defaultValue: 1
  },
  credits:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"学分",
    defaultValue: '1'
  },
  isMust:{
    type:DataTypes.INTEGER,
    allowNull:true,
    comment:"是否必修",
    defaultValue: 1
  },
  classStatus:{
    type:DataTypes.INTEGER,
    allowNull:true,
    comment:"课程状态",
    defaultValue: 1
  },
  classInfo:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"课程介绍",
    defaultValue: '通过本课程的学习使学生全面了解计算机网络的基本概念、基本知识和构建计算机网络的物理设备;掌握中小型局域网的组网技术，并能够独立组建、配置、管理和维护中小型的局域网;了解无线局域网、广域网的基本知识，并了解Internet的几种接入方式;提高学生对计算机网络基本原理和实际网络的关系的深刻理解。提高学生的计算机网络应用水平，并使学生了解目前计算机网络发展方向和新技术的应用，奠定学生对未来计算机网络开发和应用基础。'
  },
  classTeacherInfo:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"任课老师介绍",
    defaultValue: '张明华'
  },
  teacherInfo:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"老师详情",
    defaultValue: '张明华，张老师，毕业于清华大学计算机系，硕士学位，前阿里巴巴cto，擅长各种服务端技术，对计算机网络课程有着相当深的理解与思考'
  },
  totalGradeCount:{
    type:DataTypes.INTEGER,
    allowNull:true,
    comment:"总分",
    defaultValue: 0
  },
  totalPeasonCount:{
    type:DataTypes.INTEGER,
    allowNull:true,
    comment:"总人数",
    defaultValue: 0
  },
  openClassTime:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"开课时间",
    defaultValue: '2022-03-01'
  },
  openClassPosition:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"开课地点",
    defaultValue: '教学楼一号楼601'
  }


})

//强制同步数据库(创建数据表)
//ClassList.sync({ force: true })

module.exports = ClassList
