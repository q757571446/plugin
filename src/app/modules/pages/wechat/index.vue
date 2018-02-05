<template>
	<div class="conatiner">
	</div>
</template>

<style>
	.container{
		flex: 1;
	}
</style>

<script>
//github——>https://github.com/doabit/weex-wechat
var wechat = weex.requireModule('wechat');
var stream = weex.requireModule('stream');
//微信注册
wechat.registerApp("appid", function(data) {
  console.log(data, "wx register")
})
//微信三方登录
wechat.login({}, function(data) {
  console.log(data)
})
//微信分享-文字
// share text to timeline (share to session use shareToSession)
wechat.shareToTimeLine({
  type: "text",
  content: "text content"
}, function(data) {
  console.log("text shared", data)
})
//微信分享-图片
// share image to timeline 
wechat.shareToTimeLine({
  type: "image",
  image: imageUrl
}, function(data) {
  console.log("image shared", data)
})
//微信分享-视频
// share video to timeline
wechat.shareToTimeLine({
  type: "video",
  title: 'video title',
  content: "video content",
  image: imageUrl,
  url: 'https://v.qq.com/x/cover/m4cz4v1n0av4a8k/x00223sb1nm.html?new=1'
}, function(data) {
  console.log("video shared", data)
})
//微信分享-网页
// share webpage to timeline
wechat.shareToTimeLine({
  type: "webpage",
  title: 'vebpage title',
  content: "webpage content",
  image: imageUrl,
  url: 'http://github.com/doabit'
}, function(data) {
  console.log("web page shared", data)
})
//微信支付
// wxpay
stream.fetch({
  method: 'POST',
  url: 'http://192.168.1.102:3000/wx_app_pay', //change to your wepay api
  type: "json"
}, function(resData){
  if (resData.ok) {
    var data = resData.data;
    wechat.pay({
        appid: data.appid,
        sign: data.sign,
        timestamp: data.timestamp,
        noncestr: data.noncestr,
        partnerid: data.partnerid,
        prepayid: data.prepayid,
        packageValue:data.package
    }, function(resData){
        console.log(resData)
    })
  } else {
    console.log(resData)
  }
})


</script>