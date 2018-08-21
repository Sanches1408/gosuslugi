;(function(){
  if (!this.M) {
    /**
     * modern() внедряет на страницу модульного окна, эмиттирующего терминал
     * для ввода команд, вывода ошибок и статусов
     *
     * @param <Boolean> v
     */
    function modern(v) {
      if (v) {
        let header = $('<header>');
        let section = $('<section>')
          .attr('onclick', '(function(){if(event.target.tagName != "P")$("input", $(this)).focus();}())')
          .append(
            $('<input>').attr('type', 'text')
            .attr('onkeyup', '(function(){if(event.keyCode==13){M.terminal($(".terminal input").val(), true);}}())')
          );
        $('body').append($('<div>').addClass('terminal').append(header).append(section));
        $('head').append($('<link>').attr({'rel':'stylesheet', 'href':'scripts/ogbu/style.css'}));
        $('.terminal input').focus(function(){
          $('.terminal').css('opacity', '1');
        }).blur(function(){
          $('.terminal').css('opacity', '.5');
        });
        M.terminal('Терминал запущен');
      }
    }

    function terminal(v, b) {
      if (b) {
        v = M.terminal.command(v);
      }
      if (v) M.terminal.stack.push(v);
      let input = $('.terminal input');
      if (input.length) {
        if (M.terminal.stack.length) {
          $.each(M.terminal.stack, function(i, v){
            setTimeout(function(){
              input.before($('<p>').html(v))
            }, (i+1)*100);
          });
          $('.terminal input').val('').focus();
          M.terminal.stack = [];
        }
      }
    }

    function command(v) {
      switch (v) {
        default: v = 'Нет такой команды: "'+v+'". Воспользуйтесь командой: "help".';
      }
      return v;
    }

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

    /**
     * isLoad() проверяет загруженность всех данных,
     * применяется в Promise()
     *
     * @param <Function> resolve
     */
    function isLoad(resolve) {
      var bool = false,
      timer = setInterval(function(){
        console.log('[TEST] timer isLoad start');
        if ($('.loader').length || bool) bool = true;
        if (bool && !$('.loader').length) {
          console.log('[TEST] timer isLoad closed');
          clearInterval(timer);
          if (resolve) resolve(1);
        }
      }, 100);
    }

    /**
     * deleteModern() удаляет блоки скрипта и стиля, которые были добавлены модулем
     */
    function deleteModern() {
      var timer = setInterval(function(){
        if (!$('.petition-form').length) {
          clearInterval(timer);
          $('[src*="modern.js"]').next().remove();
          $('[src*="modern.js"]').remove();
          $('#ogbuStyle').remove();
          $('.terminal').remove();
          clearInterval(M.style.timerChoice);
          clearInterval(M.addr.timerButton);
          delete window.M;
        }
      }, 100);
    }

    /**
     * isArray() проверяет допустимое значение и создает из него архив
     *
     * @param <String> or <Array> v
     * @param v проверяемый аргумент
     */
    function isArray(v) {
      if (typeof v === 'string') v = [v];
      else if (!(v instanceof Array) || !v) v = false;
      return v;
    }
    /**
     * style() применяет стилизацию для элементов страницы
     *
     * @param <String> v
     * @param v: название функции или строковый параметр,
     * в случае отсутствия аргумента вызываются все методы style()
     *
     * @param <String> or <Boolean> p
     * @param p: параметр передаваемый в метод
     */
    function style(v, p) {
      if (typeof this.style[v] == 'function') {
        this.style[v](p);
      } else {
        switch (v) {
          case 'default':
            with (this.style) {
              modalBackground();
              modalWidth();
              modalDialogWidth();
              hideChoice();
              radio();
            };
            break;
          case 'mini':
            with(this.style) {
              modalBackground();
              radio(p);
            }
            M.terminal('Применена стилизация: "mini".');
            break;
          default:
            for (method in this.style) {
              this.style[method]();
            }
        }
      }
    }

    /**
     * addStyle() добавляет стиль в контейнер #ogbuStyle
     *
     * @param <String> v
     * @param v строка css стилизации
     */
    function addStyle(v) {
      var t = this.element;
      if (t.text().indexOf(v) == -1)
        t.text(t.text() + v);
    }

    /**
     * modalBackground() устанавливает корректный фон для модульных окон
     *
     * @param <String> v
     * @param v: значение background (black, #032433, rgba(0, 0, 0, .75))
     */
    function modalBackground(v) {
      this.addStyle(
        '.modal-backdrop { display: none!important; }\r\n'
        +'.modal { background: '+(v ? v : 'rgba(0, 0, 0, .5)')+'!important; }\r\n'
      );
      M.terminal('[modalBackground] '+(v ? v : 'rgba(0, 0, 0, .5)'));
    }

    /**
     * modalWidth() устанавливает ширину заявления
     *
     * @param <String> v
     * @param v: значение ширины заявления (50%, 1000px, calc(100% - 250px))
     */
    function modalWidth(v) {
      this.addStyle(
        '.modal-dialog--petition > .modal-content { max-width: '
        +(v ? v : '80%')+'!important; width: '+(v ? v : '80%')+'!important; }\r\n'
      );
      M.terminal('[modalWidth] args: '+(v ? v : '80%'));
    }

    /**
     * modalDialogWidth() устанавливает ширину модульных окон
     *
     * @param <String> v
     * @param v: значение ширины модульного окна (50%, 1000px, calc(100% - 250px))
     */
    function modalDialogWidth(v) {
      this.addStyle(
        '.modal .modal-dialog { max-width: '+(v ? v : '80%')+'!important; }\r\n'
      );
      M.terminal('[modalDialogWidth] args: '+(v ? v : '80%'));
    }

    /**
     * radio() устанавливает корректное вертикальное отображение радиокнопок
     *
     * @param <Boolean> v
     * @param v: идентификатор полужирного начертания заголовка радиокнопок
     */
    function radio(v) {
      this.addStyle(
        '.attr-field--layout > * { display: block!important; width: 100%!important; }\r\n'
        +'.attr-field--layout > *:first-child { margin-bottom: 2vh;'
        +(v ? ' font-weight: bold;' : '')+' }\r\n.attr-field--layout > *:nth-child(2) { margin-left: 5%; }\r\n'
	      +'.attr-field--layout .attr-label-title-wrapper { white-space: normal; }\r\n'
      );
      M.terminal('[radio] args: '+(v ? 'font-weight: bold' : 'нет аргументов.'));
    }

    /**
     * hideSearch() скрывает блок поиска у выпадающего списка
     *
     * @param <String> or <Array> v
     * @param v: код родительского атрибута
     */
    function hideSearch(v){
      if (v = M.isArray(v)) {
        $.each(v, function(i){
          M.style.addStyle(
            (v[i] ? '#row_'+v[i] : '') + ' .bs-searchbox { display: none; }\r\n'
          );
        });
      }
      M.terminal('[hideSearch] args: '+(v ? JSON.stringify(v) : 'нет аргументов.'));
    }

    function hideChoice() {
      /*
      var f = function f(v){
        let e = $('#count'+v+'HideChoice');

        M.terminal('Элемент $("#count'+v+'HideChoice") '+(e.length ? '' : 'не')+' найден.');

        if (e.length) {
          if (v == 'Element') {
            return +e.text($('.text:contains("Выберите")').length);
          } else {
            return +e.text(+e.text()+1);
          }
        } else return 0;
      }
      */
      clearInterval(this.timerChoice);
      this.timerChoice = setInterval(function(){
/*
        let c = [f('Time'), f('Element')];
        M.terminal('\tЗначение: '+![f('Time'), f('Element')][0].toString());
        if (![f('Time'), f('Element')][0]) {
          M.terminal('[hideChoice] message: найдено элементов <span id="countElementHideChoice">'
            +$('.text:contains("Выберите")').length+'</span>'
            +', количество проходов <span id="countTimeHideChoice">0</span>.');
        }
*/
        $($('.text:contains("Выберите")').closest('li')).hide();
      }, 100);
    }

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
          }, 100);r
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

    function addHeightLineList(v) {
      $('#row_'+v+' li').click(function(){
        console.log('click');
      });
    }
    /**
     *
     */
    function compare(v1, v2, action) {
      var arr = [v1];
      if (M.compare.getType(v2)) arr.push(v2);

      $.each(arr, function(i, v){
        var id = '#row_'+v;

        switch (M.compare.getType(v)) {
          case 'textarea':
            break;
          case 'checkbox':
            break;
          case 'select':
            break;
          case 'string':
            break;
          case 'date':
            break;
          case 'radio':
            break;
        }
      });
    }

    function getType(v) {
      var type = false, id = '#row_'+v;

      if (!$(id).length) {
        type = false;
      } else if ($(id+' textarea').length) {
        type = 'textarea';
      } else if ($(id+' input[type="checkbox"]').length) {
        type = 'checkbox';
      } else if ($(id+' .selected').length) {
        type = 'select';
      } else {
        switch ($(id+' input').length) {
          case 1: type = 'string'; break;
          case 2: type = 'date'; break;
          case 3: type = 'radio'; break;
        }
      }

      return type;
    }

    function getVal(v) {
      var value = false, id = '#row_'+v;

      switch (this.getType(v)) {
        case 'textarea':
          value = $(id+' textarea').val().trim();
          break;
        case 'checkbox':
          value = $(id+' input[type="checkbox"]').prev().val() === 'true' ? true : false;
          break;
        case 'select':
          value = $(id+' .selected').text().trim();
          break;
        case 'string':
          value = $(id+' input').val().trim();
          break;
        case 'date':
          value = $($(id+' input')[1]).val();
          break;
        case 'radio':
          value = $($(id+' [value="'+$($(id+' input')[0]).val()+'"]')[1]).next().text().trim();
          break;
      }

      return value;
    }
    /*
    /
    /
    /   ***ADDRESS***
    /
    /
    */
    /*
    function addr(v, b, args) {
      if (typeof this.addr[v] == 'function') {
        this.addr[v](b, args);
      } else {
        switch (v) {
          case 'default':
            with (this.addr) {
              addButton(b, args);
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
      $('textarea', $(d)).removeClass('attr-value-el--filled').val('').attr('shortAddr','');
    }

    function addButton(b, args) {
      clearInterval(this.timerButton);
      this.timerButton = setInterval(function(){
        $('textarea').each(function(){
          var a = window.M.addr;
          var t = $(this).attr('onclick').split("'")[1];
          if ((t == a.arg[0] || t == a.arg[1]) && !+$(this).attr('butDel')) {
            $($(this).closest('.attr-field')).append($(a.element));
            $(this).attr('butDel', '1');

            if (b) {
              function o(v) {
                v = $(v).val().replace(/\s/g, '');
                if (v == '') v = null;
                return v;
              }
              $(this).change(function(){
                if ($(this).attr('shortAddr') != '')
                  $(this).val($(this).attr('shortAddr'));
              });
              $(this).click(function(){
                a.formatLink = $(this);
                new Promise(function(resolve){
                  M.ready('[id*="webWmAddress"] .subgroups-list tbody > tr', resolve);
                }).then(function(){
                  function n(b) {
                    $.each(args, function(i, v){
                      window.M.style.require(v, (b ? false : true));
                    });
                  }
                  n(o('#id_addrText'));
                  $('#id_addrText').change(function(){
                    a.formatLink.attr('shortAddr', o(this) ? o(this) : '');
                    $.each(args, function(i, v){
                      n(o('#id_addrText'));
                    });
                  });
                });
              });
            }

          }
        });
      }, 100);
    }
    */
    function addr() {

    }

    function searchAddress(b, b2){
      clearInterval(this.timerButton);
      this.timerButton = setInterval(function(){
        $('textarea').each(function(){
          let a = window.M.addr,
              t = $(this).attr('onclick').split("'")[1];
          if ((t == a.arg[0] || t == a.arg[1])) {
            if (b && !+$(this).attr('butDel')) {
              console.log('[TEST] delete button appended');
              M.addr.addButtonDelete(this);
            }
            if (b2 && !+$(this).attr('butClick')) {
              console.log('[TEST] action open address appended');
              actionOpenAddress(this);
            }
          }
        });
      }, 100);
    }

    function addButtonDelete(v) {
      $($(v).closest('.attr-field')).append($(this.element));
      $(v).attr('butDel', '1');
    }

    function actionDelete(v) {
      if (!v) return;
      var d = $(v).closest('.attr-field');
      $(d).removeClass('attr-field--filled');
      $('input', $(d)).removeClass().val('');
      $('textarea', $(d)).removeClass('attr-value-el--filled').val('').text('');
    }

    function actionOpenAddress(v) {

      $(v).attr('openAddr', '1');
    }

    function addressNotFound(v) {
      console.log('[TEST] Address is load!');
      v = M.isArray(v);
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
    /*
    /
    /
    /   ***NOTICE***
    /
    /
    */
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
      M.style.addStyle('.alert > a { display: block; margin: 2vh 0 0 0; }\r\n');
      $(e).prepend('<div class="alert alert-warning"><strong class="alert-title">Примечание</strong>'+v+'</div>');
    }

    function deleteNote(v) {
      if (!$(v).length) {
        var time = 0;
        var timer = setInterval(function(){
          if ($('.alert:contains("'+v+'")').length) {
            $('.alert:contains("'+v+'")').remove();
            clearInterval(time);
          }
          else time++;
          if (time > 50) clearInterval(timer);
        }, 100);
      }
    }
    terminal.command = command;
    terminal.stack = [];
    /**
     * ---===STYLE===---
     * @param <JQuery> element
     * @param element is container for style
     *
     * @param <Function> addStyle
     * @param addStyle is function for adding style in container
     *
     *
     */
    $('head').append($('<style id="ogbuStyle">'));
    style.element = $('#ogbuStyle');
    style.timerChoice = null;

    style.addStyle = addStyle;
    style.modalBackground = modalBackground;
    style.modalWidth = modalWidth;
    style.modalDialogWidth = modalDialogWidth;
    style.radio = radio;
    style.hideSearch = hideSearch;
    style.hideChoice = hideChoice;
    style.fixBySection = fixBySection;
    style.require = require;

    // ---===ADDRESS===---
    addr.element = '<div class="table-actions" style="text-align: right; padding: 2vh 0 0;">'
      +'<a class="btn btn-default" title="Удалить адрес" onclick="window.M.addr.actionDelete(this);">'
      +'Очистить адрес</a></div>',
    addr.arg = ['10344729@SXClass', '11309207@SXClass'];
    addr.timerButton = null;
    addr.formatLink = null;

    addr.actionDelete = actionDelete;
    addr.addButtonDelete = addButtonDelete;
    addr.searchAddress = searchAddress;
    addr.addressNotFound = addressNotFound;
    addr.actionOpenAddress = actionOpenAddress;

    compare.getVal = getVal;
    compare.getType = getType;
    /* ---===DATE AND TIME===--- */
    dateAndTime.timeFromDictionary = timeFromDictionary;

    notice.addNote = addNote;
    notice.deleteNote = deleteNote;
    /**
     * ---===Modern.JS===---
     * @param <String> версия модуля
     *
     * @param <Function> ready
     * @param ready: близится удаление метода
     *
     * @param <Function> isLoad
     * @param isLoad: проверка загрузки всех данных
     *
     * @param <Function> deleteModern
     * @param deleteModern удаляет все, что добавили через модуль
     */
    modern.version = '1.0.7';
    modern.ready = ready;
    modern.isLoad = isLoad;
    modern.deleteModern = deleteModern;
    modern.isArray = isArray;
    /**
     * @param <Function> style
     * @param style is function for style with method's
     *
     * @param <Function> addr
     * @param addr is function for address button and required with method's
     */
    modern.terminal = terminal;
    modern.style = style;
    modern.addr = addr;
    modern.compare = compare;
    modern.dateAndTime = dateAndTime;
    modern.notice = notice;
    modern.timerReady = [];
    modern.timerIndex = 0;
    window.M = modern;

    window.M.deleteModern();
  }
}());
