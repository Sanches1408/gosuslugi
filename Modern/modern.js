;(function(){

  let version = '1.4';

  function Modern(code) {

    this.version = version;
    this.name = "Modern";
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
    this.getObject = getObject;

    this.style = style;
    this.style.name = "Style";
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
    this.style.setHelper = setHelper;
    this.style.readOnly = readOnly;

    this.address = address;
    this.address.name = "Address";
    this.address.parent = this;

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

  let getObject = function getObject(value) {
    let tempObj = new Object();
    if (this.code !== undefined) {
      value = M.getArray(value);
      $.each(M.getArray(this.code), function(i){
        tempObj[this] = value[i] || value[0];
      });
    } else {
      tempObj = value;
    }
    return tempObj;
  }

  let summary = function summary(obj) {
    for (let o in obj) {
      (new M()).style.readOnly(o);
      $.each(obj[o], function(){
        $('#id_'+this).change(function(){
          let summ = 0;
          $.each(obj[o], function(){
            summ += parseFloat($('#id_'+this).val().trim().replace(',', '.'));
          });
          $('#id_'+o).val(summ.toFixed(2).toString().replace('NaN', 'Не все поля заполнены'))
            .closest('.attr-field').addClass('attr-field--focused');
        });
      });
    }
  }


  let deleteModern = function deleteModern(){
    let timer = setInterval(function(){
      if ($('#row_recipientOrg').length) {
        let hash = parseInt(Math.floor(Math.random() * 100));
        $('#row_recipientOrg').attr('hash', hash);
        M.activePetition = hash;
        clearInterval(timer);
        timer = setInterval(function(){
          if (!$('.modal-dialog--petition').length) {
            $.each(M.timers, function(){
              clearInterval(this);
            });
            clearInterval(timer);
            $('#row_modern').remove();
            $('#row_ogbuStyle').remove();
            delete M;
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
    if (this.name == 'Modern')
      style = this.style;
    $.each(M.getArray(code || style.parrent.code), function(){
      style.addStyle.call(style, (this ? '#row_'+this : '') + ' .bs-searchbox { display: none; }\r\n');
    });
  }

  function hideChoice(code) {
    let style = this;
    if (this.name == 'Modern')
      style = this.style;
    $.each(M.getArray(code || style.parent.code), function(){
      style.addStyle.call(style, (this ? '#row_'+this : '') + ' li:first-child { display: none; }\r\n');
    });
  }

  function setRequire(require) {
    let requireObject = M.getObject.call(this.parent, require);
    for (req in requireObject) {
      $('#id_'+req).attr('ismandatory', requireObject[req].toString());
      $('#caption_'+req+' > span')[(requireObject[req] ? 'add' : 'remove')+'Class']('required');
    }
  }

  function setHelper(helper) {
    helper = M.getObject.call(this.parent, helper)
    for (code in helper) {
      $('[data-attrname="'+code+'"]').append(
        $('<div>').addClass('attr-value-helper').text(helper[code])
      );
    }
  }

  function readOnly(code) {
    $('.attr-field', $('#row_'+code)).addClass('attr-field--readonly attr-field--filled');
    $('#id_'+code).addClass('readonly attr-value-el--filled')
      .attr('readonly', '').val('Не все поля заполнены');
  }

  function address(args) {
    let addr = M.getObject.call(this, args);
    M.timers.push(setInterval(function(){
      let mandatory = [];
      if ($('#row_addrText').length && !+$('#id_addrText').attr('found')) {
        for (code in addr) {
          let elem = $('#row_'+code);
          if (addr[code].hasOwnProperty('setHelper') && !+elem.attr('setHelper')) {
            (new M(code)).style.setHelper(addr[code]['setHelper']);
          }
          if (addr[code].hasOwnProperty('setRequire') && !+elem.attr('setRequire')) {
            mandatory.push(code);
          }
        }
        $('#id_addrText').change(function(){
          let bool = false;
          if ($(this).val().trim() == '') {
            bool = true;
          }
          (new M(mandatory)).style.setRequire(bool);
        }).attr('found', '1').trigger('change');
      }
    }, 1000));
    return this;
  }


  function dictionary(v, v2, b) {
    if (v) {
      new Promise(function(resolve){
        if (!$('#'+v).length)
          $('body').append($('<script>').attr({'src': 'download/doc/upload/'+v+'.js', 'id': v}));
        let timer = setInterval(function(){
          if (M.dictionary) {
            clearInterval(timer);
            resolve(1);
          }
        }, 100);
      }).then(function(){
        M.dictionary.searchAttr(v, v2, b);
      });
    }
  }

  function searchAttr(vDic, vArr, vBool) {
    let v = vDic, v2 = vArr;
    M.timers.push(setInterval(function(){
      let bool = true;
      $.each(v2, function(i){
        if (!$('#row_'+v2[i]).length || +$('#row_'+v2[i]).attr('dicAction')) {
          bool = false;
        } else if ($('#row_'+v2[i]).length && !+$('#row_'+v2[i]).attr('dicAction') && vBool) {
          bool = true;
          if (!vBool[0]) vBool = [];
          vBool.push(i-1);
        }
      });
      if (bool) {
        $.each(v2, function(i){ $('#row_'+v2[i]).attr('dicAction', '1'); });
        let obj = M.dictionary.list[v];
        $.each(v2, function(i){
          if (vBool && vBool[0] == i) {
            $('#row_'+v2[vBool[0]]+' li:first-child').click(function(){
              M.dictionary.hideAttr(v2, vBool[0]+1);
            });
          } else {
            let p = $('#row_'+this), c = $('button', p);
            if (c.length)
              c = c.attr('title').trim();
            else
              c = $($('input', p)[0]).val();
            if (c == 'Выберите' || c == '') {
              if (i) {
                p.hide();
              } else {
                (new M(this)).style.setRequire(true);
              }
            } else {
              obj = obj[c];
              if (obj) {
                $(M.dictionary.getLiOrCheck(vArr[obj.lvl])[1]).hide();
                let a = M.dictionary.getAttr(vArr, obj);
                for (let i = 1; i < a.length; i++) {
                  $(a[i]).show();
                }
              }
              (new M(this)).style.setRequire(true);
            }
          }
        });
        M.dictionary.setAction(v, v2);
      }
    }, 100));
  }

  function setAction(vDic, vArr) {
    let v = vArr, d = vDic;
    function recursive(list) {
      let bool = false, key;
      for (key in list) {
        bool = true;
        if (key != 'lvl' && recursive(list[key])) {
          $(M.dictionary.getElems(v[list.lvl], key)).click(
            {k: key, l: list, v: v},
            function(o) {
              M.dictionary.hideAttr(o.data.v, o.data.l.lvl+1);
              let arr = M.dictionary.getAttr(o.data.v, o.data.l[o.data.k]),
                r = $('.attr-value', arr[0]);
              if (r.length > 1)
                r = $(r[0]);
              (new M(r.attr('data-attrname'))).style.setRequire(true);
              $.each(arr, function(){ $(this).show(); });
              if (arr.length == 2) $('a', arr[1]).trigger('click');
            }
          );
        } else if (key != 'lvl') {
          $(M.dictionary.getElems(v[list.lvl], key)).click(
            {k: key, l: list, v: v},
            function(o) {
              M.dictionary.hideAttr(o.data.v, o.data.l.lvl+1);
              (new M(o.data.v[o.data.l.lvl])).style.setRequire(true);
            }
          );
        }
      }
      return bool;
    }
    recursive(M.dictionary.list[d]);
  }

  function getAttr(v, list) {
    let arr = [], key, a;
    for (key in list) {
      if (key != 'lvl') {
        a = M.dictionary.getElems(v[list.lvl], key);
        if (arr.length) {
          arr.push(a[1]);
        } else {
          arr = [a[0], a[1]];
        }
      }
    }
    return arr;
  }

  function getElems(v, text) {
    let e = M.dictionary.getLiOrCheck(v);
    $.each(e[1], function(i){
      if ($(e[1][i]).text().trim() == text) {
        e[1] = e[1][i];
        return false;
      }
    });
    return e;
  }

  function getLiOrCheck(v) {
    let e = [$('#row_'+v)];
    e[1] = $('.checkbox', e[0]);
    e[2] = $('.checkbox input:checked', e[0]);
    if (!e[1].length) {
      e[1] = $('li:not(:first-child)', e[0]);
      e[2] = $('li:first-child a', e[0]);
    }
    return e;
  }

  function hideAttr(v, l) {
    for (let i = l; i < v.length; i++) {
      let arr = M.dictionary.getLiOrCheck(v[i]);
      $.each(arr, function(j){
        if (j == 2)
          $(this).trigger('click');
        else
          $(this).hide();
      });
      (new M(v[i])).style.setRequire(false);
    }
  }

  dictionary.list = {};
  dictionary.searchAttr = searchAttr;
  dictionary.setAction = setAction;
  dictionary.getAttr = getAttr;
  dictionary.getElems = getElems;
  dictionary.hideAttr = hideAttr;
  dictionary.getLiOrCheck = getLiOrCheck;

  /*
   * Veriables
   */
  Modern.version = version;
  Modern.activePetition = null;
  Modern.timers = [];

  /*
   * Style
   */
  /*
   * Functions
   */
  Modern.out = out;
  Modern.getArray = getArray;
  Modern.getObject = getObject;
  Modern.summary = summary;
  Modern.dictionary = dictionary;

  window.M = window.Modern = Modern;
  start();
}());
