/****
 * Preview JS for preview letter
 * @copyright PostBy Santa
 * @param $
 */
(function($) {
  Drupal.behaviors.preview = {
    attach: function (context, settings) {
    	$('img.lazy').lazyload({effect : "fadeIn"});
    	var data = $.parseJSON(settings.preview.json);
    	var textdata = data.text;
    	var formid = data.cartformid;
    	formid = formid.replace(/_/g,'-');
    	var terms = data.term;
    	var flag = false;
    	var fieldsArray = requiredFieldArray(formid);
    	var Fields = fieldsArray[0];
    	var requiredFields = fieldsArray[1];
    	var tag = $.map(terms, function(value, index) {
    	    return [value];
    	});
    	//console.log(tag);
    	$("form#"+formid+ " input, form#"+formid+ " select").on('keyup change',function(){
    		//console.log("working");
    		var valid = validateForm(requiredFields);
    		if(valid && !flag) {
    			flag = true;
    		    text = str_replace(tag, Fields, textdata);
    			$('.preview_container #text-section').html(text);
    			$('.preview_container #back-section').html('<img  src="'+data.imgpath+'"/>');
    			$('.required-cls').hide();
    		}
    		if(flag) {
    			 text = str_replace(tag, Fields, textdata);
    			 $('.preview_container #text-section').html(text);
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
	    for (i=0; i<replace.length; i++) {
	    	var value = $('#'+replace[i]).val();
	        subject = subject.replace(search[i], value);
	    }
	    //console.log(count);
	    return subject;
 }
  function validateForm(requriedFields) {
	  var isValid = true;
	  $.each(requriedFields,function(i,val) {
	    if ( $('#'+val).val() === '' )
	        isValid = false;
	  });
	  return isValid;
 }
  function requiredFieldArray(formid) {
	  var requiredFields = [];
	  var data = [];
	  var Fields = [];
	  $.each($('input,select','form#'+formid),function() {
		  if(typeof($(this).attr('id')) !== 'undefined'){
			  Fields.push($(this).attr('id'));
			  if( $(this).hasClass('required')) {
				  requiredFields.push($(this).attr('id'));
			  }  
		  }  
	});
	  //console.log(Fields);
	  data[0] =Fields;
	  data[1] = requiredFields;
	  return data;
  }
})(jQuery);