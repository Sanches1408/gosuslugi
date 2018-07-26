true;

if (!this.M) {
  $.ajax('scripts/ogbu/modern.js')
  .done(function(){
    $('body').append('<script src="scripts/ogbu/modern.js" async></script>');
    function script() {
      M.style('mini');
      M.addr('default', true);
    }
    $('body').append($('<script>').text(';('+script.toString()+'());'));
  });
}
