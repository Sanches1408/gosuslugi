true;

if (!this.M) {
  $.ajax('scripts/ogbu/modern.js')
  .done(function(){
    $('body').append('<script src="scripts/ogbu/modern.js" async></script>');
    function script() {
      M.style('mini');
      //M.dateAndTime('timeFromDictionary', 'SubG23StartTime', 'SubG23FinishTime');
      M.dateAndTime('readyList', 'SubG23StartTime');
    }
    $('body').append($('<script>').text(';('+script.toString()+'());'));
  });
}
