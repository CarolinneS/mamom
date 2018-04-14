
var PROTOCOL = window.location.protocol;
var HOSTNAME = window.location.hostname;
var PORT = window.location.port;

var URL = PROTOCOL + "//" + HOSTNAME + ":" + PORT;

$(document).ready(function(){
  $(".button-collapse").sideNav();

  $('.tabs').tabs();

  $('.modal').modal();

  $("#btnCreateAccount").click(function(event){
    var name = $("#name").val();
    var balance = $("#balance").val();

    if(name) {
      $.ajax({
        url: URL + "/mamom/accounts/",
        type: "POST",
        data: {"name": name, "balance": balance},
        success: function(data) {
          window.location.replace(URL + "/mamom/")
        },
        error: function(data) {
          $("#error").css("display", "block").text("Não foi possível criar uma nova conta agora. Tente mais tarde!");
        }
      });
    } else {
      $("#error").css("display", "block").text("O nome da conta não ser vazio!");
    }
  });

});