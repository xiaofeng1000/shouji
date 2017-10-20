$(function(){
	var links=$(".title a");
	var divs=$(".box >div");
	var num1=0;  //ǰݵ±
	var num2=0;
	links.click(function(){
		//
		$(this).addClass('select-a').siblings().removeClass('select-a');
		divs.finish();
		var that=$(this);
		var lefts=$(this).position().left;
		var index=$(this).index(".title a");
		num2=index;
		if(num1==num2){
			return;
		}else if(num1<num2){

			divs.eq(num2).show().css("left",400).animate({left:0});
			divs.eq(num1).animate({left:-400});
		}else if(num1>num2){
			divs.eq(num2).show().css("left",-400).animate({left:0});
			divs.eq(num1).animate({left:400});
		}
		num1=num2;
		num2="";
	});
	$('.ram-up').click(function(){
		$("html, body").animate({scrollTop: $('#bottom').offset().top -20+ "px"}, 500);
	    return false;
	});
	$('.ram-flow-con').eq(0).show();

	$('.ram-flow-title >li').click(function(){
		
		
		$(this).addClass('ram-flow-select').siblings().removeClass('ram-flow-select');
		$('.ram-flow-con').hide().eq($(this).index()).show();
	});
});
