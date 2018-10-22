;(function(){

  var out = function out(v) {
    console.log('%c'+v, 'padding: 1%; font-weight: bold; background: black; color: gold;');
  }

  function Modern(temp = 'Hello world!') {
    this.text = temp;
    this.timerDelete = null;

    this.timers = [
      'timerDelete'
    ];

    this.start = function(){
      this.out(this.text);
    };

    this.out = out;

    this.delete = function(){
      this.out('Включена функция удаления');
      if (window.location.host == 'gosuslugi74.ru' || window.location.host == '10.0.1.207:8081') {
        clearInterval(this.timerDelete);
        this.timerDelete = setInterval(function(obj){
          out('Попытка удаления');
          if ($('.sidebar-step:visible').length == 1) {
            $.each(obj.timers, function(){
              clearInterval(obj[this]);
            });
            // Здесь удаляются переменные Modern.JS

            out('Успешно удалено!');
            //location.reload();
          }
        }, 100, this);
        out(this);
        $('.btn-action--submit').click({obj: this}, function(event){
          event.data.obj.out('Отправка заявления');
          clearInterval(event.data.obj.timerDelete);
        });
      } else {
        out('Удаление здесь не используется');
      }
    }
  }

  Modern.out = out;
  window.M = window.Modern = Modern;
}());
