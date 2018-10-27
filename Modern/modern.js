;(function(){

  let version = '1.1';

  function Modern(code) {

    this.version = version;
    this.code = code;

    if (code !== undefined) {
      this.element = M.getArray(code).map(function(c){
        return $('#row_'+c);
      });
    } else {
      this.element = null;
    }

    this.out = out;
    this.getArray = getArray;

    this.style = style;
    this.style.parent = this;
    this.style.element = $('#row_ogbuStyle');
    this.style.addStyle = addStyle;
    this.style.modalBackground = modalBackground;
    this.style.modalWidth = modalWidth;
    this.style.modalDialogWidth = modalDialogWidth;
    this.style.radio = radio;
    this.style.hideSearch = hideSearch;
    this.style.hideChoice = hideChoice;
    this.style.setRequire = setRequire;

    return this;
  }

  let out = function out(v) {
    console.log('%c'+v, 'padding: 1%; font-weight: bold; background: black; color: gold;');
  }

  let getArray = function getArray(value) {
    if (!(value instanceof Array))
      value = [value];
    return value;
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
            $('#row_modern').remove();
            $('#row_ogbuStyle').remove();
            delete M;
            console.log('Удалено');
          }
        }, 1000);
      }
    }, 1000);
  };

  function start() {
    deleteModern();

    $('head').append($('<style id="row_ogbuStyle">'));
  }

  function style(func, args) {
    if (typeof func == 'object') {
      for (let f in func) {
        this.style[f](func[f]);
      }
    } else {
      this.style[func](args);
    }
    return this;
  }

  function addStyle(css) {
    let style = this.element;
    if (style.text().indexOf(css) == -1) {
      style.text(style.text() + css);
    }
    return this;
  }

  function modalBackground(color) {
    this.addStyle.call(this, '.modal-backdrop { display: none!important; }\r\n'
      +'.modal { background: '+(color || 'rgba(0, 0, 0, .5)')+'!important; }\r\n');
  }

  function modalWidth(width) {
    this.addStyle.call(this, '.modal-dialog--petition > .modal-content { max-width: '
      +(width || '80%')+'!important; width: '+(width || '80%')+'!important; }\r\n');
  }

  function modalDialogWidth(width) {
    this.addStyle.call(this, '.modal .modal-dialog { max-width: '+(width || '80%')+'!important; }\r\n');
  }

  function radio(font) {
    this.addStyle.call(this,
      '.attr-field--layout > * { display: block!important; width: 100%!important; }\r\n'
      +'.attr-field--layout > *:first-child { margin-bottom: 2vh;'
      +(font || '')+' }\r\n.attr-field--layout > *:nth-child(2) { margin-left: 5%; }\r\n'
      +'.attr-field--layout .attr-label-title-wrapper { white-space: normal; }\r\n');
  }

  function hideSearch(code) {
    let style = this;
    M.out('hideSearch is started!');
    M.out('code = '+code);
    M.out('style.parent.code = '+style.parent.code);
    console.dir(M.getArray(code || style.parent.code));
    $.each(M.getArray(code || style.parrent.code), function(){
      M.out('element = '+this);
      style.addStyle.call(style, (this ? '#row_'+this : '') + ' .bs-searchbox { display: none; }\r\n');
    });
  }

  function hideChoice(code) {
    let style = this;
    M.out('hideChoice is started!');
    M.out('code = '+code);
    M.out('style.parent.code = '+style.parent.code);
    console.dir(M.getArray(code || style.parent.code));
    $.each(M.getArray(code || style.parent.code), function(){
      M.out('element = '+this);
      style.addStyle.call(style, (this ? '#row_'+this : '') + ' li:first-child { display: none; }\r\n');
    });
  }

  function setRequire(require) {
    let requireObject = new Object();
    M.out('setRequire is started!');
    if (require instanceof Array || typeof require == 'boolean') {
      require = M.getArray(require);
      $.each(M.getArray(this.parent.code), function(i){
        requireObject[this] = require[i];
      });
    } else {
      requireObject = require;
    }
    console.dir(requireObject);
    for (req in requireObject) {
      M.out(req+' = '+requireObject[req].toString());
      $('#id_'+req).attr('ismandatory', requireObject[req].toString());
      $('#caption_'+req)[(requireObject[req] ? 'add' : 'remove')+'Class']('required');
    }
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
  Modern.getArray = getArray;

  window.M = window.Modern = Modern;
  start();
}());
