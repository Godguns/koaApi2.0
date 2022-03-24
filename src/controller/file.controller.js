
const jwt = require('jsonwebtoken');
const { getClassList,findClassListByClassName } = require('../service/classlist.service');
const {getclassListError} = require('../constant/err.type');
const { JWT_SECRET } = require('../config/config.default')

class FileController {
  
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

module.exports = new FileController()
