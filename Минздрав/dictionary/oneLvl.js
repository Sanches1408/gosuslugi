<script>

var timer = setInterval(function(){
  console.log('timer');
  debugger;
  console.log(window.dictionary.tr);
  console.log($(window.dictionary.tr));
  console.log($(window.dictionary.tr)[2]);
  console.log($('p', $(window.dictionary.tr)[2]).length);
  if ($('p', $(window.dictionary.tr)[2]).length == 151) {
    clearInterval(timer);
    start();
  }
}, 100);

function start() {
  var w = window.dictionary;
  console.log('start');
  $(w.tr+' li:contains("Выберите")').hide();
  $(w.tr+':not(:first-child)').hide();

  $(w.tr+':not(:last-of-type) li:not(:first-child)').each(function(){
    $(this).click(function(){
      console.log('click');
      //window.dictionary.hide(true);
      //var lvl = window.dictionary.findOneLvl($(this).text());
      w.show(w.find($(this).text()));
      /*console.log(lvl);
      if (lvl[1].length) {
        $(lvl[0]).show();
        $.each(lvl[1], function(i, v){ $(v).show(); });
      }*/
    });
  });
/*
  $(tr+':nth-child(2) li:not(:first-child)').each(function(){
    $(this).click(function(){
      window.dictionary.hide();
      var lvl = window.dictionary.findTwoLvl($(this).text());
      console.log(lvl);
      if (lvl[1].length) {
        $(lvl[0]).show();
        $.each(lvl[1], function(i, v){ $(v).show(); });
      }
    });
  });
*/
  var but = '<p class="attr-value checkbox" style="margin: 2vh 0;">\
    <input id="allChoice" type="checkbox" class="attr-value-el--filled" onclick="window.dictionary.checkAll(this);">\
    <label for="allChoice"><span style="font-weight: bold; font-size: 14px;">Выбрать все</span></label></p>';
  $(w.tr+':last-of-type .checkbox:first-of-type').before($(but));
}

</script>
