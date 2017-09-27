
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
		var con ='';
		$.ajax({
			type:'GET',
			dataType: 'json',
			url:'js/city.json',
			success: function(data){
				// console.log(data.json());
				$.each(data.province,function(i,n){
					con +="<li data-id="+n.provinceid+">"+n.provincename+"</li>";
				});
				$('.city-s').html(con);
				$('.city-s >li').click(function(){
					$(this).addClass('city-the').siblings().removeClass('city-the');
					
				});			
  			 }
		});
	});
	// $('.city-s').html(con);
	// var ll ="<li data-id="+n.provinceid+">"+n.provincename+"</li>";
	// console.log(con);
	// $('.city-s >li').click(function(){
	// 	// $(this).addClass('city-the');
	// 	// console.log(this);
	// });
	$('.city-top >span').click(function(){
		$('.city').hide();
	})

});
