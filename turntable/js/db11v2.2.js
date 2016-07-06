var turnplate={
	restaraunts:[],				//奖品名称
	colors:[],					//区块对应背景颜色
	outsideRadius:200,			//外圆半径
	textRadius:155,				//奖品位置距离圆心的距离
	insideRadius:62,			//内圆的半径
	startAngle:0,				//开始角度
	bRotate:false,   			//false:停止;ture:旋转
	ids: []						//奖品图标id
};

$(document).ready(function(){

	//奖品,奖品区域背景,奖品图标id
	turnplate.restaraunts = ["20元代金券", "iphone6s", "谢谢参与", "50元代金券", "30元代金券", "小保养", "谢谢参与", "100元代金券"];
	turnplate.colors = ["#C5D4F0", "#CCECBA", "#DDDADA", "#C8AFFC","#C5D4F0", "#CCECBA", "#DDDADA", "#C8AFFC"];
	turnplate.ids = ["q20","six",,"q50","q30","bao",,"q100"];

	//旋转转盘 item:奖品位置; txt：提示语;
	var rotateFn = function (item, txt){
		// 角度
		var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length*2));
		if(angles<270){angles = 270 - angles;}
		else{angles = 360 - angles + 270;}

		$('#wheelcanvas').stopRotate();
		$('#wheelcanvas').rotate({
			angle:0,
			animateTo:angles+1800,
			duration:4000,
			callback:function (){
				addliste();//锁定
				var app = false;
				if(item==3||item==7){
					$(".tan1,.couple").hide();$(".tan0,.uncouple").show();
					$(".tip_g1").html("很遗憾您没有中奖，请再接再厉。");
					$(".share").html("分享给好友增加中奖几率");
					if(app){$(".down").hide();}
					else{$(".down").show();}
				}
				else{
					$(".tan0,.uncouple").hide();$(".tan1,.couple").show();
					$(".tip_g1").html("恭喜抽中"+txt+"，赶快去看看。");
					$(".share").show().html("分享");
					if(app){$(".down").hide();}
					else{$(".down").show();}
				}
				$(".board,.popUp,.close0,.close").show();
				resetPop();
				turnplate.bRotate = !turnplate.bRotate;
			}
		});
	};

	$(window).resize(function(){
		resetPop();
	});

	//弹窗重置
	function resetPop(){
		var th = parseInt($(".tanbg").css("height"));
		$(".popUp,.tan").css("height",th+"px");
		$(".tan .pbtns").css("top",th*0.65+"px");
	}
	//指针加载与绘制
	function drawBeauty(beauty){
		var mycv = document.getElementById("go");
		var myctx = mycv.getContext("2d");
		myctx.drawImage(beauty, 160.5, 38);//位置
	}
	function load(){
		var beauty = new Image();
		beauty.src = "images/start_100_y.png";
		if(beauty.complete){drawBeauty(beauty);}
		else{
		    beauty.onload = function(){drawBeauty(beauty);};
		    beauty.onerror = function(){window.alert('网络超时，请检查您的网络设置！');};
		};
	}
	if (document.all) {window.attachEvent('onload', load);}
	else { window.addEventListener('load', load, false);}

	$(".reg input,.pointer").click(function(){
		var mobilePhone = document.getElementById("mobileAccount").value;
		if(mobilePhone==""  || mobilePhone.length != 11 || !checkPhone(mobilePhone)){
			$(".mini_bd").show();
			$(".mini_bd").html("请输入正确的手机号");
			$(".mini_bd").delay(300);
			$(".mini_bd").fadeOut(700);
		}
		else{
			//防止多次点击
			if(turnplate.bRotate)return;
			turnplate.bRotate = !turnplate.bRotate;
			//获取随机数(奖品个数范围内)
			var item = rnd(1,turnplate.restaraunts.length);
			//奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
			rotateFn(item, turnplate.restaraunts[item-1]);
			console.log(item);
		}
	});

	//分享及关闭
	$(".share").click(function(){$(".arrow").show();});//微信内(ios中跳转下载)
	$(".popUp .tan .close,.board").click(function(){$(".popUp,.board,.arrow").hide();remliste();});//解锁
	//活动规则
	$(".rule").click(function(){$(".board,.rulePop").show();});
	$(".ruleClose,.board").click(function(){$(".board,.rulePop").hide();});
});

function rnd(n, m){
	var random = Math.floor(Math.random()*(m-n+1)+n);
	return random;
}

//页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
window.onload=function(){
	drawRouletteWheel();
};

function drawRouletteWheel() {
    var canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {
	    //根据奖品个数计算圆周角度
		var arc = Math.PI / (turnplate.restaraunts.length/2);
		var ctx = canvas.getContext("2d");
		//在给定矩形内清空一个矩形
		ctx.clearRect(0,0,422,422);
		//strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
		ctx.strokeStyle = "#FFBE04";
		//font 属性设置或返回画布上文本内容的当前字体属性
		ctx.font = '16px Microsoft YaHei';
		for(var i = 0; i < turnplate.restaraunts.length; i++) {
			var angle = turnplate.startAngle + i * arc;
			ctx.fillStyle = turnplate.colors[i];
			ctx.beginPath();
			//arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
			ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
			ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
			ctx.stroke();
			ctx.fill();
			//锁画布(为了保存之前的画布状态)
			ctx.save();

			//----绘制奖品开始----
			ctx.fillStyle = "#E5302F";
			var text = turnplate.restaraunts[i];
			var line_height = 17;
			//translate方法重新映射画布上的 (0,0) 位置
			ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);

			//rotate方法旋转当前的绘图
			ctx.rotate(angle + arc / 2 + Math.PI / 2);

			/** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
			if(text.indexOf("100") >= 0 && text.length>6){//奖品名称长度超过一定范围（此处针对100元代金券）
				text = text.substring(0,6)+"||"+text.substring(6);
				var texts = text.split("||");
				for(var j = 0; j<texts.length; j++){
					ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
				}
			}
			else{
				//在画布上绘制填色的文本。文本的默认颜色是黑色
				//measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
				ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
			}

			//添加对应图标
			var imgLoad = $("#"+turnplate.ids[i]).get(0);
			if(imgLoad){
				switch(turnplate.ids[i]){
					case "six":;
					case "bao": 
						imgLoad.onload=function(){ctx.drawImage(imgLoad,-33,10);};
						ctx.drawImage(imgLoad,-33,10);
						break;
					default:
						imgLoad.onload=function(){ctx.drawImage(imgLoad,-33,10);};
						ctx.drawImage(imgLoad,-32,30);
				}
			}
			//把当前画布返回（调整）到上一个save()状态之前
			ctx.restore();
			//----绘制奖品结束----
		}
    }
}//绘制结束

//验证电话号码
function checkPhone(s) {
	var regu = /^13[0-9]{1}[0-9]{8}$|15[012356789]{1}[0-9]{8}$|18[0123456789]{1}[0-9]{8}$|14[57]{1}[0-9]{8}$|17[0678]{1}[0-9]{8}$/;
	if (regu.test(s)) {
		return true;
	} else {
		return false;
	}
}

var move = function(e) {
	e.preventDefault && e.preventDefault();
	e.returnValue = false;
	e.stopPropagation && e.stopPropagation();
	return false;
}
function noscroll(){
	document.documentElement.style.overflow = 'hidden';
	document.body.style.overflow = 'hidden';
}
//取消禁止滚动
function remliste() {
	window.removeEventListener('touchmove', move);
}
//禁止滚动
function addliste() {
	window.addEventListener('touchmove', move);
}