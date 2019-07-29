document.addEventListener('DOMContentLoaded', function() {
    var go = document.getElementById('go');
    go.addEventListener('click', function(tab) {
      chrome.tabs.executeScript({
        code: ';('+execute.toString()+')();'
      });
    }, false);
}, false);

var execute = function execute(){
  console.log('Hello world!');
};
