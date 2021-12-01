// import Cropper from 'cropperjs';
// GG SIGN IN
var ggID = localStorage.getItem('uid') || null,
    ggAvatar = localStorage.getItem('avatar') || null,
    ggEmail = localStorage.getItem('email') || null,
    ggName = localStorage.getItem('name') || null;
// cv_box dom
var cvFullName = document.getElementById('cv__fullname') || null,
    cvWantedPosition = document.getElementById('cv__wanted__position') || null,
    cvPhoneNumber = document.getElementById('cv__phone__number') || null,
    cvEmail = document.getElementById('cv__email') || null,
    cvAddress = document.getElementById('cv__address') || null,
    cvWebsites = document.getElementsByClassName('cv__websites') || [],
    cvSkillItems = document.getElementById('cv__skill__items') || null,
    cvLanguageItems = document.getElementById('cv__language__items') || null,
    cvAwardItems = document.getElementById('cv__award__items') || null,
    cvProfileDesc = document.getElementById('cv__profile__desc') || null;

var inFullName = document.getElementById('full_name') || null,
    inWantedPosition = document.getElementById('wanted_job_position') || null,
    inEmail = document.getElementById('email') || null,
    inPhoneNumber = document.getElementById('phone_number') || null,
    inAddress = document.getElementById('address') || null,
    inWebsites = document.getElementById('websites') || null,
    inSkillSections = document.getElementsByClassName('skill__section') || [],
    inLanguageSections = document.getElementsByClassName('language__section') || [],
    inAwardSections = document.getElementsByClassName('award__section') || [],
    inProfileDesc = document.getElementById('profile_desc') || null,
    inExperienceSections = document.getElementsByClassName('timeline__section') || [],
    inEductionSections = document.getElementsByClassName('education__section') || [],
    inHobbies = document.getElementsByName('hobby_title') || [];

var image = document.getElementById('image--cropped');  
image.src = ggAvatar;
var options = {
  aspectRatio: 1/1,
  preview: '#preview',
  crop(event) {
    console.log(event.detail.x);
    console.log(event.detail.y);
    console.log(event.detail.width);
    console.log(event.detail.height);
    console.log(event.detail.rotate);
    console.log(event.detail.scaleX);
    console.log(event.detail.scaleY);
  }
}
var cropper;
var uploadedImageURL;

var defaultFullNameBoxH = 63;

$(document).ready(function () {
  if(localStorage.getItem('uid')){
    $('#cropper__container').show();
    $('#cropper__container').height(200);

    cvFullName.innerText = inFullName.value = ggName;
    cvEmail.innerText = inEmail.value = ggEmail;
    image.src = ggAvatar;
    cropper = new Cropper(image, options)
    $('.avatar__box--left').removeClass('hide');

    var avatarW = $('.avatar__box--left').outerWidth();
    var cvHeaderW = $('.cv__header').outerWidth();
    console.log('avaw: ' + avatarW);
    console.log('cvh: ' + cvHeaderW);
    $('.cv__opening--right').width(cvHeaderW - avatarW - 4);
  }
  if($('#cv__fullname').outerHeight() > defaultFullNameBoxH) {
    $('.cv--fullname').css({'margin-top': '22px', 'line-height': '40px'})
  } else {
    $('.cv--fullname').css({'margin-top': '40px', 'line-height' : '50px'})
  }
  $('#cv__fullname').on('DOMSubtreeModified', function(){
    if($(this).outerHeight() > defaultFullNameBoxH) {
      // if($(this).outerHeight() > 100) {
      //   $(this).prop("contenteditable" , false);
      // }
      $('.cv--fullname').css({'margin-top': '22px', 'line-height': '40px'})
    } else {
      $('.cv--fullname').css({'margin-top': '40px', 'line-height' : '50px'})
    }
    console.log('over: ' + $(this).outerHeight())
  });
  $(".cv__textbox").keypress(function(e){ return e.which != 13; });
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

  $('#file').change(() => {
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
var inputImage = document.getElementById('file');
var loadFile = function(event) {

  $('#cropper__container').show();
  $('#cropper__container').height(200);

	image.src = URL.createObjectURL(event.target.files[0]) ;
  if (cropper) {
    cropper.destroy();
  }

  cropper = new Cropper(image, options);
  inputImage.value = null;

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




