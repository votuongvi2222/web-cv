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