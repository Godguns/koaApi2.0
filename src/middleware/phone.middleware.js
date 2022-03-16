const tencentcloud = require("tencentcloud-sdk-nodejs")
const {secretId,secretKey} = require('../config/config.default')
const { createUser,getUerInfo,updateCodeByphone} = require('../service/user.service');
async function sendsmsMessage(ctx,next){
  const { user_phone } = ctx.request.body
    // 导入对应产品模块的client models。
const smsClient = tencentcloud.sms.v20210111.Client
//统一错误处理 
  //# 生成随机四位数，模拟验证码
  function rander(max, min) {
    return Math.floor(Math.random() * (max - min)) + min
  }
/* 实例化要请求产品(以sms为例)的client对象 */
const client = new smsClient({
  credential: {
    secretId: secretId,
    secretKey: secretKey,
  },
  region: "ap-guangzhou",
  profile: {
    signMethod: "HmacSHA256",
    httpProfile: {
      reqMethod: "POST",
      reqTimeout: 30,
      endpoint: "sms.tencentcloudapi.com"
    },
  },
})
let code = rander(1000,9999);
let userphone = user_phone;
//console.log(userphone,code)
await updateCodeByphone({userphone,code})
//"+8613711112222","+8613100086657","+8613223549020","+8615135190491","+8615034579711",
const params = {
  SmsSdkAppId: "1400601313",
  SignName: "NXpixiv事务",
  ExtendCode: "",
  SenderId: "",
  SessionContext: "",
  PhoneNumberSet: [`+86${userphone}`],
  TemplateId: "1211630",
  TemplateParamSet: [code],
}
client.SendSms(params, function (err, response) {
  if (err) {
    console.log(err)
    return
  }
  console.log(response)

})
}
module.exports = {
    sendsmsMessage
}