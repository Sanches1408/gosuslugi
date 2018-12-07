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


function f(v) {
  let date = +new Date(v.split('.').map(function(str){ return +str; }).reverse());
  if (+new Date(2011, 6, 1) <= date && date <= +new Date()) {
    return true;
  } else {
    return false;
  }
}


function f(v) {
  let c = +$('#row_G2Choice select').val().trim().split('$')[0];
  return (v.length == 10 && c == 2 || v.length == 12 && c == 1);
}

function f(v) {
  let style = ['G3Choice3', 'G3Choice2'],
      choice = +v.split('$')[0],
      m = (new M()).style.element;
  function f(m, arr) {
    $.each(arr, function(){
      m.text(m.text().replace('#row_'+this+' { display: none; }\r\n', ''));
    });
  }
  f(m, style);
  if (choice == 1 && !+$('#row_G2Choice2').attr('modernclick')) {
    setTimeout(function(){
      $.each($('#row_G2Choice2 li:not(:first-child) a'), function(){
        $(this).click(function(){
          let m = new M().style, i = 1;
          f(m.element, style);
          if ($(this).text().trim() == 'Реорганизация путём преобразования') {
            i = 0
          }
          m.addStyle('#row_'+style[i]+' { display: none; }\r\n');
          var timer = setInterval(function(){
            console.log('correct');
            if ($('#row_'+style[i]).length) {
              (new M(style[i])).style.setRequire(true);
              clearInterval(timer);
            }
          }, 100);
        });
      });
      $('#row_G2Choice2').attr('modernclick', '1');
      $('#row_G2Choice2 li:first-child a').trigger('click');
    }, 1000);
  } else if (choice == 2) {
    $('#row_G2Choice2').attr('modernclick', '0');
  }
  return false;
}



execute(bsh{% result = sx.datastore.impl.SXIterator.getInstance().next("code",false) %})


bsh{%
  String[] list = {
    "updateMshUL", "educationFL", "LesZashitaFL", "LesZashitaIP",
    "LesZashitaUL", "LesOtchetPozharFL", "LesOtchetPozharIP",
    "LesOtchetPozharUL", "LesVosproizvodFL", "LesVosproizvodIP",
    "LesVosproizvodUL", "LesOtchetFL", "LesOtchetIP", "LesOtchetUL",
    "lesDeclaration", "lesDeclarationIP", "lesDeclarationUL",
    "gzhiPredLicIP", "gzhiPredLicUL", "gzhiDublikatIP", "gzhiDublikatUL",
    "gzhiPereofIP", "gzhiPereofUL", "dataMinzdravFL", "dataMinzdravIP",
    "dataMinzdravUL", "DublicatMinzdravIP", "DublikatMinzdravUL",
    "CreateMinzdravIP", "CreateMinzdravUL", "PrekrashenieMinzdravIP",
    "PrekrashenieMinzdravUL", "PereoformlenieMinzdravIP", "PereoformlenieMinzdravUL",
    "PredlicZagotLomMetIP", "PredlicZagotLomMetUL", "PereoflicZagotLomMetIP",
    "PereoflicZagotLomMetUL", "taxiVydachaRazresheniyaIP", "taxiVydachaRazresheniyaUL",
    "taxiVydachaDublikataIP", "taxiVydachaDublikataUL", "taxiPereoformlenieIP",
    "taxiPereoformlenieUL", "perevozkaGruzovFL", "perevozkaGruzovIP",
    "perevozkaGruzovUL", "zemlyaCreateFL", "zemlyaCreateIP", "zemlyaCreateUL",
    "PereplanirZhil", "archGPZUFL", "archGPZUUL", "archRazreshStroitFL",
    "archRazreshStroitUL", "archIzmenRazreshStroitFL", "archIzmenRazreshStroitUL",
    "archPrordlenieRazreshStroitFL", "archPrordlenieRazreshStroitUL",
    "archIndivZhilFL2", "archIndivZhilUL", "SvedeniyaMinzdravUL", "archGPZUFL280918"
  };
  result = Arrays.asList(list).indexOf(new String(dataMap.get("code"))) > -1;
%}

bsh{%
  String[] list = {
    "c94adc68-7c9c-45d1-8adc-687c9cf5d1fa"
  };
  result = Arrays.asList(list).indexOf(new String(dataMap.get("guid"))) > -1;
%}
