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







