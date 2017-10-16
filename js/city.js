
var cityJson = [];
//回调函数
var callback = function(city){
  cityJson = city;
}
$(function() {
  $('.service2').on('click',service2);
  $('.service1').on('click',service1);
  $('.service3').on('click',service3);
});
function service1(){
    $('.service1').find('img').attr('src','images/service1_select.png');
    $('.service2').find('img').attr('src','images/service2.png');
    $('.service3').find('img').attr('src','images/service3.png');
    $('.address-box').show();
    $('.branch-box,.mailAddress-box,.returnAddress-box').hide();
    $('#next').attr('onclick','next(1)');
}
function service3(){
    $('.service1').find('img').attr('src','images/service1.png');
    $('.service2').find('img').attr('src','images/service2.png');
    $('.service3').find('img').attr('src','images/service3_select.png');
    $('.address-box,.returnAddress-box').hide();
    $('.branch-box,.mailAddress-box').show();
    $('#next').attr('onclick','next(3)');
}
function service2(){
    $('.service1').find('img').attr('src','images/service1.png');
    $(this).find('img').attr('src','images/service2_select.png');
    $('.service3').find('img').attr('src','images/service3.png');
    $('.address-box').hide();
    $('.branch-box,.mailAddress-box,.returnAddress-box').show();
    $('.returnAddress-box').find('p').text('回寄地址');
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
   $('#next').attr('onclick','next(2)');
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
    city.append("<option id='chooseCity' value='-1'>城市</option>");
  }
  if ($("#chooseCounty").length === 0) {
    county.append("<option id='chooseCounty' value='-1'>区/县</option>");
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
    county.append("<option id='chooseCounty' value='-1'>区/县</option>");
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
function next(id){
  
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
    if (id == '1') {
      if($('#city').text() == '请选择城市'){
        alert('请选择地址');return false;
       }
    }else if(id == '2'){
      if ($('#province').val() == '-1' || $('#citys').val() == '-1' || $('#county').val() == '-1') {
         alert('请选择回寄地址');return false;
      }
    }
    
     if ($('#textaddress').val().trim() == '') {
      alert('请填写详细地址');return false;
    }else if($('#textaddress').val().length < 5){
      alert('详细地址太少');return false;
    }
    window.location.href="order.html";
}