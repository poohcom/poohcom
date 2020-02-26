$(function(){
    touchEvent();
});

function touchEvent(){
    $('.hover').on({
        'touchstart': function () {
            $(this).addClass('touch');
        }, 'touchend': function () {
            $(this).removeClass('touch');
        }
    });
}

function popOpen(obj){
    $('.popup').stop().fadeOut(300);
    $(obj).stop().fadeIn(300);
}

function popClose(obj){
    $(obj).stop().fadeOut(300);
}