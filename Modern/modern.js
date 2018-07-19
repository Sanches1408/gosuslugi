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
              if (method != actionDelete)
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

    }

    /* ---===STYLE===--- */
    $('head').append($('<style id="ogbuStyle">'));
    style.element = $('#ogbuStyle');
    style.addStyle = addStyle;

    style.modalBackground = modalBackground;
    style.modalWidth = modalWidth;
    style.modalDialogWidth = modalDialogWidth;
    style.radio = radio;

    /* ---===ADDRESS===--- */
    addr.element = '<div class="table-actions" style="text-align: right; padding: 0;">'
      +'<a class="btn btn-default" title="Удалить адрес" onclick="window.M.addr.actionDelete(this);">'
      +'Очистить адрес</a></div>',
    addr.arg = ['10344729@SXClass', '11309207@SXClass'];
    addr.timerButton = null;
    addr.timerFormat = null;

    addr.actionDelete = actionDelete;
    addr.addButton = addButton;
    addr.addFormat = addFormat;

    modern.version = '1.0.1';
    modern.style = style;
    modern.addr = addr;
    window.M = modern;
  }
}());
