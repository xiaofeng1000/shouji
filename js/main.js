
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
	$('#next').click(function(){
		if ($('#name').val() == '') {
			alert('请填写名字');return false;
		}else if ($('#name').val().length > 10 ) {
			alert('名称不能超过10个字符');return false;
		}
		if($('#tel').val() == ''){
			alert('请填写手机号');return false;
		}else if(!/^1[34578]\d{9}$/.test($('#tel').val())){
			alert('手机号不正确');return false;
		}
		if($('#city').text() == '请选择城市'){
		 	alert('请选择地址');return false;
		 }
		 if ($('#textaddress').val() == '') {
			alert('请填写详细地址');return false;
		}else if($('#textaddress').val().length < 5){
			alert('详细地址太少');return false;
		}
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
