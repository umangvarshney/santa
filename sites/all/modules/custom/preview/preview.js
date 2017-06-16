(function($) {
  Drupal.behaviors.preview = {
    attach: function (context, settings) {
    	jQuery('img.lazy').lazyload({effect : "fadeIn"});
    	var data = jQuery.parseJSON(settings.preview.json);
    	var textdata = data.text;
    	var formid = data.cartformid;
    	formid = formid.replace(/_/g,'-');
    	var flag = false;
    	var fieldsArray = requiredFieldArray(formid);
    	var Fields = fieldsArray[0];
    	var requiredFields = fieldsArray[1];
    	var tag = ["#{firstname}#","#{lastname}#"];
    	/*var Fields = ['edit-line-item-fields-field-cfname-und-0-value','edit-line-item-fields-field-clname-und-0-value'];
    	var requriedFields = ['edit-line-item-fields-field-cfname-und-0-value','edit-line-item-fields-field-clname-und-0-value'];*/
    	
    	jQuery("form#"+formid+ " input[type=text]").on('keyup',function(){
    		//console.log("working");
    		var valid = validateForm(requiredFields);
    		var text = str_replace(tag, Fields, textdata);
    		if(valid && !flag) {
    			flag = true;
    			jQuery('.preview_container #text-section').html(text);
    			jQuery('.preview_container #back-section').html('<img  src="'+data.imgpath+'" width="100%" height="100%"/>');
    		}
    		if(flag) {
    			var id = jQuery(this).attr('id');
    			var value = jQuery(this).val();
    			 text = updateText(textdata,value,tag[1]);
    			 jQuery('.preview_container #text-section').html(text);
    		}
    	});
    }
  };

  function updateText(text,ch,variable) {
	  var a = '';
	  a = text;
	  if(a.indexOf(variable) == -1)
		  return a;
	  else {
		  a = a.replace(variable,ch);
		  return a;
	  }	  
  }
  function str_replace(search, replace, subject) {
	  var count = 0;
	    for (i=0; i<replace.length; i++) {
	    	var value = jQuery('#'+replace[i]).val();
	        subject = subject.replace(search[i], value);
	    }
	    return subject;
 }
  function validateForm(requriedFields) {
	  var isValid = true;
	  jQuery.each(requriedFields,function(i,val) {
	    if ( $('#'+val).val() === '' )
	        isValid = false;
	  });
	  return isValid;
 }
  function requiredFieldArray(formid) {
	  var requiredFields = [];
	  var data = [];
	  var Fields = [];
	  jQuery("form#"+formid+ " input[type=text]").each(function() {
		  Fields.push(jQuery(this).attr('id'));
		  if( jQuery(this).hasClass('required')) {
			  requiredFields.push(jQuery(this).attr('id'));
		  }  
	});
	  data[0] =Fields;
	  data[1] = requiredFields;
	  return data;
  }
})(jQuery);