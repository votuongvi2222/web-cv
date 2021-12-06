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
    console.log('avaw: ' + avatarW);
    console.log('cvh: ' + cvHeaderW);
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
  // 2 way2
  // var cvFullName = $('#cv__fullname') || null,
  //   cvWantedPosition = $('#cv__wanted__position') || null,
  //   cvPhoneNumber = $('#cv__phone__number') || null,
  //   cvEmail = $('#cv__email') || null,
  //   cvAddress = $('#cv__address') || null,
  //   cvWebsites = $('.cv__websites') || [],
  //   cvSocials = $('.cv__socials') || [],
  //   cvSkillItems = $('#cv__skill__items') || null,
  //   cvLanguageItems = $('#cv__language__items') || null,
  //   cvAwardItems = $('#cv__award__items') || null,
  //   cvProfileDesc = $('#cv__profile__desc') || null,
  //   cvHobbies = $('.cv__hobby') || [],
  //   cvEducationItems = $('#cv__education__items') || null,
  //   cvExperienceItems = $('#cv__experience__items') || null,
  //   cvCertificateItems = $('#cv__certificate__items') || null,
  //   cvReferenceItems = $('.cv__reference') || [];


  //=================================================
  // var inFullName = $('#full_name') || null,
  //   inWantedPosition = $('#wanted_job_position') || null,
  //   inEmail = $('#email') || null,
  //   inPhoneNumber = $('#phone_number') || null,
  //   inAddress = $('#address') || null,
  //   inWebsites = $('#websites') || null,
  //   inSkillSections = $('.skill__section') || [],
  //   inLanguageSections = $('.language__section') || [],
  //   inAwardSections = $('.award__section') || [],
  //   inProfileDesc = $('#profile_desc') || null,
  //   inExperienceSections = $('.timeline__section') || [],
  //   inEductionSections = $('.education__section') || [],
  //   inHobbies = $('.hobby_title') || []
  //   inCertificateSections = $('.certificate__section') || [],
  //   inReferenceDections = $('.reference__section') || [];
  $('.cv__textbox').on('DOMSubtreeModified', ()=>{
    // ======================SKILL============================
    let skillTitles = [],
        skillLevels = [],
        skillDescs = [];

    $(cvSkillItems).children('.cv__item').each((index,item)=>{
      // console.log($(item).find('.yes').length);
      skillTitles.push($(item).children('.cv__skill__title').text());
      skillLevels.push($(item).find('.yes').length);
      skillDescs.push($(item).children('.cv__skill__desc').text());
    })
    // console.log(skillTitles[0])
    $('.skill_title').each((index, item)=> {
        $(item).val(skillTitles[index]);
    })
    $('.skill_level').each((index, item)=> {
      $(item).val(skillLevels[index]);
    })
    $('.skill_desc').each((index, item)=> {
      $(item).text(skillDescs[index]);
    })

    let languageTitles = [],
        languageLevels = [],
        languageDescs = [];

    // ======================LANGUAGE============================
        
    $(cvLanguageItems).children('.cv__item').each((index,item)=>{
      // console.log($(item).find('.yes').length);
      languageTitles.push($(item).children('.cv__language__title').text());
      languageLevels.push($(item).find('.yes').length);
      languageDescs.push($(item).children('.cv__language__desc').text());
    })
    // console.log(skillTitles[0])
    $('.language_title').each((index, item)=> {
        $(item).val(languageTitles[index]);
    })
    $('.language_level').each((index, item)=> {
      $(item).val(languageLevels[index]);
    })
    $('.language_desc').each((index, item)=> {
      $(item).text(languageDescs[index]);
    })

    // ======================AWARD============================

    let awardTitles = [],
        awardPlaces = [],
        awardYears = [],
        awardDescs = [];
        
    $(cvAwardItems).children('.cv__item').each((index,item)=>{
      // console.log($(item).find('.cv__award__title').text())
      awardTitles.push($(item).find('.cv__award__title').text());
      awardPlaces.push($(item).find('.cv__award__place').text());
      awardYears.push($(item).find('.cv__award__year').text());
      awardDescs.push($(item).find('.cv__award__desc').text());
    })
    // console.log(skillTitles[0])
    $('.award_title').each((index, item)=> {
        $(item).val(awardTitles[index]);
    })
    $('.award_place').each((index, item)=> {
      $(item).val(awardPlaces[index]);
    })
    $('.award_year').each((index, item)=> {
      $(item).val(awardYears[index]);
    })
    $('.award_desc').each((index, item)=> {
      $(item).text(awardDescs[index]);
    })
    // ======================HOBBIES============================
    let hobbies = []
    $(cvHobbies).each((index,item)=>{
      // console.log($(item).text())
      hobbies.push($(item).text());
    })
    $('.hobby_title').each((index,item) => {
      $(item).val(hobbies[index]);
    })
    inProfileDesc.text($('#cv__profile__desc').text())
    // ======================EDUCATION============================
    let eduSchools = [],
        eduFroms = [],
        eduTos = [],
        eduLocations = [],
        eduDescs = [];
    
    $(cvEducationItems).children('.cv__item').each((index,item)=>{
      // console.log($(item).find('.cv__award__title').text())
      eduSchools.push($(item).find('.cv__education__school').text());
      eduFroms.push($(item).find('.cv__education__from').text());
      eduTos.push($(item).find('.cv__education__to').text());
      eduLocations.push($(item).find('.cv__education__location').text());
      eduDescs.push($(item).find('.cv__education__desc').text());

    })
    // console.log(skillTitles[0])
    $('.education_school_title').each((index, item)=> {
        $(item).val(eduSchools[index]);
    })
    $('.education_date_from').each((index, item)=> {
      let dates = eduFroms[index].split('/');
      let month = dates[0] || '01'
      let year = dates[1] || '2021'
      if(month.length < 2)
        month = "0" + month;
      $(item).val(year+"-"+month);
    })
    $('.education_date_to').each((index, item)=> {
      let dates = eduTos[index].split('/');
      let month = dates[0] || '01'
      let year = dates[1] || '2021'
      if(month.length < 2)
        month = "0" + month;
      $(item).val(year+"-"+month);
    })
    $('.education_location').each((index, item)=> {
      $(item).val(eduLocations[index]);
    })
    $('.education_desc').each((index, item)=> {
      $(item).text(eduDescs[index]);
    })
    // ==============================ExPERIENCE===========================
    let exJobs = [],
        exCompanies = [],
        exFroms = [],
        exTos = [],
        exLocations = [],
        exDescs = [];

    $(cvExperienceItems).children('.cv__item').each((index,item)=>{
      // console.log($(item).find('.cv__award__title').text())
      // console.log($('.cv__experience__job__position').text())
      exJobs.push($(item).find('.cv__experience__job__position').text());
      exCompanies.push($(item).find('.cv__experience__company').text());
      exFroms.push($(item).find('.cv__experience__from').text());
      exTos.push($(item).find('.cv__experience__to').text());
      exLocations.push($(item).find('.cv__experience__location').text());
      exDescs.push($(item).find('.cv__experience__desc').text());
    })
    // console.log(skillTitles[0])
    $('.experience_job_position_title').each((index, item)=> {
        console.log(exJobs[index])
        $(item).val(exJobs[index]);
    })
    $('.experience_date_from').each((index, item)=> {
      let dates = exFroms[index].split('/');
      let month = dates[0] || '01'
      let year = dates[1] || '2021'
      if(month.length < 2)
        month = "0" + month;
      $(item).val(year+"-"+month);
    })
    $('.experience_date_to').each((index, item)=> {
      let dates = exTos[index].split('/');
      let month = dates[0] || '01'
      let year = dates[1] || '2021'
      if(month.length < 2)
        month = "0" + month;
      $(item).val(year+"-"+month);
    })
    $('.experience_company').each((index, item)=> {
      $(item).val(exCompanies[index]);
    })
    $('.experience_location').each((index, item)=> {
      $(item).val(exLocations[index]);
    })
    $('.experience_desc').each((index, item)=> {
      $(item).text(exDescs[index]);
    })
    //===============================CERTIFICATES==========================
    let cerTitles = [],
        cerYears = [],
        cerDescs = [];

    $(cvCertificateItems).children('.cv__item').each((index,item)=>{
      // console.log($(item).find('.cv__award__title').text())
      // console.log($('.cv__experience__job__position').text())
      cerTitles.push($(item).find('.cv__certificate__title').text());
      cerYears.push($(item).find('.cv__certificate__year').text());
      cerDescs.push($(item).find('.cv__certificate__desc').text());
    })
    // console.log(skillTitles[0])
    $('.certificate_title').each((index, item)=> {
        $(item).val(cerTitles[index]);
    })
    $('.certificate_year').each((index, item)=> {
      $(item).val(cerYears[index]);

    })
    $('.certificate_desc').each((index, item)=> {
      $(item).val(cerDescs[index]);
    })
  })

  $('body').on('DOMSubtreeModified', function(){

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
    var cloneSkillTextbox = $('.skill_item').eq(0).clone(true, true);
    if(num == 0){
      cloneSection.attr('order', num+1).insertAfter($('#skill__addition'));
      cloneSkillTextbox.attr('order', num+1).insertAfter($('#skill__title__sample'));
    }
    else{
      cloneSection.attr('order', num+1).insertAfter($('.skill__section')[num-1]);
      cloneSkillTextbox.attr('order', num+1).insertAfter($('#skill__title__sample'));
    }
    
  });
  $('#language__addition').click(()=> {
    var num = $('.language__section').length
    var cloneSection = $('.language__section').eq(0).clone(true) || null;
    var cloneLangTextbox = $('.cv__skill__text__items').eq(0).clone(true, true);

    if(num == 0){
      cloneLanguageSection.insertAfter($('#language__addition')).attr('order', num+1);
      cloneLangTextbox.attr('order', num+1).insertAfter($('.cv__skill__text__items'));
    }else
      cloneSection.insertAfter($('.language__section')[num-1]).attr('order', num+1);
      cloneLangTextbox.attr('order', num+1).insertAfter($('.cv__skill__text__items'));
  });
  $('#profile__addition').click(()=> {
    var num = $('.profile__section').length

    if(num == 0)
      cloneProfileSection.attr('order', num+1).insertAfter($('#profile__addition'));
  });
  $('#timeline__addition').click(()=> {
    var num = $('.timeline__section').length
    var cloneSection = $('.timeline__section').eq(0).clone(true) || null;
    var cloneExperienceTextbox = $('.timeline__experience').eq(0).clone(true, true);

    if(num == 0){
      cloneExperienceSection.attr('order', num+1).insertAfter($('#timeline__addition'));
      cloneExperienceTextbox.attr('order', num+1).insertAfter($('.timeline__experience'));
    }
    else
      cloneSection.attr('order', num+1).insertAfter($('.timeline__section')[num-1]);
      cloneExperienceTextbox.attr('order', num+1).insertAfter($('.timeline__experience')[num-1]);
  });
  $('#education__addition').click(()=> {
    var num = $('.education__section').length
    var cloneEducationTextbox = $('.timeline__education').eq(0).clone(true, true);
    var cloneSection = $('.education__section').eq(0).clone(true) || null;

    if(num == 0){
      cloneEducationSection.attr('order', num+1).insertAfter($('#education__addition'));
      cloneEducationTextbox.attr('order', num+1).insertAfter($('.timeline__education'));
    }
      
    else
      cloneSection.attr('order', num+1).insertAfter($('.education__section')[num-1]);
      cloneEducationTextbox.attr('order', num+1).insertAfter($('.timeline__education')[num-1]);
  });
  $('#hobby__addition').click(()=> {
    var num = $('.hobby__section').length
    var cloneHobbieTextbox = $('.cv__hobby__item').eq(0).clone(true, true);
    var cloneSection = $('.hobby__section').eq(0).clone(true) || null;

    if(num == 0){
      cloneHobbySection.attr('order', num+1).insertAfter($('#hobby__addition'));
      cloneHobbieTextbox.attr('order', num+1).insertAfter($('.cv__hobby__item'));
    }
    else
      cloneSection.attr('order', num+1).insertAfter($('.hobby__section')[num-1]);
      cloneHobbieTextbox.attr('order', num+1).insertAfter($('.cv__hobby__item')[num-1]);
  });
  $('#award__addition').click(()=> {
    var num = $('.award__section').length
    var cloneAwardTextbox = $('.cv__award__item').eq(0).clone(true, true);
    var cloneSection = $('.award__section').eq(0).clone(true) || null;

    if(num == 0){
      cloneAwardSection.attr('order', num+1).insertAfter($('#award__addition'));
      cloneAwardTextbox.attr('order', num+1).insertAfter($('.cv__award__item'));
    }else
      cloneSection.attr('order', num+1).insertAfter($('.award__section')[num-1]);
      cloneAwardTextbox.attr('order', num+1).insertAfter($('.cv__award__item')[num-1]);
  });
  $('#certificate__addition').click(()=> {
    var num = $('.certificate__section').length
    var cloneCerTextbox = $('.cv__certificate__item').eq(0).clone(true, true);
    var cloneSection = $('.certificate__section').eq(0).clone(true) || null;

    if(num == 0){
      cloneCertificateSection.attr('order', num+1).insertAfter($('#certificate__addition'));
      cloneCerTextbox.attr('order', num+1).insertAfter($('.cv__certificate__item'));
    }else
      cloneSection.attr('order', num+1).insertAfter($('.certificate__section')[num-1]);
      cloneCerTextbox.attr('order', num+1).insertAfter($('.cv__certificate__item')[num-1]);
  });
  $('#reference__addition').click(()=> {
    var num = $('.reference__section').length
    var cloneRefTextbox = $('.cv__reference').eq(0).clone(true, true);
    var cloneSection = $('.reference__section').eq(0).clone(true) || null;

    if(num == 0){
      cloneReferenceSection.attr('order', num+1).insertAfter($('#reference__addition'));
      cloneRefTextbox.attr('order', num+1).insertAfter($('.cv__reference'));
    }else
      cloneSection.attr('order', num+1).insertAfter($('.reference__section')[num-1]);
      cloneRefTextbox.attr('order', num+1).insertAfter($('.cv__reference')[num-1]);
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
  var sections = $(element).closest('.section__box--expand');
  var eIndex = $(sections).attr("order");
  $(element).closest('.section__box--expand').remove();
  $(".skill_item").each(function( index ) {
    if($(this).attr("order") == eIndex){
      $(this).remove();
    }  });
  $(".cv__skill__text__items").each(function( index ) {
    if($(this).attr("order") == eIndex){
      $(this).remove();
    }});
  $(".timeline__experience").each(function(index){
    if($(this).attr("order") == eIndex){
      $(this).remove();
    }
  })
  $(".timeline__education").each(function(index){
    if($(this).attr("order") == eIndex){
      $(this).remove();
    }
  })
  $(".cv__hobby__item").each(function(index){
    if($(this).attr("order") == eIndex){
      $(this).remove();
    }
  })
  $(".cv__award__item").each(function(index){
    if($(this).attr("order") == eIndex){
      $(this).remove();
    }
  })
  $(".cv__certificate__item").each(function(index){
    if($(this).attr("order") == eIndex){
      $(this).remove();
    }
  })  
  $(".cv__reference").each(function(index){
    if($(this).attr("order") == eIndex){
      $(this).remove();
    }
  })  
  updateSectionOrder()
}
var updateSectionOrder = function(){
  var skills = $('.skill__section');
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
//Update textbox


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

//Edit textbox website
var webTextbox = document.getElementById('cv_websites');
var webForm = document.getElementById('websites');
if(window.addEventListener) {
   // Normal browsers
   webTextbox.addEventListener('DOMSubtreeModified', contentWebChanged, false);
} else
   if(window.attachEvent) {
      // IE
      webTextbox.attachEvent('DOMSubtreeModified', contentWebChanged);
   }

function contentWebChanged() {
  webForm.value = webTextbox.textContent;
}

//Edit form web
webForm.onkeyup = function() {
  webTextbox.innerHTML = webForm.value;
}

//Edit social textbox
let socialTextbox = document.getElementById('cv_socials');
let socialForm = document.getElementById('socials');
if(window.addEventListener) {
   // Normal browsers
   socialTextbox.addEventListener('DOMSubtreeModified', contentSocialChanged, false);
} else
   if(window.attachEvent) {
      // IE
      socialTextbox.attachEvent('DOMSubtreeModified', contentSocialChanged);
   }

function contentSocialChanged() {
  socialForm.value = socialTextbox.textContent;
}
//Edit form social
socialForm.onkeyup = function() {
  socialTextbox.innerHTML = socialForm.value;
}

//From div to input fullname
let nameTextbox = document.getElementById('cv__fullname');
let nameForm = document.getElementById('full_name');
if(window.addEventListener) {
   // Normal browsers
   nameTextbox.addEventListener('DOMSubtreeModified', contentNameChanged, false);
} else
   if(window.attachEvent) {
      // IE
      nameTextbox.attachEvent('DOMSubtreeModified', contentNameChanged);
   }

function contentNameChanged() {
  nameForm.value = nameTextbox.textContent;
}

//From div to input job
let jobTextbox = document.getElementById('cv__wanted__position');
let jobForm = document.getElementById('wanted_job_position');
if(window.addEventListener) {
   // Normal browsers
   jobTextbox.addEventListener('DOMSubtreeModified', contentJobChanged, false);
} else
   if(window.attachEvent) {
      // IE
      jobTextbox.attachEvent('DOMSubtreeModified', contentJobChanged);
   }

function contentJobChanged() {
  jobForm.value = jobTextbox.textContent;
}

//From div to input email
let mailTextbox = document.getElementById('cv__email');
let mailForm = document.getElementById('email');
if(window.addEventListener) {
   // Normal browsers
   mailTextbox.addEventListener('DOMSubtreeModified', contentEmailChanged, false);
} else
   if(window.attachEvent) {
      // IE
      mailTextbox.attachEvent('DOMSubtreeModified', contentEmailChanged);
   }

function contentEmailChanged() {
  mailForm.value = mailTextbox.textContent;
}

//From div to input phone number
let phoneTextbox = document.getElementById('cv__phone__number');
let phoneForm = document.getElementById('phone_number');
if(window.addEventListener) {
   // Normal browsers
   phoneTextbox.addEventListener('DOMSubtreeModified', contentPhoneChanged, false);
} else
   if(window.attachEvent) {
      // IE
      phoneTextbox.attachEvent('DOMSubtreeModified', contentPhoneChanged);
   }

function contentPhoneChanged() {
  phoneForm.value = phoneTextbox.textContent;
}

phoneForm.onkeyup = function() {
  phoneTextbox.innerHTML = phoneForm.value;
}

//From div to input address
let addressTextbox = document.getElementById('cv__address');
let addressForm = document.getElementById('address');
if(window.addEventListener) {
   // Normal browsers
   addressTextbox.addEventListener('DOMSubtreeModified', contentAddressChanged, false);
} else
   if(window.attachEvent) {
      // IE
      addressTextbox.attachEvent('DOMSubtreeModified', contentAddressChanged);
   }

function contentAddressChanged() {
  addressForm.value = addressTextbox.textContent;
}

//Skill setting
for (i = 0; i < document.getElementById('cv__skill__items').children.length; i++) {
  document.getElementById('cv__skill__items').children[i].onclick = function(){
    let childClicked = $(".skill__section .post-expand_input ").eq(i);

    
  };
}

