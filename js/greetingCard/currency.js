//取屏宽
var w = document.documentElement.clientWidth || document.body.clientWidth;
//查看当前是第几个模板
var templet;
var pathName = window.location.pathname;
var numList = ["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten"];
var eng;//当前模板对应的英文名称
for(var j=0;j<numList.length;j++){
	if(pathName.indexOf(numList[j])!=-1){
		templet = j+1;
//		eng = numList[templet-1];
	}
}

//上传图片或拍照
$(".tiao"+templet).click(function(){
	window.location.href = 'main.html?'+templet;
})
//文字编辑失焦
$(".kt"+templet).blur(function(){
	$(this).css({"background":"none","opacity":"1"});
})
//文字编辑聚焦
$(".kt"+templet).focus(function(){
	if(w==320){
		$(this).css({"background":"url(images/line"+templet+".png) 0 25px no-repeat","background-size":"100%","opacity":"0.8"});
	}
	else{
		$(this).css({"background":"url(images/line"+templet+".png) 0 32px no-repeat","background-size":"100%","opacity":"0.8"});
	}
})

//完成
$(".ok").click(function(){
	$(".tan,.board").show();
})
//发送贺卡
$(".send").click(function(){
	$(".arrow").show();
	$(".hongBao,.yeFa").show();
	$(".ok").hide();
})
//退出
$(".esc,.board").click(function(){
	$(".tan,.board,.arrow").hide();
})
//-------------------------------------------------------红包开始
//红包港澳游
$(".hongBao,.yeFa").hide();//初始需隐藏
//$(".hongBao,.yeFa").show();
$(".hongBao").click(function(){
	$(".gang,.board").show();
})
$(".board").click(function(){
	$(".gang,.board,.arrow").hide();
})
//点击"我也要发"时跳转首页
$(".yeFa").click(function(){
	window.location.href = 'index.html';
})
//提交后抽奖
$(".gang .reg a").click(function(){
	// 手机号错误
	var mobilePhone = document.getElementById("mobileAccount").value;
	if(mobilePhone==""  || mobilePhone.length != 11 || !checkPhone(mobilePhone)){
		$(".mini_bd").show();
		$(".mini_bd").html("请输入正确的手机号");
		$(".mini_bd").delay(300);
		$(".mini_bd").fadeOut(700);
	}
	else{
		alert("thank you for test!");
		$(".gang,.board,.arrow").hide();
	}
});
//验证电话号码
function checkPhone(s) {
	var regu = /^13[0-9]{1}[0-9]{8}$|15[012356789]{1}[0-9]{8}$|18[0123456789]{1}[0-9]{8}$|14[57]{1}[0-9]{8}$|17[0678]{1}[0-9]{8}$/;
	if (regu.test(s)) {return true;}
	else {return false;}
}
//-------------------------------------------------------红包结束

//换图
var url = location.search;
var Request = new Object();
if(url.indexOf("?")!=-1)
{
　　var str = url.substr(1)　//去掉?号
　　strs= str.split("&");
　　for(var j=0;j<strs.length;j++)
　　{
　　 　 Request[strs[j].split("=")[0]]=unescape(strs[ j].split("=")[1]);
　　}
	$(".board"+templet+" img").attr("src",Request["tu"]); 
}
