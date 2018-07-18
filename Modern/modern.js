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

    $('head').append($('<style id="ogbuStyle">'));
    style.element = $('#ogbuStyle');
    style.addStyle = addStyle;

    style.modalBackground = modalBackground;
    style.modalWidth = modalWidth;
    style.modalDialogWidth = modalDialogWidth;
    style.radio = radio;

    modern.version = '1.0.0';
    modern.style = style;
    window.M = modern;
  }
}());
