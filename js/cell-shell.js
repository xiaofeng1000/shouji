$(function(){
	$('.shell-model li').click(function(){
		$(this).addClass('shell-model-select').siblings().removeClass('shell-model-select');
	});
});