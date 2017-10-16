$(function(){
	var mun = 0;
	$('.fault-info-mes-tow li b').each(function(){
		mun += parseInt($(this).text());
	});
	$('.order-con + .fault-foot').find('span').text(mun);
})