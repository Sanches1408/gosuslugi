;(function(){

  function modern() {

  }

  var version = '1.0.0';
  /*
  /
  /
  /   ***STYLE***
  /
  /
  */
  var styleElement = '';

  function style(v) {
    if (typeof this.style[v] == 'function') {
      this.style[v]();
    } else {
      switch (v) {
        case '':
        default:
          for (method in this.style) {
            this.style[method]();
          }
      }
      $('head').append($(this.style.element));
    }
  }

  function modalBackground() {
    this.style.element += '.modal-backdrop { display: none; }\r\n'+
      '.modal { background: rgba(0, 0, 0, .5); }';
  }

  style.element = styleElement;
  style.modalBackground = modalBackground;

  modern.version = version;
  modern.style = style;
  window.M = modern;
}());
