$(window).load(function(){
	$('body').addClass('loadend');
	slideEvent();//슬라이드 이벤트
});
$(function(){	
	customLayerClose();//커스텀 레이어 닫기 이벤트	
	selectDesign();//셀렉트 디자인
	popClose();//팝업 닫기
	customInfoLayer();//커스텀 메뉴 Disabled 클릭 시 이벤트
});

//슬라이드 이벤트
function slideEvent(){
	if($('.slide_wrp').size() > 0){
		$('.slide_wrp').each(function(){
			var t = $(this).find('ul'),
			tW = 0;

			 t.find('li').each(function(){
				tW += $(this).outerWidth(true);
			});
			t.css('width', tW);
			$(this).scrollbar();
			$(this).find('li').on('click', function(){
				$(this).closest('.slide_wrp').find('li').removeClass('on');
				$(this).addClass('on');
			});
		});
	}	
}

//커스텀 레이어 선택 이벤트
function customLayerOpen(layer, item){
	$(item).addClass('on');
	$('.layer').removeClass('on');
	$(layer).addClass('on');
	$('.custom_wrp').fadeOut(200);
	$('.custom .btn').stop().animate({'opacity': 0}, 200);
}

//커스텀 레이어 닫기 이벤트
function customLayerClose(){
	$('.layer').find('.btn_close').on('click', function(){
		$('.layer').removeClass('on');
		$('.custom_wrp').fadeIn(200);
		$('.custom .btn').stop().animate({'opacity': 1}, 200);
	});
	$('html, body').on('click touchend', function(e){
		if(!$(e.target).is('.layer, .layer *')){
			$('.layer').removeClass('on');	
			$('.custom_wrp').fadeIn(200);
			$('.custom .btn').stop().animate({'opacity': 1}, 200);
		}
	});
}

//커스텀 메뉴 Disabled 클릭 시 이벤트
function customInfoLayer(){
	$('.disabled').on('click', function(){
		var Idx = $(this).index();
		$('.layer-disabled').find('.info_layer').eq(Idx-1).fadeIn(200);
	});
	$('.info_layer').on('click', function(){
		$(this).fadeOut(200);
	});
}

//셀렉트 디자인
function selectDesign(){
	$('.select-box').find('select').on('change', function(){
		var selectVal = $(this).val();
		$(this).closest('.select-box').find('.txt').text(selectVal);
	});
}

//팝업 열기
function popOpen(pop){
	$(pop).fadeIn(300);
}

//팝업 닫기
function popClose(){
	$('.popup').find('.btn-close').on('click', function(){
		$(this).closest('.popup').fadeOut(300);
	});
}

//로딩 노출
function loadStart(){
	$('.loading').stop().fadeIn(300);
}

//로딩 감춤
function loadEnd(){
	$('.loading').stop().fadeOut(300);
}