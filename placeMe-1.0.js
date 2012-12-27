/**
 * placeMe.js - A jQuery polyfill for the placeholder attribute.
 *
 * @author Matt Sparks <matt@mattsparks.com>
 * @license Unlicense <http://unlicense.org/>
 */

$(document).ready(function(){
	
	//Check to see if placeholder is supported
	//Hat tip: http://diveintohtml5.info/detect.html#input-placeholder
	function supports_input_placeholder() {
	  var i = document.createElement('input');
	  return 'placeholder' in i;
	}
	 
	if(supports_input_placeholder())
	{
		// The placeholder attribute is supported
		//Do nothing. Smile. Go outside
	}
	else
	{
		// The "placeholder" attribute isn't supported. Let's fake it.
		
		var $placeholder = $(":input[placeholder]"); // Get all the input elements with the "placeholder" attribute
		
		// Go through each element and assign the "value" attribute the value of the "placeholder"
		// This will allow users with no support to see the default text
		$placeholder.each(function(){
			if($(this).attr("value") == "") {
				var $message = $(this).attr("placeholder");
				$(this).attr("value", $message);
			}
		 });
		
		// When a user clicks the input (on focus) the default text will be removed
		$placeholder.focus(function(){
			var $value =  $(this).attr("value");
			var $placeholderTxt = $(this).attr("placeholder");
			
			if($value == $placeholderTxt)
			{
				$(this).attr("value", "");
			}
		});
		
		// When a user clicks/tabs away from the input (on blur) keep what they typed
		// Unless they didn't type anything, in that case put back in the default text
		$placeholder.blur(function(){
			var $value =  $(this).attr("value");
			var $placeholderTxt = $(this).attr("placeholder");
			
			if($value == '')
			{
				$(this).attr("value", $placeholderTxt);
			}
		});
		
		// Since we're inputing text into the "value" attribute we need to make 
		// sure that this default text isn't submitted with the form, potentially
		// causing validation issues. So we're going to remove the default text
		// and submit the inputs as blank.
		$("form").submit(function(){
			var $checkValue = $(":input");
			
			$checkValue.each(function() {
				if($(this).attr("value") == $(this).attr("placeholder"))
				{
					$(this).attr("value", "");
				}
			});
		});
	}
	
});
