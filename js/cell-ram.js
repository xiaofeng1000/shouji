$(function(){
	$('.ram-flow-con').eq(0).show();
	$('.ram-flow-title >li').click(function(){
		
		
		$(this).addClass('ram-flow-select').siblings().removeClass('ram-flow-select');
		$('.ram-flow-con').hide().eq($(this).index()).show();
	});
});
