
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
  $("form textarea").addClass("scb_ab_s_input_text_area");
  $("form select").addClass("scb_ab_s_form_select_field");

  /**
   * Back navigation button
   */
  $(".scb_s_back_btn").on('click', function() {
    location = $(this).data('location');
  });

  var file_list = get_file_names(),           // Array of names
      files_to_upload = [],                   // Array of File objects
      files_to_delete = [],                   // Array of urls
      uploaded_file_names = get_file_names(); // Array of names, initialize  with files present on server

  function get_file_names() {
    result = [];
    $('.scb_ab_s_file_list').find('ul li a').each(function() {
      result.push($(this).text());
    });
    return result;
  }

  /* Add files in assignment initial setup view */
  $(".scb_ab_s_add_files_input_setup").on('change', function(e) {
    var $file_list = $('.scb_ab_s_file_list').find('ul');
    e.preventDefault();
    $file_list.empty();
    $.each(this.files, function(index, file) {
     $file_list.append(
        '<li>' +
          '<a href="' + URL.createObjectURL(file) + '">' + file.name + '</a>' +
        '</li>'
      );
    });
  });

  /* Add files in assignment modify view  */
  $(".scb_ab_s_add_files_input").on('change', function(e) {
    var $file_list = $('.scb_ab_s_file_list').find('ul');
    e.preventDefault();
    $.each(this.files, function(index, file) {
      if (file_list.indexOf(file.name) === -1) {
        files_to_upload.push(file);
        $file_list.append(
          '<li>' +
            '<a href="' + URL.createObjectURL(file) + '">' + file.name + '</a>' +
            '<button class="scb_s_ab_trash_icon scb_ab_s_delete_file"></button>' +
          '</li>'
        );
        $file_list.find('li button').last().on('click', delete_file);
        // Update file list
        file_list.push(file.name);
      }
    });
  });

  /* Remove assignment file */
  function delete_file(e) {
    var $anchor = $(this).siblings('a'),
        delete_file_name = $anchor.text(),
        delete_file_url = $anchor.attr('href'),
        index;
    e.preventDefault();
    // Remove element from list
    index = file_list.indexOf(delete_file_name);
    if (index !== -1) {
      file_list.splice(index, 1);
    }
    // If already uploaded, update corresponding array
    if (uploaded_file_names.indexOf(delete_file_name) !== -1) {
      files_to_delete.push(delete_file_url);
    }
    // Otherwise, delete entry in files to upload. Clone files_to_upload beforehand.
    else {
      $.each(files_to_upload.slice(0), function(i, file) {
        if (file.name === delete_file_name) {
          files_to_upload.splice(i, 1);
        }
      });
    }
    // Remove DOM element ie <li> element containing anchor and trash button
    $(this).parent().remove();
  }

  $(".scb_ab_s_delete_file").on('click', delete_file);

  var save_continue = false, $form = $('.scb_ab_s_assignment_form');
  $form.find('input[name="save"]').on('click', function() {
    save_continue = false;
  });
  $form.find('input[name="continue"]').on('click', function() {
    save_continue = true;
  })

  // Update file list on server
  $('.scb_ab_s_assignment_form').on('submit', function(e) {
    var form_data, urls = [], name, text;
    e.preventDefault();
    $('.scb_ab_s_file_list').find('li a').each(function() {
      urls.push($(this).attr('href'));
    });
    name = $form.find('input[name="assignment_name"]').val();
    if (name.length === 0) {
      $('.name_error').text('Cannot have an empty assignment name.');
      return;
    }
    else {
      $('.name_error').val('');
    }
    text = $form.find('textarea[name="assignment_text"]').val();
    form_data = new FormData();
    form_data.append('name', name);
    form_data.append('text', text);
    form_data.append('files_to_delete', JSON.stringify(files_to_delete));
    $.each(files_to_upload, function(index, file) {
      form_data.append(file.name, file);
    });
    $.ajax({
      url: '/ab/assignments/assignment_modify/',
      type: 'POST',
      cache: false,
      contentType: false,
      dataType: 'html',
      processData: false,
      data: form_data,
      success: function(data, status) {
        if (save_continue) {
          location = '/ab/assignments/course_modify/';
        }
      },
      error: function(xhr, description, error) {
        console.log('File list could not be updated: ', xhr, description, error);
      }
    });
  });

  /**
   * Edit Strains
   */
  if($("input[name='continue']").attr('disabled') === 'disabled'){
     $("#id_form-0-name").keyup(function(e){
       if($(this).val() != '') {
         $("input:disabled").attr('disabled', false).removeClass('disabled');
       }
     });
  }

  $('.delete_checkbox input').each(function() {
    $(this).hide().after('<div class="checkbox_form_delete scb_s_ab_trash_icon"/>');

  });
  if (typeof (access) !== 'undefined' && access === 'private') {
    var $checkbox_form_delete = $('.checkbox_form_delete');
    $checkbox_form_delete.attr('tabindex', 0);
    $checkbox_form_delete.on('keydown', function(event) {
      // ENTER or SPACE have been pressed
      if(event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        $(this).trigger('click');
      }
    });
    $checkbox_form_delete.on('click', function() {
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
    $('select').change(function(){
      var condition_input = $(this).parent().parent().parent().find('input[type="text"]')[0];
      if ($(this).val() == 'Anti'){
        $(condition_input).attr('value', 'Histone H3 antibody');
      }else if($(this).val() == 'Dye'){
        $(condition_input).attr('value', 'propidium iodide');
      }
    });
    $('option[value=""]').attr('disabled', true);
  }
  /**
   * Microscopy: Sample Prep
   */
  if ($("#id_form-0-micro_analysis").length) {
    $('input[type="text"]').attr('placeholder', 'Condition Name');
    var analysis_dict = {
      'IF': 'histone H3 antibody',
      'IHC': 'histone H3 antibody',
      'DYE-FLU': 'DAPI',
      'DYE-BF': 'Hematoxylin & Eosin',
      'FLUOR': 'GFP-tagged protein',
      'BF': 'N/A'
    };
    $('select').change(function(){
      var condition_input = $(this).parent().parent().parent().find('input[type="text"]')[0];
      $(condition_input).attr('placeholder', analysis_dict[$(this).val()]);
      if($(this).val() === 'BF'){
        $(condition_input).parent().css('visibility', 'hidden');
      }else{
        $(condition_input).parent().css('visibility', 'visible');
      }
    });
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
    $('.scb_s_ab_trash_icon').addClass('disabled');
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

  /* Draw New Histogram Instructions toggle */
    $('#instructions-toggle').on('click', function() {
        $('#instructions').toggle();
    });

  /* Save or Remove Histogram */
  $('.scb_ab_f_save_histogram, .scb_ab_f_remove_histogram, ' +
    '.scb_ab_f_save_selected_histogram').click(function () {
    var data = {};
    if ($(this).hasClass('scb_ab_f_remove_histogram')) {
      data['cell_treatment'] = $(this).data('cell_treatment');
      data['mapping_pk'] = $(this).data('pk');
    } else {
      data['cell_treatment'] = $('.scb_ab_s_analyze_dialog').data('cell_treatment');
      data['mapping_pk'] = $('.scb_ab_s_analyze_dialog').data('pk');
      if ($(this).hasClass('scb_ab_f_save_histogram')) {
        data['points'] = JSON.stringify(getDataPoints());
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

  /* Create new hrel URL with additional GET parameters to reopen image choosing window */
  function hrefReloadUrl() {
      var url = location.href,
          getRequest = (
              "?mapping=" + $('.scb_ab_f_save_image').data('pk')
              + "&protocol=" + $('.scb_ab_f_sample_name').text()
              + "&sample_prep=" + $('.scb_ab_f_treatment_text').text()
              + "&group_id=" + $('.scb_ab_f_save_image').data('group_id')
              + "&analysis=" + $('.scb_ab_f_save_image').data('analysis')
          );
      return url.indexOf("mapping") > -1 ? url : url + getRequest;
  };

  $('.scb_ab_f_remove_image').click(function () {
    localStorage.setItem('scroll', $(window).scrollTop());
    var data = {};
    data['image_pk_list'] = _.map($('.scb_ab_s_image_selected'), function (element) {
      return $(element).attr('id').match(/(\d+)$/)[0];
    });
    if (data['image_pk_list'].length > 0) {
      $.ajax({
        url: '/ab/assignments/delete_images/',
        type: "POST",
        data: data
      }).then(function () {
        location.href = hrefReloadUrl(); // Reload page without closing image choosing window
      });
    }
  });

  /* Save selected list of images to an ImageMapping object*/
  $('.scb_ab_f_save_image').click(function () {
      localStorage.setItem('scroll', $(window).scrollTop());
      var data = {},
          group_id = $(this).data('group_id');
      data['mapping_pk'] = $(this).data('pk');
      // If group_id == true all filter's images are collected before saving
      if (group_id) {
          var $filterImages = $(".scb_f_image_filter img"),
              group_images = {};
          data['group_id'] = group_id;
          $filterImages.each(function () {
              var filter = $(this).parent('div').attr('class').split('_').pop();
              group_images[filter] = $(this).attr('id').match(/(\d+)$/)[0];

          });
          data['group_images'] = JSON.stringify(group_images);
          $.ajax({
              url: '/ab/assignments/select_images/',
              type: "POST",
              data: data
          }).then(function () {
              window.location = '/ab/assignments/microscopy_analyze/';
          });
      } else {
          data['image_pk_list'] = _.map($('.scb_ab_s_small_image_selected'), function (element) {
              return $(element).attr('id').match(/(\d+)$/)[0];
          });
          if (data['image_pk_list'].length > 0) {
              $.ajax({
                  url: '/ab/assignments/select_images/',
                  type: "POST",
                  data: data
              }).then(function () {
                  window.location = '/ab/assignments/microscopy_analyze/';
              });
          }
      };
  });

  $(".scb_ab_s_histogram_tab_not_selected").click(function () {
    $(".scb_ab_s_draw_histogram_view").toggle();
    $(".scb_ab_s_select_histogram_view").toggle();
    paper.view.update();
  });

  $('.scb_ab_s_analyze_dialog').draggable({cancel: '.scb_ab_s_canvas_library, .scb_ab_s_draw_new_histogram_content'});

  /* Mark this histogram for selection from the library */
  $('.scb_ab_f_select_histogram').click(function(){
    var canvas_library = $("[id|='library']");
    _.each(canvas_library, function (canvas) {
      $(canvas).removeClass("scb_ab_s_histogram_selected");
    });
    $(this).addClass("scb_ab_s_histogram_selected");
  });
  /* Handle image selection in the Image Library */
  $('.scb_ab_f_select_image').click(function(){
    if($(this).hasClass("scb_ab_s_image_selected")){
      $(this).removeClass("scb_ab_s_image_selected");
    }else{
      $(this).addClass("scb_ab_s_image_selected");
    }
  });

  /* Facs analyze view */
  if (typeof(histograms) !== 'undefined') {
    var canvas_list = $("[id|='canvas']");

    var instance_id, path, data, row_id, canvas_data;

    mypapers = [];
    mypapers[0] = new paper.PaperScope();
    mypapers[1] = new paper.PaperScope();
    mypapers[2] = new paper.PaperScope();
    mypapers[3] = new paper.PaperScope();

    _.each(canvas_list, function (canvas) {
      // attribute id has the form 'canvas-live2'
      instance_id = canvas.id.match(/(\d+)$/)[0];
      row_id = canvas.id.split('-')[1];
      paper.setup(canvas.id);
      /* x axis */
      drawLine(20, 180, 180, 180);
      /* y axis */
      drawLine(20, 20, 20, 180);

      if (canvas.id.indexOf('Live') > -1) {
        data = histograms[instance_id]['live'];
      } else {
        data = histograms[instance_id]['fixed'];
      }
      var $edit_icon = $("div.scb_ab_s_histogram_edit_icon[data-row_id='row-" + row_id + "']");
      // Scale: editing canvas is 300x300, small canvas is 160x160
      var xyScale = 160/300;
      if (data) {
        data = JSON.parse(data);
        canvas_data = convertToCanvas(data);
        path = new Path();
        path.strokeColor = 'lightslategray';
        path.strokeWidth = '1';
        _.each(canvas_data, function (point) {
          // Translate and scale points
          path.add(new Point(xyScale*(point[0] - 20), xyScale*(point[1] + 20)));
        });
        paper.view.update();
        $("button[data-row_id='row-" + row_id + "']").hide();
        $edit_icon.addClass('scb_ab_s_edit_white_img');
      } else {
        $(canvas).css('display', 'none');
        $(canvas).siblings('div').css('display', 'none');
        $(canvas).parent().siblings('.scb_ab_s_copy_button_container').css('display', 'none');
        $edit_icon.addClass('scb_ab_s_edit_grey_img');
      }
    });

    /*
      Setup the canvas library in the Histogram Tools window
     */
    var canvas_library = $("[id|='library']");
    _.each(canvas_library, function (canvas) {

      var histogram_id = canvas.id.match(/(\d+)$/)[0];
      var xyScale = 160/300;
      canvas.setAttribute('width', 200)
      canvas.setAttribute('height', 200);
      paper.setup(canvas.id);
      /* x axis */
      drawLine(20, 180, 180, 180);
      /* y axis */
      drawLine(20, 20, 20, 180);
      data = all_histograms_data[histogram_id];
      data = JSON.parse(data);
      canvas_data = convertToCanvas(data);
      path = new Path();
      path.strokeColor = 'lightslategray';
      path.strokeWidth = '1';
      _.each(canvas_data, function (point) {
        // Translate and scale points
        path.add(new Point(xyScale*(point[0] - 20), xyScale*(point[1] + 20)));
      });

      paper.view.update();
    });

    loadSketchTool(x_upper_bound, y_upper_bound, scale);
  }

  /* ADD HISTOGRAM button: Open Histogram Tools window */
  $(".add_histogram_btn, .scb_ab_f_edit_histogram.scb_ab_s_edit_white_img").click(function () {
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
    $('.scb_ab_s_analyze_dialog')
      .data({'cell_treatment': sample_treatment_array[0], 'pk': instance_pk})
      .css('visibility', 'visible');
    /* Label x axis with condition name */
    mypapers[2].activate();
    drawXAxisName(sample_treatment_array[2]);
    if ($(this).hasClass("scb_ab_f_edit_histogram")){
      $(".scb_ab_s_draw_histogram_view").hide();
      $(".scb_ab_s_select_histogram_view").show();
      paper.view.update();
    }
  });

  /* Open Image Dialog in Microscopy Analyze page */

  $(".open_upload_window_btn").click(function(){
    localStorage.setItem('scroll', $(window).scrollTop());
    /* this btn has the id of the corresponding row */
    var row_id = $(this).data('row_id');
    /* Get name of the sample from the row itself */
    var sample_name = $("#" + row_id).text().replace(/(\n *)+/g, "");
    $('.scb_ab_f_sample_name').text($(this).data("strain") + ". " + sample_name);
    var instance_pk = row_id.match(/(\d+)$/)[0];
    var sample_treatment  = $(this).data('sample_treatment'),
        group_id = $(this).data('group_id') ? $(this).data('group_id'): null,
        analysis = sample_treatment.split(',')[0];

    $('.scb_ab_f_treatment_text').text(sample_treatment);
    $('.scb_ab_s_analyze_dialog').css('visibility', 'visible');
    $('.scb_ab_f_save_image').data({
        'pk': instance_pk,
        'group_id': group_id,
        'analysis': analysis,
    });
    addSelectedImages(); // Add already saved images to the selected area
  });


  $(function(){
   $(window).scrollTop(localStorage.getItem('scroll'));
   addSelectedImages(); // Add already saved images to the selected area on the page loading
  });

  /* Remove selection from the images and revert all unsaved images to the image bank */
  function clearSelectedFrame() {
      var reselectImages = $(".scb_ab_s_small_image_selected");
      reselectImages.each(function () {
          $(this).removeClass("scb_ab_s_small_image_selected");
          $(".scb_ab_s_image_bank").append($(this));
      });
  }

  /* Fulfill filter area by chosen image in the Fluorescent image selecting flow*/
  function fulfilFilter(group_id, $chosenImages) {
      for (var filter in filterMap) {
          var filterName = filterMap[filter],
              $filter = $(".scb_f_image_filter_{}".replace('{}', filterName)),
              filterImage = $chosenImages[filterName];
          $filter.data("filter_group", filter + "-" + group_id);
          if (filterImage) {
            $filter.text("");
            shiftImages(filterImage, $filter)
          } else {
            $filter.text("{} filter".replace('{}', filterName));
          }
          $(".scb_ab_s_select_box").append($filter);
      }
  }

  /* Clarify chosen image from the images in the bank and move it to the target element*/
  function shiftImages(chosenImage, elementToAppend) {
      var imageUrlList = chosenImage.attr("src").split('/'),
          imageName = imageUrlList[imageUrlList.length - 1],
          $chosenImages = $(".scb_ab_s_image_bank img[src$='{}']".replace("{}", imageName));
      $chosenImages.addClass('scb_ab_s_small_image_selected');
      elementToAppend.append($chosenImages);
  };


  var filterMap = ['red', 'blue', 'green', 'merge'];

  /* Add saved images to the selected field on the reopening Upload Image(s) tab */
  function addSelectedImages() {
      clearSelectedFrame();
      var group_id = $(".scb_ab_f_save_image").data('group_id'),
          analysis = $(".scb_ab_f_save_image").data('analysis'),
          $filtersFrames = $(".scb_f_image_filter");
      if (group_id) {
        $filtersFrames.css({'visibility': 'visible', 'display': 'inline-block  '});
        var $chosenImages = $(".scb_f_set[data-group_id='{}'] img".replace('{}', group_id));
        $(".scb_f_set[data-group_id='{}'] img".replace('{}', group_id))
            .each(function(){
              var filter = filterMap[
                  $(".scb_f_set[data-group_id=\'{}\'] .scb_ab_s_filtered_image_grid".replace('{}', group_id))
                      .index($(this).parent()) % 4
              ];
              $chosenImages[filter] = $(this)
            });
          fulfilFilter(group_id, $chosenImages)
      } else {
          $filtersFrames.hide();
          $chosenImages = $(".scb_ab_s_sample_image_list[data-analysis='{}'] img".replace('{}', analysis));

          if ($chosenImages.length > 0) {
              $chosenImages.each(function () {
                shiftImages($(this), $(".scb_ab_s_select_box"));
              });
          }
      }
      if ($(".scb_ab_s_analyze_dialog").css('visibility') === 'visible') {
          $(".scb_ab_f_select_image").css('visibility', 'visible');
      }
  };

  /* If Microscopy Analyze page */
  if($(".scb_ab_s_image_form").length){
    /* Event: Close select image dialog */
    $('.scb_ab_f_close_dialog').click(function () {
      $('.scb_ab_s_analyze_dialog').css('visibility', 'hidden');
      $('.scb_ab_f_select_image').css('visibility', 'hidden');
      $('.scb_f_image_filter').css('visibility', 'hidden');
    });
  }

  /* COPY TO button */
  $('.open_copy_histogram_dialog').click(function(){
    $(".scb_ab_f_copy_histogram").data({
        'mapping_id': $(this).data('instance_id'),
        'cell_treatment': $(this).data('cell_treatment')
      });
    $(".scb_ab_s_copy_dialog").css('visibility', 'visible');
  });

  $('.scb_ab_f_close_copy_dialog').click(function(){
    $(".scb_ab_s_copy_dialog").css('visibility', 'hidden');
  });

  /* COPY button: copy histogram to selected samples */
  $(".scb_ab_f_copy_histogram").click(function(){
    var checked = $('input.scb_ab_f_copy_checkbox:checked');
    var copy_to_list = [];
    _.each(checked, function(element){
      copy_to_list.push({
        id: $(element).data('instance_id'),
        cell_treatment: $(element).data('cell_treatment')
      });
    });
    var data = {
      copy_from_pk: $(this).data('mapping_id'),
      cell_treatment: $(this).data('cell_treatment'),
      copy_to_list: JSON.stringify(copy_to_list)
    };
    if (copy_to_list.length > 0) {
      $.ajax({
        url: '/ab/assignments/copy_histogram/',
        type: "POST",
        data: data
      }).then(function () {
        window.location.reload();
      });
    }
  });
  /* Create new empty image set for this sample */
  $('.add_new_image_set').click(function() {
    localStorage.setItem('scroll', $(window).scrollTop());
    var $this = $(this),
        id = $this.data('mapping_id');
    $.ajax({
      url: '/ab/assignments/add_new_image_set/',
      type: "POST",
      data: {mapping_id: id}
    }).then(function (data) {
      var url = location.href,
        sample_name = $("#row-" + id).text().replace(/(\n *)+/g, ""),
        protocol = ($this.data("strain") + ". " + sample_name),
        treatment = $this.data("sample_treatment"),
        getRequest = (
            "?mapping=" + id
            + "&protocol=" + protocol
            + "&sample_prep=" + treatment
            + "&group_id=" + data
            + "&analysis=" + treatment.split(',')[0]
        );
      url += getRequest;
      window.location = url;
    });
  });
  /* Remove image */
  $(".scb_ab_f_remove_image").click(function(){
    localStorage.setItem('scroll', $(window).scrollTop());
    $.ajax({
      url: '/ab/assignments/remove_image/',
      type: "POST",
      data: {
        mapping_id: $(this).data('mapping_id'),
        group_id: $(this).data('group_id'),
        filter: $(this).data('filter'),
        image_id: $(this).data('image_id')
      }
    }).then(function () {
      window.location = '/ab/assignments/microscopy_analyze/';
    });
  });

  $(".remove_image_set").click(function(){
    localStorage.setItem('scroll', $(window).scrollTop());
    $.ajax({
      url: '/ab/assignments/remove_image_set/',
      type: "POST",
      data: {
        group_id: $(this).data('group_id')
      }
    }).then(function () {
      window.location = '/ab/assignments/microscopy_analyze/';
    });
  });

  $("input[id='id_objective']").attr('placeholder', '20x'); // Add default objective to the input field

  $("input[id^='tech_has_']").click(function() {
      var technique = $(this).attr('id').replace('tech_', '');
      var body = {'technique': technique};
      $.ajax({
          url: "/ab/assignments/select_technique/",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(body),
          success: function (data) {
              console.log("Technique is chosen", data);
              location.href = data;
          },
          error: function (xhr, textStatus, err){
              console.log("Error adding Technique: " + err + " " + textStatus);
          }
      });
  });

  /*
    Drag&Drop functionality for the image(s) uploading process in the micro analyze technique.
   */

  var $filesBox = $('.scb_ab_s_image_bank'),
      $imageForm = $('.scb_ab_s_image_form'),
      $fileInput = $imageForm.find('input[type="file"]'),
      $label = $imageForm.find('label[for="id_file"]'),
      $fileInput = $imageForm.find( 'input[type="file"]'),
      $filesSelect = $(".scb_ab_s_select_box"),
      droppedFiles = false,
      // Function changing label during uploading process
      showFiles = function(files, html) {
          if (html) {
            $label.html(html);
          } else {
            $label.text((files.length > 1 ? ($fileInput.attr('data-plural-caption') || '')
                .replace('{}', files.length) : files[0].name + " is ") + "uploading ...");
          }
      };
  // New event handler for the 'usual' file uploading (not drag&drop)
  $fileInput.on('change', function(e) {
      showFiles(e.target.files);
      $imageForm.trigger('submit');
  });
  // Event handler for drag&drop uploading workflow
  $filesBox.on('dragend dragover dragenter dragleave drop', function(e) {
    return false;
  })
  .on('dragover dragenter', function () {
    $filesBox.addClass('is-dragover');
  })
  .on('dragleave dragend drop', function () {
    $filesBox.removeClass('is-dragover');
  })
  .on('drop', function (e) {
      if (e.originalEvent.dataTransfer.files.length > 0) {
          droppedFiles = e.originalEvent.dataTransfer.files;
          showFiles(droppedFiles);
          $imageForm.trigger('submit');
      } else {
        dragSelected(e, false)
      }
  });

  /* Moving selected images to the target element*/
  function moveSelected(id, direction, target) {
      var $selectedImage = $("#" + id);
      if (direction) {
          if ($(".scb_ab_f_save_image").data("group_id") && $(target).hasClass('scb_f_image_filter')) {
              if ($(target).has('img').length) {
                  return false
              }
              $selectedImage.addClass('scb_ab_s_small_image_selected');
              var parent = $selectedImage.parent();
              $(target)
                  .text("")
                  .append($selectedImage);
              if (parent.hasClass('scb_f_image_filter')) {
              var filter = parent.attr('class').split('_').pop();
              parent.text(filter + ' filter')
          }
          } else if (!($(".scb_ab_f_save_image").data("group_id"))) {
              $selectedImage.addClass('scb_ab_s_small_image_selected');
              $(".scb_ab_s_select_box").append($selectedImage);
          }
      } else if (!direction && $selectedImage.hasClass('scb_ab_s_small_image_selected')) {
          $selectedImage.removeClass('scb_ab_s_small_image_selected');
          var parent = $selectedImage.parent();
          $(".scb_ab_s_image_bank").append($selectedImage);
          if (parent.hasClass('scb_f_image_filter')) {
              var filter = parent.attr('class').split('_').pop();
              parent.text(filter + ' filter')
          }
      }
  }

  /* Fluorecent image selecting workflow support automating image saving */
  function saveSelectedImages(group_id) {
      var data = {};
      data['mapping_pk'] = $(this).data('pk');
      var $filterImages = $(".scb_f_image_filter img"),
          group_images = {};
      data['group_id'] = group_id;
      $filterImages.each(function () {
          var filter = $(this).parent('div').attr('class').split('_').pop();
          group_images[filter] = $(this).attr('id').match(/(\d+)$/)[0];

      });
      data['group_images'] = JSON.stringify(group_images);
      return $.ajax({
          url: '/ab/assignments/select_images/',
          type: "POST",
          data: data
      });
  }
  /* Fluorecent image selecting workflow support automation Image Set creation */
  function createNewSet(selectedIds, target) {
      localStorage.setItem('scroll', $(window).scrollTop());
      var selectedIdsList = selectedIds.split(':');
      moveSelected(selectedIdsList.pop(), true, target);
      saveSelectedImages($('.scb_ab_f_save_image').data('group_id'));
      $.each(selectedIdsList, function (_, id) {
          $.ajax({
              url: '/ab/assignments/add_new_image_set/',
              type: "POST",
              async: false,
              data: {mapping_id: $('.scb_ab_f_save_image').data('pk')}
          }).then(function (newGroupId) {
              $(".scb_ab_s_small_image_selected").removeClass("scb_ab_s_small_image_selected");
              $(target).empty();
              moveSelected(id, true, target);
              saveSelectedImages(newGroupId);
          })
      });
      window.location = '/ab/assignments/microscopy_analyze/';
  }

  /* Dragging selected images between Selected images and Image bank */
  function dragSelected(event, direction=true) {
      var selectedId = event.originalEvent.dataTransfer.getData("text"),
          alertMsg = "Multiple images cannot be added to the filter if another filter is filled in!";
      if (selectedId.indexOf(":") > -1) {
          if ($(".scb_ab_f_save_image").data("group_id") && direction && $(event.target).hasClass('scb_f_image_filter')) {
              return $(".scb_ab_s_small_image_selected").length ? $.jqDialog.alert(alertMsg) : createNewSet(selectedId, event.target);
          } else {
              $.each(selectedId.split(':'), function (_, id) {
                  moveSelected(id, direction, target=event.target);
              });
          };
      } else {
          moveSelected(selectedId, direction, target=event.target);
      }
      unselectImages();
  }

  /* Event handler for drag&drop selection workflow */

  // On draging one image drag all selected images
  $('.scb_ab_f_select_image').on('dragstart', function (e) {
      e.originalEvent.dataTransfer.setData("text", dragStartSelection(e));
  });

  function dragStartSelection(event) {
      var $selectedImages = $(".scb_ab_s_image_selected"),
          imageIdList = [];
      if ($selectedImages.length > 0) {
          $selectedImages.each(function () {
              imageIdList.push($(this).attr("id"))
          });
          return imageIdList.join(":")
      } else {
          return event.target.id
      }
  }

  $filesSelect.on('drag dragend dragover dragenter dragleave drop', function(e) {
    return false;
  })
  .on('dragstart', function (e) {
      e.originalEvent.dataTransfer.setData("text", dragStartSelection(e));
  })
  .on('dragover dragenter', function () {
    $filesSelect.addClass('is-dragover');
  })
  .on('dragleave dragend drop', function () {
    $filesSelect.removeClass('is-dragover');
  })
  .on('drop', dragSelected);

  // Handler for the form submitting process.
  $imageForm.on('submit', function(e) {
      if ($imageForm.hasClass('is-uploading')) {return false;};

      $imageForm.addClass('is-uploading');

      e.preventDefault();
      console.log('FILES IS SUBMITTING');

      var ajaxData = new FormData($imageForm.get(0));

      var parameters = {'upload': 'UPLOAD', 'objective': '20x'};
      parameters['protocol'] = $('.scb_ab_f_sample_name').text();
      parameters['sample_prep'] = $('.scb_ab_f_treatment_text').text();
      parameters['mapping_pk'] = $('.scb_ab_f_save_image').data('pk');
      parameters['group_id'] = $('.scb_ab_f_save_image').data('group_id') || '';
      $.each(parameters, function(key, value){
          ajaxData.append(key, value)
      });

      if (droppedFiles) {
        $.each(droppedFiles, function(i, file) {
          ajaxData.append($fileInput.attr('name'), file);
        });
      }

      $.ajax({
          url: $imageForm.attr('action'),
          type: $imageForm.attr('method'),
          data: ajaxData,
          dataType: 'html',
          cache: false,
          contentType: false,
          processData: false,
          complete: function() {
            $imageForm.removeClass('is-uploading');
          },
          success: function(data, status) {
            console.log("File is saved: ", status);
            location.href = hrefReloadUrl();
          },
          error: function(xhr, description, error) {
            console.log("File cannot be upload", xhr, description, error);
            showFiles(null, "File <span style='color:red'>cannot be uploaded</span>, please drag again or <strong>choose a file(s)</strong>")
          }
      }).then(addSelectedImages());
  });

  /*
     Cursor rectangular selector
  */

  function unselectImages() {
      $(".scb_ab_s_image_selected").each(function () {
          $(this).removeClass('scb_ab_s_image_selected')
      });
  }

  var x1, x2, y1, y2;
  var cursor_selector = $("#cursor_selector"),
      imageLibrary = $(".scb_ab_s_canvas_library"),
      selectField = false;

  function reCalc() {
      var x3 = Math.min(x1,x2),
          x4 = Math.max(x1,x2),
          y3 = Math.min(y1,y2),
          y4 = Math.max(y1,y2);
      cursor_selector.css('left', x3)
                     .css('top', y3)
                     .css('width', x4 - x3)
                     .css('height', y4 - y3);
  }

  imageLibrary.mousedown(function(e) {
      if (e.target.tagName != 'IMG') {
          unselectImages();
          selectField = 1;
          x1 = x2 = e.clientX;
          y1 = y2 = e.clientY;
      }
  });
  imageLibrary.mousemove(function(e) {
      if (selectField) {
          x2 = e.clientX;
          y2 = e.clientY;
          reCalc();
          cursor_selector.show();
      }
  });
  imageLibrary.mouseup(function(e) {
      cursor_selector.hide();
      selectField = 0;
      markImages();
  });

  // Function matching if image is selected
  function matchImage(xImage, yImage) {
      var imageX1 = Math.min(x1,x2),
          imageX2 = Math.max(x1,x2),
          imageY1 = Math.min(y1,y2),
          imageY2 = Math.max(y1,y2);

      if ((xImage > imageX1) && (xImage < imageX2)) {
          if ((yImage > imageY1) && (yImage < imageY2)) {
              return true;
          }
      };
      return false;
  }

  // Function marking images as selected which is covered by the selector
  function markImages() {
      $(".scb_ab_f_select_image").each(function () {
          var pos = $(this)[0].getBoundingClientRect(),
              xImage = pos.left + $(this).width() / 2,
              yImage = pos.top + $(this).height() / 2;
          if (matchImage(xImage, yImage)) {
              $(this).addClass('scb_ab_s_image_selected')
          }
      });
      x1 = x2 = y1 = y2 = 0;
  }
});
