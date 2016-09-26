//音乐
var musicflag=false;
var audio = document.getElementById('music');
$('body').bind('click tap swipeUp',function(){
   if(musicflag){ return}
   audio.play();
   musicflag=true;
});

window.onload=function(){
   document.getElementById('music').play();
}

function music(){
    if($('.music').hasClass('roate')){//关闭
	   $('.music').removeClass('roate');
	   //theBG.stop();
	   document.getElementById('music').pause();
	}else{//开始
	   $('.music').addClass('roate');
	  // theBG.play();
	  document.getElementById('music').play();
	}
}

//2016年1月21日09:59:31
$(".board").click(function(){
	$(".board,.tipFirst").hide();
})
//加载完成时出现提示信息
document.onreadystatechange = subSomething;//当页面加载状态改变的时候
function subSomething()
{
	if(document.readyState == "complete") //若页面加载完成
//	$(".tipFirst,.board").fadeIn(0).delay(2500).fadeOut(500);
	if(url == ""){//判断是否首次进入
		$(".tipFirst,.board").show();
	}
}

//2016年1月26日16:07:08
//表情筛除
