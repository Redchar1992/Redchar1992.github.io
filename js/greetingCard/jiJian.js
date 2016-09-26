var dropData;//裁剪的图片数据
$(function () {

  'use strict';

  var console = window.console || { log: function () {} };
  var $image = $('#image');
  var $download = $('#download');
  var $dataX = $('#dataX');
  var $dataY = $('#dataY');
  var $dataHeight = $('#dataHeight');
  var $dataWidth = $('#dataWidth');
  var $dataRotate = $('#dataRotate');
  var $dataScaleX = $('#dataScaleX');
  var $dataScaleY = $('#dataScaleY');

  //2016.1.8
  var faces = [[130,118],[225,222],[324,377],[116,117],[152,188],[278,226],[1,1],[274,242],[185,186],[73,72]];

  var options = {
    aspectRatio: faces[0][0] / faces[0][1],//第一张脸的比例，需判断
    preview: '.img-preview',
    crop: function (e) {
      $dataX.val(Math.round(e.x));
      $dataY.val(Math.round(e.y));
      $dataHeight.val(Math.round(e.height));
      $dataWidth.val(Math.round(e.width));
      $dataRotate.val(e.rotate);
      $dataScaleX.val(e.scaleX);
      $dataScaleY.val(e.scaleY);
    }
  };

  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();


  // Cropper
  $image.on({
    'build.cropper': function (e) {
      console.log(e.type);
    },
    'built.cropper': function (e) {
      console.log(e.type);
    },
    'cropstart.cropper': function (e) {
    	if( e.action == 'se'||e.action == 'nw'||e.action == 'crop'||e.action == 'sw'||e.action == 'ne'||e.action == 'n'||e.action == 'e'||e.action == 'w'||e.action == 's'){
    		console.log('get it');
    		return false;
    	}
    	else{
    		console.log(e.type, e.action);
    	}
    },
    'cropmove.cropper': function (e) {
        if( e.action == 'se'||e.action == 'nw'||e.action == 'crop'||e.action == 'sw'||e.action == 'ne'||e.action == 'n'||e.action == 'e'||e.action == 'w'||e.action == 's'){
    		console.log('get it');
    		return false;
    	}
    	else{
    		console.log(e.type, e.action);
    	}
    },
    'cropend.cropper': function (e) {
        if( e.action == 'se'||e.action == 'nw'){
    		console.log('get it');
    		return false;
    	}
    	else{
    		console.log(e.type, e.action);
    	}
    },
    'crop.cropper': function (e) {
    	if(e.type = 'crop'){
    		console.log('get it');
    		return false;
    	}
    	else{
    		console.log(e.type, e.action);
    		console.log(e.type, e.x, e.y, e.width, e.height, e.rotate, e.scaleX, e.scaleY);
    	}
    },
    'zoom.cropper': function (e) {
      console.log(e.type, e.ratio);
    }
  }).cropper(options);


  // Buttons
  if (!$.isFunction(document.createElement('canvas').getContext)) {
    $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
  }

  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    $('button[data-method="rotate"]').prop('disabled', true);
    $('button[data-method="scale"]').prop('disabled', true);
  }


  // Download
  if (typeof $download[0].download === 'undefined') {
    $download.addClass('disabled');
  }


  // Options
  $('.docs-toggles').on('change', 'input', function () {
    var $this = $(this);
    var name = $this.attr('name');
    var type = $this.prop('type');
    var cropBoxData;
    var canvasData;

    if (!$image.data('cropper')) {
      return;
    }

    if (type === 'checkbox') {
      options[name] = $this.prop('checked');
      cropBoxData = $image.cropper('getCropBoxData');
      canvasData = $image.cropper('getCanvasData');

      options.built = function () {
        $image.cropper('setCropBoxData', cropBoxData);
        $image.cropper('setCanvasData', canvasData);
      };
    } else if (type === 'radio') {
      options[name] = $this.val();
    }

    $image.cropper('destroy').cropper(options);
  });


  // Methods
  $('.docs-buttons').on('click', '[data-method]', function () {
    var $this = $(this);
    var data = $this.data();
    var $target;
    var result;

    if ($this.prop('disabled') || $this.hasClass('disabled')) {
      return;
    }

    if ($image.data('cropper') && data.method) {
      data = $.extend({}, data); // Clone a new one

      if (typeof data.target !== 'undefined') {
        $target = $(data.target);

        if (typeof data.option === 'undefined') {
          try {
            data.option = JSON.parse($target.val());
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      result = $image.cropper(data.method, data.option, data.secondOption);

      switch (data.method) {
        case 'scaleX':
        case 'scaleY':
          $(this).data('option', -data.option);
          break;

        case 'getCroppedCanvas':
          if (result) {

            // Bootstrap's Modal
            $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

            if (!$download.hasClass('disabled')) {
            	console.log("裁好了");
            	dropData = result.toDataURL();//----------------------------------裁剪图片的数据
//          	alert(dropData);
//            $download.attr('href', result.toDataURL());
            }
          }

          break;
      }

      if ($.isPlainObject(result) && $target) {
        try {
          $target.val(JSON.stringify(result));
        } catch (e) {
          console.log(e.message);
        }
      }

    }
  });



  // Import image
  var $inputImage = $('#inputImage');
  var URL = window.URL || window.webkitURL;
  var blobURL;

  if (URL) {
    $inputImage.change(function () {
      var files = this.files;
      var file;

      if (!$image.data('cropper')) {
        return;
      }

      if (files && files.length) {
        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          blobURL = URL.createObjectURL(file);
          $image.one('built.cropper', function () {

            // Revoke when load complete
            URL.revokeObjectURL(blobURL);
          }).cropper('reset').cropper('replace', blobURL);
          $inputImage.val('');
        } else {
          window.alert('Please choose an image file.');
        }
      }
    });
  } else {
    $inputImage.prop('disabled', true).parent().addClass('disabled');
  }
  
  //2016年2月29日
  //查看当前是第几个模板
	var lct = location.search.substr(1);
  //选定后跳转
//	alert(numList[lct-1]);
	var numList = ["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten"];
  $("#download").click(function(){
		console.log(dropData);
		window.location.href = 'ka'+numList[lct-1]+'.html?tu='+dropData;
	})

});
