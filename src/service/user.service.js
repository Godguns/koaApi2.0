const User = require('../model/user.model')
class UserService {
    async createUser(user_name, password,user_phone,user_email,is_admin,user_login_code) {
        const res = await User.create({ user_name, password ,user_phone,user_email,is_admin,user_login_code})
        // console.log(res)
        return res.dataValues
    }
    async getUerInfo({ id, user_name, password }) {
        const whereOpt = {}
        id && Object.assign(whereOpt, { id })
        user_name && Object.assign(whereOpt, { user_name })
        password && Object.assign(whereOpt, { password })
        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password','user_login_code'],
            where: whereOpt,
        })
        console.log(res)
        return res ? res.dataValues : null
    }
    async updateById({ id, user_name, password }) {
        const whereOpt = { id }
        const newUser = {}
    
        user_name && Object.assign(newUser, { user_name })
        password && Object.assign(newUser, { password })
    
        const res = await User.update(newUser, { where: whereOpt })
        console.log(res)
        return res[0] > 0 ? true : false
      }

      async updateCodeByphone(obj) {
          let userphone = obj.userphone
          let code = obj.code
        const whereOpt = { user_phone: userphone }
        const newUser = {}
        // user_name && Object.assign(newUser, { user_name })
        // password && Object.assign(newUser, { password })
        code&& Object.assign(newUser,{user_login_code:code})
        const res = await User.update(newUser, { where: whereOpt })
        console.log(res)
        return res[0] > 0 ? true : false
      }
}
module.exports = new UserService()