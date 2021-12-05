
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
  function test(){
    var tabsNewAnim = $('#navbarSupportedContent');
    var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
        "top":itemPosNewAnimTop.top + "px", 
        "left":itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click","li",function(e){
        $('#navbarSupportedContent ul li').removeClass("active");
        $(this).addClass('active');
        var activeWidthNewAnimHeight = $(this).innerHeight();
        var activeWidthNewAnimWidth = $(this).innerWidth();
        var itemPosNewAnimTop = $(this).position();
        var itemPosNewAnimLeft = $(this).position();
        $(".hori-selector").css({
            "top":itemPosNewAnimTop.top + "px", 
            "left":itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
        });
    });

    //Sign out and login display
    $(function() {
      let uid = localStorage.getItem('uid');
      if(uid === null){
        $(".login").show();
        $(".sign-out").hide();
      }
      else{
        $(".login").hide();
        $(".sign-out").show();
      }
  })
}
  $(document).ready(function(){
      setTimeout(function(){ test(); });
  });
  $(window).on('resize', function(){
      setTimeout(function(){ test(); }, 500);
  });
  $(".navbar-toggler").click(function(){
      $(".navbar-collapse").slideToggle(300);
      setTimeout(function(){ test(); });
  });



  // --------------add active class-on another-page move----------
      // Get current path and find target link
  let path = window.location.pathname.split("/").pop();

      // Account for home page with empty path
  if ( path == '' ) {
      path = 'index.html';
  }
  let target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
      // Add active class to target link
  target.parent().addClass('active');
  console.log(sample_name_content);
});

$(document).ready(function () {
  // toolbar
  $('.toolbar-btn').click(function(){
    $(this).toggleClass('focused');
  })
  // editor 
  $('#post_editor-expand').hide();

  $('#post_content_editor-textarea').focus(function(){
    $('#editor_title-textarea').addClass('focused');
    $('.content_editor_focus-line').addClass('focused');
  
  })
  $('#post_content_editor-textarea').blur(function(){
    var textboxContent = $.trim($('#post_content_editor-textarea').text());
    if(textboxContent == '')
      $('#editor_title-textarea').removeClass('focused');
      $('.content_editor_focus-line').removeClass('focused');

  })
  $('body').on('DOMSubtreeModified', '#post_content_editor-textarea', function(){
    // console.log('changed');
    var textboxContent = $.trim($('#post_content_editor-textarea').text());
    if(textboxContent != '')
      $('#upload_post-tab').removeClass('empty');
    else
      $('#upload_post-tab').addClass('empty');
  })
  $('#cancel_post-tab').click(function(){
    $('#post_editor-expand').hide();
    $('#post_editor-btn').show();
    $('#post_content_editor-textarea').innerText = '';
  })
  $('#post_editor-btn').click(function(){
    $('#post_editor-expand').show();
    $('#post_editor-btn').hide();
    $('#post_content_editor-textarea').focus();
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
