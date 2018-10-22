true;
function out(text) {
  console.log('%c'+text, 'padding: 1%; font-weight: bold; background: gold; color: black;');
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

  function isjQuery() {
    let timer = setInterval(function(){
      if (typeof jQuery !== 'undefined') {
        clearInterval(timer);
        console.log('jQuery загружен!');
        $.ajax('scripts/ogbu/modern.js')
        .done(function() {
          M.out('Modern.JS загружен!');
          (function() {
            let m = new M();
            m.start();
            m.delete();
            // Здесь писать методы

          }());
          //$('head').append($('<script>').text(';('+methods.toString()+'());'));
        }).fail(function() {
          console.log('Не удалось найти скрипт :(');
        });
      }
    }, 100);
  }

  let script = document.createElement('script');
  script.textContent = ';('+isjQuery.toString()+'());';
  document.getElementsByTagName('head')[0].appendChild(script);
} else {
  out('Модуль уже подключен!');
}
