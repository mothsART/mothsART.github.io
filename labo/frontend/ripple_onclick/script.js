
$(function(){
  $(document).on('click', function(e){
    var x = e.pageX;
    var y = e.pageY;

    $("#ink").remove();

    $('body').append("<div id='ink'><div></div></div>");
    $("#ink").css({
      marginLeft: x - 10,   marginTop: y - 10
    });
  });
});