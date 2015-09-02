var db_address='http://localhost:8888/db/';

function jsTils(num, expressions) {
  var result;
  var count = num % 100;
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
  my: 0,
  all: 0,
  turn: function() {
    var t = this;
    var animBlock = $('.js-list').first();
    //if(t.status) return;
    t.status = true;
    newBlock = animBlock.clone();
    animBlock.before(newBlock);
    newBlock.find('.js-n').text(3);
    $('.title-text').addClass('turned');
    animBlock.addClass('turn');
    t.setMyCount();
    t.setAllCount();
    setTimeout(function(){
      animBlock.remove();
      t.status = false;
    }, 2000);
  },
  renderCounters: function(){
    var t = this;
    $('.all, .my').each(function(){
      var $c = $(this).find('.js-count');
      var $w = $(this).find('.js-count-word');
      var c = t.my
      if ($(this).is('.all')) {
        c = t.all
      }
      $c.text(c);
      $w.text(jsTils(c, ['раз','раза','раз']));
    })
  },
  setMyCount: function(){
    this.my++
    localStorage.setItem('my', this.my);
    this.renderCounters();
  },
  getMyCount: function(){
    this.my = localStorage.getItem('my') || this.my;
    this.renderCounters();
  },
  setAllCount: function() {
    var t = this;
    $.post(db_address, function(data){
      t.all = data;
      t.renderCounters()
    }).fail(function(data){
      console.log(data);
    });
  },
  getAllCount: function() {
    var t = this;
    $.get(db_address, function(data){
      t.all = data;
      t.renderCounters();
    }).fail(function(data){
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
    t.getAllCount();
    t.getMyCount();
  }
}
$(calendar.init.bind(calendar));
