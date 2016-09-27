$(document).ready(function () {
	var mySwiper = new Swiper ('.swiper-container', {
	    direction: 'vertical',
	    loop: true,
	    pagination: '.swiper-pagination',
	    onSlideChangeEnd: function(swiper){
	    	var key = swiper.activeIndex;
	    	// console.log(key);
	    	if(key <= 4 || key == 10){
	    		$('.slide'+key%9).addClass("animation").css("visibility","visible");	    		
	    		// $('.slide'+key-1).removeClass("animation").css("visibility","hidden");
	    		remv(key+1);
	    		remv(key-1);
	    		// console.log("v"+key);
	    	}
	    	if(key > 3 && key <= 8){
	    		verticalAuto($('.slide'+key),key);
	    		
	    	}
	    	if(key > 2 && key <= 9){
	    		re(key+1);
	    		re(key-1);
	    	}
    	}
  	})
  	// mySwiper.slideTo(9);

  	function remv(key){
  		if(key < 4 && key > 0){
  			$('.slide'+key).removeClass("animation").css("visibility","hidden");
  			// console.log("re"+key);
  		}
  	}

  	function verticalAuto(obj,num){
  		var count = 0;
        var h = document.documentElement.clientHeight;
        if(num == 4 || num == 5){
        	h *= 0.86;
        }
        else if(num == 7){
            h *= 1.14;
        }
  		for(var i=0;i<obj.get(0).children.length;i++){
  			count = obj.find("img").eq(i).get(0).offsetHeight + count;
  		}
  		var marginTop = (h * 0.95 - count)/2;
  		if(num == 4 || num == 8){
  			obj.find("img").eq(0).animate({"margin-top":marginTop+50+"px"},300).animate({"margin-top":marginTop+"px"},300);
  			obj.animate({"opacity":1},700);
  		}
  		if(num == 5 || num == 6 || num == 7){
  			obj.find("img").eq(0).animate({"margin-top":marginTop+"px"},300);
  			obj.animate({"opacity":1},300);
  			obj.find("img").eq(1).addClass("m567-left").css("visibility","visible");
  			obj.find("img").eq(2).addClass("m567-right").css("visibility","visible");
  		}
		if(num >=4 && num < 9){
			r567(num+1);
			r567(num-1);
		}

  		return marginTop;
  	}
  	function re(key){
  		if(key > 3 && key <= 8){
	  		$(".slide"+key).css("opacity",0);
	  		$(".slide"+key).find("img").eq(0).css("margin-top",0);
	  	}
  	}

  	function r567(key){
  		if(key>=5&&key<8){
  			$(".slide"+key+" img").eq(1).removeClass("m567-left").css("visibility","hidden");
  			$(".slide"+key+" img").eq(2).removeClass("m567-right").css("visibility","hidden");
  		}
  	}
})