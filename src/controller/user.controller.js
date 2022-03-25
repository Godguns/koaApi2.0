const jwt = require('jsonwebtoken');
const { createUser,getUerInfo,updateById,addClassToUser,uploadUserAvater} = require('../service/user.service');
const {userRegisterError} = require('../constant/err.type');
const { JWT_SECRET } = require('../config/config.default')

class UserController {
  async register(ctx, next) {
    try {
            // 1. 获取数据
    const { user_name, password, user_phone,user_email,is_admin,user_login_code } = ctx.request.body
    console.log(user_name,password,user_email,is_admin,user_login_code)
    // 2. 操作数据库
    const res = await createUser(user_name, password,user_phone,user_email,is_admin,user_login_code)
    // 3. 返回结果
    ctx.body = {
      code: 0,
      message: '用户注册成功',
      result: {
        id: res.id,
        user_name: res.user_name,
      },
    }
    } catch (error) {
        console.log(error);
        ctx.app.emit('error',userRegisterError,ctx)

    }
  }

  async login(ctx, next) {
    const { user_name } = (ctx.request.body);
    // 1. 获取用户信息(在token的payload中, 记录id, user_name, is_admin)
    try {
      // 从返回结果对象中剔除password属性, 将剩下的属性放到res对象
      const { password, ...res } = await getUerInfo({ user_name })
  
      ctx.body = {
        code: 200,
        message: '用户登录成功',
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
        },
      }
    } catch (err) {
      console.error('用户登录失败', err)
      ctx.body = {
        code: 100001,
        message: '用户登录失败',
      }
    }
  }
  async selectionClass(ctx,next){
    const { user_name,className } = (ctx.request.body);
    console.log(user_name,className)
    try {
      const { password,user_choosed_classList, ...res } = await getUerInfo({ user_name })
      console.log(">>>",className)
      let newArr = [...JSON.parse(user_choosed_classList),className]
      let result = await addClassToUser(user_name,newArr)
      if(result === true){
        ctx.body = {
          code: 200,
          message: '选课成功',
          result: '',
        }
      }else{
        ctx.body = {
          code: 10000,
          message: '选课失败',
          result: '',
        }
      }
      
    } catch (error) {
      console.error('选课系统异常', error)
      ctx.body = {
        code: 100001,
        message: '选课系统异常',
      }
    }
  }
  async loginByMsg(ctx,next){
    const { user_name,user_login_code_req } = ctx.request.body;
    // 1. 获取用户信息(在token的payload中, 记录id, user_name, is_admin)
    try {
      // 从返回结果对象中剔除password属性, 将剩下的属性放到res对象
      const { password,user_login_code, ...res } = await getUerInfo({ user_name })
      console.log(user_login_code_req,user_login_code)
      if(user_login_code_req === user_login_code){
        ctx.body = {
          code: 200,
          message: '用户登录成功',
          result: {
            token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
          },
        }
      }else{
        ctx.body = {
          errorCode:"SMSCODE_ERROR",
          message:'验证码错误',
          result:0
        }
      }

    } catch (err) {
      console.error('用户登录失败', err)
    }
  }
  async changePassword(ctx, next) {
    // 1. 获取数据
    console.log(ctx.state.user)
    const id = ctx.state.user.id
    const oldpassword = ctx.request.body.oldpassword
    const newpassword = (ctx.request.body).password;
    const user_name = (ctx.request.body).user_name;
    const { password, ...res } = await getUerInfo({ user_name })
    if(oldpassword !==  password){
      return ctx.body = {
        code: '10007',
        message: '旧密码不正确',
        result: '',
      }
    }
    // 2. 操作数据库
    if (await updateById({ id, user_name,password:newpassword })) {
      ctx.body = {
        code: 200,
        message: '修改密码成功',
        result: '',
      }
    } else {
      ctx.body = {
        code: '10007',
        message: '修改密码失败',
        result: '',
      }
    }
    // 3. 返回结果
  }
  async updateCodeByphone(ctx, next) {
    // 1. 获取数据
    console.log(ctx.state.user)
    const id = ctx.state.user.id
    const password = (ctx.request.body).password;
    const user_name = (ctx.request.body).user_name;

    // 2. 操作数据库
    if (await updateByCode({ id, user_name,password })) {
      ctx.body = {
        code: 0,
        message: '更新验证码成功',
        result: '',
      }
    } else {
      ctx.body = {
        code: '10007',
        message: '更新验证码失败',
        result: '',
      }
    }
    // 3. 返回结果
  }
  async uploadUserAvater(ctx,next){
    try {
      let { user_name, avater } = ctx.request.body;
      let ret = await uploadUserAvater(user_name,avater);
      ctx.body = {
        code:'200',
        message:'修改用户头像成功'
      }
    } catch (error) {
      console.log(error);
      ctx.app.emit('error',uploadImageError,ctx)
    }
    
  }
}

module.exports = new UserController()
