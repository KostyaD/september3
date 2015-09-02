var calendar = {
  status: false,
  turn: function() {
    var t = this;
    var animBlock = $('.js-list');
    if(t.status) return;
    t.status = true;
    animBlock.before(animBlock.clone());
    animBlock.addClass('turn');
    setTimeout(function(){
      animBlock.remove();
      t.status = false;
    }, 2000);
  },
  init: function() {
    var t = this;
    $('.js-calendar').on('click touchstart', function(){
      t.turn();
    });
    $(window).on('load', function(){
      $('.js-preloader').addClass('faded');
      $('.js-calendar, .js-video').addClass('active');
    });
  }
}
$(calendar.init.bind(calendar));