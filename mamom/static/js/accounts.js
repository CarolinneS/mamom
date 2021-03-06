var PROTOCOL = window.location.protocol;
var HOSTNAME = window.location.hostname;
var PORT = window.location.port;

var URL = PROTOCOL + "//" + HOSTNAME + ":" + PORT;

function fillModalCreateTransation() {
  $.ajax({
    url: URL + "/mamom/categories/",
    type: "GET",
    success: function(data) {
      $("#category").empty();

      for(index in data) {
        $("#category").append($("<option />").text(data[index]["name"]).attr("value", data[index]["_id"]))
      }

      $('select').material_select();
    }
  });
}

$(document).ready(function(){
  $(".button-collapse").sideNav();

  $('.tabs').tabs();

  $('.modal').modal();

  $('select').material_select();


  $("#btnDeleteUser").click(function(event) {
    $.ajax({
      url: URL + "/mamom/users/",
      type: "DELETE",
      success: function(data) {
        window.location.replace(URL + "/mamom/");
      }
    });
  });


  $("#btnDeleteTransation").click(function(event) {
    var accountId = $("#accountId").val();
    var transationId = $("#modal-edit-transation-id").val();

    $.ajax({
      url: URL + "/mamom/transations/" + transationId + "/",
      type: "DELETE",
      success: function(data) {
        window.location.replace(URL + "/mamom/accounts/" + accountId + "/");
      }
    });
  });

  $("#btnEditTransation").click(function(event){
    var accountId = $("#accountId").val();
    var transationId = $("#modal-edit-transation-id").val();
    var name = $("#modal-edit-transation-name").val();
    var categoryId = $("#modal-edit-transation-category :checked").val();

    $.ajax({
      url: URL + "/mamom/transations/" + transationId + "/",
      type: "PUT",
      data: {"name": name, "categoryId": categoryId},
      success: function(data) {
        window.location.replace(URL + "/mamom/accounts/" + accountId + "/");
      }
    });
  });


  $(".transation").dblclick(function(event){
    var transationId = $(this).children(".transationId").val();

    $("#modal-edit-transation-id").attr("value", transationId);

    /*carregando categorias*/
    $.ajax({
      url: URL + "/mamom/categories/",
      type: "GET",
      success: function(data) {
        $("#modal-edit-transation-category").empty();

        for(index in data) {
          $("#modal-edit-transation-category").append($("<option />").text(data[index]["name"]).attr("value", data[index]["_id"]))
        }

        $('select').material_select();
      }
    });

    $("#modal-edit-transation").modal('open');
  });


  $("#btnCreateTransation").click(function(event){
    var accountId = $("#accountId").val();
    var name = $("#name").val();
    var categoryId = $("#category :checked").val();
    var createdAt = $("#createdAt").val();
    var value = $("#value").val();

    $.ajax({
      url: URL + "/mamom/transations/",
      type: "POST",
      data: {"accountId": accountId, "name": name, "categoryId": categoryId, "createdAt": createdAt, "value": value},
      success: function(data) {
        window.location.replace(URL + "/mamom/accounts/" + accountId + "/");
      }
    });


  });
});
