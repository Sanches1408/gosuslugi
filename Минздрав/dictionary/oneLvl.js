<script>

var timer = setInterval(function(){
  if ($('p', $(window.dictionary.tr)[2]).length == 151) {
    clearInterval(timer);
    start();
  }
}, 100);

function start() {
  var w = window.dictionary;
  $(w.tr+' li:contains("Выберите")').hide();
  $(w.tr+':not(:first-child)').hide();

  $(w.tr+':not(:last-of-type) li:not(:first-child)').each(function(){
    $(this).click(function(){
      w.find($(this).text());
    });
  });

  var but = '<p class="attr-value checkbox" style="margin: 2vh 0;">\
    <input id="allChoice" type="checkbox" class="attr-value-el--filled" onclick="window.dictionary.checkAll(this);">\
    <label for="allChoice"><span id="checkToggle" style="font-weight: bold; font-size: 14px;" tog="Снять все">Выбрать все</span></label></p>';
  $(w.tr+':last-of-type .checkbox:first-of-type').before($(but));
}

</script>
