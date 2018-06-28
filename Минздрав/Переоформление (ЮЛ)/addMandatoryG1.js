<script>

  var arr = ['G14Check5', 'G14Check6', 'G14Check12', 'G14Check1',
    'G14Check2', 'G14Check3', 'G14Check4', 'G14Check7', 'G14Check8',
    'G14Check9', 'G14Check10', 'G14Check11'];

  var a = 'https://test.gosuslugi74.ru/pgu/pgu/services/info.htm?'
    +'category=15707@egOrganization&id=7546@egService&target={NUMBER}@egServiceTarget';
  var n = '';

  $.each(arr, function(i, v){
    if ($('#title_'+v).prop('checked')) {
      if (i < 3) {
        a = a.replace('{NUMBER}', '12850');
      } else {
        a = a.replace('{NUMBER}', '12849');
      }
    }
  });

  if (a.search('{NUMBER}') == -1) {
    var out = '<p><a href="'+a+'" target="_blank">'
    +'Перейти на страницу с более подробной информацией</a></p>';
  } else {
    var temp = a.replace('{NUMBER}', '12849');
    a = a.replace('{NUMBER}', '12850');

    var out = '<p>1. <a href="'+temp+'" target="_blank">Заявление (гос. пошлина 750 р.)</a></p>'
      +'<p>2. <a href="'+a+'" target="_blank">Заявление (гос. пошлина 3500 р.)</a></p>';
  }

  var div = '<div id="gdr10" class="modal modal--alert in" tabindex="-1" role="alertdialog"'
    +'aria-hidden="true" style="display: block; padding-right: 17px; z-index: 1050; background: rgba(0, 0, 0, 0.74);">'
    +'<div class="modal-dialog">'
    +'<button type="button" class="modal-close" data-behavior="closeWidgetModal" '
    +'onclick="document.getElementById(\'gdr10\').remove();"></button>'
    +'<div class="modal-content">'
    +'<header class="modal-header">'
    +'<h1 class="modal-title">Уведомление</h1></header>'
    +'<div class="modal-body"><p>Для отправки заявления в Министерство здравоохранения'
    +' Челябинской области необходимо будет оплатить государственную пошлину</p>'+out
    +'</div></div><div class="modal-footer">'
    +'<button type="button" class="btn btn--accept btn--cancel btn-primary" '
    +'onclick="document.getElementById(\'gdr10\').remove();">Ок</button>'
    +'</div></div></div>';

  $('#row_G16Choice p:nth-of-type(2)').click(function(){
    $('body').append($(div));
  });

  </script>
