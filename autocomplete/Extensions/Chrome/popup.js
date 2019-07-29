document.addEventListener('DOMContentLoaded', function() {
    var go = document.getElementById('go');
    go.addEventListener('click', function(tab) {
      chrome.tabs.executeScript({
        code: ';('+execute.toString()+')();'
      });
    }, false);
}, false);

var execute = function execute(){
  var setValue = {
    elem: {
       dom: null,
     input: null,
      name: null,
      code: null,
      mask: null,
      rExp: null,
      type: null
    },
    types: {
      'string': '> input[type=text]',
      'date': '.attr-value-datepicker > input[attrtype="5"]',
      'modal': '> input + textarea',
      'select': '.bootstrap-select',
      'checkbox': '.checkbox-group',
      'check': '> .checkbox input:nth-of-type(2)',
      'table': '> .table-container',
      'text': '> textarea',
      'radio': '.radio'
    },
    _init: _init,
    print: print,
    getElems: getElems,
    getType: getType,
    clearRegExp: clearRegExp,
    correctValue: correctValue,
    getDate: getDate,
    filled: filled,
    setValue_string: setValue_string,
    setValue_check: setValue_check,
    // setValue_date: setValue_date,
    setValue_text: setValue_text
  };

  function print() {
    var str = 'Атрибут "'+this.elem.name+'" ('+this.elem.code+')'
      +' имеет свойства: mask = ' + (this.elem.mask ? this.elem.mask.substr(0, 10) : 'null')
      +', type = ' + this.elem.type;
    if ( this.elem.type )
      console.log(str);
    else
      console.log('%c'+str, 'color: gold; text-shadow: 1px 1px 1px black;');
    console.log(this.elem.dom);
  };

  function _init() {
    console.log('%cAutocomplete initialize', 'background: black; color: gold; font-weight: bold;');
    var index = 2,
        elems = true;
    while ( elems = this.getElems() ) {
      for ( i = 0; i < elems.length; i++ ) {
        var name = elems[i].querySelector('label').textContent.trim(),
            code = elems[i].id.split('_')[1],
            [input, type] = this.getType(elems[i]),
            mask = input && input.getAttribute('mask'),
            rExp = mask && mask.search('RegExp') > -1;

        this.elem = {
           dom: elems[i],
         input: input,
          name: name,
          code: code,
          mask: mask,
          rExp: rExp,
          type: type
        };

        this.print();

        var method = 'setValue_' + this.elem.type;
        if ( method in this ) {
          this[method]();
        }
      }
      break;
    }
    console.log('Petition autocomplete!');
  };

  function getElems() {
    var elems = document.querySelectorAll('.attr-row:not([hidden])');
    console.log('Elements is found: '+elems.length);
    return elems;
  };

  function getType(elem) {
    var type = null,
        e    = null;
    for ( var key in this.types ) {
      var e = elem.querySelector('.attr-value '+this.types[key]);
      if ( e ) {
        type = key;
        break;
      }
    }
    return [e, type];
  };

  function clearRegExp(){
    var mask = this.elem.mask;
    if ( mask && this.regExp ) {
      mask = mask.split('RegExp=')[1];
      if ( mask.search( '^' ) > -1 )
        mask = mask.split('^')[1];
      if ( mask.search( '$' ) > -1 )
        mask = mask.split('$')[0];
    }
    return mask;
  };

  function correctValue(){
    // FIXME: value's is reset in Chrome
    var str = null;
    if ( this.elem.rExp ) {
      while (true) {
        str = prompt("Значение поля:\r\n\""+this.elem.name+"\" ("+this.elem.code
              +")\r\nзадается регулярным выражением:\r\n\r\n"
              +this.clearRegExp()+"\r\n\r\nВведите значение для заполнения поля.\r\n\r\n"
              +"(для отмены ничего не вводите)\r\n\r\n");
        if ( !str || !str.length )
          return;
        str = new RegExp(this.clearRegExp()).exec(str);
        if ( str ) {
          str = str[0];
          break;
        }
      }
    } else {
      str = this.elem.mask.replace(/x/g,'1');
    }
    return str;
  };

  function getDate(){
    var now = new Date();
    function g(v) {
      return (v < 10 ? '0'+v : v);
    }
    now = g(now.getDate())+'.'+g(now.getMonth()+1)+'.'+now.getFullYear();
    return now;
  };

  function filled(){
    this.elem.dom.querySelector('.attr-field').classList.add('attr-field--filled');
  };

  function setValue_string(){
    var str = '1';
    if ( this.elem.mask )
      str = this.correctValue();
    if ( str ) {
      this.elem.input.value = str;
      this.filled();
    }
  };

  function setValue_check(){
    console.log(this.elem.input.checked);
    if ( !this.elem.input.checked ) {
      this.elem.input.click();
    }
  };

  function setValue_date(){
    /* FIXME: is correct for Firefox, but not correct for Chrome?
     *
     */
    this.elem.input.value = this.getDate();
    var selector = '#id_'+this.elem.code,
        value    = (+new Date()).toString().substr(0, 8)+'00000';
    this.elem.dom.querySelector(selector).value = value;
    this.filled();
  };

  function setValue_text() {
    this.setValue_string();
  };

  setValue._init();
};
