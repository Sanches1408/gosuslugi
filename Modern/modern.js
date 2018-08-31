;(function(){
  if (!this.M) {
    /**
     * @param {Function} modern внедряет на страницу модульное окно,
     * эмиттирующего терминал для ввода команд, вывода ошибок и статусов
     * @param {Boolean} v идентификатор внедрения
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
     * @param {Function} isLoad проверяет загруженность всех данных, применяется в Promise()
     * @param {Function} resolve
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
     * @param {Function} deleteModern удаляет блоки скрипта и стиля, которые были добавлены модулем
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
          $.each(M.timerReady, function(i){
            clearInterval(M.timerReady[i]);
          });
          $.each(M.dictionary.timer, function(i){
            clearInterval(M.dictionary.timer[i]);
          });
          delete window.M;
        }
      }, 100);
    }

    /**
     * @param {Function} isArray проверяет допустимое значение и создает из него архив
     * @param {String or Array} v проверяемый аргумент
     */
    function isArray(v) {
      if (typeof v === 'string') v = [v];
      else if (!(v instanceof Array) || !v) v = false;
      return v;
    }
    /**
     * @param {Function} style применяет стилизацию для элементов страницы
     * @param {String} v название функции или строковый параметр,
     * в случае отсутствия аргумента вызываются все методы style()
     * @param {String or Boolean} p параметр передаваемый в метод
     */
    function style(v, p, v2) {
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
              radio(p, v2);
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
     * @param {Function} addStyle добавляет стиль в контейнер #ogbuStyle
     * @param {String} v строка css стилизации
     */
    function addStyle(v) {
      var t = this.element;
      if (t.text().indexOf(v) == -1)
        t.text(t.text() + v);
    }

    /**
     * @param {Function} modalBackground устанавливает корректный фон для модульных окон
     * @param {string} v значение background (black, #032433, rgba(0, 0, 0, .75))
     */
    function modalBackground(v) {
      this.addStyle(
        '.modal-backdrop { display: none!important; }\r\n'
        +'.modal { background: '+(v ? v : 'rgba(0, 0, 0, .5)')+'!important; }\r\n'
      );
      M.terminal('[modalBackground] '+(v ? v : 'rgba(0, 0, 0, .5)'));
    }

    /**
     * @param {Function} modalWidth устанавливает ширину заявления
     * @param {String} v значение ширины заявления (50%, 1000px, calc(100% - 250px))
     */
    function modalWidth(v) {
      this.addStyle(
        '.modal-dialog--petition > .modal-content { max-width: '
        +(v ? v : '80%')+'!important; width: '+(v ? v : '80%')+'!important; }\r\n'
      );
      M.terminal('[modalWidth] args: '+(v ? v : '80%'));
    }

    /**
     * @param {Fucntion} modalDialogWidth устанавливает ширину модульных окон
     * @param {String} v значение ширины модульного окна (50%, 1000px, calc(100% - 250px))
     */
    function modalDialogWidth(v) {
      this.addStyle(
        '.modal .modal-dialog { max-width: '+(v ? v : '80%')+'!important; }\r\n'
      );
      M.terminal('[modalDialogWidth] args: '+(v ? v : '80%'));
    }

    /**
     * @param {Function} radio устанавливает корректное вертикальное отображение радиокнопок
     * @param {Boolean} v идентификатор полужирного начертания заголовка радиокнопок
     */
    function radio(v, v2) {
      this.addStyle(
        '.attr-field--layout > * { display: block!important; width: 90%!important; }\r\n'
        +'.attr-field--layout > *:first-child { margin-bottom: 2vh;'
        +(v ? ' font-weight: bold;' : '')+' }\r\n.attr-field--layout > *:nth-child(2) { margin-left: 5%; }\r\n'
	      +'.attr-field--layout .attr-label-title-wrapper { white-space: normal; }\r\n'
      );
      if (v2 = M.isArray(v2)) {
        $.each(v2, function(i){
          M.style.addStyle(
            '#row_'+v2[i]+' .attr-value-helper { top: -5vh!important; }\r\n'
          );
        });
      }
      M.terminal('[radio] args: '+(v ? 'font-weight: bold' : 'нет аргументов.'));
    }

    /**
     * @param {Function} hideSearch скрывает блок поиска у выпадающего списка
     * @param {String or Array} v код родительского атрибута
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

    /**
     * @param {Function} hideChoice скрывается первый атрбиут в списке со словом "Выберите"
     */
    function hideChoice() {
      clearInterval(this.timerChoice);
      this.timerChoice = setInterval(function(){
        $($('.text:contains("Выберите")').closest('li')).hide();
      }, 100);
    }

    /**
     * @param {Function} fixBySection добавляет название раздела там, где его нет
     * @param {Number} n номер раздела, после которого добавляем новый
     * @param {String} t название нового раздела
     */
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

    /**
     * @param {Function} require ставит обязательность у атрибута
     * @param {String} elem код атрибута, какой он имеется на SK
     * @param {Boolean} bool true - обязательный, false - нет
     */
    function require(elem, bool) {
      $('#id_'+elem).attr('ismandatory', bool.toString());
      $('#caption_'+elem)[(bool ? 'add' : 'remove')+'Class']('required');
    }

    /**
     * TODO FIXME
     * @param {Function} addHeightLineList увеличивает высоту строки, если значение не влезает
     */
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

    /**
     * @param {Function} addr дополнительный функционал для справочника адреса
     * @param {String} v название метода или параметр уровня фукнционала
     * @param {Boolean or Array} p либо false, если обязательность не нужна,
     * либо массив с кодами атрибутов какие они есть на SK
     */
    function addr(v, p) {
      if (typeof this.addr[v] == 'function') {
        this.style[v](p);
      } else {
        switch (v) {
          case 'default':
            this.addr.searchAddress(true, p);
            break;
          case 'mini':
            this.addr.searchAddress(true);
            break;
        }
      }
    }

    /**
     * @param {Function} searchAddress каждые 100 мс ищет атрибут адреса
     * и запускает методы в зависимости от значения аргументов
     * @param {Boolean} b true - функционал кнопки удаления адреса, false - нат
     * @param {Boolean or Array} b2 true - выводит лишь строку в адрес,
     * указанную в поле "Адрес при отсутствии", если передан массив кодов атрибутов,
     * то устанавливает обязательность перечисленных в зависимости, если поле
     * "Адрес при отсутствии" не заполнено и убирает, если заполнено
     */
    function searchAddress(b, b2, b3){
      clearInterval(this.timerButton);
      this.timerButton = setInterval(function(){
        $('textarea').each(function(){
          if ($(this).attr('onclick') != '') {
            let a = window.M.addr,
                t = $(this).attr('onclick').split("'")[1];
            if (t == a.arg[0] || t == a.arg[1]) {
              if (b && !+$(this).attr('butDel')) {
                M.addr.addButtonDelete(this);
              }
              if ((b2 && !+$(this).attr('openAddr')) || (b3 && !+$(this).attr('helperAddr'))) {
                M.addr.actionOpenAddress(this, b2, b3);
              }
            }
          }
        });
      }, 100);
    }

    /**
     * @param {Function} addButtonDelete устанавливает кнопку удаления адреса
     * @param {String or Element} v query селектор или элемент
     */
    function addButtonDelete(v) {
      $($(v).closest('.attr-field')).append($(this.element));
      $(v).attr('butDel', '1');
    }

    /**
     * @param {Function} actionDelete функционал удаления адреса
     * @param {String or Element} v query селектор или элемент
     */
    function actionDelete(v) {
      if (!v) return;
      var d = $(v).closest('.attr-field');
      $(d).removeClass('attr-field--filled');
      $('input', $(d)).removeClass().val('');
      $('textarea', $(d)).removeClass('attr-value-el--filled').val('').text('');
    }

    /**
     * @param {Function} actionOpenAddress вешает обработчик на адрес
     * @param {String or Element} v query селектор или элемет
     * @param {Boolean or Array} a идентификатор события или массив с кодами
     */
    function actionOpenAddress(v, a, a2) {
      $(v).attr({'openAddr': '1', 'helperAddr': '1'}).click(function(){
        new Promise(function(resolve){
          M.addr.formatLink[0] = v;
          isLoad(resolve);
        }).then(function(){
          addressNotFound(a);
          actionSetHelper(a2);
        });
      }).change(function(){
        if (t = M.addr.formatLink[1]) {
          $(this).val(t);
          M.addr.formatLink = [];
        }
      });
    }

    /**
     * @param {Function} addressNotFound вешает событие обработки атрибута "Адрес при отсутствии"
     * @param {Boolean or Array} v идентификатор или массив кодов
     */
    function addressNotFound(v) {
      v = M.isArray(v);
      $.each(v, function(i){
        M.style.require(v[i], true);
      });
      $('#id_addrText').change(function(){
        let bool = false;
        if ($(this).val().trim() === '') {
          bool = true;
        } else {
          M.addr.formatLink[1] = $('#id_addrText').val().trim();
        }
        $.each(v, function(i){
          M.style.require(v[i], bool);
        });
        M.style.require('addrText', !bool);
      });
      $('#id_addrText').trigger('change');
    }

    // TODO FIXME
    function actionSetHelper(v) {
      v = M.isArray(v);
      $.each(v, function(i){
        $('[data-attrname="'+v[i][0]+'"]').append($('<div>')
          .addClass('attr-value-helper').text(v[i][1]));
      });
    }

    /**
     *
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

    function dictionary(v, v2) {
      if (v) {
        new Promise(function(resolve){
          if (!$('#'+v).length)
            $('body').append($('<script>').attr({'src': 'scripts/ogbu/'+v+'.js', 'id': v}));
          let timer = setInterval(function(){
            if (M.dictionary) {
              clearInterval(timer);
              resolve(1);
            }
          }, 100);
        }).then(function(){
          M.dictionary.searchAttr(v2);
        });
      }
    }

    function searchAttr(v) {
      M.dictionary.timer.push(setInterval(function(){
        let bool = true;
        $.each(v, function(i){
          if (!$('#row_'+v[i]).length || +$('#row_'+v[i]).attr('dicAction')) {
            bool = false;
          }
        });
        if (bool) {
          $.each(v, function(i){ $('#row_'+v[i]).attr('dicAction', '1'); });
          M.dictionary.setAction(v);
        }
      }, 100));
    }
/*
    function setAction(v) {
      function f(list, lvl, parent) {
        function searchAttr(t, l) {
          function g(q) {
            let r;
            $.each($('#row_'+v[l]+' '+q), function(){
              if ($(this).text().trim() == t) r = this;
            });
            return r;
          }
          return g('li:not(:first-child)') || g('.checkbox');
        }
        let bool = false;
        for (let key in list) {
          bool = true;
          if (key == 'null')
            bool = false;
          else if (f(list[key], lvl+1, key)) {
            let arr = [];
            for (let key2 in list[key]) {
              arr.push(searchAttr(key2, lvl+1));
            }
            $(key != 'null' ? searchAttr(key, lvl) : searchAttr(parent, lvl-1)).click(function(){
              $('#row_'+v[lvl+1]+' li:not(:first-child)').hide();
              $('#row_'+v[lvl+1]+' .checkbox').hide();
              let elem = $('#row_'+v[lvl+1]+' .checkbox');
              if (elem.length) {
                $.each(elem, function(){
                  if ($('input', this).prop('checked'))
                    $('input', this).trigger('click');
                });
              } else {
                elem = $('#row_'+v[lvl+1]+' li:not(:first-child)');
                $('#row_'+v[lvl+1]+' li:first-child a').trigger('click');
              }
              elem.hide();
              $.each($('#row_'+v[lvl+1]), function(){
                $(this).hide();
              });
              $.each(arr, function(i) {
                $(arr[i]).show();
              });
              //$('#row_'+v[lvl+1]).show();
              $(arr[0]).closest('[dicaction="1"]').show();
            });
          }
        }
        return bool;
      }

      f(M.dictionary.list, 0, M.dictionary.list);
    }
*/
/*
    function setAction(v){
      function recursive(l, l2, p) {
        let bool = false, list = l, lvl = l2, parent = p;
        for (let key in list) {
          bool = true;
          parent.push(key);
          if (recursive(list[key], lvl+1, parent)) {
            let hist = M.dictionary.getAttrClick(key, parent, v, lvl);
            console.log('[TEST] get click for '+$(hist[0]).text()+' in level '+hist[1]);
            $(hist[0]).click(function(){
              M.dictionary.hideAttr(v, hist[1]);
              M.dictionary.getKeys(v[hist[1]+1], list[key]);
            });
          }
        }
        parent.pop();
        return bool;
      };
      recursive(M.dictionary.list, 0, []);
    }

    function getAttrClick(k, p, e, l) {
      if (k == 'null') {
        if (p.length == 1) {
          k = p.pop();
          l = 0;
        }
        else {
          let t, temp, ind = l;
          while(p[0]) {
            t = p.pop();
            ind--;
            if (t != 'null') {
              k = t; l = ind;
            }
          }
        }
      }
      let elem = $('.checkbox', $('#row_'+e[l]));
      if (!elem.length)
        elem = $('li:not(:first-child)', $('#row_'+e[l]));
      $.each(elem, function(){
        if ($(this).text().trim() == k) {
          elem = this;
          return false;
        }
      });
      return [elem, l];
    }

    function getKeys(v, k) {
      let e = $('#row_'+v), b = false,
        elem = $('.checkbox', e);
      if (!elem.length)
        elem = $('li:not(:first-child)', e);
      for (let key in k) {
        $.each(elem, function(i){
          if ($(elem[i]).text().trim() == key) {
            b = true;
            $(elem[i]).show();
            return false;
          }
        });
      }
      if (b) {
        $(e).show();
      }
    }

    function hideAttr(v, l) {
      $.each(v, function(i){
        if (i > l) {
          let row = $('#row_'+v[i]),
            child = $('.checkbox', row);
          if (child.length) {
            $('input:checked', row).trigger('click');
          } else {
            child = $('li:not(:first-child)', row);
            $('li:first-child a', row).trigger('click');
          }
          row.hide();
          child.hide();
        }
      });
    }
    */
    function setAction(v) {
      function recursive(list) {
        let arr = [], bool = false;
        let key;
        for (key in list) {
          bool = true;
          console.log('[TEST] Проверяем ключ '+key+' на уровне '+list.lvl);
          if (key != 'lvl' && recursive(list[key])) {
            console.log('[TEST] get click '+key+' на уровне '+list.lvl);
            console.log('[TEST] show next elements '+M.dictionary.getAttr(v, list[key])
            +' на уровне '+list[key].lvl);
            M.dictionary.hideAttr(v, list.lvl);
          }
        }
        return bool;
      }
      recursive(M.dictionary.list);
    }

    function getAttr(v, list) {
      let arr = [], key;
      for (key in list) {
        if (key != 'lvl') {
          arr.push($(M.dictionary.getElems(v[list.lvl], key)[1]).text().trim());
        }
      }
      return arr;
    }
    function getLiOrCheck(v) {
      let e = [$('#row_'+v)];
      e[1] = $('.checkbox', e[0]);
      if (!e[1].length)
        e[1] = $('li a', e[0]);
      return e;
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

    function hideAttr(v, l) {
      $.each(v, function(i){
        if (M.dictionary.getLiOrCheck(v[i]) )
      });
    }
    /**
     * ---===TERMINAL===---
     * @param {Function} command обработчик команд терминала
     * @param {Array} stack стэк сообщений терминала
     */
    terminal.command = command;
    terminal.stack = [];

    /**
     * ---===STYLE===---
     * @param {Element} element JQuery элемент-контейнер для стилизации
     * @param {JS timer} timerChoice таймер для поиска лишнего элемента списка
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

    /**
     * ---===ADDRESS===---
     * @param {Element} element кнопка удаления
     * @param {Array} arg массив идентификаторов справочника КЛАДР
     * @param {JS timer} timerButton таймер для поиска атрибутов с адресом
     * @param {Array} formatLink [0] - JQuery элемент адреса, [1] - значение атрибута "Адрес при отсутствии"
     */
    addr.element = '<div class="table-actions" style="text-align: right; padding: 2vh 0 0;">'
      +'<a class="btn btn-default" title="Удалить адрес" onclick="window.M.addr.actionDelete(this);">'
      +'Очистить адрес</a></div>';
    addr.arg = ['10344729@SXClass', '11309207@SXClass'];
    addr.timerButton = null;
    addr.formatLink = [];
    addr.actionDelete = actionDelete;
    addr.addButtonDelete = addButtonDelete;
    addr.searchAddress = searchAddress;
    addr.addressNotFound = addressNotFound;
    addr.actionOpenAddress = actionOpenAddress;
    addr.actionSetHelper = actionSetHelper;

    /**
     * ---===COMPARE===---
     */
    compare.getVal = getVal;
    compare.getType = getType;

    /**
     * ---===DATEANDTIME===---
     */
    dateAndTime.timeFromDictionary = timeFromDictionary;

    /**
     * ---===NOTICE===---
     */
    notice.addNote = addNote;
    notice.deleteNote = deleteNote;

    /**
     *
     */
    dictionary.list = {};
    dictionary.searchAttr = searchAttr;
    dictionary.setAction = setAction;
    dictionary.getAttr = getAttr;
    dictionary.getElems = getElems;
    //dictionary.getAttrClick = getAttrClick;
    //dictionary.hideAttr = hideAttr;
    //dictionary.getKeys = getKeys;
    dictionary.timer = [];
    /**
     * ---===Modern.JS===---
     * @param {String} version версия модуля
     * @param {JS timer} timerReady таймер готовности элемент
     * @param {Number} timerIndex индекс таймера готовности элемента
     */
    modern.version = '1.0.8';
    modern.ready = ready;
    modern.isLoad = isLoad;
    modern.deleteModern = deleteModern;
    modern.isArray = isArray;
    modern.terminal = terminal;
    modern.style = style;
    modern.addr = addr;
    modern.compare = compare;
    modern.dateAndTime = dateAndTime;
    modern.notice = notice;
    modern.dictionary = dictionary;
    modern.timerReady = [];
    modern.timerIndex = 0;
    window.M = modern;

    window.M.deleteModern();
  }
}());
