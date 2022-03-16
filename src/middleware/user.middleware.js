const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default')

const { tokenExpiredError, invalidToken } = require('../constant/err.type')
const { getUerInfo } = require('../service/user.service');
const {userFormateError,userAlreadyExited,userRegisterError,invalidPassword,userLoginError,userDoesNotExist} =  require('../constant/err.type')
const userValidator = async (ctx,next)=>{
    const { user_name,password } = ctx.request.body;
    if(!user_name || !password){
        console.error("用户名或者密码为空",ctx.request.body);
        ctx.app.emit('error',userFormateError,ctx)
        return 
    }
    await next();
}
const verifyUser = async (ctx, next) => {
    const { user_name } = ctx.request.body
    try {
      const res = await getUerInfo({ user_name })
  
      if (res) {
        console.error('用户名已经存在', { user_name })
        ctx.app.emit('error', userAlreadyExited, ctx)
        return
      }
    } catch (err) {
      console.error('获取用户信息错误', err)
      ctx.app.emit('error', userRegisterError, ctx)
      return
    }
  
    await next()
  }
  //密码加密函数   
  const crpytPassword = async (ctx,next)=>{
    const { password } = ctx.request.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password,salt);
    let tempobj = ctx.request.body;
    tempobj.password = hash;
    ctx.request.body = JSON.stringify(tempobj)
    console.log(ctx.request.body)
    await next()
  };
  const verifyLogin = async (ctx, next) => {
    // 1. 判断用户是否存在(不存在:报错)
    const { user_name, password } =ctx.request.body;
  
    try {
      const res = await getUerInfo({ user_name })
  
      if (!res) {
        console.error('用户名不存在', { user_name })
        ctx.app.emit('error', userDoesNotExist, ctx)
        return
      }
      
      //key1=value1&key2=value2
      // 2. 密码是否匹配(不匹配: 报错)
      // if (!bcrypt.compareSync(password, res.password)) {
      if (password !== res.password) {
        ctx.app.emit('error', invalidPassword, ctx)
        return
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', userLoginError, ctx)
    }
  
    await next()
  }
  const auth = async (ctx, next) => {
    const { authorization } = JSON.parse(ctx.request.header)
    const token = authorization.replace('Bearer ', '')
    console.log(token)
  
    try {
      // user中包含了payload的信息(id, user_name, is_admin)
      const user = jwt.verify(token, JWT_SECRET)
      ctx.state.user = user
    } catch (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          console.error('token已过期', err)
          return ctx.app.emit('error', tokenExpiredError, ctx)
        case 'JsonWebTokenError':
          console.error('无效的token', err)
          return ctx.app.emit('error', invalidToken, ctx)
      }
    }
  
    await next()
  }
  const verifyMsg = async (ctx,next) =>{
    const { user_name, password } =(ctx.request.body);
  
    try {
      const res = await getUerInfo({ user_name })
  
      if (!res) {
        console.error('用户名不存在', { user_name })
        ctx.app.emit('error', userDoesNotExist, ctx)
        return
      }
  
      // 2. 验证码是否匹配(不匹配: 报错)
      if (!bcrypt.compareSync(password, res.password)) {
        ctx.app.emit('error', invalidPassword, ctx)
        return
      }
    } catch (err) {
      console.error(">>>")
      return ctx.app.emit('error', userLoginError, ctx)
    }
  
    await next()
  }

//# 验证手机号是否已经发送个验证码
let validate = (phone) => {
  return loginInfo.some(item => item.phone === phone)
}
//# 验证验证码是否一致
let validateCode = (phone, code) => {
  return loginInfo.some(item => (item.phone === phone && item.code == code))
}
module.exports = {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin,
    auth,
    verifyMsg
}