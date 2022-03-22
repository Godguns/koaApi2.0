
const jwt = require('jsonwebtoken');
const { getClassList,findClassListByClassName } = require('../service/classlist.service');
const {getclassListError} = require('../constant/err.type');
const { JWT_SECRET } = require('../config/config.default')

class UserController {
     getClassList = async (ctx,next)=>{
        const { year,season,current } = ctx.request.query
        console.log(ctx.request.query)
        try {
          const res = await getClassList(year,season,current)
            console.log("课程列表",res)
          if (res.length >= 0) {
            console.log('课程列表', { res })
            ctx.body = {
                code: 200,
                message: 'success',
                result: {
                  class_list:res
                }
              }
            return
          }
        } catch (err) {
          console.error('获取课程信息错误', err)
          ctx.app.emit('error', getclassListError, ctx)
          return
        }
      
        await next()
    }
    findClassListByClassName = async (ctx,next)=>{
        const { className } = ctx.request.query
        try {
            const res = await findClassListByClassName( className );
            console.log("根据课程名获取课程信息",res)
            ctx.body = {
                code: 200,
                message: 'success',
                result: {
                  class_list:res
                }
              }
        } catch (error) {
            console.error('根据课程名获取课程信息错误', error)
            ctx.app.emit('error', getclassListError, ctx)
          return
        }
    }
}

module.exports = new UserController()
