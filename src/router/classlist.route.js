const Router = require('koa-router');
const router = new Router({prefix:'/class'});
const { auth } = require('../middleware/auth.middleware')
const {getClassList} = require('../controller/classList.controller');
//注册接口
router.get('/list',auth,getClassList);
module.exports = router;