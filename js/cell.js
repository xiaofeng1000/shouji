var cityJson = [];
//回调函数
var callback = function(city){
  cityJson = city;
}
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
	$.region();
	$('#cell-submit').click(function(){
		if ($('#name').val().trim() == '') {
			alert('请填写姓名！');
			return;
		}
		if($('#tel').val() == ''){
      		alert('请填写手机号');
      		return;
    	}else if(!/^1[34578]\d{9}$/.test($('#tel').val())){
      		alert('手机号不正确');
      		return;
    	}
    	if ($('#cell-province').val() == '请选择' || $('#cell-city').val() == '请选择' || $('#cell-county').val() == '请选择') {
    		alert('请选择地址！');
    		return;
    	}
		if ($('#cell-text').val().trim() == '') {
	 		alert('请填写详细地址');return false;
		}else if($('#cell-text').val().trim().length < 5){
	  		alert('详细地址太少');return false;
		}
		if ($('#select-checkbox').is(':checked')) {
			alert('提交成功');
		}else{
			alert('请仔细阅读手机服务条款');
			return;
		}
	});
	$('#cell-address-branch').click(function(){
		var id = $(this).val();
		$.ajax({
			type:'GET',
			dataType: 'json',
			url:'js/branch.json',
			success: function(data){
				$.each(data.branch,function(i,n){
					if (n.id == id) {
						$('.cell-order-text').text(n.nameCon);
					}
				});
  			}
		});
	});
	$('#cell-function').change(function(){
		if ($(this).val() == '1') {

		}else if($(this).val() == '2'){
			$('.cell-order-portion').css('display','none');
			$('.cell-branch,.cell-order-text,.cell-order-all').css('display','flex');
			cityAll();
		}else if($(this).val() == '3'){

		}
	});
});
function cityAll(){
	  $.ajax({
      type:'GET',
      dataType: 'json',
      url:'js/citys.json',
      success: function(data){
          var cityJson = data.cityJson;
          var sb = new StringBuffer();
          $.each(cityJson,
            function(i, val) {
              if (val.item_code.substr(2, 4) == '0000') {
                sb.append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
              }
            });
          $("#choosePro").after(sb.toString());
          callback(cityJson);
        }
    });
}
 // 省值变化时 处理市
function doProvAndCityRelation() {
  var city = $("#citys");
  var county = $("#county");
  if (city.children().length > 1) {
    city.empty();
  }
  if (county.children().length > 1) {
    county.empty();
  }
  if ($("#chooseCity").length === 0) {
    city.append("<option id='chooseCity' value='-1'>请选择</option>");
  }
  if ($("#chooseCounty").length === 0) {
    county.append("<option id='chooseCounty' value='-1'>请选择</option>");
  }
  var sb = new StringBuffer();
  $.each(cityJson,
    function(i, val) {
      if (val.item_code.substr(0, 2) == $("#province").val().substr(0, 2) && val.item_code.substr(2, 4) != '0000' && val.item_code.substr(4, 2) == '00') {
        sb.append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
      }
    });
  $("#chooseCity").after(sb.toString());
} // 市值变化时 处理区/县
function doCityAndCountyRelation() {
  var cityVal = $("#citys").val();
  var county = $("#county");
  if (county.children().length > 1) {
    county.empty();
  }
  if ($("#chooseCounty").length === 0) {
    county.append("<option id='chooseCounty' value='-1'>请选择</option>");
  }
  var sb = new StringBuffer();
  $.each(cityJson,
    function(i, val) {
      if (cityVal == '110100' || cityVal == "120100" || cityVal == "310100" || cityVal == "500100") {
        if (val.item_code.substr(0, 3) == cityVal.substr(0, 3) && val.item_code.substr(4, 2) != '00') {
          sb.append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
        }
      } else {
        if (val.item_code.substr(0, 4) == cityVal.substr(0, 4) && val.item_code.substr(4, 2) != '00') {
          sb.append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
        }
      }
    });
  $("#chooseCounty").after(sb.toString());

}

function StringBuffer(str) {
  var arr = [];
  str = str || "";
  var size = 0; // 存放数组大小
  arr.push(str);
  // 追加字符串
  this.append = function(str1) {
    arr.push(str1);
    return this;
  };
  // 返回字符串
  this.toString = function() {
    return arr.join("");
  };
  // 清空 
  this.clear = function(key) {
    size = 0;
    arr = [];
  };
  // 返回数组大小 
  this.size = function() {
    return size;
  };
  // 返回数组 
  this.toArray = function() {
    return buffer;
  };
  // 倒序返回字符串 
  this.doReverse = function() {
    var str = buffer.join('');
    str = str.split('');
    return str.reverse().join('');
  };
}
$.region = function(){
	var conOne ='',
		conTow =[],
		conThree =[],
		vleveTitle ='',
		Title = '';
	//初始化
	init();
	
	function init(){
		// $('.city-c,.city-qx').empty();
		$.ajax({
			type:'GET',
			dataType: 'json',
			url:'js/city.json',
			success: function(data){
				$.each(data.province,function(i,n){
					conOne +="<option value="+n.provinceid+">"+n.provincename+"</option>";
				});
				conTow = data.city;
				conThree = data.county;
				leveOne();	
  			}
		});

	}
	//一级地区
	function leveOne(){
		$('#cell-province').html("<option>请选择</option>"+conOne);
		$('#cell-province').change(function(){
			leveTow($(this).val());
			$('#cell-county').html("<option>请选择</option>");
		});
	}
	//二级联动
	function leveTow(id){
		var conData ='';
		$.each(conTow,function(i,n){
			if (n.citybool == id) {
				conData +="<option value="+n.cityid+">"+n.cityname+"</option>";
			}	
		});
		$('#cell-city').html("<option>请选择</option>"+conData);
		$('#cell-city').change(function(){	
			leveThree($(this).val());
		});
	}
	//三级联动
	function leveThree(id){
		var conData ='';
		$.each(conThree,function(i,n){
			if (n.countybool == id) {
				conData +="<option value="+n.countyid+">"+n.countyname+"</option>";
			}	
		});
		$('#cell-county').html("<option>请选择</option>"+conData);
	}
}


