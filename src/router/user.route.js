const Router = require('koa-router');
const router = new Router({prefix:'/users'});
const { userValidator,verifyUser,crpytPassword,verifyLogin,verifyMsg} = require('../middleware/user.middleware');
const { auth } = require('../middleware/auth.middleware')
const {register,login,loginByMsg,changePassword,updateCodeByphone} = require('../controller/user.controller');
const { sendEmail} = require('../middleware/email.middleware');
const { sendsmsMessage } = require("../middleware/phone.middleware");
//注册接口
router.post('/register',userValidator,verifyUser,register);
//登陆接口
router.post('/login',userValidator,verifyLogin,login);
// 修改密码接口
router.post('/changepassword', auth, changePassword);
//发送邮件
router.post('/sendemail',sendEmail);
//发送短信验证码
router.post('/sendmsg',sendsmsMessage);
//短信验证码登陆
router.post('/loginByMsg',userValidator,verifyLogin,loginByMsg)
module.exports = router;