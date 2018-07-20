;(function(){
  if (!this.M) {
    function modern() {

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

    function addButton() {
      clearInterval(this.timerButton);
      this.timerButton = setInterval(function(){
        $('textarea').each(function(){
          var a = window.M.addr;
          var t = $(this).attr('onclick').split("'")[1];
          if ((t == a.arg[0] || t == a.arg[1]) && !+$(this).attr('butDel')) {
            $($(this).closest('.attr-field')).append($(a.element));
            $(this).attr('butDel', '1');
          }
        });
      }, 100);
    }

    function addFormat() {
      setInterval(this.timerFormat);
      this.timerFormat = setInterval(function(){
        if ($('#row_addrText').length) {
          clearInterval(this.timerFormat);

        }
      }, 100);
    }
    /*
    /
    /
    /   ***DATE AND TIME***
    /
    /
    */
    // Функция для выпадающего списка, где поля - время в виде: 09:00, 15:00.
    // Принимает коды справочников, сравнивает оба поля и убирает возможность
    // выбрать меньшее время во втором и большее в первом
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

    function timeFromDictionary(id1, id2, b) {
      new Promise(function(resolve){
        readyList(id1, resolve);
      }).then(function(){
        new Promise(function(resolve){
          readyList(id2, resolve);
        }).then(function(){
          var list1 = $('#row_'+id1+' li:not(:first-child)'),
              list2 = $('#row_'+id2+' li:not(:first-child)');
          if (b) {
            
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

    function readyList(id, resolve){
      var maxIter = 2, iter = maxIter, li = 0;
      clearInterval(this.timerList);
      this.timerList = setInterval(function(){
        if (iter) {
          var l = $('#row_'+id+' li').length;
          if (l != li) {
            iter = maxIter;
            li = l;
          } else {
            iter--;
          }
        } else {
          clearInterval(this.timerList);
          if (resolve) resolve(1);
        }
      }, 100);
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

    /* ---===ADDRESS===--- */
    addr.element = '<div class="table-actions" style="text-align: right; padding: 2vh 0 0;">'
      +'<a class="btn btn-default" title="Удалить адрес" onclick="window.M.addr.actionDelete(this);">'
      +'Очистить адрес</a></div>',
    addr.arg = ['10344729@SXClass', '11309207@SXClass'];
    addr.timerButton = null;
    addr.timerFormat = null;

    addr.actionDelete = actionDelete;
    addr.addButton = addButton;
    addr.addFormat = addFormat;

    /* ---===DATE AND TIME===--- */
    dateAndTime.timeFromDictionary = timeFromDictionary;
    dateAndTime.readyList = readyList;
    dateAndTime.timerList = null;

    /* ---===MAIN===---*/
    modern.version = '1.0.1';
    modern.style = style;
    modern.addr = addr;
    modern.dateAndTime = dateAndTime;
    window.M = modern;
  }
}());
