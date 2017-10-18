$(function(){
	$('#cell-model').change(function(){
		
		var id = $(this).val();
		//根据手机id 查询价格及颜色信息
		// $.ajax({
	 //      type:'POST',
	 //      dataType: 'json',
	 //      data: {id: id},
	 //      url:'php',
	 //      success: function(data){
	 //      	$('#screen-ab').html();
	 //      	$('#screen-color').html();
	 //        }
	 //    });
	});
	$('.cell-footer').find('b').text($('#screen-ab').val());
	$('#screen-ab').change(function(){
		$('.cell-footer').find('b').text($(this).val());
	});
});