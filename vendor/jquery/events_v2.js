function clickerPreview(mes,ano,dia,idname){
  document.getElementById("getday").innerHTML = dia;
}

$(document).ready(function(){
  $("button#edit").click(function(){
    $("#user-info").toggle();
    $("#user-edit").toggleClass('d-none');

    var $this = $(this);
    $this.toggleClass('btn-primary');
    if($this.hasClass('btn-primary')){
      $this.text('Editar datos').attr('class', 'btn btn-primary btn-sm float-right');
      $("button#cancel").attr('class', 'btn btn-warning btn-sm float-right d-none');
      $(".alert-success").attr('class', 'alert alert-success px-3 py-1 mb-3 d-block');
    } else {
      $this.text('Guardar cambios').attr('class', 'btn btn-success btn-sm float-right mr-3');
      $("button#cancel").attr('class', 'btn btn-warning btn-sm float-right d-block');
      $(".alert-success").attr('class', 'alert alert-success px-3 py-1 mb-3 d-none');
      setTimeout(function(){ $(".alert-success").removeClass('d-block').toggle(); }, 9000);
    }
  });
  $("button#cancel").click(function(){
    $("#user-info").toggle();
    $("#user-edit").toggleClass('d-none');
    var $that = $(this);
    if($that.hasClass('btn-warning')){
      $("button#edit").text('Editar datos').attr('class', 'btn btn-primary btn-sm float-right d-block');
      $that.attr('class', 'btn btn-warning btn-sm float-right d-none');
    } else {
      $("button#edit").text('Guardar cambios').attr('class', 'btn btn-success btn-sm float-right d-none');
      $that.attr('class', 'btn btn-warning btn-sm float-right d-block');
    }
  });

  $(function(){

    loaddata();
    //Load the saved data
    // function loadData
    function loaddata() {
        $('#data').html(localStorage.mydata);
    }

    $("#edit").click(function() {
      // template data
      var name = $('#inputName').val();
      var idcard = $('#inputId').val();
      var ips = $('#inputIps').val();
      var phone = $('#inputPhone').val();
      var movile = $('#inputMovile').val();
      var email = $('#inputMail').val();

      var data = '<div class="col-md-6"><div class="row"><div class="form-group col-md-5 my-0"><label for="inputName" class="my-0">Afiliado:</label></div><div class="form-group col-md-7 my-0"><span>' + name + '</span></div>' +
      '<div class="form-group col-md-5 my-0"><label for="inputIdcard" class="my-0">Documento de identidad:</label></div><div class="form-group col-md-7 my-0"><span>' + idcard + '</span></div>' +
      '<div class="form-group col-md-5 my-0"><label for="inputIps" class="my-0">IPS base:</label></div><div class="form-group col-md-7 my-0"><span>' + ips + '</span></div>' + '<div class="form-group col-md-5 my-0"><label for="inputDoctor" class="my-0">Médico de familia:</label></div><div class="form-group col-md-7 my-0"><span>Juan Camilo Sarmiento Perez</span></div></div></div>' +
      '<div class="col-md-6"><div class="row"><div class="form-group col-md-5 my-0"><label for="inputPhone" class="my-0">Número de teléfono:</label></div><div class="form-group col-md-7 my-0"><span>' + phone + '</span></div>' +
      '<div class="form-group col-md-5 my-0"><label for="inputMovile" class="my-0">Número de celular:</label></div><div class="form-group col-md-7 my-0"><span>' + movile + '</span></div>' +
      '<div class="form-group col-md-5 my-0"><label for="inputMail" class="my-0">Correo electrónico:</label></div><div class="form-group col-md-7 my-0"><span>' + email + '</span></div></div></div>';
       localStorage.mydata = data;
       // convert to html
       $('#data').html(localStorage.mydata);
      // view in console
      console.log(localStorage.mydata);
      // sucess
      return false;
    });


    // call local storage plugin
    $('#form').sisyphus({
      customKeyPrefix: 'data_form', //data prefix
      timeout: 10, // in seconds
     });


  });

  (function() {
    /** FORM VALITATION **/
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

  $('#inputState').change(function(){
    if($(this).val() == 'no-programada'){ // or this.value == 'volvo'
      setTimeout(function(){
        $('#inputSede').removeAttr('disabled');
      }, 1500);
    }
  });

  $('#inputSede').change(function(){
    if($(this).val() == 'molinos'){ // or this.value == 'volvo'
      setTimeout(function(){
        $('#inputDate').removeAttr('disabled');
      }, 1500);

      var sede = $("#inputSede option:selected").text();
      document.getElementById("sede").innerHTML = sede;
    }
  });

  $('#inputDoctor').on('change',function(){
    setTimeout(function(){
      $('#schedule').removeClass('d-none');
      $('#schedule .calendar').removeClass('d-none');
    }, 1500);
      //var optionValue = $(this).val();
      //var optionText = $('#dropdownList option[value="'+optionValue+'"]').text();
    var doctor = $("#inputDoctor option:selected").text();
    document.getElementById("doctor").innerHTML = doctor;
    document.getElementById("doctors").innerHTML = doctor;
  });

  $("button#search").click(function(){
    if($('#inputState').val() == "") {
      console.log('De quí no pasas');
      $('#search').css('margin', '32px 0 23px 0');
    } else if ($('#inputSede').val() == "") {
      console.log('Mientras no valides bien no vas a pasar');
      $('#search').css('margin', '32px 0 23px 0');
    } else if ($('#inputDate').val() == "") {
      console.log('Deja de ser terco, no vas a pasar... valida bien');
      $('#search').css('margin', '32px 0 23px 0');
    } else {
      $('#search').css('margin', '32px 0 23px 0');
      setTimeout(function(){
        $('.accordion #collapseTwo').addClass('show');
      }, 2500);
      setTimeout(function(){
        $('.citas-request-items').removeClass('d-none');
      }, 1500);
    }
  });

  var d = new Date();
  var months = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  document.getElementById("month").innerHTML = months[d.getMonth()];
  document.getElementById("months").innerHTML = months[d.getMonth()];
  document.getElementById("day").innerHTML = d.getDate();
  document.getElementById("getday").innerHTML = d.getDate();
  //document.getElementById("selectday").innerHTML = d.getDate() - 5;

  $(".control_citas tr td a.d-block").click(function() {
    $('tr td a.d-block').removeClass("active");
    $(this).addClass("active");

    //$(this).parent().addClass('active').siblings().removeClass('active');

    if($(this).hasClass('active')) {
      var hour = $(this).text();
      document.getElementById("hour").innerHTML = hour;
      $('button#interview').removeAttr('disabled');
    } else {
      $('button#interview').attr('disabled', 'disabled');
    }
  });

  $("#see-more-1").click(function() {
    var elem = $("#see-more-1").text();
    if (elem == "Ver más") {
      //Stuff to do when btn is in the read more state
      $("#see-more-1").text("Ver menos");
      $("table.control_citas tr.ohour td").removeClass('rmore');
    } else {
      //Stuff to do when btn is in the read less state
      $("#see-more-1").text("Ver más");
      $("table.control_citas tr.ohour td").addClass('rmore');
    }
  });

  $("#see-more-2").click(function() {
    var elem = $("#see-more-2").text();
    if (elem == "Ver más") {
      //Stuff to do when btn is in the read more state
      $("#see-more-2").text("Ver menos");
      $("table.control_citas tr.shour td").removeClass('smore');
    } else {
      //Stuff to do when btn is in the read less state
      $("#see-more-2").text("Ver más");
      $("table.control_citas tr.shour td").addClass('smore');
    }
  });

  $("#see-more-3").click(function() {
    var elem = $("#see-more-3").text();
    if (elem == "Ver más") {
      //Stuff to do when btn is in the read more state
      $("#see-more-3").text("Ver menos");
      $("table.control_citas tr.whour td").removeClass('wmore');
    } else {
      //Stuff to do when btn is in the read less state
      $("#see-more-3").text("Ver más");
      $("table.control_citas tr.whour td").addClass('wmore');
    }
  });

});
