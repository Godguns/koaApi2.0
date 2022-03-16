const Koa = require('koa');
const KoaBody = require('koa-body');
const useroute = require('../router/user.route');
const errhandle = require('../app/error.handle');
const app = new Koa();
app.use(KoaBody());//中间件调用在路由注册之前
app.use(useroute.routes());
app.on('error',errhandle)
module.exports = app;