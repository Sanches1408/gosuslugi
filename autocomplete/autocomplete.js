;(function(){

  var setValue = {
    elem: null,
    type: null,
    mask: null,
    regExp: null,
    clearRegExp: function(){
      var mask = this.mask;
      if ( mask && this.regExp ) {
        mask = mask.split('RegExp=')[1];
        if ( mask.search( '^' ) > -1 )
          mask = mask.split('^')[1];
        if ( mask.search( '$' ) > -1 )
          mask = mask.split('$')[0];
      }
      return mask;
    },
    correctValue: function(){
      var str = null;
      if ( this.regExp ) {
        while (true) {
          str = prompt("Значение поля задается регулярным выражением:\r\n\r\n"
                +setValue.clearRegExp()+"\r\n\r\nВведите значение для заполнения поля.\r\n\r\n"
                +"(для отмены ничего не вводите)\r\n\r\n");
          if ( !str || !str.length )
            return;
          str = new RegExp(setValue.clearRegExp()).exec(str);
          if ( str ) {
            str = str[0];
            break;
          }
        }
      } else {
        str = setValue.mask.replace(/x/g,'1');
      }
      return str;
    },
    setValue_string: function(){
      var str = '1';
      if ( this.mask )
        str = this.correctValue();
      $(this.elem).val(str);
    },
    setValue_check: function(){
      if ( !$(this.elem).prop('checked') ) {
        $(this.elem).trigger('click');
      }
    },
  };

  var getType = function getType(elem){
    var types = {
      'string': '> input[type=text]',
      'date': '.attr-value-datepicker > input[attrtype="5"]',
      'modal': 'textarea',
      'select': '.bootstrap-select',
      'checkbox': '.checkbox-group',
      'check': '> .checkbox input:nth-of-type(2)',
      'table': '> .table-container'
    };
    for ( var key in types ) {
      var el   = $('.attr-value '+types[key], $(elem)),
          mask = null;
      if ( el.length ) {
        setValue.elem = el;
        setValue.type = key;
        setValue.mask = el.attr('mask');
        setValue.regExp = setValue.mask && setValue.mask.search('RegExp') > -1;
        return false;
      }
    }
    return true;
  };

  $.each( $('.attr-row:visible'), function(i){
    var name = $('label', $(this))[0].textContent.trim(),
        code = $(this).attr('id').split('_')[1];

    if ( getType(this) ) {
      alert('Тип поля "'+name+'" ('+code+') не определен');
    }

    console.log(i+'. Проверка поля "'+name+'" ('+code+'): type = '+setValue.type+', mask = '+setValue.mask);

    var method = 'setValue_'+setValue.type;
    if ( method in setValue ) {
      setValue[method]();
    }

  } );
}());
