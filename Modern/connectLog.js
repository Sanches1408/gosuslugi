true;

function methods(){
  M.getDelete();

  let hash;
  while (true) {
    hash = parseInt(Math.floor(Math.random() * 100));
    if (hash != M.activePetition) break;
  }
  $('#row_recipientOrg').attr('hash', hash);
  M.activePetition = hash;

  $('head').append($('<style>').attr('id', 'row_ogbuStyle'))
    .append($('<script>').attr('id', 'row_modern').text(';('+(function(){
    let m = new M();
    m.style({
      "modalBackground": "rgba(0, 0, 0, 0.5)",
      "radio": " font-weight: bold;",
      "hideChoice": ["recipientOrg"]
    });
    (new M()).address();
  }).toString()+'());'));
}

if (!this.M && window.location.host == 'gosuslugi74.ru' ||
    window.location.host == '10.0.1.207:8081') {
  if (!jQuery) {
    let script = document.createElement('script');
    script.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js');
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  new Promise(function(resolve){
    let timer = setInterval(function(){
      if (window.jQuery) {
        clearInterval(timer);
        $.ajax('images/upload/modern.js?'+(+new Date()))
        .done(function() {
          resolve();
        });
      }
    }, 1000);
  }).then(methods);
} else if (this.M && window.location.host == 'gosuslugi74.ru') {
  if ($('#row_recipientOrg').attr('hash') != M.activePetition) {
    methods();
  }
}
