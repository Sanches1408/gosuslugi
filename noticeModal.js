true;

function addDiv() {
  var a = 'https://test.gosuslugi74.ru/pgu/pgu/services/info.htm?'
    +'id=7546@egService&target=12851@egServiceTarget';

  var out = '<p><a href="'+a+'" target="_blank">'
    +'Перейти на страницу с более подробной информацией<br>(гос. пошлина 7 500 р.)</a></p>';

  return '<div id="gdr10" class="modal modal--alert in" tabindex="-1" role="alertdialog"'
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
}

try {
  var t = $('p:last-of-type input', $('#row_OplLiGosPos'));
  if (t.attr('clk') != 'true') {
    t.click(function() {
      $('body').append($(addDiv()));
    });
    t.attr('clk', 'true');
  }
} catch(e){}
