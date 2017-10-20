$(function(){
	var mun = 0;
	$('.fault-info-mes-tow li b').each(function(){
		mun += parseInt($(this).text());
	});
	$('.order-con + .fault-foot').find('span').text(mun);
	$('.order-submit').click(function(){
		if($('#tel').val() == ''){
	      alert('请填写手机号');return false;
	    }else if(!/^1[34578]\d{9}$/.test($('#tel').val())){
	      alert('手机号不正确');return false;
	    }
	    window.location.href="orderinfo.html";
	});
	
})