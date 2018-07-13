<script>

  $(document).ready(function(){

    function get(arr) {
      return arr.map(function(v) {
        return v.name;
      });
    }

    function find(t) {

      var w = window.dictionary.work, bool = false, arr = [], ext = false;

      for (var i = 0; i < w.length; i++) {
        if (w[i].name == t) {
          bool = true;
        }
        window.dictionary.hide(bool);
        if (i == 6) {
          $(window.dictionary.tr+':nth-child(2)').hide();
          break;
        }
        var v = w[i].arr;
        for (var j = 0; j < v.length; j++) {
          if (bool) {
            if (i == 4) {
              $(window.dictionary.tr+':nth-child(2)').hide();
            }
            show((i == 4) ? [v, 3] : [window.dictionary.get(v), 2]);
            break;
          } else {
            if (v[j].name == t) {
              show([v[j].arr, 3]);
              bool = true;
              break;
            }
          }
        };
        if (bool) break;
      };
    }

    function show([arr, b]) {
      $(window.dictionary.tr+':nth-child('+b+')').show();

      arr.forEach(function(v, i){
        $(window.dictionary.tr+' span').each(function(){
          if ($(this).text() == v) {
            $(this).closest('li, p').show();
          }
        });
      });
    }

    function hide(b) {
      var tr = window.dictionary.tr;
      $(tr+':last-of-type').hide();
      $(tr+' p input:checked').trigger('click');
      $(tr+':last-of-type p:not(:first-of-type)').hide();
      if (b) {
        $(tr+':nth-child(2) li:first-of-type a').trigger('click');
        $(tr+':nth-child(2) li:not(:first-of-type)').hide();
      }
    }

    function checkAll(e) {
      if ($(e).prop('checked')) {
        $('p:not(:first-of-type):visible', $(e).closest('div')).each(function(){
          var input = $('input', $(this));
          if (!input.prop('checked')) input.trigger('click');
        });
      } else {
        $('p:not(:first-of-type):visible', $(e).closest('div')).each(function(){
          var input = $('input', $(this));
          if (input.prop('checked')) input.trigger('click');
        });
      }
      var c = $('#checkToggle');
      var t = c.text();
      c.text(c.attr('tog')).attr('tog', t);
    }

    window.dictionary = {};
    window.dictionary.tr = '.modal:nth-last-of-type(2) .attr-list-layout tr';

    window.dictionary.get = get;
    window.dictionary.find = find;
    window.dictionary.show = show;
    window.dictionary.hide = hide;
    window.dictionary.checkAll = checkAll;

    window.dictionary.work = JSON.parse('[{"name":"При оказании первичной, в том числе доврачебной, врачебной и специализированной, медико-санитарной помощи организуются и выполняются следующие работы (услуги)","arr":[{"name":"при оказании первичной доврачебной медико-санитарной помощи в амбулаторных условиях по","arr":["акушерскому делу","анестезиологии и реаниматологии","бактериологии","вакцинации (проведению профилактических прививок)","гигиене в стоматологии","гигиеническому воспитанию","гистологии","дезинфектологии","лабораторному делу","лабораторной диагностике","лечебной физкультуре","лечебному делу","медико-социальной помощи","медицинской оптике","медицинской статистике","медицинскому массажу","наркологии","неотложной медицинской помощи","операционному делу","общей практике","организации сестринского дела","паразитологии","рентгенологии","сестринскому делу","сестринскому делу в косметологии","сестринскому делу в педиатрии","стоматологии","стоматологии ортопедической","стоматологии профилактической","физиотерапии","функциональной диагностике","энтомологии","эпидемиологии"]},{"name":"при оказании первичной врачебной медико-санитарной помощи в амбулаторных условиях по","arr":["вакцинации (проведению профилактических прививок)","неотложной медицинской помощи","общей врачебной практике (семейной медицине)","организации здравоохранения и общественному здоровью","педиатрии","терапии","управлению сестринской деятельностью"]},{"name":"при оказании первичной врачебной медико-санитарной помощи в условиях дневного стационара по","arr":["клинической лабораторной диагностике","неотложной медицинской помощи","общей врачебной практике (семейной медицине)","организации здравоохранения и общественному здоровью","педиатрии","терапии","управлению сестринской деятельностью"]},{"name":"при оказании первичной специализированной медико-санитарной помощи в амбулаторных условиях по","arr":["авиационной и космической медицине","акушерству и гинекологии (за исключением использования вспомогательных репродуктивных технологий и искусственного прерывания беременности)","акушерству и гинекологии (искусственному прерыванию беременности)","акушерству и гинекологии (использованию вспомогательных репродуктивных технологий)","аллергологии и иммунологии","анестезиологии и реаниматологии","бактериологии","вирусологии","водолазной медицине","гастроэнтерологии","гематологии","генетике","гериатрии","гигиеническому воспитанию","гистологии","дезинфектологии","дерматовенерологии","детской кардиологии","детской онкологии","детской урологии-андрологии","детской хирургии","детской эндокринологии","диабетологии","диетологии","забору, криоконсервации и хранению половых клеток и тканей репродуктивных органов","инфекционным болезням","кардиологии","клинической лабораторной диагностике","клинической микологии","клинической фармакологии","колопроктологии","косметологии","лабораторной генетике","лабораторной микологии","лечебной физкультуре и спортивной медицине","мануальной терапии","медицинской генетике","медицинской статистике","медицинской реабилитации","неврологии","нейрохирургии","неотложной медицинской помощи","нефрологии","онкологии","организации здравоохранения и общественному здоровью","ортодонтии","остеопатии","оториноларингологии (за исключением кохлеарной имплантации)","офтальмологии","паразитологии","патологической анатомии","пластической хирургии","профпатологии","психиатрии","психиатрии-наркологии","психотерапии","пульмонологии","радиологии","ревматологии","рентгенологии","рефлексотерапии","санитарно-гигиеническим лабораторным исследованиям","сексологии","сердечно-сосудистой хирургии","стоматологии детской","стоматологии общей практики","стоматологии ортопедической","стоматологии терапевтической","стоматологии хирургической","сурдологии-оториноларингологии","токсикологии","торакальной хирургии","травматологии и ортопедии","транспортировке половых клеток и (или) тканей репродуктивных органов","ультразвуковой диагностике","управлению сестринской деятельностью","урологии","физиотерапии","фтизиатрии","функциональной диагностике","хирургии","челюстно-лицевой хирургии","эндокринологии","эндоскопии","энтомологии","эпидемиологии"]},{"name":"при оказании первичной специализированной медико-санитарной помощи в условиях дневного стационара по","arr":["авиационной и космической медицине","акушерству и гинекологии (за исключением использования вспомогательных репродуктивных технологий и искусственного прерывания беременности)","акушерству и гинекологии (искусственному прерыванию беременности)","акушерству и гинекологии (использованию вспомогательных репродуктивных технологий)","анестезиологии и реаниматологии","аллергологии и иммунологии","водолазной медицине","бактериологии","вирусологии","гастроэнтерологии","гематологии","генетике","гериатрии","дезинфектологии","дерматовенерологии","детской кардиологии","детской онкологии","детской урологии-андрологии","детской хирургии","детской эндокринологии","диабетологии","диетологии","забору, криоконсервации и хранению половых клеток и тканей репродуктивных органов","инфекционным болезням","кардиологии","клинической лабораторной диагностике","клинической микологии","клинической фармакологии","колопроктологии","лабораторной генетике","лабораторной микологии","лечебной физкультуре и спортивной медицине","мануальной терапии","медицинской генетике","медицинской статистике","медицинской реабилитации","неврологии","нейрохирургии","неонатологии","нефрологии","онкологии","организации здравоохранения и общественному здоровью","ортодонтии","остеопатии","оториноларингологии (за исключением кохлеарной имплантации)","офтальмологии","паразитологии","парадонтологии","психиатрии","психиатрии-наркологии","психотерапии","пульмонологии","рентгенологии","рефлексотерапии","сексологии","сердечно-сосудистой хирургии","стоматологии детской","стоматологии ортопедической","стоматологии терапевтической","стоматологии хирургической","сурдологии-оториноларингологии","травматологии и ортопедии","транспортировке половых клеток и (или) тканей репродуктивных органов","трансфузиологии","ультразвуковой диагностике","управлению сестринской деятельностью","урологии","физиотерапии","фтизиатрии","функциональной диагностике","челюстно-лицевой хирургии","хирургии","хирургии (абдоминальной)","эндокринологии","эндоскопии","эпидемиологии"]}]},{"name":"При оказании специализированной, в том числе высокотехнологичной, медицинской помощи организуются и выполняются следующие работы (услуги)","arr":[{"name":"при оказании специализированной медицинской помощи в условиях дневного стационара по","arr":["авиационной и космической медицине","акушерскому делу","акушерству и гинекологии (за исключением использования вспомогательных репродуктивных технологий и искусственного прерывания беременности)","акушерству и гинекологии (искусственному прерыванию беременности)","акушерству и гинекологии (использованию вспомогательных репродуктивных технологий)","аллергологии и иммунологии","анестезиологии и реаниматологии","бактериологии","вирусологии","водолазной медицине","гастроэнтерологии","гематологии","генетике","гериатрии","гистологии","дезинфектологии","дерматовенерологии","детской кардиологии","детской онкологии","детской урологии-андрологии","детской хирургии","детской эндокринологии","диабетологии","диетологии","забору гемопоэтических стволовых клеток","забору, криоконсервации и хранению половых клеток и тканей репродуктивных органов","инфекционным болезням","кардиологии","клинической лабораторной диагностике","клинической микологии","клинической фармакологии","колопроктологии","лабораторной генетике","лабораторной диагностике","лабораторной микологии","лабораторному делу","лечебной физкультуре","лечебной физкультуре и спортивной медицине","мануальной терапии","медицинской генетике","медицинской оптике","медицинской реабилитации","медицинской статистике","медицинскому массажу","неврологии","нейрохирургии","неонатологии","нефрологии","общей практике","онкологии","операционному делу","организации здравоохранения и общественному здоровью","организации сестринского дела","ортодонтии","оториноларингологии (за исключением кохлеарной имплантации)","офтальмологии","патологической анатомии","паразитологии","педиатрии","психиатрии","психиатрии-наркологии","психотерапии","пульмонологии","радиологии","радиотерапии","ревматологии","рентгенологии","рентгенэндоваскулярной диагностике и лечению","рефлексотерапии","сексологии","сердечно-сосудистой хирургии","сестринскому делу","сестринскому делу в педиатрии","стоматологии детской","стоматологии ортопедической","стоматологии терапевтической","стоматологии хирургической","сурдологии-оториноларингологии","терапии","торакальной хирургии","травматологии и ортопедии","транспортировке половых клеток и (или) тканей репродуктивных органов","трансфузиологии","ультразвуковой диагностике","управлению сестринской деятельностью","урологии","физиотерапии","фтизиатрии","функциональной диагностике","хирургии","хирургии (абдоминальной)","хирургии (комбустиологии)","челюстно-лицевой хирургии","эндокринологии","эндоскопии","энтомологии","эпидемиологии"]},{"name":"при оказании специализированной медицинской помощи в стационарных условиях по","arr":["авиационной и космической медицине","акушерскому делу","акушерству и гинекологии (за исключением использования вспомогательных репродуктивных технологий и искусственного прерывания беременности)","акушерству и гинекологии (искусственному прерыванию беременности)","акушерству и гинекологии (использованию вспомогательных репродуктивных технологий)","аллергологии и иммунологии","анестезиологии и реаниматологии","бактериологии","вакцинации (проведению профилактических прививок)","вирусологии","водолазной медицине","гастроэнтерологии","гематологии","генетике","гериатрии","гистологии","дезинфектологии","дерматовенерологии","детской кардиологии","детской онкологии","детской урологии-андрологии","детской хирургии","детской эндокринологии","диабетологии","диетологии","забору гемопоэтических стволовых клеток","забору, криоконсервации и хранению половых клеток и тканей репродуктивных органов","изъятию и хранению органов и (или) тканей человека для трансплантации","инфекционным болезням","кардиологии","клинической лабораторной диагностике","клинической микологии","клинической фармакологии","колопроктологии","лабораторной генетике","лабораторной диагностике","лабораторной микологии","лабораторному делу","лечебной физкультуре","лечебной физкультуре и спортивной медицине","мануальной терапии","медицинской генетике","медицинской оптике","медицинской реабилитации","медицинской статистике","медицинскому массажу","неврологии","нейрохирургии","неонатологии","нефрологии","общей практике","онкологии","операционному делу","организации здравоохранения и общественному здоровью","организации сестринского дела","ортодонтии","оториноларингологии (за исключением кохлеарной имплантации)","офтальмологии","паразитологии","патологической анатомии","педиатрии","пластической хирургии","профпатологии","психиатрии","психиатрии-наркологии","психотерапии","пульмонологии","радиологии","радиотерапии","реаниматологии","ревматологии","рентгенологии","рентгенэндоваскулярной диагностике и лечению","рефлексотерапии","сексологии","сердечно-сосудистой хирургии","сестринскому делу","сестринскому делу в педиатрии","стоматологии детской","стоматологии ортопедической","стоматологии терапевтической","стоматологии хирургической","сурдологии-оториноларингологии","терапии","токсикологии","торакальной хирургии","травматологии и ортопедии","транспортировке гемопоэтических стволовых клеток и костного мозга","транспортировке органов и (или) тканей человека для трансплантации","транспортировке половых клеток и (или) тканей репродуктивных органов","трансфузиологии","ультразвуковой диагностике","управлению сестринской деятельностью","урологии","физиотерапии","фтизиатрии","функциональной диагностике","хирургии","хирургии (абдоминальной)","хирургии (комбустиологии)","хранению гемопоэтических стволовых клеток и костного мозга","челюстно-лицевой хирургии","эндокринологии","эндоскопии","энтомологии","эпидемиологии"]},{"name":"при оказании высокотехнологичной медицинской помощи в условиях дневного стационара по","arr":["акушерству и гинекологии (использованию вспомогательных репродуктивных технологий)","акушерству и гинекологии (за исключением использования вспомогательных репродуктивных технологий и искусственного прерывания беременности)","онкологии","ревматологии"]},{"name":"при оказании высокотехнологичной медицинской помощи в стационарных условиях по","arr":["акушерству и гинекологии (за исключением использования вспомогательных репродуктивных технологий и искусственного прерывания беременности)","акушерству и гинекологии (использованию вспомогательных репродуктивных технологий)","гастроэнтерологии","гематологии","дерматовенерологии","детской кардиологии","детской онкологии","детской урологии-андрологии","детской хирургии","детской эндокринологии","кардиологии","колопроктологии","медицинской генетике","неврологии","нейрохирургии","неонатологии","нефрологии","онкологии","оториноларингологии (за исключением кохлеарной имплантации)","оториноларингологии (кохлеарной имплантации)","офтальмологии","педиатрии","ревматологии","сердечно-сосудистой хирургии","торакальной хирургии","травматологии и ортопедии","трансплантации костного мозга и гемопоэтических стволовых клеток","урологии","хирургии (абдоминальной)","хирургии (комбустиологии)","хирургии (трансплантации органов и (или) тканей)","челюстно-лицевой хирургии","эндокринологии"]}]},{"name":"При оказании скорой, в том числе скорой специализированной, медицинской помощи организуются и выполняются следующие работы (услуги)","arr":[{"name":"при оказании скорой медицинской помощи вне медицинской организации по","arr":["организации здравоохранения и общественному здоровью","медицинской статистике","скорой медицинской помощи","управлению сестринской деятельностью"]},{"name":"при оказании скорой специализированной медицинской помощи вне медицинской организации, в том числе выездными экстренными консультативными бригадами скорой медицинской помощи, по","arr":["акушерству и гинекологии (за исключением использования вспомогательных репродуктивных технологий и искусственного прерывания беременности)","анестезиологии и реаниматологии","гематологии","детской кардиологии","детской онкологии","детской урологии-андрологии","детской хирургии","детской эндокринологии","инфекционным болезням","кардиологии","неврологии","нейрохирургии","неонатологии","организации здравоохранения и общественному здоровью","офтальмологии","педиатрии","психиатрии","психиатрии-наркологии","реаниматологии","сердечно-сосудистой хирургии","терапии","токсикологии","торакальной хирургии","травматологии и ортопедии","управлению сестринской деятельностью","урологии","хирургии","хирургии (абдоминальной)","хирургии (комбустиологии)","челюстно-лицевой хирургии","управлению сестринской деятельностью","эндокринологии","эндоскопии"]},{"name":"при оказании скорой медицинской помощи в амбулаторных условиях по","arr":["организации здравоохранения и общественному здоровью","медицинской статистике","скорой медицинской помощи","управлению сестринской деятельностью"]},{"name":"при оказании скорой специализированной медицинской помощи в амбулаторных условиях по","arr":["акушерству и гинекологии (за исключением использования вспомогательных репродуктивных технологий и искусственного прерывания беременности)","анестезиологии и реаниматологии","инфекционным болезням","кардиологии","неврологии","нейрохирургии","организации здравоохранения и общественному здоровью","педиатрии","психиатрии","психиатрии-наркологии","реаниматологии","терапии","токсикологии","травматологии и ортопедии","управлению сестринской деятельностью"]},{"name":"при оказании скорой, в том числе скорой специализированной, медицинской помощи в стационарных условиях (в условиях отделения экстренной медицинской помощи) по","arr":["анестезиологии и реаниматологии","дезинфектологии","клинической лабораторной диагностике","лабораторной диагностике","лабораторному делу","организации здравоохранения и общественному здоровью","общей практике","рентгенологии","сестринскому делу","скорой медицинской помощи","ультразвуковой диагностике","управлению сестринской деятельностью","эндоскопии"]}]},{"name":"При оказании паллиативной медицинской помощи организуются и выполняются следующие работы (услуги)","arr":[{"name":"при оказании паллиативной медицинской помощи в амбулаторных условиях по","arr":["анестезиологии и реаниматологии","гематологии","гериатрии","детской кардиологии","детской онкологии","детской эндокринологии","инфекционным болезням","кардиологии","клинической лабораторной диагностике","колопроктологии","лабораторной диагностике","лабораторному делу","лечебной физкультуре","лечебной физкультуре и спортивной медицине","медико-социальной помощи","медицинскому массажу","медицинской реабилитации","медицинской статистике","неврологии","нефрологии","общей практике","онкологии","организации здравоохранения и общественному здоровью","педиатрии","психиатрии","психиатрии-наркологии","психотерапии","рентгенологии","сестринскому делу","сестринскому делу в педиатрии","терапии","травматологии и ортопедии","управлению сестринской деятельностью","урологии","физиотерапии","хирургии","эндокринологии"]},{"name":"при оказании паллиативной медицинской помощи в стационарных условиях по","arr":["анестезиологии и реаниматологии","гематологии","гериатрии","детской кардиологии","детской онкологии","детской эндокринологии","диетологии","инфекционным болезням","кардиологии","клинической лабораторной диагностике","колопроктологии","лечебной физкультуре","лечебной физкультуре и спортивной медицине","лабораторной диагностике","лабораторному делу","медико-социальной помощи","медицинской статистике","медицинской реабилитации","неврологии","нефрологии","общей практике","онкологии","организации здравоохранения и общественному здоровью","патологической анатомии","педиатрии","психиатрии","психиатрии-наркологии","психотерапии","сестринскому делу","сестринскому делу в педиатрии","терапии","травматологии и ортопедии","трансфузиологии","управлению сестринской деятельностью","урологии","рентгенологии","физиотерапии","хирургии","эндокринологии"]}]},{"name":"При оказании медицинской помощи при санаторно-курортном лечении организуются и выполняются работы (услуги) по","arr":["акушерству и гинекологии (за исключением использования вспомогательных репродуктивных технологий и искусственного прерывания беременности)","акушерскому делу","аллергологии и иммунологии","гастроэнтерологии","гериатрии","гигиеническому воспитанию","дезинфектологии","дерматовенерологии","детской кардиологии","детской урологии-андрологии","детской хирургии","детской эндокринологии","диабетологии","диетологии","кардиологии","клинической лабораторной диагностике","колопроктологии","лабораторной диагностике","лабораторному делу","лечебной физкультуре","лечебной физкультуре и спортивной медицине","мануальной терапии","медицинской реабилитации","медицинской статистике","медицинскому массажу","неврологии","нефрологии","общей практике","организации здравоохранения и общественному здоровью","остеопатии","оториноларингологии (за исключением кохлеарной имплантации)","офтальмологии","педиатрии","профпатологии","психотерапии","пульмонологии","ревматологии","рентгенологии","рефлексотерапии","сестринскому делу","сестринскому делу в педиатрии","стоматологии","стоматологии детской","стоматологии общей практики","стоматологии терапевтической","стоматологии хирургической","сурдологии-оториноларингологии","терапии","травматологии и ортопедии","ультразвуковой диагностике","управлению сестринской деятельностью","урологии","физиотерапии","фтизиатрии","функциональной диагностике","хирургии","эндокринологии","эндоскопии","эпидемиологии"]},{"name":"При проведении медицинских осмотров, медицинских освидетельствований и медицинских экспертиз организуются и выполняются следующие работы (услуги)","arr":[{"name":"при проведении медицинских осмотров по","arr":["медицинским осмотрам (предварительным, периодическим)","медицинским осмотрам (предполетным, послеполетным)","медицинским осмотрам (предрейсовым, послерейсовым)","медицинским осмотрам (предсменным, послесменным)","медицинским осмотрам профилактическим"]},{"name":"при проведении медицинских освидетельствований","arr":["медицинскому освидетельствованию кандидатов в усыновители, опекуны (попечители) или приемные родители","медицинскому освидетельствованию на выявление ВИЧ-инфекции","медицинскому освидетельствованию на наличие инфекционных заболеваний, представляющих опасность для окружающих и являющихся основанием для отказа иностранным гражданам и лицам без гражданства в выдаче либо аннулировании разрешения на временное проживание, или вида на жительство, или разрешения на работу в Российской Федерации","медицинскому освидетельствованию на наличие медицинских противопоказаний к управлению транспортным средством","медицинскому освидетельствованию на наличие медицинских противопоказаний к владению оружием","медицинскому освидетельствованию на состояние опьянения (алкогольного, наркотического или иного токсического)","психиатрическому освидетельствованию"]},{"name":"при проведении медицинских экспертиз по","arr":["военно-врачебной экспертизе","врачебно-летной экспертизе","медико-социальной экспертизе","судебно-медицинской экспертизе","судебно-медицинской экспертизе вещественных доказательств и исследованию биологических объектов (биохимической, генетической, медико-криминалистической, спектрографической, судебно-биологической, судебно-гистологической, судебно-химической, судебно-цитологической, химико-токсикологической)","судебно-медицинской экспертизе и исследованию трупа","судебно-медицинской экспертизе и обследованию потерпевших, обвиняемых и других лиц","судебно-психиатрической экспертизе","однородной амбулаторной судебно-психиатрической экспертизе","комплексной амбулаторной судебно-психиатрической экспертизе","однородной стационарной судебно-психиатрической экспертизе","комплексной стационарной судебно-психиатрической экспертизе (психолого-психиатрической, сексолого-психиатрической)","экспертизе качества медицинской помощи","экспертизе профессиональной пригодности","экспертизе временной нетрудоспособности","экспертизе связи заболевания с профессией"]}]},{"name":"При обращении донорской крови и (или) ее компонентов в медицинских целях организуются и выполняются работы (услуги) по заготовке, хранению донорской крови и (или) ее компонентов","arr":[]}]');
  });

</script>
