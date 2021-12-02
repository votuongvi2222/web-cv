// import Cropper from 'cropperjs';
// GG SIGN IN
// header -> cv -> header fullname --> header position -> not -> yes -> line -> section text -> icon
var colorChoices = {
  'yellow': ['rgba(255, 238, 85,.95)', 'rgba(255,255,255,1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(63, 63, 63, .2)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)'],
  'black': ['rgba(193, 193, 193, .95)', 'rgba(0,0,0,1)', 'rgb(211, 211, 211)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(63, 63, 63, 0.8)', 'rgba(193, 193, 193, 0.95)', 'rgba(193, 193, 193, 0.35)', 'rgba(255, 255, 255, 0.9)', 'rgba(193, 193, 193, 0.95)'],
  'blue': ['rgba(115, 146, 172, .7)', 'rgba(229, 222, 222, .6)','rgba(0, 0, 0, 1)', 'rgba(255,255,255,.8)', 'rgba(229, 222, 222, 0.9)', 'rgba(169, 169, 169, 0.3)', 'rgba(115, 146, 172, 0.7)', 'rgba(255, 255, 255, .8)', 'rgba(115, 146, 172, 0.7)', 'rgba(0,0,0,1)'],
  'gray': ['rgba(193, 193, 193, .95)', 'rgba(255,255,255,1)', 'rgba(0, 0, 0, 1)','rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(63, 63, 63, .2)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)'],

}
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
    cvSocials = document.getElementsByClassName('cv__socials') || [],
    cvSkillItems = document.getElementById('cv__skill__items') || null,
    cvLanguageItems = document.getElementById('cv__language__items') || null,
    cvAwardItems = document.getElementById('cv__award__items') || null,
    cvProfileDesc = document.getElementById('cv__profile__desc') || null,
    cvHobbies = document.getElementsByClassName('cv__hobby') || [],
    cvEducationItems = document.getElementById('cv__education__items') || null,
    cvExperienceItems = document.getElementById('cv__experience__items') || null,
    cvCertificateItems = document.getElementById('cv__certificate__items') || null,
    cvReferenceItems = document.getElementsByClassName('cv__reference') || [];

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
    inHobbies = document.getElementsByName('hobby_title') || []
    inCertificateSections = document.getElementsByClassName('certificate__section') || [],
    inReferenceDections = document.getElementsByClassName('reference__section') || [];

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
var cvPages = []
var defaultFullNameBoxH = 63;
var defaultTheme = Object.keys(colorChoices)[0];
var isUnderlined;

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
  if(localStorage.getItem('theme')){
    console.log(localStorage.getItem('theme'))
    setColor(localStorage.getItem('theme'));
  } else{
    setColor(defaultTheme);
  }
  console.log(localStorage.getItem('underline'))
  if(localStorage.getItem('underline')){
    console.log('under')
    isUnderlined = false;
    $('.underline__chooser').click();
    
  } else {
    isUnderlined = true;
    $('.underline__chooser').click();
  }

  if($('#cv__fullname').outerHeight() > defaultFullNameBoxH) {
    $('.cv--fullname').css({'margin-top': '22px'})
  } else {
    $('.cv--fullname').css({'margin-top': '40px'})
  }
  $('#cv__fullname').on('DOMSubtreeModified', function(){
    if($(this).outerHeight() > defaultFullNameBoxH) {
      // if($(this).outerHeight() > 100) {
      //   $(this).prop("contenteditable" , false);
      // }
      $('.cv--fullname').css({'margin-top': '22px'})
    } else {
      $('.cv--fullname').css({'margin-top': '40px'})
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
  $('body').on('DOMSubtreeModified', function(){
    
    console.log('body changed')
  });
});
// header bg -> cv bg -> cv text -> header fullname --> header position -> not -> yes -> line -> section text -> icon
var updateColor = function(choiceElement) {
  console.log('choise')
  var choice = $(choiceElement).data("color");
  $('.cv__opening--right').css({'background-color': colorChoices[choice][0]});
  $('.cv').css({'background-color': colorChoices[choice][1], 'color': colorChoices[choice][2]});
  $('#cv__fullname').css({'color': colorChoices[choice][3]});
  $('#cv__wanted__position').css({'color': colorChoices[choice][4]});
  $('div.not').css({'background-color': colorChoices[choice][5]});
  $('i.not').css({'color': colorChoices[choice][5]});
  $('div.yes').css({'background-color': colorChoices[choice][6]});
  $('i.yes').css({'color': colorChoices[choice][6]});
  $('.cv__section__title--underline').css({'border-color': colorChoices[choice][7]});
  $('.timeline__circle').css({'background-color': colorChoices[choice][7]});
  $('.timeline__line').css({'background-color': colorChoices[choice][7]});
  $('.section__title--uppercase').css({'color': colorChoices[choice][8]});
  $('.list__bullet').css({'background-color': colorChoices[choice][8]});
  $('.cv__personal__items i').css({'color': colorChoices[choice][9]});
  localStorage.setItem('theme', choice)
}
var setColor = function(choice) {

  $('.cv__opening--right').css({'background-color': colorChoices[choice][0]});
  $('.cv').css({'background-color': colorChoices[choice][1], 'color': colorChoices[choice][2]});
  $('#cv__fullname').css({'color': colorChoices[choice][3]});
  $('#cv__wanted__position').css({'color': colorChoices[choice][4]});
  $('div.not').css({'background-color': colorChoices[choice][5]});
  $('i.not').css({'color': colorChoices[choice][5]});
  $('div.yes').css({'background-color': colorChoices[choice][6]});
  $('i.yes').css({'color': colorChoices[choice][6]});
  $('.cv__section__title--underline').css({'border-color': colorChoices[choice][7]});
  $('.timeline__circle').css({'background-color': colorChoices[choice][7]});
  $('.timeline__line').css({'background-color': colorChoices[choice][7]});
  $('.section__title--uppercase').css({'color': colorChoices[choice][8]});
  $('.list__bullet').css({'background-color': colorChoices[choice][8]});
  $('.cv__personal__items i').css({'color': colorChoices[choice][9]});
}

var setUnderline = function(element){
  // $(element).toggleClass('underline');
  if(!isUnderlined) {
    $(element).addClass('underline');
    $('.cv__section__title--underline').addClass('border__bottom');
    isUnderlined = true;
    localStorage.setItem('underline', 'under')
  } else {
    $(element).removeClass('underline');
    $('.cv__section__title--underline').removeClass('border__bottom');
    isUnderlined = false
    localStorage.removeItem('underline')
  }
}
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




