
$(function(){
	$('.m-brand ul li').eq(4).after('<li class="m-ioc"><i class="fa fa-angle-down fa-lg"></i></li>');
	var _mIoc = $('li.m-ioc').nextAll();
	_mIoc.hide();
	$('li.m-ioc').click(function(){
		_mIoc.toggle(500);
	})
	$('.fault-info-mes >li').click(function(i){
		$('.fault-info-mes >li').eq($(this).index()).find('ul.fault-info-mes-tow').slideToggle(500);
	})
});
