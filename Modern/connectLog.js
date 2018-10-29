true;

function out(text) {
  console.log('%c'+text, 'padding: 1%; font-weight: bold; background: gold; color: black;');
}

function methods(){
  $('#row_modern').remove();
  $('#row_ogbuStyle').remove();
  $.each(M.timers, function(){
    M.out('Очищаем '+this);
    clearInterval(this);
  });

  let hash;
  while (true) {
    hash = parseInt(Math.floor(Math.random() * 100));
    if (hash != M.activePetition) break;
  }
  $('#row_recipientOrg').attr('hash', hash);
  M.activePetition = hash;

  $('head').append($('<style>').attr('id', 'row_ogbuStyle'))
    .append($('<script>').attr('id', 'row_modern').text(';('+(function(){
    console.log('Выполняем методы');
    console.dir($('#row_ogbuStyle'));
    let m = new M();
    m.style({
      'modalBackground': 'red',
      'modalWidth': '',
      'modalDialogWidth': '100%',
      'radio': ' font-weight: bold;'
    });
    // Здесь писать методы

  }).toString()+'());'));
}

out('Проверка модуля');
if (!this.M && window.location.host == 'gosuslugi74.ru' ||
    window.location.host == '10.0.1.207:8081') {
  out('Модуль не был найден. Загружаем...');
  if (!jQuery) {
    out('jQuery не был найден. Загружаем...');
    let script = document.createElement('script');
    script.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js');
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  new Promise(function(resolve){
    out('Запускаем промис');
    let timer = setInterval(function(){
      out('Пытаемся найти jQuery');
      if (window.jQuery) {
        clearInterval(timer);
        console.log('jQuery загружен!');
        $.ajax('download/doc/upload/modern.js')
        .done(function() {
          M.out('Modern.JS загружен!');
          resolve();
        }).fail(function() {
          console.log('Не удалось найти скрипт :(');
        });
      }
    }, 1000);
  }).then(methods);
} else if (this.M && window.location.host == 'gosuslugi74.ru') {
  out('Модуль уже подключен!');
  if ($('#row_recipientOrg').attr('hash') != M.activePetition) {
    methods();
    M.out('Открыто новое заявление');
  }
  else {
    M.out('Ничего не делаем');
  }
}
