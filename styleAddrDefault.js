<script>

$(document).ready(function(){

  var s = '<style>\
.modal {\r\n  background-color: rgba(0, 0, 0, 0.25);\r\n}\r\n\
.modal-content {\r\n  max-width: 1100px!important;\r\n}\r\n\
.attr-field--layout > * {\r\n  display: block!important;\r\n\
font-weight: bold!important;\r\n  width: 100%!important;\r\n\
padding-left: 5%;\r\n  margin-bottom: 2vh;\r\n}\r\n\
.attr-field--layout .radio {\r\n  display: inline-block;\r\n\
margin-left: 5%;\r\n}\r\n\
.attr-field--layout > *:first-child > * {\r\n  white-space: normal;\r\n}\r\n\
.dropdown-menu {\r\n  top: 100%!important;\r\n}\r\n\
.dropdown-menu > li:first-child {\r\n  display: none;\r\n}\r\n\
</style>';

  $('head').append($(s));

  var div = '<div class="table-actions" style="text-align: right;">\
    <a class="btn btn-default" title="Удалить адрес" onclick="deleteAddress(this);">\
    Очистить адрес</a></div>';

  var script = '\<script\>\
    function deleteAddress(t){\
      var d = $(t).closest(".attr-field");\
      $(d).removeClass("attr-field--filled");\
      $("input", $(d)).removeClass().val("");\
      $("textarea", $(d)).removeClass("attr-value-el--filled").val("");\
    }\<\/script\>';

  function parseAddr(t) {
    var sxClass = $(t).attr('onclick').split("'")[1].split('@')[0];
    if (sxClass == '10344729' || sxClass == '11309207')
      return true;
    else
      return false;
  }

  function change() {
    var timer = setInterval(function(){

      var t = window.addr.element.val();

      if (t.indexOf('(') > 0) {
        t = t.substring(t.indexOf('(')+1, t.length-1);
        window.addr.element.val(t).html(t).text(t);
        clearInterval(timer);
      }
    }, 100);
  }

  function style() {
    var t = '<div class="attr-value-helper">Указывается с почтовым индексом</div>';
    $('[data-attrname="addrText"]').append($(t));

    $('#row_street .attr-value-helper').remove();

    var save = ($('[name="saveData"]', $($('#row_addrText').closest('.modal'))).length)
      ? '[name="saveData"]' : '.btn-default';

    $(save, $($('#row_addrText').closest('.modal'))).click(function(){
      if ($('#row_addrText input').val().replace(/\s/g, '') != '') {
        window.addr.change();
      }
    });
  }

  function setClick(t) {
    window.addr.element = $(t);
    var timer = setInterval(function(){
      if ($('#row_addrText').length) {
        window.addr.style();
        clearInterval(timer);
      }
    }, 100);
  }

  window.addr = {};

  window.addr.element = null;

  window.addr.change = change;
  window.addr.style = style;
  window.addr.setClick = setClick;
  window.addr.parseAddr = parseAddr;

  $.each($('textarea'), function(i, v){
    if (window.addr.parseAddr(v)) {
      $(v).click(function(){
        window.addr.setClick(this);
      });
      $($(v).parent()).append($(div)).append($(script));
    }
  });
});

</script>
