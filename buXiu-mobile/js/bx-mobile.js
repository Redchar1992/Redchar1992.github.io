$(document).ready(function () {
	var mySwiper = new Swiper ('.swiper-container', {
	    direction: 'vertical',
	    loop: true,
	    pagination: '.swiper-pagination'
  	})
  	mySwiper.slideTo(9);


  	var h = document.documentElement.clientHeight;

  	console.log($(".slide-8-1").get(0).offsetHeight);
  	console.log($(".slide-8-2").get(0).offsetHeight);
  	function verticalAuto(obj){
  		var count = 0;
  		for(var i=0;i<obj.get(0).children.length;i++){
  			count = obj.find("img").eq(i).get(0).offsetHeight + count;
  		}
  		var marginTop = (h-count)/2;
  		obj.find("img").eq(0).css("margin-top",marginTop+"px");
  		return marginTop;
  	}
  	var marginTop = verticalAuto($(".slide8"));
  	console.log(marginTop);
  	// var 
})
		  	