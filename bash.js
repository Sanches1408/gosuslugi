// Дата: сегодня
bsh{% java.text.SimpleDateFormat df = sx.common.SXDateFormatStore.getDateFormat("yyyyMMdd"); String result = df.format(); %}

// Дата: + 15 дней, меняя значения будут и другие даты
bsh{% java.text.SimpleDateFormat df = sx.common.SXDateFormatStore.getDateFormat("yyyyMMdd"); Date t = new Date(); String result = df.format(t.getTime() + (1000*60*60*24*15)); %}

bsh{% int result = 60; %}

<script id="helloScript">
  a = 'https://gosuslugi74.ru/pgu/services/info.htm?category=15707@egOrganization&id=7546@egService&target={NUMBER}@egServiceTarget';
  n = '';
  for (i = 1; i < 13; i++) {
    if ($('#title_G14Check'+i).prop('checked')) {
      if (i == 5 || i == 6 || i == 12) {
        a = a.replace('{NUMBER}', '12850');
      } else {
        a = a.replace('{NUMBER}', '12849');
      }
    }
  }
  if (a.search('{NUMBER}') == -1) {
    out = '<p><a href="'+a+'" target="_blank">Перейти на страницу с более подробной информацией</a></p>';
  } else {
    temp = a.replace('{NUMBER}', '12849');
    a = a.replace('{NUMBER}', '12850');

    out = '<p>1. <a href="'+temp+'" target="_blank">Заявление (гос. пошлина 750 р.)</a></p>'
  +'<p>2. <a href="'+a+'" target="_blank">Заявление (гос. пошлина 3500 р.)</a></p>';
  }

  out = '<div><p>Для отправки заявления в Министерство здравоохранения'
    +' Челябинской области необходимо будет оплатить государственную пошлину</p>'+out+'</div>';
  $($('#helloScript').parent()).append($(out));
</script>


<script id="helloScript">$($('#helloScript').parent()).append($('<div><p>Для отправки заявления в Министерство здравоохранения Челябинской области необходимо оплатить государственную пошлину</p><p><a href="https://gosuslugi74.ru/pgu/services/info.htm?id=7546&target=12851@egServiceTarget" target="_blank">Перейти на страницу с более подробной информацией</a></p></div>'));</script>
