;(function(){
  if (!this.M) {
    function modern() {

    }
    /*
    /
    /
    /   ***MAIN***
    /
    /
    */
    function ready(elem, resolve){
      var maxIter = 5, iter = maxIter, el = 0;
      M.timerReady[M.timerIndex++] = setInterval(function(index){
        if (iter) {
          var l = $(elem).length;
          if (l != el) {
            iter = maxIter;
            el = l;
          } else {
            iter--;
          }
        } else {
          clearInterval(M.timerReady[index]);
          if (resolve) resolve(1);
        }
      }, 100, M.timerIndex-1);
    }
    /*
    /
    /
    /   ***STYLE***
    /
    /
    */
    function style(v) {
      if (typeof this.style[v] == 'function') {
        this.style[v]();
      } else {
        switch (v) {
          case 'default':
            with (this.style) {
              modalBackground();
              modalWidth();
              modalDialogWidth();
              radio();
            };
            break;
          case 'mini':
            with(this.style) {
              hideSearch();
              hideChoice();
              radio();
            }
            break;
          default:
            for (method in this.style) {
              this.style[method]();
            }
        }
      }
    }

    function addStyle(v) {
      this.element.text(this.element.text() + v);
    }

    function modalBackground() {
      this.addStyle(
        '.modal-backdrop { display: none!important; }\r\n'
        +'.modal { background: rgba(0, 0, 0, .5)!important; }\r\n'
      );
    }

    function modalWidth(v) {
      var w = (v) ? v : '80%';
      this.addStyle(
        '.modal-dialog--petition > .modal-content { max-width: '
        +w+'!important; width: '+w+'!important; }\r\n'
      );
    }

    function modalDialogWidth(v) {
      var w = (v) ? v : '80%';
      this.addStyle(
        '.modal .modal-dialog { max-width: '+w+'!important; }\r\n'
      );
    }

    function radio(v) {
      var f = (v) ? ' font-weight: bold;' : '';
      this.addStyle(
        '.attr-field--layout > * { display: block!important; width: 100%!important; }\r\n'
        +'.attr-field--layout > *:first-child { margin-bottom: 2vh;'+f+' }\r\n'
	      +'.attr-field--layout > *:nth-child(2) { margin-left: 5%; }\r\n'
	      +'.attr-field--layout .attr-label-title-wrapper { white-space: normal; }\r\n'
      );
    }

    function hideSearch(v){
      var p = (v) ? v+' ' : '';
      this.addStyle(
        p + '.bs-searchbox { display: none; }\r\n'
      );
    }

    function hideChoice() {
      clearInterval(this.timerChoice);
      this.timerChoice = setInterval(function(){
        $($('.text:contains("Выберите")').closest('li')).hide();
      }, 100);
    }
    // Фиксит ошибку отображения заголовка у группы, у которой нет атрибутов
    // принимает значения: номер группы, после которой находится проблемная группа
    // и текст заголовка
    function fixBySection(n, t) {
      new Promise(function(resolve){
        M.ready('.subgroup-num', resolve);
      }).then(function(){
        new Promise(function(resolve){
          var timer = setInterval(function(){
            if (+$($('.subgroup-num')[0]).text()) {
              clearInterval(timer);
              if (resolve) resolve(1);
            }
          }, 100);
        }).then(function(){
          $('.subgroup-num').each(function(){
            if (+$(this).text() == n) {
              var sectionN = $('<div>').addClass('subgroup-num').text(n+1),
                sectionT = $('<div>')
                .addClass('subgroup-title subgroup-title__top')
                .append($('<span>').addClass('subgroup-title-text').text(t));
              $(this).parent().next().prepend(sectionT).prepend(sectionN);
            }
          });
        });
      });
    }

    function require(elem, bool) {
      $('#id_'+elem).attr('ismandatory', bool.toString());
      $('#caption_'+elem)[(bool ? 'add' : 'remove')+'Class']('required');
    }
    /*
    /
    /
    /   ***ADDRESS***
    /
    /
    */
    function addr(v, a) {
      if (typeof this.addr[v] == 'function') {
        this.addr[v](a);
      } else {
        switch (v) {
          case 'default':
            with (this.addr) {
              buttonDelete(a);
              timerButton();
              timerFormat();
            };
            break;
          default:
            for (method in this.addr) {
              if (method != 'actionDelete')
                this.addr[method]();
            }
        }
      }
    }

    function actionDelete(v) {
      if (!v) return;
      var d = $(v).closest('.attr-field');
      $(d).removeClass('attr-field--filled');
      $('input', $(d)).removeClass().val('');
      $('textarea', $(d)).removeClass('attr-value-el--filled').val('');
    }

    function addButton(b, arg) {
      clearInterval(this.timerButton);
      this.timerButton = setInterval(function(){
        $('textarea').each(function(){
          var a = window.M.addr;
          var t = $(this).attr('onclick').split("'")[1];
          if ((t == a.arg[0] || t == a.arg[1]) && !+$(this).attr('butDel')) {
            $($(this).closest('.attr-field')).append($(a.element));
            $(this).attr('butDel', '1');

            if (b) {
              $(this).click(function(){
                M.addr.formatLink = $(this);
                M.addr.text = null;
                new Promise(function(resolve){
                  M.ready('[id*="webWmAddress"] .subgroups-list tbody > tr', resolve);
                }).then(function(){
                  var v = $('#id_addrText').val().replace(/\s/g, '');
                  if (v == '') {
                    $.each(arg, function(i, v){
                      M.style.require(v, true);
                    });
                  } else {
                    M.addr.text = v;
                  }
                  $('#id_addrText').change(function(){
                    M.addr.text = $(this).val().replace(/\s/g, '');
                    var bool = true;
                    if (M.addr.text && M.addr.text != '') {
                      bool = false;
                    }
                    $.each(arg, function(i, v){
                      M.style.require(v, bool);
                    });
                  });
                  var save = $('[id*="webWmAddress"] button:contains("Сохранить")');
                  save.attr('onclick', 'M.addr.save(); '+save.attr('onclick'));
                });
              });
            }
          }
        });
      }, 100);
    }

    function save() {
      if (M.addr.timerSave) clearInterval(M.addr.timerSave);
      else if (M.addr.text && M.addr.text != '') {
        M.addr.timerSave = setInterval(function(){
          console.log('timer');
          var v = M.addr.formatLink.val(), v2 = M.addr.text;
          if (v.search(v2) != -1 && v.length != v2.length) {
            clearInterval(M.addr.timerSave);
            M.addr.formatLink.val(v2);
          }
        }, 100);
      }
    }
    /*
    /
    /
    /   ***DATE AND TIME***
    /
    /
    */
    function dateAndTime(v, id1, id2) {
      if (typeof this.dateAndTime[v] == 'function') {
        this.dateAndTime[v](id1, id2);
      } else {
        switch (v) {
          case 'default':
            with (this.dateAndTime) {
              timeFromDictionary(id1, id2);
            };
            break;
          default:
            for (method in this.dateAndTime) {
              this.dateAndTime[method]();
            }
        }
      }
    }
    // Функция для выпадающего списка, где поля - время в виде: 09:00, 15:00.
    // Принимает коды справочников, сравнивает оба поля и убирает возможность
    // выбрать меньшее время во втором
    function timeFromDictionary(id1, id2, b) {
      new Promise(function(resolve){
        M.ready('#row_'+id1+' li', resolve);
      }).then(function(){
        new Promise(function(resolve){
          M.ready('#row_'+id2+' li', resolve);
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
      });
    }
    /* ---===STYLE===--- */
    $('head').append($('<style id="ogbuStyle">'));
    style.element = $('#ogbuStyle');
    style.addStyle = addStyle;
    style.timerChoice = null;

    style.modalBackground = modalBackground;
    style.modalWidth = modalWidth;
    style.modalDialogWidth = modalDialogWidth;
    style.radio = radio;
    style.hideSearch = hideSearch;
    style.hideChoice = hideChoice;
    style.fixBySection = fixBySection;
    style.require = require;

    /* ---===ADDRESS===--- */
    addr.element = '<div class="table-actions" style="text-align: right; padding: 2vh 0 0;">'
      +'<a class="btn btn-default" title="Удалить адрес" onclick="window.M.addr.actionDelete(this);">'
      +'Очистить адрес</a></div>',
    addr.arg = ['10344729@SXClass', '11309207@SXClass'];
    addr.timerButton = null;
    addr.timerFormat = null;
    addr.text = null;
    addr.formatLink = null;
    addr.timerSave = null;

    addr.actionDelete = actionDelete;
    addr.addButton = addButton;
    addr.save = save;

    /* ---===DATE AND TIME===--- */
    dateAndTime.timeFromDictionary = timeFromDictionary;

    /* ---===MAIN===---*/
    modern.version = '1.0.4';
    modern.style = style;
    modern.addr = addr;
    modern.dateAndTime = dateAndTime;
    modern.ready = ready;
    modern.timerReady = [];
    modern.timerIndex = 0;
    window.M = modern;
  }
}());
