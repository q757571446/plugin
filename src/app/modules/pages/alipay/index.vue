<template>
  
</template>

<script>
// github-> https://github.com/natjs/weex-nat-alipay
var alipay = weex.requireModule('alipay');
//支付宝支付
alipay.pay({
    // appid: data.appid,
    // sign: data.sign,
    // timestamp: data.timestamp,
    // noncestr: data.noncestr,
    // partnerid: data.partnerid,
    // prepayid: data.prepayid,
    // packageValue:data.package
}, function(resData){
    console.log(resData)
})
//支付宝授权
alipay.auth({
    // 参数
}, function(resData){

})
export default {
  
}
</script>
