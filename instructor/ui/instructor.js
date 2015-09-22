
$(function(){

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
    /* If the user is choosing an existing course want
    * to pass course pk */
    $("#course_formset").submit(function(){
        if($(".scb_ab_f_course_setup_option_choose").attr('checked') === 'checked'){
            var course_pk = $("option:selected").val();
            $(this).append($("<input>",{
                    type: 'hidden',
                    name: 'course_pk',
                    value: course_pk
                }
            ));
        }
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
    $("form input[type = 'text']").addClass("scb_ab_s_input_text_field");

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

});


