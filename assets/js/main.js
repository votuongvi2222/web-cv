// import Cropper from 'cropperjs';
// GG SIGN IN
// header -> cv -> header fullname --> header position -> not -> yes -> line -> section text -> icon
var colorChoices = {
  'yellow': ['rgba(255, 238, 85,.95)', 'rgba(255,255,255,1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(63, 63, 63, .2)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)'],
  'black': ['rgba(193, 193, 193, .95)', 'rgba(0,0,0,1)', 'rgb(211, 211, 211)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(63, 63, 63, 0.8)', 'rgba(193, 193, 193, 0.95)', 'rgba(193, 193, 193, 0.35)', 'rgba(255, 255, 255, 0.9)', 'rgba(193, 193, 193, 0.95)'],
  'blue': ['rgba(115, 146, 172, .7)', 'rgba(229, 222, 222, .6)','rgba(0, 0, 0, 1)', 'rgba(255,255,255,.8)', 'rgba(229, 222, 222, 0.9)', 'rgba(169, 169, 169, 0.3)', 'rgba(115, 146, 172, 0.7)', 'rgba(255, 255, 255, .8)', 'rgba(115, 146, 172, 0.7)', 'rgba(115, 146, 172, 0.7)'],
  'gray': ['rgba(193, 193, 193, .95)', 'rgba(255,255,255,1)', 'rgba(0, 0, 0, 1)','rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(63, 63, 63, .2)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)'],

}
var cloneSkillTextboxTemp = $('.skill_item').eq(0).clone(true, true) || null;
var cloneLangTextboxTemp = $('.language_item').eq(0).clone(true, true) || null;
var cloneProfileTemp = $('.cv__paragraph').eq(0).clone(true, true) || null;
var cloneExperienceTemp = $('.timeline__experience').eq(0).clone(true, true) || null;
var cloneEducationTemp = $('.timeline__education').eq(0).clone(true, true) || null;
var cloneHobbyTemp = $('.cv__hobby__item').eq(0).clone(true, true)|| null;
var cloneAwardTemp = $('.cv__award__item').eq(0).clone(true, true) || null;
var cloneCerTemp = $('.cv__certificate__item').eq(0).clone(true, true)||null;
var cloneRefTemp = $('.cv__reference').eq(0).clone(true,true) || null;

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
    //
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
  $('.timeline__line').hide()
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

  // ================= SET ORDER ===============
  // $('.cv__aboutme--left').find('.cv__section__box').each((index, el)=>{
  //   $(el).css('order', index)
  // })
  // $('.cv__aboutme--right').find('.cv__section__box').each((index, el)=>{
  //   $(el).css('order', index)
  // })

  if($('#cv__fullname').outerHeight() > defaultFullNameBoxH) {
    $('.cv--fullname').css({'margin-top': '22px'})
  } else {
    $('.cv--fullname').css({'margin-top': '40px'})
  }
  $('#cv__fullname').on('DOMSubtreeModified', function(){
    if($(this).outerHeight() > defaultFullNameBoxH) {
      $('.cv--fullname').css({'margin-top': '22px'})
    } else {
      $('.cv--fullname').css({'margin-top': '40px'})
    }

  });

  $('.toolbar-btn').click(function(){
    $(this).toggleClass('focused');
  })

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
        // console.log(exJobs[index])
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
      $(item).text(cerDescs[index]);
    })

    //=============================== REFERENCES ==========================
    let refJobs = [],
        refNames = [],
        refPhones = [],
        refEmails = [],
        refDescs = [];

    $('.cv__reference').each((index,item)=>{
      // console.log($(item).find('.cv__reference__email').text())
      refJobs.push($(item).find('.cv__reference__job__position').text());
      refNames.push($(item).find('.cv__reference__called__name').text());
      refPhones.push($(item).find('.cv__reference__phone__number').text());
      refEmails.push($(item).find('.cv__reference__email').text());
      refDescs.push($(item).find('.cv__reference__desc').text());
    })
    $('.reference_called_name').each((index, item)=> {
      $(item).val(refNames[index]);
    })
    $('.reference_job_position').each((index, item)=> {
      $(item).val(refJobs[index]);
    })
    $('.reference_email').each((index, item)=> {
      $(item).val(refEmails[index]);
    })
    $('.reference_phone_number').each((index, item)=> {
      $(item).val(refPhones[index]);
    })
    $('.reference_desc').each((index, item)=> {
      $(item).text(refDescs[index]);
    })
  })

  $('input').on('', () => {
    // ======================SKILL============================
    let skillTitles = [],
        skillLevels = [],
        skillDescs = [];

    $(inSkillSections).each((index,item)=>{
      // console.log($(item).find('.yes').length);
      skillTitles.push($(item).children('.skill_title').val());
      skillLevels.push($(item).find('.skill_level').val());
      skillDescs.push($(item).children('.skill_desc').val());
    })
    // console.log(skillTitles[0])
    $('.cv__skill__title').each((index, item)=> {
        $(item).text(skillTitles[index]);
    })
    $('.cv__skill__rating').each((index, item)=> {
      let num_yes = skillLevels[index];
      $(item).children('.rating').each((i, rating)=> {
        if(num_yes > 0){
          $(rate).addClass('yes');
          $(rate).removeClass('not');
          num_yes--
        } else {
          $(rate).addClass('not')
          $(rate).removeClass('yes')
        }
      })
      
    })
    setColor(localStorage.getItem('theme'));
    $('.cv__skill__desc').each((index, item)=> {
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
        // console.log(exJobs[index])
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
      $(item).text(cerDescs[index]);
    })

    //=============================== REFERENCES ==========================
    let refJobs = [],
        refNames = [],
        refPhones = [],
        refEmails = [],
        refDescs = [];

    $('.cv__reference').each((index,item)=>{
      // console.log($(item).find('.cv__reference__email').text())
      refJobs.push($(item).find('.cv__reference__job__position').text());
      refNames.push($(item).find('.cv__reference__called__name').text());
      refPhones.push($(item).find('.cv__reference__phone__number').text());
      refEmails.push($(item).find('.cv__reference__email').text());
      refDescs.push($(item).find('.cv__reference__desc').text());
    })
    $('.reference_called_name').each((index, item)=> {
      $(item).val(refNames[index]);
    })
    $('.reference_job_position').each((index, item)=> {
      $(item).val(refJobs[index]);
    })
    $('.reference_email').each((index, item)=> {
      $(item).val(refEmails[index]);
    })
    $('.reference_phone_number').each((index, item)=> {
      $(item).val(refPhones[index]);
    })
    $('.reference_desc').each((index, item)=> {
      $(item).text(refDescs[index]);
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
  })

  $('#file').change(() => {
    $('.avatar__box--left').removeClass('hide');

    var avatarW = $('.avatar__box--left').outerWidth();
    var cvHeaderW = $('.cv__header').outerWidth();
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
    var cloneSkillTextbox = cloneSkillTextboxTemp.clone(true,true).attr('order', num+1);
    if(num == 0){
      cloneSection.attr('order', num+1).insertAfter($('#skill__addition'));
      $('#cv__skill__items').append(cloneSkillTextbox);
    }
    else{
      cloneSection.attr('order', num+1).insertAfter($('.skill__section')[num-1]);
      $('#cv__skill__items').append(cloneSkillTextbox);
    }
    updateSectionOrder();
    tinymce.init(editorConfig);
    setColor(localStorage.getItem('theme'))
  });
  $('#language__addition').click(()=> {
    var num = $('.language__section').length
    var cloneSection = $('.language__section').eq(0).clone(true) || null;
    var cloneLangTextbox = cloneLangTextboxTemp.clone(true,true).attr('order', num+1);

    if(num == 0){
      cloneLanguageSection.insertAfter($('#language__addition')).attr('order', num+1);
      $('#cv__language__items').append(cloneLangTextbox);
    }else{
      cloneSection.insertAfter($('.language__section')[num-1]).attr('order', num+1);
      $('#cv__language__items').append(cloneLangTextbox);
    }
    updateSectionOrder()
    setColor(localStorage.getItem('theme'))

  });
  $('#profile__addition').click(()=> {
    var num = $('.profile__section').length
    var cloneProfileTextbox = cloneProfileTemp.clone(true,true).attr('order', num+1);
    if(num == 0)
      cloneProfileSection.attr('order', num+1).insertAfter($('#profile__addition'));
      $(".cv__profile__box").append(cloneProfileTextbox);
    updateSectionOrder();
    setColor(localStorage.getItem('theme'))

  });
  $('#timeline__addition').click(()=> {
    $('.timeline__experience .timeline__line').eq(0).show();
    var num = $('.timeline__section').length
    var cloneSection = $('.timeline__section').eq(0).clone(true) || null;
    var cloneExperienceTextbox = cloneExperienceTemp.clone(true,true).attr('order', num+1);

    if(num == 0){
      cloneExperienceSection.attr('order', num+1).insertAfter($('#timeline__addition'));
      $('#cv__experience__items').append(cloneExperienceTextbox);
    }
    else
      cloneSection.attr('order', num+1).insertAfter($('.timeline__section')[num-1]);
      $('#cv__experience__items').append(cloneExperienceTextbox);
    updateSectionOrder();
    setColor(localStorage.getItem('theme'))
    $('.timeline__experience .timeline__line').eq(num).hide();

  });
  $('#education__addition').click(()=> {
    $('.timeline__education .timeline__line').eq(0).show();
    var num = $('.education__section').length
    var cloneEducationTextbox = cloneEducationTemp.clone(true, true).attr('order', num+1);
    var cloneSection = $('.education__section').eq(0).clone(true) || null;

    if(num == 0){
      cloneEducationSection.attr('order', num+1).insertAfter($('#education__addition'));
      $('#cv__education__items').append(cloneEducationTextbox);
    }
      
    else
      cloneSection.attr('order', num+1).insertAfter($('.education__section')[num-1]);
      $('#cv__education__items').append(cloneEducationTextbox);
    updateSectionOrder();
    setColor(localStorage.getItem('theme'))
    $('.timeline__education .timeline__line').eq(num).hide();

  });
  $('#hobby__addition').click(()=> {
    var num = $('.hobby__section').length
    var cloneHobbieTextbox = cloneHobbyTemp.clone(true, true).attr('order', num+1);
    var cloneSection = $('.hobby__section').eq(0).clone(true) || null;

    if(num == 0){
      cloneHobbySection.attr('order', num+1).insertAfter($('#hobby__addition'));
      if((num+1) % 2 == 0){
        $('.box_1').append(cloneHobbieTextbox);
      }else{
        $('.box_0').append(cloneHobbieTextbox);
      }

    }
    else
      cloneSection.attr('order', num+1).insertAfter($('.hobby__section')[num-1]);
      if((num+1) % 2 == 0){
        $('.box_1').append(cloneHobbieTextbox);
      }else{
        $('.box_0').append(cloneHobbieTextbox);
      }
    updateSectionOrder();
    setColor(localStorage.getItem('theme'))

  });
  $('#award__addition').click(()=> {
    var num = $('.award__section').length
    var cloneAwardTextbox = cloneAwardTemp.clone(true, true).attr('order', num+1);
    var cloneSection = $('.award__section').eq(0).clone(true) || null;

    if(num == 0){
      cloneAwardSection.attr('order', num+1).insertAfter($('#award__addition'));
      $('#cv__award__items').append(cloneAwardTextbox);
    }else
      cloneSection.attr('order', num+1).insertAfter($('.award__section')[num-1]);
      $('#cv__award__items').append(cloneAwardTextbox);
    updateSectionOrder();
    setColor(localStorage.getItem('theme'))

  });
  $('#certificate__addition').click(()=> {
    var num = $('.certificate__section').length
    var cloneCerTextbox = cloneCerTemp.clone(true, true).attr('order', num+1);
    var cloneSection = $('.certificate__section').eq(0).clone(true) || null;

    if(num == 0){
      cloneCertificateSection.attr('order', num+1).insertAfter($('#certificate__addition'));
      $('#cv__certificate__items').append(cloneCerTextbox);
    }else
      cloneSection.attr('order', num+1).insertAfter($('.certificate__section')[num-1]);
      $('#cv__certificate__items').append(cloneCerTextbox);
    updateSectionOrder();
    setColor(localStorage.getItem('theme'))

  });
  $('#reference__addition').click(()=> {
    var num = $('.reference__section').length
    var cloneRefTextbox = cloneRefTemp.clone(true, true).attr('order', num+1);
    var cloneSection = $('.reference__section').eq(0).clone(true) || null;

    if(num == 0){
      cloneReferenceSection.attr('order', num+1).insertAfter($('#reference__addition'));
      if((num+1) % 2 == 0){
        $('.col__box__1').append(cloneRefTextbox);
      }else{
        $('.col__box__0').append(cloneRefTextbox);
      }
    }else
      cloneSection.attr('order', num+1).insertAfter($('.reference__section')[num-1]);
      if((num+1) % 2 == 0){
        $('.col__box__1').append(cloneRefTextbox);
      }else{
        $('.col__box__0').append(cloneRefTextbox);
      }
    updateSectionOrder();
    setColor(localStorage.getItem('theme'))

  });
   
  

// catch input change
});
// $(function() {
//   inFullName.keyup(() => {
//     cvFullName.text(inFullName.val());
//   });
//   inWantedPosition.keyup(() => {
//     cvWantedPosition.text(inWantedPosition.val());
//   });
//   inAddress.keyup(() => {
//     cvAddress.text(inAddress.val());
//   });
//   inEmail.keyup(() => {
//     cvEmail.text(inEmail.val());
//   });
//   $('input').keyup((e) => {
//     // if(e.key === 'Enter'){
//       let skillTitles = [],
//           skillLevels = [],
//           skillDescs = [];

//       $(inSkillSections).each((index,item)=>{
//         // console.log($(item).find('.yes').length);
//         skillTitles.push($(item).find('.skill_title').val());
//         skillLevels.push($(item).find('.skill_level').val());
//         skillDescs.push($(item).find('.skill_desc').text());
//       })
//       // console.log(skillTitles[0])
//       $('.cv__skill__title').each((index, item)=> {
//         console.log(skillTitles[index])
//           $(item).text(skillTitles[index]);
//       })
//       $('.cv__skill__rating').each((index, item)=> {
//         let num_yes = skillLevels[index];
//         // console.log(num_yes)
//         $(item).children('.rating').each((i, rate)=> {
//           if(num_yes > 0){
//             $(rate).addClass('yes');
//             $(rate).removeClass('not');
//             num_yes--
//           } else {
//             $(rate).addClass('not')
//             $(rate).removeClass('yes')
//           }
//         })

        
//       })
//       setColor(localStorage.getItem('theme'));

//     // }
//   })
  
// });
var removeSection = function(element){
  $(element).toggleClass('display')
  $(element).parents('.post_editor-btn').toggleClass('hide')
  $(element).find('.fa-eye').toggleClass('hide')
  $(element).find('.fa-eye-slash').toggleClass('hide')
  // var sections = $(element).closest('.section__box--expand');
  // var eIndex = $(sections).attr("order");
  // $(element).closest('.section__box--expand').remove();
  // if(sections.hasClass("skill__section")){
  //   $(".skill_item").each(function( index ) {
  //     if($(this).attr("order") == eIndex){
  //       $(this).remove();
  //     }  });
  // }
  // if(sections.hasClass("language__section")){
  //   $(".language_item").each(function( index ) {
  //     if($(this).attr("order") == eIndex){
  //       $(this).remove();
  //     }});
  // }
  // if(sections.hasClass("profile__section")){
  //   $(".cv__paragraph").remove();
  // }
  // if(sections.hasClass("timeline__section")){
  //   $(".timeline__experience").each(function(index){
  //     if($(this).attr("order") == eIndex){
  //       $(this).remove();
  //     }
  //   })
  // }
  // if(sections.hasClass("education__section")){
  //   $(".timeline__education").each(function(index){
  //     if($(this).attr("order") == eIndex){
  //       $(this).remove();
  //     }
  //   })
  // }
  // if(sections.hasClass("hobby__section")){
  //   $(".cv__hobby__item").each(function(index){
  //     if($(this).attr("order") == eIndex){
  //       $(this).remove();
  //     }
  //   })
  // }
  // if(sections.hasClass("award__section")){
  //   $(".cv__award__item").each(function(index){
  //     if($(this).attr("order") == eIndex){
  //       $(this).remove();
  //     }
  //   })
  // }
  // if(sections.hasClass("certificate__section")){
  //   $(".cv__certificate__item").each(function(index){
  //     if($(this).attr("order") == eIndex){
  //       $(this).remove();
  //     }
  //   })  
  // }
  // if(sections.hasClass("reference__section")){
  //   $(".cv__reference").each(function(index){
  //     if($(this).attr("order") == eIndex){
  //       $(this).remove();
  //     }
  //   })   
  // }


  // updateSectionOrder()
}
var resetSectionOrder = function(){
  $('.cv__aboutme--left').find('.cv__section__box').each((index, el)=>{
    $(el).css('order', index)
  })
  $('.cv__aboutme--right').find('.cv__section__box').each((index, el)=>{
    $(el).css('order', index)
  })
}
var updateSectionOrder = function(){
  var numSectionsR = $('.cv__aboutme--right').find('.cv__section__box').length
  var numSectionsL = $('.cv__aboutme--left').find('.cv__section__box').length
  var skills = $('.skill__section');
  // console.log(skills)
  if(skills.length > 0){
    $.each(skills, (index, section) => {
      $(section).attr('order', index+1);
    });
    $('.cv__skill__box').show();
    // resetSectionOrder()
  } else {
    $('.cv__skill__box').hide();
    // resetSectionOrder()

  }
  var profile = $('.profile__section')
  if(profile.length > 0){
    $('.cv__profile__box').show();
    // resetSectionOrder()

  }else{
    $('.cv__profile__box').hide();
    // resetSectionOrder()

  }
  var languages = $('.language__section')
  if(languages.length > 0){
    $.each(languages ,(index, section) => {
      $(section).attr('order', index+1);
    });
    $('.cv__language__box').show();
    // resetSectionOrder()

  }else {
    $('.cv__language__box').hide();
    // resetSectionOrder()

  }
  var experiences = $('.timeline__section')
  if(experiences.length > 0){
    $.each(experiences ,(index, section) => {
      $(section).attr('order', index+1);
    });
    $('.cv__experience__box').show();
    // resetSectionOrder()

  }else {
    $('.cv__experience__box').hide();
    // resetSectionOrder()

  }
  var educations = $('.education__section')
  if(educations.length > 0){
    $.each(educations ,(index, section) => {
      $(section).attr('order', index+1);
    });
    $('.cv__education__box').show();
    // resetSectionOrder()

  }else {
    $('.cv__education__box').hide();
    // resetSectionOrder()

  }
  var hobbies = $('.hobby__section')
  if(hobbies.length > 0){
    $.each(hobbies ,(index, section) => {
      $(section).attr('order', index+1);
    });
    $('.cv__hobby__box').show();
    // resetSectionOrder()

  }else {
    $('.cv__hobby__box').hide();
    // resetSectionOrder()

  }
  var awards = $('.award__section')
  if(awards.length > 0){
    $.each(awards ,(index, section) => {
      $(section).attr('order', index+1);
    });
    $('.cv__award__box').show();
    // resetSectionOrder()

  }else {
    $('.cv__award__box').hide();
    // resetSectionOrder()

  }
  var certificates = $('.certificate__section')
  if(certificates.length > 0){
    $.each(certificates ,(index, section) => {
      $(section).attr('order', index+1);
    });
    $('.cv__certificate__box').show();
    // resetSectionOrder()

  }else {
    $('.cv__certificate__box').hide();
    // resetSectionOrder()

  }
  var references = $('.reference__section')
  if(references.length > 0){
    $.each(references ,(index, section) => {
      $(section).attr('order', index+1);
    });
    $('.cv__reference__box').show();
    // resetSectionOrder()

  }else {
    $('.cv__reference__box').hide();
    // resetSectionOrder()

  }


}
//Update textbox


// header bg -> cv bg -> cv text -> header fullname --> header position -> not -> yes -> line -> section text -> icon
var rateLevel = function(element) {
  $(element).toggleClass('yes');
  $(element).toggleClass('not');
  $('#cv__fullname').text($('#cv__fullname').text());
  setColor(localStorage.getItem('theme'));
}
var updateColor = function(choiceElement) {
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


// //Edit textbox website
// var webTextbox = document.getElementById('cv_websites');
// var webForm = document.getElementById('websites');
// if(window.addEventListener) {
//    // Normal browsers
//    webTextbox.addEventListener('DOMSubtreeModified', contentWebChanged, false);
// } else
//    if(window.attachEvent) {
//       // IE
//       webTextbox.attachEvent('DOMSubtreeModified', contentWebChanged);
//    }

// function contentWebChanged() {
//   webForm.value = webTextbox.textContent;
// }

// //Edit social textbox
// let socialTextbox = document.getElementById('cv_socials');
// let socialForm = document.getElementById('socials');
// if(window.addEventListener) {
//    // Normal browsers
//    socialTextbox.addEventListener('DOMSubtreeModified', contentSocialChanged, false);
// } else
//    if(window.attachEvent) {
//       // IE
//       socialTextbox.attachEvent('DOMSubtreeModified', contentSocialChanged);
//    }

// function contentSocialChanged() {
//   socialForm.value = socialTextbox.textContent;
// }
// //Edit form social
// //From div to input fullname
// let nameTextbox = document.getElementById('cv__fullname');
// let nameForm = document.getElementById('full_name');
// if(window.addEventListener) {
//    // Normal browsers
//    nameTextbox.addEventListener('DOMSubtreeModified', contentNameChanged, false);
// } else
//    if(window.attachEvent) {
//       // IE
//       nameTextbox.attachEvent('DOMSubtreeModified', contentNameChanged);
//    }

// function contentNameChanged() {
//   nameForm.value = nameTextbox.textContent;
// }

// //From div to input job
// let jobTextbox = document.getElementById('cv__wanted__position');
// let jobForm = document.getElementById('wanted_job_position');
// if(window.addEventListener) {
//    // Normal browsers
//    jobTextbox.addEventListener('DOMSubtreeModified', contentJobChanged, false);
// } else
//    if(window.attachEvent) {
//       // IE
//       jobTextbox.attachEvent('DOMSubtreeModified', contentJobChanged);
//    }

// function contentJobChanged() {
//   jobForm.value = jobTextbox.textContent;
// }

// //From div to input email
// let mailTextbox = document.getElementById('cv__email');
// let mailForm = document.getElementById('email');
// if(window.addEventListener) {
//    // Normal browsers
//    mailTextbox.addEventListener('DOMSubtreeModified', contentEmailChanged, false);
// } else
//    if(window.attachEvent) {
//       // IE
//       mailTextbox.attachEvent('DOMSubtreeModified', contentEmailChanged);
//    }

// function contentEmailChanged() {
//   mailForm.value = mailTextbox.textContent;
// }

// //From div to input phone number
// let phoneTextbox = document.getElementById('cv__phone__number');
// let phoneForm = document.getElementById('phone_number');
// if(window.addEventListener) {
//    // Normal browsers
//    phoneTextbox.addEventListener('DOMSubtreeModified', contentPhoneChanged, false);
// } else
//    if(window.attachEvent) {
//       // IE
//       phoneTextbox.attachEvent('DOMSubtreeModified', contentPhoneChanged);
//    }

// function contentPhoneChanged() {
//   phoneForm.value = phoneTextbox.textContent;
// }

// //From div to input address
// let addressTextbox = document.getElementById('cv__address');
// let addressForm = document.getElementById('address');
// if(window.addEventListener) {
//    // Normal browsers
//    addressTextbox.addEventListener('DOMSubtreeModified', contentAddressChanged, false);
// } else
//    if(window.attachEvent) {
//       // IE
//       addressTextbox.attachEvent('DOMSubtreeModified', contentAddressChanged);
//    }

// function contentAddressChanged() {
//   addressForm.value = addressTextbox.textContent;
// }

// //Skill setting
// for (i = 0; i < document.getElementById('cv__skill__items').children.length; i++) {
//   document.getElementById('cv__skill__items').children[i].onclick = function(){
//     let childClicked = $(".skill__section .post-expand_input ").eq(i);


    
//   };
// }

// ========================= MOVE SECTION TOOLBAR ===============================
function displaySetting (el){
  $(el).next('.ce-settings').toggleClass('ce-settings--opened')
}

// ================ CHANGE ORDER ================
function changeOrderUp(el){
  let editedSection = $(el).parents('.cv__section__box').eq(0)
  let currOrder = parseInt($(editedSection).css('order'))
  let editCol = $(el).parents('.cv__aboutme--right')
  let isRight = false
  if(editCol && editCol.length > 0) {
    isRight = true
  }
  if(currOrder > 0){
    if(isRight){
      $('.cv__aboutme--right').find('.cv__section__box').each((index, el)=>{
        if(parseInt($(el).css('order')) == (currOrder - 1)){
          $(el).css('order', currOrder)
        }
      })
    }else{
      $('.cv__aboutme--left').find('.cv__section__box').each((index, el)=>{
        if(parseInt($(el).css('order')) == (currOrder - 1)){
          $(el).css('order', currOrder)
        }
      })
    }
    $(editedSection).css('order', currOrder - 1)
  }
}

function changeOrderDown(el){
  let editedSection = $(el).parents('.cv__section__box').eq(0)
  let currOrder = parseInt($(editedSection).css('order'))
  let editCol = $(el).parents('.cv__aboutme--right')
  let numSections = 0
  let isRight = false
  if(editCol && editCol.length > 0) {
    numSections = $('.cv__aboutme--right').find('.cv__section__box').length
    isRight = true
  } else {
    numSections = $('.cv__aboutme--left').find('.cv__section__box').length
  }
  if(currOrder < numSections){
    if(isRight){
      $('.cv__aboutme--right').find('.cv__section__box').each((index, el)=>{
        if(parseInt($(el).css('order')) == (currOrder + 1)){
          $(el).css('order', currOrder)
        }
      })
    }else{
      $('.cv__aboutme--left').find('.cv__section__box').each((index, el)=>{
        if(parseInt($(el).css('order')) == (currOrder + 1)){
          $(el).css('order', currOrder)
        }
      })
    }
    $(editedSection).css('order', currOrder + 1)
  }
}