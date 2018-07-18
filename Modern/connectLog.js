true;
function out(t) {
  console.log('');
  console.log('---==='+t+'===---');
  console.log('');
}

out('TRY');
if (!this.M) {
  out('CREATE NODERN');
  $.ajax('scripts/ogbu/modern.js')
  .done(function(){
    out('SCRIPT IMPORT');
    $('body').append('<script src="scripts/ogbu/modern.js" async></script>');
  }).fail(function(){
    out('FILE NOT FOUND');
    $('body').append('<script src="scripts/ogbu/modern.js" async></script>');
  });
}
