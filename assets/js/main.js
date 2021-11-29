// import Cropper from 'cropperjs';


var loadFile = function(event) {
  $('#cropper__container').show();

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
    aspectRatio: 1/1,
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

$(document).ready(function () {
  // toolbar
  $('.toolbar-btn').click(function(){
    $(this).toggleClass('focused');
  })
  // editor 
  $('.post_editor-expand').hide();

  $('.post_content_editor-textarea').focus(function(){
    console.log('focus')
    $(this).prev().addClass('focused');
    $(this).next().next().addClass('focused');
  
  })
  $('.post_content_editor-textarea').blur(function(){
    console.log('blur')

    var textboxContent = $.trim($(this).text());
    if(textboxContent == '') {
      $(this).prev().removeClass('focused');
      $(this).next().next().removeClass('focused');
    }

  })

  $('body').on('DOMSubtreeModified', '.post_content_editor-textarea', function(){
    // console.log('changed');
    var textboxContent = $.trim($(this).text());
    console.log(textboxContent)

    if(textboxContent != ''){
      $(this).parents('.post_editor-expand').find('.upload_post-tab').removeClass('empty');
      console.log('not empty text');
    }
    else
      $(this).parents('.post_editor-expand').find('.upload_post-tab').addClass('empty');
  })

  $('.cancel_post-tab').click(function(){
    $(this).parents('.post_editor-expand').hide();
    $(this).parents('.post_editor-expand').prev('.post_editor-btn').show();
    // $('#post_content_editor-textarea').innerText = '';
  })
  $('.post_editor-btn').click(function(){
    $(this).next().show();
    $(this).hide();
    $(this).children('.post_content_editor-textarea').focus();
  })

  $('#file').click(() => {
    $('.avatar__box--left').removeClass('hide');
    
    var avatarW = $('.avatar__box--left').outerWidth();
    var cvHeaderW = $('.cv__header').outerWidth();
    console.log('avaw: ' + avatarW);
    console.log('cvh: ' + cvHeaderW);
    $('.cv__opening--right').width(cvHeaderW - avatarW - 4);
  })

  $('#remove__btn').click(() => {
    $('.avatar__box--left').addClass('hide');
    $('#cropper__container').hide();
    var cvHeaderW = $('.cv__header').outerWidth();
    console.log('cvh: ' + cvHeaderW);
    $('.cv__opening--right').width(cvHeaderW);
  })

});



