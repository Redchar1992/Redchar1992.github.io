$(document).ready(function () {
	var mySwiper = new Swiper ('.swiper-container', {
	    direction: 'vertical',
	    loop: true,
	    pagination: '.swiper-pagination',
	    onSlideChangeEnd: function(swiper){
      		switch(swiper.activeIndex){
      			case 4:
                    verticalAuto($(".slide4"),4);
                    break;
      			case 5:
                    verticalAuto($(".slide5"),5);
                    break;
                case 6:
                    verticalAuto($(".slide6"));
                    break;
                case 7:
                    verticalAuto($(".slide7"),7);
                    break;
      			case 8:
      			    verticalAuto($(".slide8"));
  				    break;
  				default:
  				    console.log(swiper.activeIndex);
  				    break;
      		}
    	}
  	})
  	// mySwiper.slideTo(9);


  	// var h = document.documentElement.clientHeight;

  	// console.log($(".slide-8-1").get(0).offsetHeight);
  	// console.log($(".slide-8-2").get(0).offsetHeight);
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
  		obj.find("img").eq(0).css("margin-top",marginTop+"px");
  		return marginTop;
  	}

})