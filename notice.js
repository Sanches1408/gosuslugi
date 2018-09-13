<script>

  $(document).ready(function(){

    /*
      Селектор элемента, например: '#row_element', 'body', '.placeholder',
      в начало которого вставляем уведомление
    */
    var query = '';
    /*
      Вводим свое сообщение, с ссылками и другими тегами, при необходимости
    */
    var note = '';

    note = '<div class="group-promt group-promt__qPetit alert alert-warning" data-grpid="qPetit">\
      <strong class="alert-title">Обратите внимание</strong><span><p class="alert">'+note+'</p></span></div>';

    $('[data-grpid="gDocs"]').prepend($(note));
  });

</script>


<p class="alert alert-default">
  Введи число особей в соответствии с установленными законодательством нормами.
  С нормами добычи вы можете ознакомиться на сайте <a href="http://www.mineco174.ru/htmlpages/Show/Oxota/Gosudarstvennayaekologicheskay" target="_blank">Министерства Экологии Челябинской области</a>.
  Если на ресурс нет ограничений на объем добычи введите &ldquo;-&rdquo;.
</p>
