
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
		$('.service-function-big').hide();
		$.region();
	});
	$('.city-top >span').click(function(){
		$('.city').hide();
		$('.service-function-big').show();
	});
	
	$('#branch').click(function(){
		var id = $(this).val();
		$.ajax({
			type:'GET',
			dataType: 'json',
			url:'js/branch.json',
			success: function(data){
				$.each(data.branch,function(i,n){
					if (n.id == id) {
						$('.mailAddress').text(n.nameCon);
					}
				});
  			}
		});
	});
	$('ul.fault-info-color >li').click(function(){
		$(this).addClass('info-select').siblings().removeClass('info-select');
	});
	$('ul.fault-info-mes-tow >li').click(function(){
		var price = 0;
		$(this).toggleClass('info-tow-select');
		for (var i = 0; i < $('ul.fault-info-mes-tow >li.info-tow-select').length; i++) {
			price += parseInt($('ul.fault-info-mes-tow >li.info-tow-select').eq(i).data('price'));
		}
		$('.fault-m').find('span').text(price);
	});
	$('#fault-next').click(function(){
		if ($('.info-tow-select').length == 0) {
			alert('请选择故障信息！');
		}else{
			window.location.href='service_function.html';
		}

	});
});


$.region = function(){
	var conOne ='',
		conTow =[],
		conThree =[],
		vleveTitle ='',
		Title = '';
	//初始化
	init();
	
	function init(){
		$('.city-c,.city-qx').empty();
		$.ajax({
			type:'GET',
			dataType: 'json',
			url:'js/city.json',
			success: function(data){
				$.each(data.province,function(i,n){
					conOne +="<li data-id="+n.provinceid+">"+n.provincename+"</li>";
				});
				conTow = data.city;
				conThree = data.county;
				leveOne();	
  			}
		});

	}
	//一级地区
	function leveOne(){
		$('.city-s').html(conOne);
		$('.city-s >li').click(function(){
			$(this).addClass('city-the').siblings().removeClass('city-the');
			leveTitle = $(this).text();
			$('.city-select').find('p').text(leveTitle);
			$('.city-qx').empty();
			leveTow($(this).data('id'));
		});
	}
	//二级联动
	function leveTow(id){
		var conData ='';
		$.each(conTow,function(i,n){
			if (n.citybool == id) {
				conData +="<li data-id="+n.cityid+">"+n.cityname+"</li>";
			}	
		});
		$('.city-c').html(conData).css('visibility','visible');
		$('.city-c >li').click(function(){
			$(this).addClass('city-the').siblings().removeClass('city-the');
			var leveTowTitle = $(this).text();
				Title = leveTitle+'-'+leveTowTitle;
			$('.city-select').find('p').text(Title);
			leveThree($(this).data('id'));
		});
	}
	//三级联动
	function leveThree(id){
		var conData ='';
		$.each(conThree,function(i,n){
			if (n.countybool == id) {
				conData +="<li data-id="+n.countyid+">"+n.countyname+"</li>";
			}	
		});
		$('.city-qx').html(conData).css('visibility','visible');
		$('.city-qx >li').click(function(){
			var leveThreeTitle = $(this).text();
			$('.address').text(Title+'-'+leveThreeTitle);
			$('.city').hide();
			$('.service-function-big').show();
			$('.city-select').find('p').empty();
			$('.city-c,.city-qx').empty();
		});
	}
}
