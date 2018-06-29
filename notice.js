<script>

  $(document).ready(function(){

    var t = '<div class="alert alert-warning"><strong class="alert-title">Примечание</strong>\
      Все группы прикрепляемых файлов, не помеченные символом *, не обязательны для прикрепления файлов,\
      так как данные сведения запрашиваются органом государственной власти по форме межведомственного взаимодействия</div>';

    $('[data-grpid="gDocs"]').prepend($(t));
  });

</script>
