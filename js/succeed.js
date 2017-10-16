var time = 10;

$(function () {
	$('.succeed-footer').find('b').text(time);
	counter(time);
})

function counter(time){
	var int = setInterval(function(){
		$('.succeed-footer').find('b').text(time);
		time--;
		if (0 == time+1	) {
			clearInterval(int);
			window.location.href='index.html';
		}
	},1000);
	
}	