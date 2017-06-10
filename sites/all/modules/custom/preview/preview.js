(function($) {
  Drupal.behaviors.preview = {
    attach: function (context, settings) {
    	jQuery('img.lazy').lazyload({effect : "fadeIn"});
    	var cfname = '#edit-line-item-fields-field-cfname-und-0-value';
    	var clname = '#edit-line-item-fields-field-clname-und-0-value';
    	var data = jQuery.parseJSON(settings.preview.json);
    	var text = data.text;
    	
    	jQuery(cfname+','+clname).on('keyup',function(){
    		console.log('working');
    		if(jQuery(cfname).val() != '' && jQuery(clname).val() != '') {
    		 	
    		 jQuery('.preview_container #back-section').html('<img  src="'+data.imgpath+'" width="100%" height="100%"/>');
       		 jQuery('.preview_container #text-section').html(changeText(text,jQuery(cfname).val()));
    		}
    	});
    }
  };

  function changeText(text,ch) {
	  var a = '';
	  a = text;
	  if(a.indexOf("#{firstname}#") == -1)
		  return a;
	  else {
		  a = a.replace("#{firstname}#",ch);
		  return a;
	  }	  
  }
})(jQuery);