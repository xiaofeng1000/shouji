$(function () {
	$('.adout-content >li').eq(0).siblings().hide();
	$('.adout-title-tow >li').each(function(e){
		$(this).click(function(){
			$(this).addClass('adoutT-select').siblings().removeClass('adoutT-select');
			$('.adout-content >li').eq(e).show().siblings().hide();
		});
	});
})