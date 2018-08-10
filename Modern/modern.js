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
        let out = $('<div>').addClass('out');
        let command = $('<div>').addClass('command');
        $('body').append($('<div>').addClass('terminal').append(out).append(command));
        window.M.style.addStyle(
          '.terminal { width: 300px; height: 400px; padding: 10px; background: black; opacity: 0.5; '
          +'position: fixed; left: 0; top: calc(50% - 200px); z-index: 999; }\r\n'
          +'.terminal:hover { opacity: 1; background: rgba(0, 0, 0, 0.5); }'
          +'.terminal::-webkit-scrollbar { width: 0; }'
          +'.out { width: 100%; height: 329px; background: url("scripts/ogbu/backgroundOut.png"); '
          +'border-bottom: 1px solid grey; box-shadow: inset 2px 2px 15px black, inset -2px -2px 15px black; }\r\n'
          +'.command { width: 100%; height: 50px; background: white; }\r\n'
        );
      }
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
        if ($('.loader').length || bool) bool = true;
        if (bool && !$('.loader').length) {
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

    // TODO FIXME: dublication on adding style
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
          this.addStyle(
            (v[i] ? '#row_'+v[i] : '') + ' .bs-searchbox { display: none; }\r\n'
          );
        });
      }
    }

    /**
     * hideChoice() скрывает поле "Выберите" у выпадающих списков
     * TODO FIXME: таймер остается и выводит ошибки после отправки формы
     */
    function hideChoice() {
      clearInterval(this.timerChoice);
      this.timerChoice = setInterval(function(){
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

    function addHeightLineList(v) {
      $('#row_'+v+' li').click(function(){
        console.log('click');
      });
    }
    /*
    /
    /
    /   ***ADDRESS***
    /
    /
    */
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
            /*
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
            */
          }
        });
      }, 100);
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
    function notice(v, e) {
      e = e ? e : '[data-grpid="qPetit"]';
      M.style.addStyle('.alert > a { display: block; margin: 2vh 0 0 0; }\r\n');
      $(e).prepend('<div class="alert alert-warning"><strong class="alert-title">Примечание</strong>'+v+'</div>');
    }

    function deleteNotice(v) {
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

    // ---===ADDRESS===---
    addr.element = '<div class="table-actions" style="text-align: right; padding: 2vh 0 0;">'
      +'<a class="btn btn-default" title="Удалить адрес" onclick="window.M.addr.actionDelete(this);">'
      +'Очистить адрес</a></div>',
    addr.arg = ['10344729@SXClass', '11309207@SXClass'];
    addr.timerButton = null;
    addr.formatLink = null;

    addr.actionDelete = actionDelete;
    addr.addButton = addButton;

    /* ---===DATE AND TIME===--- */
    dateAndTime.timeFromDictionary = timeFromDictionary;
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
    modern.version = '1.0.6';
    modern.ready = ready;
    modern.isLoad = isLoad;
    modern.deleteModern = deleteModern;
    /**
     * @param <Function> style
     * @param style is function for style with method's
     *
     * @param <Function> addr
     * @param addr is function for address button and required with method's
     */
    modern.style = style;
    modern.addr = addr;
    modern.dateAndTime = dateAndTime;
    modern.notice = notice;
    modern.deleteNotice = deleteNotice;
    modern.timerReady = [];
    modern.timerIndex = 0;
    window.M = modern;

    window.M.deleteModern();
  }
}());
