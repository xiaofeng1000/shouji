
$(function(){
	// var win=$(".win");
	
	var float=$(".float");
	var divs=$(".box div");
	var num1=0;  //ǰݵ±
	var num2=0;
	// win.hover(function(){
	// 	$(".leftB,.rightB").css("display","block");
	// },function(){
	// 	$(".leftB,.rightB").css("display","none");
	// });
	$(".leftB").click(function(){
		divs.finish();
		float.stop(true);
		var temp=num1;
		num1--;
		if(num1==-1){
			num1=2;
		}
		divs.eq(num1).css("left",320).animate({left:0});
		divs.eq(temp).animate({left:-320});
		
	
	});
	$(".rightB").click(function(){
		divs.finish();
		float.stop(true);
		var temp=num1;
		num1++;
		if(num1==3){
			num1=0;
		}
		divs.eq(num1).css("left",-320).animate({left:0});
		divs.eq(temp).animate({left:320});
		
	});
	$('.select-input').click(function(){
		alert($('#select-checkbox').is(':checked'));
		if ($(this).hasClass('on')) {
			$(this).removeClass('on').addClass('off');
		}else{
			$(this).removeClass('off').addClass('on');
		}
	
	});
	
})
