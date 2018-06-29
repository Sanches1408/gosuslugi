<script>

var tr = '.modal:nth-last-of-type(2) .attr-list-layout tr';
$(tr+'li:first-child').hide();
$(tr+':not(:first-child)').hide();

$(tr+':first-child li:not(:first-child)').each(function(){
  $(this).click(function(){
    $(tr+':last-of-type').hide();
    $(tr+':nth-child(2)').hide();
    $(tr+':last-of-type li:not(:first-child)').hide();
    $(tr+':nth-child(2) li:not(:first-child)').hide();
    var lvl = window.dictionary.findOneLvl($(this).text());

    if (lvl.length) {
      $(tr+':nth-child(2)').show();
      $(lvl).show();
    }
  });
});

</script>
