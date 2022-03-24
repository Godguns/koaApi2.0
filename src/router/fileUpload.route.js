const Router = require('koa-router');
const router = new Router({prefix:'/files'});
const { auth } = require('../middleware/auth.middleware');

let accessKey = 'JDaBeFjynnIIGUCJ0VMXGPpMiZvNNebuW2Wglrf8'; 
let secretKey = 'vIbbPa-FICKMinOcLDN0npMyMKRCUAhG6c_XB5Mj';
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
let options = {
  scope: "nxhub",  //存储空间的名字，创建的存储空间的时候，自己取的名字
  expires: 7200
};
let putPolicy = new qiniu.rs.PutPolicy(options);
let uploadToken=putPolicy.uploadToken(mac);
let imageUpload = function(req, res, next) {
  res.json({
      putPolicy:putPolicy,
      uploadToken:uploadToken
  })
}

//获取七牛云token
router.get('/token',(req,res)=>{
  var body=req.body;
  const accesskey='JDaBeFjynnIIGUCJ0VMXGPpMiZvNNebuW2Wglrf8';
  const ssk='vIbbPa-FICKMinOcLDN0npMyMKRCUAhG6c_XB5Mj';
  const bucket='nxhub';
  let mac=new qiniu.auth.digest.Mac(accesskey,ssk);
  let options={
    scope:bucket,
     expires:360*24
  };
  let putPolicy=new qiniu.rs.PutPolicy(options);
  let uploadToken=putPolicy.uploadToken(mac);
  res.json({
    "token":uploadToken
  })

})

module.exports = router;