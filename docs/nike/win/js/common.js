$(function(){
	
});

//팝업 열기
function popOpen(pop){
	$(pop).fadeIn(300);
	$(pop).on('click', function(e){
		if(!$(e.target).is('.popup .bg, .popup .bg *')){
			$(pop).fadeOut(300);
		}
	});
}