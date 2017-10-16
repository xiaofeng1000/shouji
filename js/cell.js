
$(function(){
	
	var float=$(".float");
	var divs=$(".box div");
	var num1=0;
	var num2=0;
	
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
		if ($(this).hasClass('on')) {
			$(this).removeClass('on').addClass('off');
		}else{
			$(this).removeClass('off').addClass('on');
		}
	
	});
	$('.cell-footer').find('b').text($('#cell-model').val());
	$('#cell-model').change(function(){
		$('.cell-footer').find('b').text($(this).val());
	});
	$('#cell-submit').click(function(){
		if ($('#select-checkbox').is(':checked')) {
			alert('提交成功');
		}else{
			alert('请仔细阅读手机服务条款');
		}
	});
})
