
const jwt = require('jsonwebtoken');
const { getClassList } = require('../service/classlist.service');
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
                message: '课程列表返回成功',
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
}

module.exports = new UserController()
