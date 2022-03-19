const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model zd_user -> 表 zd_users)
const ClassList = seq.define('nx_classlist', {
  // id 会被sequelize自动创建, 管理
  className: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    comment: '课程名称',
    defaultValue: '计算机网络'
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
    defaultValue: 0,
    comment: '课时',
    defaultValue: '60'
  },
  totalEnroiment:{
      type:DataTypes.STRING,
      allowNull:true,
      comment:"总招收人数",
      defaultValue: '100'
  },
  enroimented:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"已招收人数",
    defaultValue: '10'
  },
  startTime:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"开课时间",
    defaultValue: '2012:12:10'
  },
  classType:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"课程类别",
    defaultValue: '1'
  },
  year:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"年份",
    defaultValue: '2021'
  },
  season:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"学期",
    defaultValue: '1'
  },
  credits:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"学分",
    defaultValue: '1'
  },
  isMust:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"是否必修",
    defaultValue: '1'
  }

})

//强制同步数据库(创建数据表)
//ClassList.sync({ force: true })

module.exports = ClassList
