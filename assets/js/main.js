// import Cropper from 'cropperjs';


var loadFile = function(event) {
  var image = document.getElementById('image--cropped');
  var review = document.getElementById('preview')
  console.log('changed')
	image.src = URL.createObjectURL(event.target.files[0]);
  // var cropperCanva = $('.cropper-canvas img')[0];
  // cropperCanva.src = URL.createObjectURL(event.target.files[0]);
  $.each($("img"), function() {
    $(this).attr("src", URL.createObjectURL(event.target.files[0]));
  });
  console.log(image.src)
  new Cropper(image, {
    // dragMode: DRAG_MODE_CROP,
    aspectRatio: 3/4,
    preview: review,
    crop(event) {
      console.log(event.detail.x);
      console.log(event.detail.y);
      console.log(event.detail.width);
      console.log(event.detail.height);
      console.log(event.detail.rotate);
      console.log(event.detail.scaleX);
      console.log(event.detail.scaleY);
    },
  });
};

$(document).ready(function(){
    
  let sample_name_content =  $(".employee_name").text();;
  let sample_profession_name_content = $(".profession_name").text();

  $(".employee_name").focus(function(){
      $(".employee_name").empty();
  });

  $(".profession_name").focus(function(){
      $(".profession_name").empty();
  });

  $("#experience--save").on('click',function(){
      let started_date = $("#experience--from").val();
      let end_date = $("#experience--to").val();
      let company = $("#company--name").val();
      let task = $("#task").val();
      let descript = $("#job--description").val();
      $('.modal-body').find('input').each(function(){
          if(!$(this).prop('required')){
              console.log("NR");
          } else {
              if(!$(this).val()){
                  $(".alert").css("display","block");
                  return false;
              }
                  $('#work--experience').append("<li><div class='date'> From " + started_date + " to " + end_date +
                  "</div> <div class='info'><p class='semi-bold'>"+ task +" ( for " + company +")"+
                  "</p> <p>" + descript+"</p></div></li>");
                  $("#addExperience").modal("hide");
          }
      })
  });
  console.log(sample_name_content);
});