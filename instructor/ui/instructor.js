
$(function() {
  $('.scb_ab_s_sidebar_page_name_selected').append(
    "<div class='scb_s_selection_arrow_img'></div>");
  $('.scb_s_dashboard_table_row').hover(function() {
    $('.scb_s_dashboard_link', this).toggle();
  });
  /**
   * Course setup
   */
  $('.scb_f_course_setup_create_new_course_option input').click(function() {
    $(".scb_ab_f_course_formset_list").show();
    $('.scb_f_course_setup_choose_existing_course input').prop('checked', false);
    $(".scb_f_use_existing_course").hide();
    $(".scb_s_course_setup_course_list label select").prop('disabled', true);


  });
  $(".scb_f_course_setup_choose_existing_course input").click(function() {
    $(".scb_ab_f_course_formset_list").hide();
    $('.scb_f_course_setup_create_new_course_option input').prop('checked', false);
    $(".scb_f_use_existing_course").css('display', 'inline-block');
    $(".scb_s_course_setup_course_list label select").prop('disabled', false);
  });
  /* Course Modify */
  /* If the user is choosing an existing course want
  * to pass course pk */
  $("#course_formset").submit(function() {
    var course_pk = $("input:checked[type='radio']").data('id');
    $(this).append($("<input>", {
      type: 'hidden',
      name: 'course_pk',
      value: course_pk
    }
    ));
  });

  $(".scb_ab_f_select_course").click(function() {
    $('input.scb_ab_f_select_course').prop('checked', false);
    $(this).prop('checked', true);
  });
  /**
   * Assignment setup
   */

  $(".scb_f_assignment_setup_radio_new").click(function() {
    $('.scb_f_assignment_setup_radio_existing').attr('checked', false);
    $('#scb_f_select_base_assignment').attr('disabled', true);
    $('#based_on').val('');

  });
  $(".scb_f_assignment_setup_radio_existing").click(function() {
    $(".scb_f_assignment_setup_radio_new").attr('checked', false);
    $('#scb_f_select_base_assignment').attr('disabled', false);
    var assignment_id = $("#scb_f_select_base_assignment").find(":selected").val();
    $('#based_on').val(assignment_id);

  });
  $('#scb_f_select_base_assignment').change(function() {
    var assignment_id = $("#scb_f_select_base_assignment").find(":selected").val();
    $('#based_on').val(assignment_id);

  });

  /**
   * For all text input boxes inside a form
   */
  $("form input[type = 'text'], form input[type = 'number']").addClass("scb_ab_s_input_text_field");
  $("form select").addClass("scb_ab_s_from_select_field");
  /**
   * Edit Strains
   */

  $('.delete_checkbox input').each(function() {
    $(this).hide().after('<div class="checkbox_delete_image"/>');

  });
  if (typeof (access) !== 'undefined' && access === 'private') {
    $('.checkbox_delete_image').on('click', function() {
      /* Check the hidden checkbox */
      $(this).prev().prop('checked', true);
      /* Want to disable the input box for the strain */
      var input_element = $(this).parent().parent().find("input[id$='name']")[0];
      $(input_element).attr('disabled', true);
      /* Set opacity for the entire line, ul element */
      $(this).parent().parent().css('opacity', 0.5);
      /* Set cursor on the trash image */
      $(this).css('cursor', 'default');
    });
  }
  /**
  * Select variables
  */
  var showed_warning = false;
  $('.scb_ab_f_select_variable>input').click(function() {
    /* Want to warn the instructor*/
    var $checkbox = $(this);
    /* Var created is initialized in select_variables template */
    if (created && !showed_warning) {
      var message = "Previously generated data will be lost. Would you like to continue?";
      var confirm_func = function() {
        $('.error_overlay').remove();
        select_variables();
      };
      var cancel_func = function() {
        $('.error_overlay').remove();
        $checkbox.prop('checked', !$checkbox.prop('checked'));
      };
      show_message(message, confirm_func, cancel_func);
      showed_warning = true;
    } else {
      select_variables();
    }
  });

  if ($('.scb_ab_f_select_variable').length) {

    select_variables()
  }

  function select_variables() {
    var num_checked = $("input:checked[type='checkbox']").length;
    if (num_checked >= 3) {
      /* grey out the rest*/
      $('input:checkbox:not(:checked)').attr('disabled', true).parent().addClass('scb_ab_s_grayed');
    } else {
      $('input:checkbox:not(:checked)').attr('disabled', false).parent().removeClass('scb_ab_s_grayed');
    }
  }

  if ($('#select_variables_form').length) {
    /* Drug concentration unit */
    var $inputs = $('.concentration_unit_box>input');
    for (var i = 0; i < $inputs.length; i++) {
      $($inputs[i]).attr('list', 'concentration_unit_list');
    }
    /* Drug time unit */
    $inputs = $('.drug_time_unit_box>input');
    for (i = 0; i < $inputs.length; i++) {
      $($inputs[i]).attr('list', 'drug_time_unit_list');
    }
    /* Drug duration time unit */
    $inputs = $('.drug_duration_unit_box>input');
    for (i = 0; i < $inputs.length; i++) {
      $($inputs[i]).attr('list', 'drug_duration_unit_list');
    }
    /* Collection time unit */
    $inputs = $('.collection_time_unit_box>input');
    for (i = 0; i < $inputs.length; i++) {
      $($inputs[i]).attr('list', 'collection_time_unit_list');
    }

  }
  $(".toggle_protocols").click(function() {
    var show = $(".toggle_protocols").data("show");
    if (show) {
      $(".scb_ab_s_row").show();
      $(".toggle_protocols").data("show", false).html("SHOW ONLY SELECTED");
    } else {
      $("input:checkbox:not(:checked)").parent().parent().hide();
      $(".toggle_protocols").data("show", true).html("SHOW ALL");
    }
  });

  /**
   * Western Blotting: lysate types
   */
  $("#id_has_nuclear_fractination").attr('disabled', true).parent().addClass('scb_ab_s_grayed');
  $("#id_has_cytoplasmic_fractination").attr('disabled', true).parent().addClass('scb_ab_s_grayed');

  $('.acrylamide_input_checkbox>input').click(function() {
    var $checkbox = $(this);
    if ($(".acrylamide_input_checkbox>input:checkbox:checked").length < 1) {
      $('body').prepend("<div class='error_overlay' role='presentation'></div>");
      $.jqDialog.alert("You must select at least one percentage of acrylamide to continue.", function() {
        $('.error_overlay').remove();
        $checkbox.prop('checked', true);
      }
      );
      $('.jqDialog_header').remove();
      $('#jqDialog_box').prepend("<h1 class='jqDialog_header' role='heading' >Warning</h1>");
    }
  });
  /**
   * Western Blotting: Antibodies
   */
  if ($("#id_form-0-primary").length) {
    if ($(".scb_ab_s_form_input_list").length < 2) {
      $("#id_form-0-primary").attr('placeholder', 'goat anti-protein');
      $("#id_form-0-secondary").attr('placeholder', 'rabbit anti-goat');
    }
  }
  /**
   * Facs: Sample Prep
   */
  if ($("#id_form-0-fixed").length) {
    if ($(".scb_ab_s_form_input_list").length < 2) {
      $("#id_form-0-condition").attr('placeholder', 'Condition Name');
    }
    $("option:first").attr('disabled', true);
  }

  /**
   * Western Blotting: band intensity
   */
  $(".intensity_slider").each(function() {
    var intensity = $($(this).siblings('input')[0]).attr('value');
    var $intensity_text = $($(this).parent().siblings('.scb_ab_s_intensity_text'));
    $intensity_text.text(intensity_text(intensity));
    $(this).slider({
      min: 0,
      max: 2,
      range: "min",
      value: intensity,
      step: 0.5,
      slide: function(event, ui) {
        $(this).siblings()[0].value = ui.value;
        $intensity_text.text(intensity_text(ui.value));

      }
    });
  });

  function intensity_text(num) {
    if (num < 0.25) {
      return '';
    } else if (num < 0.75) {
      return "low";
    } else if (num < 1.25) {
      return 'med';
    } else if (num < 1.75) {
      return 'high';
    } else {
      return 'extra high';
    }
  }

  if ($('.scb_ab_s_protein_size_input').length > 0) {
    if (error !== '') {
      $('body').prepend("<div class='error_overlay' role='presentation'></div>");
      $.jqDialog.alert(error, function() {
        $('.error_overlay').remove();
      }
      );
      $('#jqDialog_box').attr('role', 'alertdialog');
      $('.jqDialog_header').remove();
      $('#jqDialog_box').prepend("<h1 class='jqDialog_header' role='heading' >Warning</h1>");

    }
  }
  $('.block-ellipsis').each(function() {
    var text = $(this).text().replace(/\s\s+/g, ' ');
    $($(this).parent()).prop('title', text);
  });

  /* Temporarily disable techniques */
  $('.disabled').bind('click', false);
  $("#id_has_micro").attr('disabled', true).parent().addClass('scb_ab_s_grayed');

  /* Publish assignment on the dashboard */
  $(".scb_ab_f_publish").click(function() {
    var message = "Please confirm that you would like to publish your assignment. " +
      "Once an assignment is published, the assignment will no longer be able " +
      "to be edited in the Assignment Builder. Users will be able to access the " +
      "assignment using the provided course code on the StarCellBio website. " +
      "Would you like to continue?";
    var assignment_pk = $(this).data("assignment-pk");
    var confirm_publish = function() {
      $.ajax({
        type: "POST",
        url: "publish/",
        data: {
          pk: assignment_pk
        }
      }).then(function() {
        window.location = "/ab/assignments/";
      }).fail(function(response) {
        show_alert(response.responseText);

      });
    };
    var cancel_publish = function() {
      $('.error_overlay').remove();
    };
    show_message(message, confirm_publish, cancel_publish);

  });

  /* Preview assignment*/
  $(".scb_ab_f_preview").click(function() {
    var assignment_pk = $(this).data("assignment-pk");
    $.ajax({
      type: "POST",
      url: "assignment_complete/",
      data: {
        pk: assignment_pk
      }
    }).then(function() {
      window.open('preview/' + assignment_pk + "#view=assignments", '_blank');
    }).fail(function(response) {
      show_alert(response.responseText);
    });
  });

  /* Delete assignment*/
  $(".scb_ab_f_delete_assignment").click(function() {
    var assignment_pk = $(this).data("assignment-pk");
    var message = "Your assignment will be removed permanently from your dashboard. " +
      "Would you like to continue?";
    if ($(this).data("access") === 'published') {
      message = "Your assignment will be removed permanently from your dashboard " +
        "and students will no longer be able to access this assignment within this " +
        "course and their work will be deleted. Would you like to continue?"
    }
    var confirm_publish = function() {
      $('.error_overlay').remove();
      window.location = "delete/" + assignment_pk;
    };
    var cancel_publish = function() {
      $('.error_overlay').remove();
    };
    show_message(message, confirm_publish, cancel_publish);
  });

  function show_message(message, confirm_func, cancel_func) {
    $('body').prepend("<div class='error_overlay' role='presentation'></div>");
    $.jqDialog.confirm(message, confirm_func, cancel_func);
    $('.jqDialog_header').remove();
    $('#jqDialog_box').prepend("<h1 class='jqDialog_header' role='heading' >Confirmation</h1>");
  }

  /* View assignment, when assignment is public */
  if (typeof (access) !== 'undefined' && access !== 'private') {
    $('input[type="text"],input[type="number"],input[type="checkbox"],input[type="radio"]')
      .attr('disabled', true);
    $('input[type="checkbox"],input[type="radio"]').addClass('disabled');
    $('input[value="ADD"]').attr('disabled', true).addClass('disabled');
    $('.checkbox_delete_image').addClass('disabled');
  }

  function show_alert(error) {
    $('body').prepend("<div class='error_overlay' role='presentation'></div>");
    $.jqDialog.alert(error, function() {
      $('.error_overlay').remove();
    }
    );
    $('#jqDialog_box').attr('role', 'alertdialog');
    $('.jqDialog_header').remove();
    $('#jqDialog_box').prepend("<h1 class='jqDialog_header' role='heading' >Error</h1>");
  }

  /* Save or Remove Histogram */
  $('.scb_ab_f_save_histogram, .scb_ab_f_remove_histogram, ' +
    '.scb_ab_f_save_selected_histogram').click(function () {
    var data = {};
    if ($(this).hasClass('scb_ab_f_remove_histogram')) {
      data['cell_treatment'] = $(this).data('cell_treatment');
      data['mapping_pk'] = $(this).data('pk');
    } else {
      data['cell_treatment'] = $('.scb_ab_s_histogram_dialog').data('cell_treatment');
      data['mapping_pk'] = $('.scb_ab_s_histogram_dialog').data('pk');
      if ($(this).hasClass('scb_ab_f_save_histogram')) {
        data['points'] = JSON.stringify(data_points);
      } else{
        data['histogram_pk'] = $('.scb_ab_s_histogram_selected').attr('id').match(/(\d+)$/)[0];
      }
    }
    $.ajax({
      url: '/ab/assignments/submit_histogram/',
      type: "POST",
      data: data
    }).then(function() {
      window.location.reload();
    });
  });

  $(".add_histogram_btn").click(function () {
    /* this btn has the id of the corresponding row */
    var row_id = $(this).data('row_id');
    /* Get name of the sample from the row itself */
    var sample_name = $("#" + row_id).text().replace(/(\n *)+/g, "");
    /* cell_treatment, analysis, condition */
    var sample_treatment  = $(this).data('sample_treatment');
    var sample_treatment_array = sample_treatment.split(',');
    var instance_pk = row_id.match(/(\d+)$/)[0];
    $('.scb_ab_f_sample_name').text(sample_name);
    $('.scb_ab_f_treatment_text').text(sample_treatment);
    $('.scb_ab_s_histogram_dialog')
      .data({'cell_treatment': sample_treatment_array[0], 'pk': instance_pk})
      .css('visibility', 'visible');
    /* Label x axis with condition name */
    nameXAxis(sample_treatment_array[2]);


  });

  /* Close draw histogram dialog */
  $('.scb_ab_f_close_dialog').click(function () {
    $('.scb_ab_s_histogram_dialog').css('visibility', 'hidden');
    if (undostack.length > 0) {
      undostack.pop().remove();
      data_points = [];
    }
  });
  $(".scb_ab_s_histogram_tab_not_selected").click(function () {
    $(".scb_ab_s_draw_histogram_view").toggle();
    $(".scb_ab_s_select_histogram_view").toggle();
    paper.view.update();


  });

  $('.scb_ab_s_histogram_dialog').draggable({handle: '.scb_ex_inner_dialog_title'});

  $('.scb_ab_f_select_histogram').click(function(){
    var canvas_library = $("[id|='library']");
    _.each(canvas_library, function (canvas) {
      $(canvas).removeClass("scb_ab_s_histogram_selected");
    });
    $(this).addClass("scb_ab_s_histogram_selected");
  });


  /* Facs analyze view */
  if (typeof(histograms) !== 'undefined') {
    var canvas_list = $("[id|='canvas']");

    var instance_id, path, data, row_id;

    _.each(canvas_list, function (canvas) {
      // attribute id has the form 'canvas-live2'
      instance_id = canvas.id.match(/(\d+)$/)[0];
      row_id = canvas.id.split('-')[1];
      paper.setup(canvas.id);
      /* x axis */
      draw_line(13, 87, 187, 87);
      /* y axis */
      draw_line(13, 7, 13, 87);

      if (canvas.id.indexOf('Live') > -1) {
        data = histograms[instance_id]['live'];
      } else {
        data = histograms[instance_id]['fixed'];
      }
      if (data) {
        data = JSON.parse(data);
        path = new Path();
        path.strokeColor = 'black';
        path.strokeWidth = '1';
        _.each(data, function (point) {
          path.add(new Point(point[0] / 3, point[1] / 3))
        });
        paper.view.update();
        $("button[data-row_id='row-" + row_id + "']").hide();
      } else {
        $(canvas).css('display', 'none');
        $(canvas).siblings('div').css('display', 'none');
      }
    });
    var canvas_library = $("[id|='library']");
    _.each(canvas_library, function (canvas) {

      var histogram_id = canvas.id.match(/(\d+)$/)[0];
      paper.setup(canvas.id);

      /* x axis */
      draw_line(20, 130, 260, 130);
      /* y axis */
      draw_line(20, 10, 20, 130);
      data = all_histograms_mapping[histogram_id];
      data = JSON.parse(data);
      path = new Path();
      path.strokeColor = 'black';
      path.strokeWidth = '1';
      _.each(data, function (point) {
        path.add(new Point(point[0] / 2, point[1] / 2))
      });

      paper.view.update();

    });
    load_sketch_tool(x_upper_bound, tick_values);
  }


});


