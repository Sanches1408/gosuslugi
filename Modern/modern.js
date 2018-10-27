;(function(){

  let version = '1.0';

  function Modern(code) {

    this.version = version;
    this.element = null;

    switch (typeof code) {
      case 'string': this.element = $('#row_'+code); break;
      case 'object': this.element = code;
    }

    this.out = out;

    this.style = style;
    this.style.addStyle = addStyle;
    this.style.modalBackground = modalBackground;
    this.style.modalWidth = modalWidth;
    this.style.modalDialogWidth = modalDialogWidth;
    this.style.radio = radio;
    this.style.hideSearch = hideSearch;
    this.style.hideChoice = hideChoice;
    this.style.require = require;

    return this;
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
            $('#ogbuStyle').remove();
            delete M;
            console.log('Удалено');
          }
        }, 1000);
      }
    }, 1000);
  };

  function start() {
    deleteModern();

    $('head').append($('<style id="ogbuStyle">'));
  }

  function style() {

    return this;
  }

  function addStyle(css) {
    M.out('Вызвано из ', this);
    let style = this.element;
    M.out('Применяем стиль '+css);
    M.out('К элементу ', style);
    if (style.text().indexOf(css) == -1) {
      style.text(style.text() + css);
    }
    return this;
  }

  function modalBackground(color) {
    M.out('Вызвано из ', this);
    this.addStyle.call(this, '.modal-backdrop { display: none!important; }\r\n'
      +'.modal { background: '+(color || 'rgba(0, 0, 0, .5)')+'!important; }\r\n');
    return this;
  }

  function modalWidth(width) {
    M.out('Вызвано из ', this);
    this.addStyle.call(this, '.modal-dialog--petition > .modal-content { max-width: '
      +(v ? v : '80%')+'!important; width: '+(width || '80%')+'!important; }\r\n');
    return this;
  }

  function modalDialogWidth(width) {
    M.out('Вызвано из ', this);
    this.addStyle.call(this, '.modal .modal-dialog { max-width: '+(width || '80%')+'!important; }\r\n');
  }

  function radio(font) {
    M.out('Вызвано из ', this);
    this.addStyle.call(this,
      '.attr-field--layout > * { display: block!important; width: 100%!important; }\r\n'
      +'.attr-field--layout > *:first-child { margin-bottom: 2vh;'
      +(font || '')+' }\r\n.attr-field--layout > *:nth-child(2) { margin-left: 5%; }\r\n'
      +'.attr-field--layout .attr-label-title-wrapper { white-space: normal; }\r\n');
    return this;
  }

  function hideSearch(code) {
    M.out('Вызвано из ', this);
    this.addStyle.call(this, (code ? '#row_'+code : '') + ' .bs-searchbox { display: none; }\r\n');
    return this;
  }

  function hideChoice(code) {
    M.out('Вызвано из ', this);
    this.addStyle.call(this, (code ? '#row_'+code : '') + ' li:first-child() { display: none; }\r\n');
    return this;
  }

  function require(bool) {
    M.out('Вызвано из ', this);
    let elem = this.element.attr('id').split('_')[1];
    $('#id_'+elem).attr('ismandatory', bool.toString());
    $('#caption_'+elem)[(bool ? 'add' : 'remove')+'Class']('required');
    return this;
  }
  /*
   * Veriables
   */
  Modern.version = version;
  Modern.activePetition = null;
  Modern.timers = {};

  /*
   * Style
   */
  /*
   * Functions
   */
  Modern.out = out;

  window.M = window.Modern = Modern;
  start();
}());
