;(function(){

  let version = '1.0';

  function Modern(temp = 'Hello world!') {

    this.version = version;
    this.text = temp;

    this.out = out;

    this.start = function(){
      this.out(this.text);
    };
  }

  let out = function out(v) {
    console.log('%c'+v, 'padding: 1%; font-weight: bold; background: black; color: gold;');
  }

  let deleteModern = function deleteModern(){
    let timer = setInterval(function(){
      console.log('Пытаемся найти заявление')
      if ($('#row_recipientOrg').length) {
        console.log('Заявление нашли');
        let hash = parseInt(Math.floor(Math.random() * 100));
        $('#row_recipientOrg').attr('hash', hash);
        M.activePetition = hash;
        clearInterval(timer);
        timer = setInterval(function(){
          console.log('Теперь узнаем закрыто ли заявление');
          if (!$('.modal-dialog--petition').length) {
            console.log('Заявление закрыто');
            for (let t in M.timers) {
              clearInterval(t);
            }
            clearInterval(timer);
            $('#modern').remove();
            delete M;
            console.log('Удалено');
          }
        }, 1000);
      }
    }, 1000);
  };
  /*
   * Veriables
   */
  Modern.version = version;
  Modern.activePetition = null;
  Modern.timers = {};

  /*
   * Functions
   */
  Modern.out = out;

  window.M = window.Modern = Modern;
  deleteModern();
}());
