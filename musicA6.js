$(document).ready(function(){


  $("button").click(function(){
    $.getJSON("JSON_A6.json", function(result){
      $.each(result, function(i, field){
        $("#output").append(field + " ");
      });
    });
  });
});
