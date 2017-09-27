
$(function(){
	$('.m-brand ul li').eq(4).after('<li class="m-ioc"><i class="fa fa-angle-down fa-lg"></i></li>');
	var _mIoc = $('li.m-ioc').nextAll();
	_mIoc.hide();
	$('li.m-ioc').click(function(){
		_mIoc.slideToggle(500);
	})
	
	$('.fault-info-mes >div').click(function(){
		
		$(this).next('ul.fault-info-mes-tow').slideToggle(500);

	})
	$('.address').click(function(){
		$('.city').show();
	});
	$('.city-top >span').click(function(){
		$('.city').hide();
	})
});
