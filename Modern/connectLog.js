true;

function out(text) {
  console.log('%c'+text, 'padding: 1%; font-weight: bold; background: gold; color: black;');
}

function methods(){
  if ($('#row_modern').length) $('#row_modern').remove();

  let hash;
  while (true) {
    hash = parseInt(Math.floor(Math.random() * 100));
    if (hash != M.activePetition) break;
  }
  $('#row_recipientOrg').attr('hash', hash);
  M.activePetition = hash;

  $('head').append($('<script>').attr('id', 'row_modern').text(';('+(function(){
    console.log('Выполняем методы');
    let m = new M();
    m.style({
      'modalBackground': 'red',
      'modalWidth': '',
      'modalDialogWidth': '100%',
      'radio': 'font-weight: bold;'
    });
    // Здесь писать методы

  }).toString()+'());'));
}

out('Проверка модуля');
if (!this.M) {
  out('Модуль не был найден. Загружаем...');
  if (!jQuery) {
    out('jQuery не был найден. Загружаем...');
    let script = document.createElement('script');
    script.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js');
    document.getElementsByTagName('body')[0].appendChild(script);
  }

  new Promise(function(resolve){
    let timer = setInterval(function(){
      if (jQuery) {
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
    }, 100);
  }).then(methods);
} else {
  out('Модуль уже подключен!');
  if ($('#row_recipientOrg').attr('hash') != M.activePetition) {
    methods();
    M.out('Открыто новое заявление');
  }
  else {
    M.out('Ничего не делаем');
  }
}
