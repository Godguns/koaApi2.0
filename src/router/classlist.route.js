const Router = require('koa-router');
const router = new Router({prefix:'/class'});
const { auth } = require('../middleware/auth.middleware')
const {getClassList,findClassListByClassName,uploadClassCover} = require('../controller/classList.controller');
//课程列表接口
router.get('/list',auth,getClassList);
router.get('/findClasListByClassName',auth,findClassListByClassName);
router.post('/uploadClassCover',auth,uploadClassCover)
module.exports = router;