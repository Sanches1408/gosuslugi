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
    this.style.editCell = editCell;

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
      $('#id_'+o).val('Не все поля заполнены');
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

  let deleteAddress = function deleteAddress(v) {
    let elem = $('textarea', $(v).closest('.attr-field'));
    $(elem).val('').prev().val('').closest('.attr-field--filled').removeClass('attr-field--filled');
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
    this.addStyle.call(this, '.modal-backdrop:not(.loader) { display: none!important; }\r\n'
      +'.modal { background: '+(color || 'rgba(0, 0, 0, .5)')+'!important; }\r\n');
  }

  function modalWidth(width) {
    this.addStyle.call(this, '.modal-dialog--petition > .modal-content { max-width: '
      +(width || '80%')+'!important; width: '+(width || '80%')+'!important; }\r\n'
      +'aside { width: 150px!important; }\r\n');
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
      .attr('readonly', '');
  }

  function editCell() {
    let style = this;
    if (this.name == 'Modern')
      style = this.style;
    style.addStyle.call(style, '.modern-edit { color: silver; cursor: pointer; }\r\n'
      +'.modern-edit:hover { color:  #0063b0; }\r\n.modern-edit::after { content: ""; }\r\n');
    M.timers.push(setInterval(function(){
      $.each($('.table td'), function(){
        if ($(this).text().trim() == '') {
          $(this).html('<span class="table-action--edit modern-edit">Открыть для просмотра/редактирования</span>');
        }
      });
    }, 100));
  }

  function address(args) {
    let addr = M.getObject.call(this, args);
    var element = '<div class="table-actions" style="text-align: right; padding: 2vh 0 0;">'
          +'<a class="btn btn-default" title="Удалить адрес" onclick="M.deleteAddress(this);">'
          +'Очистить адрес</a></div>',
        args = ['10344729@SXClass', '11309207@SXClass'];
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
        $('#id_addrText').on('input', function(){
          let bool = false;
          if ($(this).val().trim() == '') {
            bool = true;
          }
          (new M(mandatory)).style.setRequire(bool);
        }).attr('found', '1').trigger('input');
      }
      $.each($('textarea'), function(){
        try {
          let id = $(this).attr('onclick').split("'")[1].split("'")[0];
          if ((id == args[0] || id == args[1]) && !+$(this).attr('butDel')) {
            $($(this).closest('.attr-field')).append($(element));
            $(this).attr('butDel', '1');
          }
        } catch(e) {}
      });
    }, 100));
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


  function autocomplete(v, v2) {
    if (!$('#row_'+v).length)
      $('body').append($('<script>').attr({'src': 'download/doc/upload/'+v+'.js', 'id': 'row_'+v}));
    M.timers.push(setInterval(function(){
      let elem = $('#row_'+v2);
      if (elem.length && !+elem.attr('autocomplite')) {
        $('li:not(:first-child)', elem).click(function(){
          let f = M.dictionary.list[v],
              text = $(this).text().trim();
          for (code in f[text]) {
            if (f[text][code] instanceof Array) {
              M.dictionary.hideAttr([code], 0);
              $('#row_'+code).show();
              let bool = f[text][code].length == 1;
              $.each(f[text][code], function(){
                let elem = $(M.dictionary.getElems(code, this)[1]);
                elem.show();
                if (f[text][code].length == 1)
                  $('a', elem).trigger('click');
              });
            } else {
              $('#row_'+code+' .attr-field').addClass('attr-field--filled');
              $('#id_'+code).val(f[text][code]);
            }
            (new M(code)).style.setRequire(true);
          }
        });
        elem.attr('autocomplite', '1');
      }
    }, 500));
  }


  function notice(v) {
    $('body').append($('<div id="modernDialog" class="modal modal--alert in" tabindex="-1" role="alertdialog"'
      +'aria-hidden="true" style="display: block; padding-right: 17px; z-index: 1050; background: rgba(0, 0, 0, .5);">'
      +'<div class="modal-dialog">'
      +'<button type="button" class="modal-close" data-behavior="closeWidgetModal" '
      +'onclick="$(\'#modernDialog\').remove();"></button>'
      +'<div class="modal-content">'
      +'<header class="modal-header"><h1 class="modal-title">Уведомление</h1></header>'
      +'<div class="modal-body">'+v+'</div></div><div class="modal-footer">'
      +'<button type="button" class="btn btn--accept btn--cancel btn-primary" '
      +'onclick="$(\'#modernDialog\').remove();">Ок</button>'
      +'</div></div></div>'));
  }


  function addNote(v, e) {
    e = e ? e : '[data-grpid="qPetit"]';
    (new M()).style.addStyle('.alert > a { display: block; margin: 2vh 0 0 0; }\r\n');
    $(e).prepend('<div class="alert alert-warning"><strong class="alert-title">Примечание</strong>'+v+'</div>');
  }


  function timeFromDictionary(id1, id2, b) {
    new Promise(function(resolve){
      if ($('#row_'+id1).length && $('#row_'+id2).length)
        resolve(1);
    }).then(function(){
      var list1 = $('#row_'+id1+' li:not(:first-child)'),
          list2 = $('#row_'+id2+' li:not(:first-child)');
      if (b) {
        $(list1[list1.length-1]).hide();
      }
      $.each(list1, function(i, v){
        $(v).click(function(){
          var index = $(this).attr('data-original-index');
          list2.show();
          $.each(list2, function(i, v){
            if ($(v).attr('data-original-index') <= index)
              $(v).hide();
          });
        });
      });
    });
  }

  function fixBySection(n, t) {
    M.timers.push(setInterval(function(){
      if ($('.subgroup-num').text().trim() != '') {
        clearInterval(M.timers[M.fixTimer]);
        $('.subgroup-num').each(function(){
          if (+$(this).text() == n) {
            var sectionN = $('<div>').addClass('subgroup-num').text(n+1),
              sectionT = $('<div>')
              .addClass('subgroup-title subgroup-title__top')
              .append($('<span>').addClass('subgroup-title-text').text(t));
            $(this).parent().next().prepend(sectionT).prepend(sectionN);
          }
        });
      }
    }, 1000));
    M.fixTimer = M.timers.length - 1;
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
  Modern.autocomplete = autocomplete;
  Modern.deleteAddress = deleteAddress;
  Modern.notice = notice;
  Modern.addNote = addNote;
  Modern.timeFromDictionary = timeFromDictionary;
  Modern.fixBySection = fixBySection;

  window.M = window.Modern = Modern;
  start();
}());
