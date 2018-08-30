true;

if (!this.M) {
  $.ajax('scripts/ogbu/modern.js')
  .done(function(){
    $('body').append('<script src="scripts/ogbu/modern.js" async></script>');
    function script() {
      
    }
    $('body').append($('<script>').text(';('+script.toString()+'());'));
  });
}
