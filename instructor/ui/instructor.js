
$(function(){
    $('.scb_ab_s_sidebar_page_name_selected').append(
        "<img role='presentation' class='scb_s_selection_arrow_img' " +
            "src='../../../images/homepage/selection_arrow.png' >");
    $('.scb_s_dashboard_table_row').hover(function(){
	    $('.scb_s_dashboard_link', this).toggle();
    });
    /**
     * Course setup
     */
    $('.scb_f_course_setup_create_new_course_option input').click(function(){
        $(".scb_ab_f_course_formset_list").show();
        $('.scb_f_course_setup_choose_existing_course input').prop('checked', false);
        $(".scb_f_use_existing_course").hide();
        $(".scb_s_course_setup_course_list label select").prop('disabled', true);


    });
    $(".scb_f_course_setup_choose_existing_course input").click(function(){
        $(".scb_ab_f_course_formset_list").hide();
        $('.scb_f_course_setup_create_new_course_option input').prop('checked', false);
        $(".scb_f_use_existing_course").css('display','inline-block');
        $(".scb_s_course_setup_course_list label select").prop('disabled', false);
    });
    /* Course Modify */
    /* If the user is choosing an existing course want
    * to pass course pk */
    $("#course_formset").submit(function(){
        var course_pk = $("input:checked[type='radio']").data('id');
        $(this).append($("<input>",{
                type: 'hidden',
                name: 'course_pk',
                value: course_pk
                }
            ));
    });

    $(".scb_ab_f_select_course").click(function(){
        $('input.scb_ab_f_select_course').prop('checked', false);
        $(this).prop('checked', true);
    });
    /**
     * Assignment setup
     */

    $(".scb_f_assignment_setup_radio_new").click(function(){
        $('.scb_f_assignment_setup_radio_existing').attr('checked', false);
        $('#scb_f_select_base_assignment').attr('disabled', true);
        $('#based_on').val('');

    });
    $(".scb_f_assignment_setup_radio_existing").click(function(){
        $(".scb_f_assignment_setup_radio_new").attr('checked', false);
        $('#scb_f_select_base_assignment').attr('disabled', false);
        var assignment_id=$("#scb_f_select_base_assignment").find(":selected").val();
        $('#based_on').val(assignment_id);

    });
    $('#scb_f_select_base_assignment').change(function(){
        var assignment_id=$("#scb_f_select_base_assignment").find(":selected").val();
        $('#based_on').val(assignment_id);

    });

    /**
     * For all text input boxes inside a form
     */
    $("form input[type = 'text'], form input[type = 'number']").addClass("scb_ab_s_input_text_field");

    /**
     * Edit Strains
     */

    $('.delete_checkbox input').each(function(){
        $(this).hide().after('<div class="checkbox_delete_image"/>');

    });
    $('.checkbox_delete_image').on('click', function(){
        /* Check the hidden checkbox */
        $(this).prev().prop('checked', true);
        /* Want to disable the input box for the strain */
        var input_element=$(this).parent().parent().find("input[id$='name']")[0];
        $(input_element).attr('disabled', true);
        /* Set opacity for the entire line, ul element */
        $(this).parent().parent().css('opacity', 0.5);
        /* Set cursor on the trash image */
        $(this).css('cursor', 'default');
    });
    /**
    * Select variables
    */
    var showed_warning = false;
    $('.scb_ab_f_select_variable>input').click(function(){
        /* Want to warn the instructor*/
        var $checkbox= $(this);
        /* Var created is initialized in select_variables template */
        if (created && !showed_warning) {
            $('body').prepend("<div class='error_overlay' role='presentation'></div>");
            $.jqDialog.confirm("Previously generated data will be lost. Would you like to continue?",
                function () {
                    $('.error_overlay').remove();
                    select_variables();
                },
                function () {
                    $('.error_overlay').remove();
                    $checkbox.prop('checked', !$checkbox.prop('checked'));
                }
            );
            $('.jqDialog_header').remove();
            $('#jqDialog_box').prepend("<h1 class='jqDialog_header' role='heading' >Warning</h1>");
            showed_warning=true;
        }else{
            select_variables();
        }
    });

    if($('.scb_ab_f_select_variable').length){

        select_variables()
    }

    function select_variables(){
        var num_checked= $("input:checked[type='checkbox']").length;
        if(num_checked>=3){
            /* grey out the rest*/
            $('input:checkbox:not(:checked)').attr('disabled', true).parent().addClass('scb_ab_s_grayed');
        }else{
            $('input:checkbox:not(:checked)').attr('disabled', false).parent().removeClass('scb_ab_s_grayed');
        }
    }

    if($('#select_variables_form').length){
        /* Drug concentration unit */
        var $inputs=$('.concentration_unit_box>input');
        for(var i=0; i<$inputs.length; i++){
            $($inputs[i]).attr('list', 'concentration_unit_list');
        }
        /* Drug time unit */
        $inputs= $('.drug_time_unit_box>input');
        for(i=0; i<$inputs.length; i++){
            $($inputs[i]).attr('list', 'drug_time_unit_list');
        }
        /* Collection time unit */
        $inputs= $('.collection_time_unit_box>input');
        for(i=0; i<$inputs.length; i++){
            $($inputs[i]).attr('list', 'collection_time_unit_list');
        }

    }
    $(".toggle_protocols").click(function(){
        var show= $(".toggle_protocols").data("show");
        if(show){
            $(".scb_ab_s_row").show();
            $(".toggle_protocols").data("show", false).html("SHOW ONLY SELECTED");
        }else{
            $("input:checkbox:not(:checked)").parent().parent().hide();
            $(".toggle_protocols").data("show", true).html("SHOW ALL");
        }
    });

    /**
     * Western Blotting: lysate types
     */
    $("#id_has_nuclear_fractination").attr('disabled', true).parent().addClass('scb_ab_s_grayed');
    $("#id_has_cytoplasmic_fractination").attr('disabled', true).parent().addClass('scb_ab_s_grayed');

    $('.acrylamide_input_checkbox>input').click(function(){
        var $checkbox=$(this);
        if($(".acrylamide_input_checkbox>input:checkbox:checked").length<1){
            $('body').prepend("<div class='error_overlay' role='presentation'></div>");
            $.jqDialog.alert("You must select at least one percentage of acrylamide to continue.",
                function () {
                    $('.error_overlay').remove();
                     $checkbox.prop('checked', true);
                }
            );
            $('.jqDialog_header').remove();
            $('#jqDialog_box').prepend("<h1 class='jqDialog_header' role='heading' >Warning</h1>");
        }
    });
    /**
     * Western Blotting: band intensity
     */
    $(".intensity_slider").each(function(){
        var intensity=$($(this).siblings('input')[0]).attr('value');
        var $intensity_text=$($(this).parent().siblings('.scb_ab_s_intensity_text'));
        $intensity_text.text(intensity_text(intensity));
        $(this).slider({
          min: 0,
          max: 2,
          range: "min",
          value: intensity,
          step: 0.5,
          slide: function( event, ui ) {
              $(this).siblings()[0].value=ui.value;
              $intensity_text.text(intensity_text(ui.value));

          }
        });

    });
    function intensity_text(num){
        if(num<0.25){
            return '';
        }else if(num<0.75){
            return "low";
        }else if(num<1.25){
            return 'med';
        }else if(num<1.75){
            return 'high';
        }else{
            return 'extra high';
        }
    }

    if($('.scb_ab_s_protein_size_input').length>0){
        if(error !== ''){
            $('body').prepend("<div class='error_overlay' role='presentation'></div>");
            $.jqDialog.alert(error,
                function () {
                    $('.error_overlay').remove();
                }
            );
            $('#jqDialog_box').attr('role', 'alertdialog');
            $('.jqDialog_header').remove();
            $('#jqDialog_box').prepend("<h1 class='jqDialog_header' role='heading' >Warning</h1>");

        }
    }
    $('.block-ellipsis').each(function(){
        var text= $(this).text().replace(/\s\s+/g, ' ');
        $($(this).parent()).prop('title',text);
    })

});


