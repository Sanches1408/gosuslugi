<script>

$(document).ready(function(){

  var t = '<div class="group-holder-inner cms-obj-sx-description"\
    style="padding: 0; margin-top: 3vh;"><div class="alert alert-warning petition-alert">\
    <strong class="alert-title">Обратите внимание</strong>\
    Заявление о продлении лицензии может быть принято только при условии оплаты государственной пошлины.\
    <p><a href="#">Скачать квитанцию для оплаты</a></p></div></div>';

  $($('#row_recipientOrg').parent()).prepend($(t));
});

</script>
