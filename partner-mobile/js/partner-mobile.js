$(document).ready(function () {
	var mySwiper = new Swiper ('.swiper-container', {
	    direction: 'vertical',
	    loop: false,
	    pagination: '.swiper-pagination',
	    onSlideChangeEnd: function(swiper){
	    	var key = swiper.activeIndex + 1;
            $('.slide'+key).addClass("animation").css("visibility","visible");
    		remv(key+1);
    		remv(key-1);
    	}
  	})
  	// mySwiper.slideTo(0);

  	function remv(key){
  		$('.slide'+key).removeClass("animation").css("visibility","hidden");
  	}

    //报名
  	$(".submit input").on('click',function(){
        $(".board,.popUp").show();
  	})
    $(".close").on('click',function(){
        $(".board,.popUp").hide();
    })

    // 初始化
    $(window).on("load",function(){
        $('.slide1').addClass("animation").css("visibility","visible");
        $('.slide2').removeClass("animation").css("visibility","hidden");
    })

    // PC or 横屏提示
    $(window).on("load resize",function(){

    	// console.log("resize or load");
    	var h = document.documentElement.clientHeight;
    	var w = document.documentElement.clientWidth;
    	if(h/w<1.32){
    		$(".judge").css({"height":h,"line-height":h+"px"}).show();
    	}
    	else{
    		$(".judge").hide();
    	}
    })
})