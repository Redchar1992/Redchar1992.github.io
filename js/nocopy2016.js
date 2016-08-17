$(document).ready(function(){
	document.oncontextmenu=function (){ return false;}
})
$(document).ready(function(){
	 document.oncontextmenu = function () { return false; }
        document.onkeydown = function (e) {
            var currKey = 0, evt = e || window.event;
            currKey = evt.keyCode || evt.which || evt.charCode;
            if (currKey == 123) {
                return false;
            }
        };
})
