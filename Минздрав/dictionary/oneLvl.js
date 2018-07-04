<script>

var tr = '.modal:nth-last-of-type(2) .attr-list-layout tr';

var timer = setInterval(function(){
  if ($('p', $(tr)[2]).length == 151) {
    clearInterval(timer);
    start();
  }
}, 100);

function start() {
  $(tr+' li:contains("Выберите")').hide();
  $(tr+':not(:first-child)').hide();

  $(tr+':first-child li:not(:first-child)').each(function(){
    $(this).click(function(){
      console.log('click');
      $(tr+':last-of-type').hide();
      $(tr+':nth-child(2)').hide();
      $(tr+' li:contains("Выберите") a').trigger('click');
      $(tr+' p input:checked').trigger('click');
      $(tr+':last-of-type p:not(:first-of-type)').hide();
      $(tr+':nth-child(2) li:not(:first-child)').hide();
      var lvl = window.dictionary.findOneLvl($(this).text());
      console.log(lvl);
      if (lvl[1].length) {
        $(lvl[0]).show();
        $.each(lvl[1], function(i, v){ $(v).show(); });
      }
    });
  });

  $(tr+':nth-child(2) li:not(:first-child)').each(function(){
    $(this).click(function(){
      $(tr+':last-of-type').hide();
      $(tr+':nth-child(2) li:contains("Выберите") a').trigger('click');
      $(tr+' p input:checked').trigger('click');
      $(tr+':last-of-type p:not(:first-of-type)').hide();
      var lvl = window.dictionary.findTwoLvl($(this).text());
      console.log(lvl);
      if (lvl[1].length) {
        $(lvl[0]).show();
        $.each(lvl[1], function(i, v){ $(v).show(); });
      }
    });
  });

  var but = '<p class="attr-value checkbox">\
    <input id="allChoice" type="checkbox" class="attr-value-el--filled" onclick="window.dictionary.checkAll(this);">\
    <label for="allChoice"><span>Выбрать все</span></label></p>';
  $(tr+':last-of-type').append(but);
}

</script>
