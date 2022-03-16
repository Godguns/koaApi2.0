const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model zd_user -> 表 zd_users)
const User = seq.define('nx_user', {
  // id 会被sequelize自动创建, 管理
  user_name: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    comment: '用户名, 唯一',
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: true,
    comment: '密码',
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: 0,
    comment: '是否为管理员, 0: 不是管理员(默认); 1: 是管理员',
  },
  user_phone:{
      type:DataTypes.STRING,
      allowNull:true,
      comment:"手机号码"
  },
  user_email:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"电子邮箱"
  },
  user_login_code:{
    type:DataTypes.STRING,
    allowNull:true,
    comment:"验证码",
    defaultValue: 0
  }

})

//强制同步数据库(创建数据表)
 //User.sync({ force: true })

module.exports = User
