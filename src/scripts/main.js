function jsTils(num, expressions) {
 var result;
 count = num % 100;
 if (count >= 5 && count <= 20) {
   result = expressions['2'];
 } else {
   count = count % 10;
   if (count == 1) {
       result = expressions['0'];
   } else if (count >= 2 && count <= 4) {
       result = expressions['1'];
   } else {
       result = expressions['2'];
   }
 }
 return result;
}
var calendar = {
  status: false,
  turn: function() {
    var t = this;
    var animBlock = $('.js-list').first();
    //if(t.status) return;
    t.status = true;
    newBlock = animBlock.clone();
    animBlock.before(newBlock);
    newBlock.find('.js-n').text(3);
    animBlock.addClass('turn');
    t.setCount();
    setTimeout(function(){
      animBlock.remove();
      t.status = false;
    }, 2000);
  },
  setCount: function() {
    var c = $('.js-count');
    c.text(parseInt(c.html()) + 1);
    // Здесь ajax делайте который один клик добавляет
  },
  getCount: function() {
    $.getJSON('count.json')
      .done(function(data){
        $('.js-count').text(data.count);
      })
      .fail(function(data){
        console.log(data);
      });
  },
  init: function() {
    var t = this;
    $('.js-calendar').on('click touchstart', function(){
      t.turn();
    });
    $(window).on('load', function(){
      $('.js-preloader').addClass('faded');
      $('.screen').addClass('active');
    });
    t.getCount();
  }
}
$(calendar.init.bind(calendar));