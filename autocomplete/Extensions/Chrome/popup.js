document.addEventListener('DOMContentLoaded', function() {
    var go = document.getElementById('go');
    go.addEventListener('click', function(tab) {
      var link = 'https://gosuslugi74.ru/download/doc/upload/autocomplete.js';
      $.ajax(link).done(function(res){
        chrome.tabs.executeScript({
          code: ';('+res+')();'
        });
      });
    }, false);
}, false);
