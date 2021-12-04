// import Cropper from 'cropperjs';
// GG SIGN IN
// header -> cv -> header fullname --> header position -> not -> yes -> line -> section text -> icon
var colorChoices = {
  'yellow': ['rgba(255, 238, 85,.95)', 'rgba(255,255,255,1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(63, 63, 63, .2)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)'],
  'black': ['rgba(193, 193, 193, .95)', 'rgba(0,0,0,1)', 'rgb(211, 211, 211)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(63, 63, 63, 0.8)', 'rgba(193, 193, 193, 0.95)', 'rgba(193, 193, 193, 0.35)', 'rgba(255, 255, 255, 0.9)', 'rgba(193, 193, 193, 0.95)'],
  'blue': ['rgba(115, 146, 172, .7)', 'rgba(229, 222, 222, .6)','rgba(0, 0, 0, 1)', 'rgba(255,255,255,.8)', 'rgba(229, 222, 222, 0.9)', 'rgba(169, 169, 169, 0.3)', 'rgba(115, 146, 172, 0.7)', 'rgba(255, 255, 255, .8)', 'rgba(115, 146, 172, 0.7)', 'rgba(0,0,0,1)'],
  'gray': ['rgba(193, 193, 193, .95)', 'rgba(255,255,255,1)', 'rgba(0, 0, 0, 1)','rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(63, 63, 63, .2)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)'],

}
var cloneSkillSection = $('.skill__section').eq(0).clone(true, true) || null,
    cloneLanguageSection = $('.language__section').eq(0).clone(true) || null,
    cloneProfileSection = $('.profile__section').eq(0).clone(true) || null,
    cloneExperienceSection = $('.timeline__section').eq(0).clone(true) || null,
    cloneEducationSection = $('.education__section').eq(0).clone(true) || null,
    cloneHobbySection = $('.hobby__section').eq(0).clone(true) || null,
    cloneAwardSection = $('.award__section').eq(0).clone(true) || null,
    cloneCertificateSection = $('.certificate__section').eq(0).clone(true) || null,
    cloneReferenceSection = $('.reference__section').eq(0).clone(true) || null;

var ggID = localStorage.getItem('uid') || null,
    ggAvatar = localStorage.getItem('avatar') || null,
    ggEmail = localStorage.getItem('email') || null,
    ggName = localStorage.getItem('name') || null;
// cv_box dom
var cvFullName = $('#cv__fullname') || null,
    cvWantedPosition = $('#cv__wanted__position') || null,
    cvPhoneNumber = $('#cv__phone__number') || null,
    cvEmail = $('#cv__email') || null,
    cvAddress = $('#cv__address') || null,
    cvWebsites = $('.cv__websites') || [],
    cvSocials = $('.cv__socials') || [],
    cvSkillItems = $('#cv__skill__items') || null,
    cvLanguageItems = $('#cv__language__items') || null,
    cvAwardItems = $('#cv__award__items') || null,
    cvProfileDesc = $('#cv__profile__desc') || null,
    cvHobbies = $('.cv__hobby') || [],
    cvEducationItems = $('#cv__education__items') || null,
    cvExperienceItems = $('#cv__experience__items') || null,
    cvCertificateItems = $('#cv__certificate__items') || null,
    cvReferenceItems = $('.cv__reference') || [];

var inFullName = $('#full_name') || null,
    inWantedPosition = $('#wanted_job_position') || null,
    inEmail = $('#email') || null,
    inPhoneNumber = $('#phone_number') || null,
    inAddress = $('#address') || null,
    inWebsites = $('#websites') || null,
    inSkillSections = $('.skill__section') || [],
    inLanguageSections = $('.language__section') || [],
    inAwardSections = $('.award__section') || [],
    inProfileDesc = $('#profile_desc') || null,
    inExperienceSections = $('.timeline__section') || [],
    inEductionSections = $('.education__section') || [],
    inHobbies = $('.hobby_title') || []
    inCertificateSections = $('.certificate__section') || [],
    inReferenceDections = $('.reference__section') || [];

var cvData = 
{
  'personal': 
  {
    'fullName': '',
    'wantedPosition': '',
    'email': '',
    'address': '',
    'phoneNumber': '',
    'websites': [],
    'socials': []
  },
  'skills': [],
  'languages': [],
  'awards': [],
  'hobbies': [],
  'profile': '',
  'educations': [],
  'certificates': [],
  'references': []
}

localStorage.setItem('cv', cvData)

var image = document.getElementById('image--cropped');  
image.src = ggAvatar;
var options = {
  aspectRatio: 1/1,
  preview: '#preview',
  crop(event) {
    // console.log(event.detail.x);
    // console.log(event.detail.y);
    // console.log(event.detail.width);
    // console.log(event.detail.height);
    // console.log(event.detail.rotate);
    // console.log(event.detail.scaleX);
    // console.log(event.detail.scaleY);
  }
}
var cropper;
var uploadedImageURL;
var cvPages = []
var defaultFullNameBoxH = 63;
var defaultTheme = Object.keys(colorChoices)[0];
var defaultCvHeight = (96/72)*841.89
var currentCvHeight
var isUnderlined;
var windowHeight = $(window).height();
var seperateLine = `<div class="cv__separator"></div>`;
var isOver = false
var isReturn = false
var numPages = 1;
var numLines = 0;
var position = 0;
$(document).ready(function () {
  $('.editor__sidebar--left').height(windowHeight);
  $('.w3-display-container').height(windowHeight-90)
  if(localStorage.getItem('uid')){
    $('#cropper__container').show();
    $('#cropper__container').height(200);

    cvFullName.text(ggName);
    inFullName.val(ggName);
    cvEmail.text(ggEmail);
    inEmail.val(ggEmail);
    image.src = ggAvatar;
    cropper = new Cropper(image, options)
    $('.avatar__box--left').removeClass('hide');

    var avatarW = $('.avatar__box--left').outerWidth();
    var cvHeaderW = $('.cv__header').outerWidth();
    // console.log('avaw: ' + avatarW);
    // console.log('cvh: ' + cvHeaderW);
    $('.cv__opening--right').width(cvHeaderW - avatarW - 4);
  }
  if(localStorage.getItem('theme')){
    setColor(localStorage.getItem('theme'));
  } else{
    localStorage.setItem('theme', defaultTheme)
    setColor(defaultTheme);
  }
  // console.log(localStorage.getItem('underline'))
  if(localStorage.getItem('underline')){
    // console.log('under')
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
    // console.log('over: ' + $(this).outerHeight())
  });
  // $(".cv__textbox").keypress(function(e){ return e.which != 13; });
  // toolbar
  $('.toolbar-btn').click(function(){
    $(this).toggleClass('focused');
  })
  // editor 
  $('.post_editor-expand').hide();

  $('.post_content_editor-textarea').focus(function(){
    // console.log('focus')
    $(this).prev().addClass('focused');
    $(this).next().next().addClass('focused');
  
  })
  $('.post_content_editor-textarea').blur(function(){
    // console.log('blur')

    var textboxContent = $.trim($(this).text());
    if(textboxContent == '') {
      $(this).prev().removeClass('focused');
      $(this).next().next().removeClass('focused');
    }

  })

  $('body').on('DOMSubtreeModified', '.post_content_editor-textarea', function(){
    // console.log('changed');
    var textboxContent = $.trim($(this).text());
    // console.log(textboxContent)

    if(textboxContent != ''){
      $(this).parents('.post_editor-expand').find('.upload_post-tab').removeClass('empty');
      // console.log('not empty text');
    }
    else
      $(this).parents('.post_editor-expand').find('.upload_post-tab').addClass('empty');
  })

  $('.cv__body').on('DOMSubtreeModified', function(){

    if($('.cv__body').height() > currentCvHeight) {

      currentCvHeight += defaultCvHeight;

      $('#cv').css({'height':currentCvHeight})
      isOver = true;
      isReturn = false;
      // console.log(currentCvHeight)
    }else if($('.cv__body').height() <= currentCvHeight - defaultCvHeight){
      isReturn = true;
      isOver = false;
      currentCvHeight -= defaultCvHeight
      console.log('return')

      $('#cv').css({'height':currentCvHeight})
    }else if($('.cv__body').height() < defaultCvHeight) {
      currentCvHeight = defaultCvHeight;
      isOver = false;
      isReturn = false;
      $('#cv').css({'height':currentCvHeight})
    }  else {
      isOver = false;
      isReturn = false;
    }
    if(isOver) {
      var newLine = $(seperateLine).clone(true);
      $(newLine).css({'top': currentCvHeight - defaultCvHeight})
      numLines += 1;
      numPages += 1
      $('#cv').append($(newLine))
      $('.page__total').text(numPages)
    } 
    if(isReturn) {
      numPages -= 1
      numLines -= 1
      console.log('return p')

      $('.cv__separator:last-child').remove();
      $('.page__total').text(numPages)
    }
  });

  // ====================================== PAGE COUNTER ON SCROLL ===============================================
  $( ".w3-content" ).scroll(function() {
    if($(this).scrollTop() > position){
      $('.page__index').val(Math.ceil(($(this).scrollTop() + 1)/ (defaultCvHeight)));

    } else {
      $('.page__index').val(Math.ceil(($(this).scrollTop() + 1)/ (defaultCvHeight)));

    }
    position = $(this).scrollTop() 
  });
  $('.cancel_post-tab').click(function(){
    $(this).parents('.post_editor-expand').hide();
    $(this).parents('.post_editor-expand').prev('.post_editor-btn').show();
    // $('#post_content_editor-textarea').innerText = '';
  })
  $('.post_instruction-btn').click(function(){
    $(this).closest('.post_editor-btn').next('.post_editor-expand').show();
    // console.log( $(this).closest('.post_editor-expand'))
    $(this).parents('.post_editor-btn').hide();
  })

  $('#file').change(() => {
    $('.avatar__box--left').removeClass('hide');

    var avatarW = $('.avatar__box--left').outerWidth();
    var cvHeaderW = $('.cv__header').outerWidth();
    // console.log('avaw: ' + avatarW);
    // console.log('cvh: ' + cvHeaderW);
    $('.cv__opening--right').width(cvHeaderW - avatarW - 4);
  })
  // REMOVE AVATAR
  $('#remove__btn').click(() => {
    $('.avatar__box--left').addClass('hide');
    $('#cropper__container').hide();

    var cvHeaderW = $('.cv__header').outerWidth();
    // console.log('cvh: ' + cvHeaderW);
    $('.cv__opening--right').width(cvHeaderW);
  });

  // ADD NEW SECTION
  $('#skill__addition').click(()=> {
    // console.log(cloneSkillSection)
    var num = $('.skill__section').length
    var cloneSection = cloneSkillSection.clone(true, true);
    if(num == 0)
      cloneSection.attr('order', num+1).insertAfter($('#skill__addition'));
    else{
      cloneSection.attr('order', num+1).insertAfter($('.skill__section')[num-1]);
    }
  });
  $('#language__addition').click(()=> {
    var num = $('.language__section').length
    var cloneSection = $('.language__section').eq(0).clone(true) || null;

    if(num == 0)
      cloneLanguageSection.insertAfter($('#language__addition')).attr('order', num+1);
    else
      cloneSection.insertAfter($('.language__section')[num-1]).attr('order', num+1);
  });
  $('#profile__addition').click(()=> {
    var num = $('.profile__section').length

    if(num == 0)
      cloneProfileSection.attr('order', num+1).insertAfter($('#profile__addition'));
  });
  $('#timeline__addition').click(()=> {
    var num = $('.timeline__section').length
    var cloneSection = $('.timeline__section').eq(0).clone(true) || null;

    if(num == 0)
      cloneExperienceSection.attr('order', num+1).insertAfter($('#timeline__addition'));
    else
      cloneSection.attr('order', num+1).insertAfter($('.timeline__section')[num-1]);
  });
  $('#education__addition').click(()=> {
    var num = $('.education__section').length
    var cloneSection = $('.education__section').eq(0).clone(true) || null;

    if(num == 0)
      cloneEducationSection.attr('order', num+1).insertAfter($('#education__addition'));
    else
      cloneSection.attr('order', num+1).insertAfter($('.education__section')[num-1]);
  });
  $('#hobby__addition').click(()=> {
    var num = $('.hobby__section').length
    var cloneSection = $('.hobby__section').eq(0).clone(true) || null;

    if(num == 0)
      cloneHobbySection.attr('order', num+1).insertAfter($('#hobby__addition'));
    else
      cloneSection.attr('order', num+1).insertAfter($('.hobby__section')[num-1]);
  });
  $('#award__addition').click(()=> {
    var num = $('.award__section').length
    var cloneSection = $('.award__section').eq(0).clone(true) || null;

    if(num == 0)
      cloneAwardSection.attr('order', num+1).insertAfter($('#award__addition'));
    else
      cloneSection.attr('order', num+1).insertAfter($('.award__section')[num-1]);
  });
  $('#certificate__addition').click(()=> {
    var num = $('.certificate__section').length
    var cloneSection = $('.certificate__section').eq(0).clone(true) || null;

    if(num == 0)
      cloneCertificateSection.attr('order', num+1).insertAfter($('#certificate__addition'));
    else
      cloneSection.attr('order', num+1).insertAfter($('.certificate__section')[num-1]);
  });
  $('#reference__addition').click(()=> {
    var num = $('.reference__section').length
    var cloneSection = $('.reference__section').eq(0).clone(true) || null;

    if(num == 0)
      cloneReferenceSection.attr('order', num+1).insertAfter($('#reference__addition'));
    else
      cloneSection.attr('order', num+1).insertAfter($('.reference__section')[num-1]);
  });

// catch input change
});
$(function() {
  inFullName.keyup(() => {
    cvFullName.text(inFullName.val());
  });
  inWantedPosition.keyup(() => {
    cvWantedPosition.text(inWantedPosition.val());
  });
  inAddress.keyup(() => {
    cvAddress.text(inAddress.val());
  });
  inEmail.keyup(() => {
    cvEmail.text(inEmail.val());
  });
  
});
var removeSection = function(element){
  var sections = $(element).closest('.section__box--expand')
  $(element).closest('.section__box--expand').remove();
  updateSectionOrder()
}
var updateSectionOrder = function(){
  var skills = $('.skill__section')
  // console.log(skills)
  if(skills.length > 0){
    $.each(skills, (index, section) => {
      $(section).attr('order', index+1);
    });
  } else {
    $('.cv__skill__box').hide();
  }
  var profile = $('.profile__section')
  if(!profile.length > 0){
    $('.cv__profile__box').hide();
  }
  var languages = $('.language__section')
  if(languages.length > 0){
    $.each(languages ,(index, section) => {
      $(section).attr('order', index+1);
    });
  }else {
    $('.cv__language__box').hide();
  }
  var experiences = $('.timeline__section')
  if(experiences.length > 0){
    $.each(experiences ,(index, section) => {
      $(section).attr('order', index+1);
    });
  }else {
    $('.cv__experience__box').hide();
  }
  var educations = $('.education__section')
  if(educations.length > 0){
    $.each(educations ,(index, section) => {
      $(section).attr('order', index+1);
    });
  }else {
    $('.cv__education__box').hide();
  }
  var hobbies = $('.hobby__section')
  if(hobbies.length > 0){
    $.each(hobbies ,(index, section) => {
      $(section).attr('order', index+1);
    });
  }else {
    $('.cv__hobby__box').hide();
  }
  var awards = $('.award__section')
  if(awards.length > 0){
    $.each(awards ,(index, section) => {
      $(section).attr('order', index+1);
    });
  }else {
    $('.cv__award__box').hide();
  }
  var certificates = $('.certificate__section')
  if(certificates.length > 0){
    $.each(certificates ,(index, section) => {
      $(section).attr('order', index+1);
    });
  }else {
    $('.cv__certificate__box').hide();
  }
  var references = $('.reference__section')
  if(references.length > 0){
    $.each(references ,(index, section) => {
      $(section).attr('order', index+1);
    });
  }else {
    $('.cv__reference__box').hide();
  }
}
// header bg -> cv bg -> cv text -> header fullname --> header position -> not -> yes -> line -> section text -> icon
var rateLevel = function(element) {
  $(element).toggleClass('yes');
  $(element).toggleClass('not');
  setColor(localStorage.getItem('theme'));
  // console.log('token changed')
}
var updateColor = function(choiceElement) {
  // console.log('choise')
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

// $(document).ready(function(){
    
//   let sample_name_content =  $(".employee_name").text();;
//   let sample_profession_name_content = $(".profession_name").text();

//   $(".employee_name").focus(function(){
//       $(".employee_name").empty();
//   });

//   $(".profession_name").focus(function(){
//       $(".profession_name").empty();
//   });

//   $("#experience--save").on('click',function(){
//       let started_date = $("#experience--from").val();
//       let end_date = $("#experience--to").val();
//       let company = $("#company--name").val();
//       let task = $("#task").val();
//       let descript = $("#job--description").val();
//       $('.modal-body').find('input').each(function(){
//           if(!$(this).prop('required')){
//           } else {
//               if(!$(this).val()){
//                   $(".alert").css("display","block");
//                   return false;
//               }
//                   $('#work--experience').append("<li><div class='date'> From " + started_date + " to " + end_date +
//                   "</div> <div class='info'><p class='semi-bold'>"+ task +" ( for " + company +")"+
//                   "</p> <p>" + descript+"</p></div></li>");
//                   $("#addExperience").modal("hide");
//           }
//       })
//   });
//   console.log(sample_name_content);
// });




