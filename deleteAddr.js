<div class="table-actions" style="text-align: right;">
  <a class="btn btn-default" onclick="deleteAddress(this);" title="Удалить адрес"> Очистить адрес </a>
</div>
<script>
  function deleteAddress(t){
    var d = $(t).closest('.attr-field');
    $(d).removeClass('attr-field--filled');
    $('input', $(d)).removeClass().val('');
    $('textarea', $(d)).removeClass('attr-value-el--filled').val('');
  }

  var textarea = $('.modal textarea');
  if (window.addr.parseAddr(textarea)) {
    textarea.click(function(){
      window.addr.setClick(this);
    });
  }

  if (textarea.val().indexOf('(') > 0) {
    window.addr.element = textarea;
    window.addr.change();
  }

  var save = ($('.modal button.btn-default').length)
    ? $('.modal button.btn-default') : $('[name="saveData"]');
  save.click(function(){
    var id = $('.modal [name="id"]');
    var name = '[cname="'+$('.modal tr').attr('id').split('_')[1]+'"]';
    if (id.length) {
      id = id.val().split('@')[0];
      $.each($(name), function(i, v) {
        if ($($(v).parent()).attr('objid') && $($(v).parent()).attr('objid').split('@')[0] == id) {
          window.addr.element = $(v);
          window.addr.change();
          return;
        }
      });
    } else {
      var index = $(name).length+1;
      var timer = setInterval(function(){
        if ($(name).length == index) {
          window.addr.element = $($(name)[index-1]);
          window.addr.change();
          clearInterval(timer);
        }
      }, 100);
    }
  });
</script>
