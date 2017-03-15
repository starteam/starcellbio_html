//'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};

scb.ui.static.InstructorFrame = scb.ui.static.InstructorFrame || {};

scb.ui.static.InstructorFrame.update_hash = function(state) {
  console.info("update_hash " + state.onhashchange);
  console.info($.bbq.getState());
  console.info(state);

  if (!state.onhashchange) {
    delete state.onhashchange;
    var History = window.History;
    if (!History.enabled) {
      return;
    }
    History.discardedState();
    History.discardedState();
    History.pushState(state, 2, "/#" + $.param(state));
  }
}


scb.ui.InstructorFrame = function scb_ui_InstructorFrame(master_model, context) {
  var self = this;
  var pending_save = false;
  context.main_frame = self;
  self.sections = {};

  var assignments = new scb.AssignmentList(master_model.assignments, context);

  user_is_auth = typeof get_student_courses_result != "undefined" ? get_student_courses_result.is_auth : get_instructor_assignments_result.is_auth;

  user_token = typeof get_student_courses_result != "undefined" ? get_student_courses_result.token : get_instructor_assignments_result.token;


  scb.ui.static.InstructorFrame.ensure_auth_context = function() {
    context = context || {};
    context.auth = context.auth || {};
  }
  scb.ui.static.InstructorFrame.validate_state = function(state) {
    var ret = {
      redisplay: false
    };

    if (state.assignment_id) {
      var assignment = assignments.get(state.assignment_id);
      if (assignment) {
        assignments.selected_id = assignment.id;
        ret.assignment = assignment;

        if (state.experiment_id) {
          var experiment = assignment.experiments.get(state.experiment_id);
          if (experiment) {
            assignment.experiments.selected_id = experiment.id;
            ret.experiment = experiment;
            if (state.western_blot_id) {
              var western_blot = experiment.western_blot_list.get(state.western_blot_id);
              if (western_blot) {
                ret.western_blot = western_blot;
                if (state.western_blot_gel_id && western_blot) {
                  var western_blot_gel = western_blot.gel_list.get(state.western_blot_gel_id);
                  ret.western_blot_gel = western_blot_gel;
                }
              }
            }
            if (state.cell_treatment_id) {
              var cell_treatment = experiment.cell_treatment_list.get(state.cell_treatment_id);
              if (cell_treatment) {
                ret.cell_treatment = cell_treatment;
                if (state.treatment_id && cell_treatment) {
                  var treatment = cell_treatment.treatment_list.get(state.treatment_id);
                  ret.treatment = treatment;
                }
              }
            }
            if (state.facs_id) {
              var facs = experiment.facs_list.get(state.facs_id);
              if (facs) {
                ret.facs = facs;
                if (state.facs_lane_id && facs) {
                  var facs_lane = facs.lanes_list.get(state.facs_lane_id)
                  ret.facs_lane = facs_lane;
                }
              }
            }
            if (state.microscopy_id) {
              var microscopy = experiment.microscopy_list.get(state.microscopy_id);
              if (microscopy) {
                ret.microscopy = microscopy;
              }
              if (state.microscopy_lane_id && microscopy) {
                var microscopy_lane = microscopy.lanes_list.get(state.microscopy_lane_id)
                ret.microscopy_lane = microscopy_lane;
              }
            }

          } else {

            state.onhashchange = false;
            state.view = 'course_setup';
            delete state.experiment_id;
            scb.ui.static.InstructorFrame.update_hash(state);
            ret.redisplay = true;
            ret.redisplay_state = state;
          }
        }
      } else {

        state.onhashchange = false;
        state.view = 'course_setup';
        delete state.assignment_id;
        scb.ui.static.InstructorFrame.update_hash(state);
        ret.redisplay = true;
        ret.redisplay_state = state;
      }
    }
    if (ret.redisplay == false && state.skip_hash_update != true) {
      scb.ui.static.InstructorFrame.update_hash(state);
    }
    ret.context = context;
    return ret;
  }

  //TODO: DEBUG REMOVE
  window._assigments = assignments;

  self.current_tab = {
    hide: scb.Utils.noop,
    show: scb.Utils.noop
  };

  var workarea = context.ui;
  workarea.css({
    'height': '100%'
  });

  scb.ui.static.InstructorDashboardView.register(workarea);
  scb.ui.static.InstructorCourseSetupView.register(workarea);
  scb.ui.static.InstructorAssignmentSetupView.register(workarea);
  scb.ui.static.ExperimentDesignView.register(workarea);
  scb.ui.static.InstructorExperimentSetupPage1View.register(workarea);
  scb.ui.static.InstructorExperimentSetupPage2View.register(workarea);
  scb.ui.static.InstructorExperimentSetupPage3View.register(workarea);
  scb.ui.static.InstructorExperimentSetupPage4View.register(workarea);

  scb.ui.static.InstructorWesternBlotPage1View.register(workarea);
  scb.ui.static.InstructorWesternBlotPage2View.register(workarea);
  scb.ui.static.InstructorWesternBlotPage3View.register(workarea);
  scb.ui.static.InstructorWesternBlotPage4View.register(workarea);
  scb.ui.static.InstructorWesternBlotPage5View.register(workarea);


  scb.ui.static.InstructorMicroscopyPage1View.register(workarea);
  scb.ui.static.InstructorMicroscopyPage2View.register(workarea);
  scb.ui.static.InstructorMicroscopyPage3View.register(workarea);

  scb.ui.static.InstructorSelectTechniqueView.register(workarea);

  scb.ui.static.InstructorFacsPage1View.register(workarea);
  scb.ui.static.InstructorFacsPage2View.register(workarea);


  scb.ui.static.InstructorFrame.in_ajax = false;
  scb.ui.static.InstructorFrame.show_in_ajax = false;
  scb.ui.static.InstructorFrame.show_in_ajax_message = '';

  scb.ui.static.InstructorFrame.in_ajax_display = function() {
    var saving = $('#saving');
    if (scb.ui.static.InstructorFrame.show_in_ajax) {
      saving.show();
      $('#saving_message', saving).html(scb.ui.static.InstructorFrame.show_in_ajax_message);
    } else {
      saving.hide();
    }
  }
  scb.ui.static.InstructorFrame.save = function() {
    var tmp;
    try {
      tmp = assignments.selected.experiments.selected_id;
    } catch ( ex ) {}
    try {
      assignment.selected.experiments.selected_id = null;
    } catch ( ex ) {}
    var model_string = JSON.stringify(master_model);
    if (localStorage.getItem("scb_master_model") != model_string) {
      master_model.timestamp = (new Date()).getTime();
      model_string = JSON.stringify(master_model);
      try {
        localStorage.setItem("scb_master_model", model_string);
        if (!scb.ui.static.InstructorFrame.in_ajax) {
          scb.ui.static.InstructorFrame.in_ajax = true;
          scb.ui.static.InstructorFrame.show_in_ajax = true;
          scb.ui.static.InstructorFrame.show_in_ajax_message = '';
          scb.ui.static.InstructorFrame.in_ajax_display();
          scb.utils.server.call(model_string, function(state) {
            scb.ui.static.InstructorFrame.in_ajax = false;
            scb.ui.static.InstructorFrame.show_in_ajax = !state.success;
            scb.ui.static.InstructorFrame.show_in_ajax_message = !state.success ? 'Failed, will retry in 30 seconds.' : '';
            scb.ui.static.InstructorFrame.in_ajax_display();
          });
        }
      } catch ( e ) {}
    }
    try {
      assignment.experiments.selected_id = tmp;
    } catch ( ex ) {}
  };

  scb.ui.static.InstructorFrame.load = function() {
    var master_model = JSON.parse(localStorage.getItem("scb_master_model"));
    starcellbio(context.ui, master_model);
  }

  scb.ui.static.InstructorFrame.clear_NO_PROMPT = function() {
    $.ajax({
      url: '/accounts/logout/',
      async: false,
      timeout: 5
    });
    self.show({
      view: 'dashboard'
    });
    master_model = master_model_data;
    scb.ui.static.InstructorFrame.save();
    starcellbio(context.ui, master_model);
  }

  scb.ui.static.InstructorFrame.clear = function() {
    var r = prompt("This will restart whole assignment. Your saved data will be lost. Type: 'YES' to proceed.");
    if (r == 'YES') {
      self.show({
        view: 'dashboard'
      });
      master_model = master_model_data;
      scb.ui.static.InstructorFrame.save();
      starcellbio(context.ui, master_model);
    } else {
      $('html').css('overflow', 'hidden');

      $('body').prepend(scb_experiment_setup.general_error_overlay());

      $.jqDialog.alert("Operation canceled!\n If you wanted to clear everything type YES in previous dialog.", function() {
        $('html').css('overflow', 'visible');
        $('.error_overlay').remove(); /* callback function for 'OK' button*/
      });;
      $('.jqDialog_header').remove();
      $('#jqDialog_box').prepend("<h1 class='jqDialog_header'>Error:</h1>");
      $('#jqDialog_box').attr('role', 'alertdialog');

    }
  }


  scb.utils.off_on(workarea, 'click', '.save_master_model', function() {
    scb.ui.static.InstructorFrame.save();
    alert("Save");
  });

  scb.utils.off_on(workarea, 'click', '.load_master_model', function() {
    scb.ui.static.InstructorFrame.load();
  });

  scb.utils.off_on(workarea, 'click', '.clear_master_model', function() {
    scb.ui.static.InstructorFrame.clear();
  });


  scb.utils.off_on(workarea.parent(), 'click', '.remove_experiment', function() {
    $('html').css('overflow', 'hidden');

    $('body').prepend(scb_experiment_setup.general_error_overlay());

    $.jqDialog.confirm("Delete experiment?", function() {
      $('html').css('overflow', 'visible');
      $('.error_overlay').remove();
      var model_id = scb.Utils.get_attribute($(this), 'experiment_id');
      assignments.selected.experiments.remove(model_id);
      assignments.selected.experiments.selected_id = null;
      self.show({});
    }, // callback function for 'YES' button
      function() {
        $('html').css('overflow', 'visible');
        $('.error_overlay').remove();
        return;
      } // callback function for 'NO' button
    );
    $('.jqDialog_header').remove();
    $('#jqDialog_box').prepend("<h1 class='jqDialog_header'>Delete experiment?</h1>");
    $('#jqDialog_box').attr('role', 'alertdialog');

  });




  //HANDLER FOR CONTACT BUTTON AND IFRAME
  scb.utils.off_on(workarea.parent(), 'click', '.scb_f_contact', function(evt) {
    $(workarea).append(scb_contact.contact({}));

    $(workarea).prepend(scb_common.contact_overlay());

    scb.utils.off_on(workarea, 'click', '.scb_f_contact_close_button', function() {
      $('.scb_s_contact_dialog').detach();

      $('.contact_overlay').remove();
    });
    $('.scb_s_contact_iframe', workarea).load(function() {
      $('.scb_s_contact_dialog').draggable({
        handle: '.scb_s_feedback_form'
      });
      var iframe = $('.scb_s_contact_iframe').get(0);
      var content = (iframe.contentDocument || iframe.contentWindow);
      content.body.style.fontSize = '90%';
      content.body.style.fontFamily = 'Trebuchet MS, Helvetica, Arial, Verdana, sans-serif';
      var inputs = content.getElementsByTagName('button');
      $(inputs).css('font-family', 'Trebuchet MS, Helvetica, Arial, Verdana, sans-serif');
      var fieldset = content.querySelectorAll('fieldset');
      var texts = content.querySelectorAll('input');
      $(texts).attr('placeholder', '');
      $(texts).css('font-family', 'Trebuchet MS, sans-serif');

      var iframe = $('.scb_s_contact_iframe').contents();
      iframe.find('input[type="checkbox"]').css('height', '12px');

      var fieldset = content.querySelectorAll('fieldset');
      $(fieldset).css('border', '0');
      $('.scb_s_contact_iframe', workarea).contents().find(".scb_f_contact_submit_button").click(function(e) {
        $('.scb_s_contact_iframe', workarea).load(function() {
          var profile = $('.scb_s_contact_iframe', workarea).contents().get(0);
          if (profile.body.textContent.indexOf('you for your feedback.') > 0) {
            parent.document.location.reload();
          }
        });
      });
    });
  });




  //HANDLER FOR USER_GUIDE BUTTON AND IFRAME
  scb.utils.off_on(workarea.parent(), 'click', '.scb_f_user_guide', function(evt) {
    var iframe_history = ['#'];
    var currentPush = false;
    $('body').append(scb_userguide.userguide({}));
    $("#closesearch").hide();
    $(".scb_s_ug_home").addClass('scb_s_ug_home_disabled');
    $('.scb_s_ug_home').attr('disabled', 'disabled');
    scb.utils.off_on('body', 'click', '.scb_f_ug_close_button', function() {
      $('.scb_f_ug_help_search_bar').detach();
    });
    $(function() {
      $(".scb_f_ug_help_search_bar").mousemove(function(e) {
        var myPos = $(this).offset();
        myPos.bottom = $(this).offset().top + $(this).outerHeight();
        myPos.right = $(this).offset().left + $(this).outerWidth();

        if (myPos.bottom > e.pageY && e.pageY > myPos.bottom - 20 && myPos.right > e.pageX && e.pageX > myPos.right - 20) {
          $(this).css({
            cursor: "nwse-resize"
          });
        } else {
          $(this).css({
            cursor: ""
          });
        }
      });
    });

    $('iframe.scb_s_ug_dialog').load(function() {
      $('.scb_f_ug_help_search_bar').width($('iframe.scb_s_ug_dialog').contents().find('.scb_f_help_display').width() + 20);
      $('iframe.scb_s_ug_dialog').width($('iframe.scb_s_ug_dialog').contents().find('.scb_f_help').width() + 20);
      $('iframe.scb_s_ug_dialog').height($('iframe.scb_s_ug_dialog').contents().find('.scb_f_help').height() + 20);
      $('.scb_f_ug_help_search_bar').draggable({
        handle: '.user_guide_title'
      });
      $('iframe.scb_s_ug_dialog').contents().find('body').css('font-family', "Trebuchet MS, Helvetica, Arial, Verdana, sans-serif");
      $('iframe.scb_s_ug_dialog').contents().find("#popout").hide();
      $('iframe.scb_s_ug_dialog').contents().click(function(event) {
        if (event.target.className != 'scb_s_ug_home' && event.target.id != 'search') {
          if (iframe_history.length == 0) {
            iframe_history = ['#'];
          }
          $(".scb_s_ug_home").removeClass('scb_s_ug_home_disabled');
          $('.scb_s_ug_home').removeAttr('disabled');
          if ($('iframe.scb_s_ug_dialog').contents().find("#popout").length > 0) {
            $('iframe.scb_s_ug_dialog').contents().find("#popout").hide();
          }
          var anchor_element = $(event.target).closest('.anchors')
          if (event.target.className == 'intextlink') {
            anchor_element = $(event.target).get(0);
          }
          var anchor_hash = $(anchor_element).attr('href');
          var window_location = window.location.toString() + '/static/ug2/help.html' + anchor_hash;
          hashchange_function(anchor_hash, anchor_element);
          iframe_history.push(anchor_hash);
          currentPush = true;
          //console.log(iframe_history);
          $(".scb_s_ug_back").removeClass('scb_s_ug_back_disabled');
          $('.scb_s_ug_back').removeAttr('disabled');
          event.preventDefault();
        }
      });

      $('#search').click(function() {
        $('iframe.scb_s_ug_dialog').ready(function() {
          $("#closesearch").show();
          $('iframe.scb_s_ug_dialog').contents().find(".help_search_input").val($(".help_search_input").val());
          $('iframe.scb_s_ug_dialog').contents().find("#search").click();
        });
      });

      $('.help_search_input').keypress(function(e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
          e.preventDefault();
          console.log($(".help_search_input").val());
          $('#search').click();
        }
      });


      $(".scb_s_ug_home").click(function() {
        iframe_history.push('#');
        currentPush = true;
        $('iframe.scb_s_ug_dialog').contents().find(".scb_s_ug_home").click();
        $(".scb_s_ug_home").addClass('scb_s_ug_home_disabled');
        $('.scb_s_ug_home').attr('disabled', 'disabled');
        $(".scb_s_ug_back").removeClass('scb_s_ug_back_disabled');
        $('.scb_s_ug_back').removeAttr('disabled');
        $("#closesearch").hide();
        $(".help_search_input").val("");
      });


      $(".scb_s_ug_back").click(function() {
        var back_url = iframe_history.pop();
        if (currentPush) {
          back_url = iframe_history.pop();
        }
        currentPush = false;

        if (back_url) {
          if (back_url == "#") {
            $('iframe.scb_s_ug_dialog').contents().find(".scb_s_ug_home").click();
          } else {
            $('iframe.scb_s_ug_dialog').contents().find('a[href="' + back_url + '"]').click();
          }
        } else {
          $(".scb_s_ug_back").addClass('scb_s_ug_back_disabled');
          $('.scb_s_ug_back').attr('disabled', 'disabled');

          $(".scb_s_ug_home").addClass('scb_s_ug_home_disabled');
          $('.scb_s_ug_home').attr('disabled', 'disabled');
        }
      });

      console.info('clicked main popout', $('.main_popout'));

      $(".main_popout").click(function() {
        var popout_string = "";
        var visible = $('iframe.scb_s_ug_dialog').contents().find('.scb_s_section_inactive:visible');
        if (visible.length == 1) {
          if ($(visible).attr('class') == 'scb_s_section_inactive') {
            popout_string = $('iframe.scb_s_ug_dialog').contents().find('*:visible ').closest('.scb_s_help_sublink').attr('class').split(' ')[1];
          } else {
            popout_string = $(visible).attr('class');
          }
        } else {
          popout_string = $($('iframe.scb_s_ug_dialog').contents().find('span:visible').get(0)).attr('class');
        }

        popout_string = popout_string.replace(/_/g, '-');
        if ($('iframe.scb_s_ug_dialog').contents().find('.scb_s_section_inactive').length == 0) {
          popout_string = "";
        }
        try {
          var popoutWindow = window.open("static/ug2/full_guide.html#" + popout_string);
        } catch ( err ) {
          var popoutWindow = window.open("ug2/full_guide.html#" + popout_string);
        }

      });

      $("#closesearch").click(function() {
        $('.help_search_input').val('');
        $("#closesearch").hide();
        $(".scb_s_ug_home").click();
      });

    });

  });

  //HANDLER FOR LOGIN BUTTON AND IFRAME
  scb.utils.off_on(workarea.parent(), 'click', '.scb_f_login', function(evt) {
    scb.ui.static.InstructorFrame.ensure_auth_context();
    if (assignments.selected && !user_is_auth) {
      $('html').css('overflow', 'hidden');
      $('body').prepend(scb_experiment_setup.general_error_overlay());


      $.jqDialog.confirm("If you sign in to your account, you will lose your current work as a guest. Would you like to continue?", function() {
        $('html').css('overflow', 'visible');
        $('.error_overlay').remove();
        if (user_is_auth) {

          window.location = '/accounts/logout/';
        } else {
          add_login_script(workarea);
        }
        evt.preventDefault();
      }, // callback function for 'YES' button
        function() {
          $('.error_overlay').remove();
          $('html').css('overflow', 'visible');
          return;
        } // callback function for 'NO' button
      );
      $('.jqDialog_header').remove();
      $('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());
      $('#jqDialog_box').attr('role', 'alertdialog');
      evt.preventDefault();
    } else {
      if (user_is_auth) {

        window.location = '/accounts/logout/';
      } else {
        add_login_script(workarea);
      }
      evt.preventDefault();
    }
  });



  self.sections.dashboard = new scb.ui.InstructorDashboardView({
    workarea: workarea,
    context: context
  });
  self.sections.course_setup = new scb.ui.InstructorCourseSetupView({
    workarea: workarea,
    context: context
  });

  self.sections.assignment_setup = new scb.ui.InstructorAssignmentSetupView({
    workarea: workarea,
    context: context
  });

  self.sections.experiment_setup_page1 = new scb.ui.InstructorExperimentSetupPage1View({
    workarea: workarea,
    context: context
  });

  self.sections.experiment_setup_page2 = new scb.ui.InstructorExperimentSetupPage2View({
    workarea: workarea,
    context: context
  });

  self.sections.experiment_setup_page3 = new scb.ui.InstructorExperimentSetupPage3View({
    workarea: workarea,
    context: context
  });
  self.sections.experiment_setup_page4 = new scb.ui.InstructorExperimentSetupPage4View({
    workarea: workarea,
    context: context
  });


  self.sections.select_technique = new scb.ui.InstructorSelectTechniqueView({
    workarea: workarea,
    context: context
  });

  self.sections.western_blot_page1 = new scb.ui.InstructorWesternBlotPage1View({
    workarea: workarea,
    context: context
  });

  self.sections.western_blot_page2 = new scb.ui.InstructorWesternBlotPage2View({
    workarea: workarea,
    context: context
  });
  self.sections.western_blot_page3 = new scb.ui.InstructorWesternBlotPage3View({
    workarea: workarea,
    context: context
  });
  self.sections.western_blot_page4 = new scb.ui.InstructorWesternBlotPage4View({
    workarea: workarea,
    context: context
  });
  self.sections.western_blot_page5 = new scb.ui.InstructorWesternBlotPage5View({
    workarea: workarea,
    context: context
  });

  self.sections.microscopy_page1 = new scb.ui.InstructorMicroscopyPage1View({
    workarea: workarea,
    context: context
  });

  self.sections.microscopy_page2 = new scb.ui.InstructorMicroscopyPage2View({
    workarea: workarea,
    context: context
  });

  self.sections.microscopy_page3 = new scb.ui.InstructorMicroscopyPage3View({
    workarea: workarea,
    context: context
  });

  self.sections.facs_page1 = new scb.ui.InstructorFacsPage1View({
    workarea: workarea,
    context: context
  });
  self.sections.facs_page2 = new scb.ui.InstructorFacsPage2View({
    workarea: workarea,
    context: context
  });


  self.show = function(state) {
    scb.ui.static.InstructorFrame.ensure_auth_context();
    context.auth.logged_in = user_is_auth;
    state = state || {
      view: 'dashboard'
    }
    if (state.onhashchange) {
      window.scrollTo(0, 0);
    }
    scb.ui.static.InstructorFrame.save();
    console.info(JSON.stringify(state));
    var parsed = scb.ui.static.InstructorFrame.validate_state(state);
    if (parsed.redisplay) {
      self.show(parsed.redisplay_state);
      return;
    }

    if (state.view == 'dashboard') {
      if (!parsed.assignment) {
        state.assignment_id = assignments.list[0].id;
        state.onhashchange = false;
        self.show(state);
        return;
      }

      assignments.selected_id = state.assignment_id ? state.assignment_id : null;
      scb.ui.static.InstructorFrame.update_hash(state);
      self.sections.dashboard.show({
        workarea: workarea,
        assignments: assignments
      });
    }
    if (state.view == 'course_setup') {
      if (!parsed.assignment) {
        state.assignment_id = assignments.list[0].id;
        state.onhashchange = false;
        self.show(state);
        return;
      }

      assignments.selected_id = state.assignment_id ? state.assignment_id : null;
      scb.ui.static.InstructorFrame.update_hash(state);
      self.sections.course_setup.show({
        workarea: workarea,
        assignments: assignments
      });
    }

    if (state.view == 'assignment_setup') {
      if (!parsed.assignment) {
        state.assignment_id = assignments.list[0].id;
        state.onhashchange = false;
        self.show(state);
        return;
      }

      assignments.selected_id = state.assignment_id ? state.assignment_id : null;
      scb.ui.static.InstructorFrame.update_hash(state);
      self.sections.assignment_setup.show({
        workarea: workarea,
        assignments: assignments
      });
    }
    if (state.view == 'experiment_setup_page1') {
      if (!parsed.assignment) {
        state.assignment_id = assignments.list[0].id;
        state.onhashchange = false;
        self.show(state);
        return;
      }

      assignments.selected_id = state.assignment_id ? state.assignment_id : null;
      scb.ui.static.InstructorFrame.update_hash(state);
      self.sections.experiment_setup_page1.show({
        workarea: workarea,
        assignments: assignments
      });
    }
    if (state.view == 'experiment_setup_page2') {
      if (!parsed.assignment) {
        state.assignment_id = assignments.list[0].id;
        state.onhashchange = false;
        self.show(state);
        return;
      }

      assignments.selected_id = state.assignment_id ? state.assignment_id : null;
      scb.ui.static.InstructorFrame.update_hash(state);
      self.sections.experiment_setup_page2.show({
        workarea: workarea,
        assignments: assignments
      });
    }
    if (state.view == 'experiment_setup_page3') {
      if (!parsed.assignment) {
        state.assignment_id = assignments.list[0].id;
        state.onhashchange = false;
        self.show(state);
        return;
      }

      assignments.selected_id = state.assignment_id ? state.assignment_id : null;
      scb.ui.static.InstructorFrame.update_hash(state);
      self.sections.experiment_setup_page3.show({
        workarea: workarea,
        assignments: assignments
      });
    }
    if (state.view == 'experiment_setup_page4') {
      if (!parsed.assignment) {
        state.assignment_id = assignments.list[0].id;
        state.onhashchange = false;
        self.show(state);
        return;
      }

      assignments.selected_id = state.assignment_id ? state.assignment_id : null;
      scb.ui.static.InstructorFrame.update_hash(state);
      self.sections.experiment_setup_page4.show({
        workarea: workarea,
        assignments: assignments
      });
    }


    if (state.view == 'select_technique') {
      if (!parsed.assignment) {
        state.assignment_id = assignments.list[0].id;
        state.onhashchange = false;
        self.show(state);
        return;
      }

      assignments.selected_id = state.assignment_id ? state.assignment_id : null;
      scb.ui.static.InstructorFrame.update_hash(state);
      self.sections.select_technique.show({
        workarea: workarea,
        assignments: assignments
      });
    }
    if (state.view == 'western_blot_page1') {
      if (!parsed.assignment) {
        state.assignment_id = assignments.list[0].id;
        state.onhashchange = false;
        self.show(state);
        return;
      }

      assignments.selected_id = state.assignment_id ? state.assignment_id : null;
      scb.ui.static.InstructorFrame.update_hash(state);
      self.sections.western_blot_page1.show({
        workarea: workarea,
        assignments: assignments
      });
    }

    if (state.view == 'western_blot_page2') {
      if (!parsed.assignment) {
        state.assignment_id = assignments.list[0].id;
        state.onhashchange = false;
        self.show(state);
        return;
      }

      assignments.selected_id = state.assignment_id ? state.assignment_id : null;
      scb.ui.static.InstructorFrame.update_hash(state);
      self.sections.western_blot_page2.show({
        workarea: workarea,
        assignments: assignments
      });
    }

    if (state.view == 'western_blot_page3') {
      if (!parsed.assignment) {
        state.assignment_id = assignments.list[0].id;
        state.onhashchange = false;
        self.show(state);
        return;
      }

      assignments.selected_id = state.assignment_id ? state.assignment_id : null;
      scb.ui.static.InstructorFrame.update_hash(state);
      self.sections.western_blot_page3.show({
        workarea: workarea,
        assignments: assignments
      });
    }

    if (state.view == 'western_blot_page4') {
      if (!parsed.assignment) {
        state.assignment_id = assignments.list[0].id;
        state.onhashchange = false;
        self.show(state);
        return;
      }

      assignments.selected_id = state.assignment_id ? state.assignment_id : null;
      scb.ui.static.InstructorFrame.update_hash(state);
      self.sections.western_blot_page4.show({
        workarea: workarea,
        assignments: assignments
      });
    }

    if (state.view == 'western_blot_page5') {
      if (!parsed.assignment) {
        state.assignment_id = assignments.list[0].id;
        state.onhashchange = false;
        self.show(state);
        return;
      }

      assignments.selected_id = state.assignment_id ? state.assignment_id : null;
      scb.ui.static.InstructorFrame.update_hash(state);
      self.sections.western_blot_page5.show({
        workarea: workarea,
        assignments: assignments
      });
    }

    if (state.view == 'facs_page1') {
      if (!parsed.assignment) {
        state.assignment_id = assignments.list[0].id;
        state.onhashchange = false;
        self.show(state);
        return;
      }

      assignments.selected_id = state.assignment_id ? state.assignment_id : null;
      scb.ui.static.InstructorFrame.update_hash(state);
      self.sections.facs_page1.show({
        workarea: workarea,
        assignments: assignments
      });
    }
    if (state.view == 'facs_page2') {
      if (!parsed.assignment) {
        state.assignment_id = assignments.list[0].id;
        state.onhashchange = false;
        self.show(state);
        return;
      }

      assignments.selected_id = state.assignment_id ? state.assignment_id : null;
      scb.ui.static.InstructorFrame.update_hash(state);
      self.sections.facs_page2.show({
        workarea: workarea,
        assignments: assignments
      });
    }
    if (state.view == 'microscopy_page1') {
      if (!parsed.assignment) {
        state.assignment_id = assignments.list[0].id;
        state.onhashchange = false;
        self.show(state);
        return;
      }

      assignments.selected_id = state.assignment_id ? state.assignment_id : null;
      scb.ui.static.InstructorFrame.update_hash(state);
      self.sections.microscopy_page1.show({
        workarea: workarea,
        assignments: assignments
      });
    }
    if (state.view == 'microscopy_page2') {
      if (!parsed.assignment) {
        state.assignment_id = assignments.list[0].id;
        state.onhashchange = false;
        self.show(state);
        return;
      }

      assignments.selected_id = state.assignment_id ? state.assignment_id : null;
      scb.ui.static.InstructorFrame.update_hash(state);
      self.sections.microscopy_page2.show({
        workarea: workarea,
        assignments: assignments
      });
    }
    if (state.view == 'microscopy_page3') {
      if (!parsed.assignment) {
        state.assignment_id = assignments.list[0].id;
        state.onhashchange = false;
        self.show(state);
        return;
      }

      assignments.selected_id = state.assignment_id ? state.assignment_id : null;
      scb.ui.static.InstructorFrame.update_hash(state);
      self.sections.microscopy_page3.show({
        workarea: workarea,
        assignments: assignments
      });
    }

    if (state.view == 'assignment_last') {

      if (parsed.experiment) {
        state.view = parsed.experiment.last_view ? parsed.experiment.last_view : 'experiment_design';
        self.show(state);
      } else {
        $('html').css('overflow', 'hidden');

        $('body').prepend(scb_experiment_setup.general_error_overlay());

        $.jqDialog.alert("Experiment does not exist", function() {
          $('html').css('overflow', 'visible');
          $('.error_overlay').remove(); /* callback function for 'OK' button*/
        });
        $('.jqDialog_header').remove();
        $('#jqDialog_box').prepend("<h1 class='jqDialog_header'>Error</h1>");
        $('#jqDialog_box').attr('role', 'alertdialog');
        if (parsed.assignment) {
          self.show({
            view: 'dashboard',
            assignment: parsed.assignment
          });
        } else {
          self.show({
            view: 'dashboard'
          });
        }
      }
    }
    if (user_is_auth) {
      $('.scb_s_login_status').text('SIGN OUT');
    }
    scb.ui.static.InstructorFrame.in_ajax_display();

  }

  scb.ui.static.InstructorFrame.pending_save_queue = [];
  scb.ui.static.InstructorFrame.pending_save_inajax = false;
  scb.ui.static.InstructorFrame.pending_save = function(parsed) {
    scb.ui.static.InstructorFrame.pending_save_queue.push((new Date()).getTime());
    setTimeout(function() {
      scb.ui.static.InstructorFrame.pending_save_process(parsed);
    }, 5000);
  }

  scb.ui.static.InstructorFrame.pending_save_process = function(parsed) {
    if (scb.ui.static.InstructorFrame.pending_save_inajax) {
      console.info("In ajax - skipping save");
      return;
    }
    if (scb.ui.static.InstructorFrame.pending_save_queue.length > 0) {
      console.info("Ajax save - clear Queue");
      scb.ui.static.InstructorFrame.pending_save_queue = [];
      if (typeof post_state_result === 'undefined') {
        token = user_token;
      } else {
        token = post_state_result.token;
      }
      post_obj = {
        'token': token,
        'model': parsed.context.master_model
      }
      console.log(post_obj);
      scb.ui.static.InstructorFrame.pending_save_inajax = true;
      console.info("Ajax save - start request ");
      $.ajax({
        type: "POST",
        url: 'scb/edit_assignment.js',
        data: JSON.stringify(post_obj),
        success: function(data) {
          console.info("Ajax save - request success ");
          scb.ui.static.InstructorFrame.pending_save_inajax = false;
          console.log(data);
          setTimeout(function() {
            scb.ui.static.InstructorFrame.pending_save_process(parsed);
          }, 5000);
        },
        error: function(data) {
          console.info("Ajax save - request failed, retry... ");
          scb.ui.static.InstructorFrame.pending_save_inajax = false;
          scb.ui.static.InstructorFrame.pending_save(parsed);
        }
      });
    }
  }


  scb.ui.static.InstructorFrame.pending_save_orig = function(parsed) {
    if (!pending_save) {
      setTimeout(function() {
        pending_save = false;
        console.log('believe');
        var token = 0;
        if (typeof post_state_result === 'undefined') {
          token = user_token;
        } else {
          token = post_state_result.token;
        }
        post_obj = {
          'token': token,
          'model': parsed.context.master_model
        }
        console.log(post_obj);
        $.ajax({
          type: "POST",
          url: 'scb/post_state.js',
          data: JSON.stringify(post_obj),
          success: function(data) {
            console.log(data);
          }
        });
      }, 5000);
      pending_save = true;
    }
  }
  scb.ui.static.InstructorFrame.refresh = function(navigation_state) {
    var state = navigation_state || $.deparam(location.hash.replace(/^#/, ''), true);
    state.onhashchange = false;
    state.view = state.view || 'dashboard';
    self.show(state);
  }

  $(window).bind('hashchange', function(e) {
    var state = $.deparam(location.hash.replace(/^#/, ''), true);
    state.onhashchange = true;
    state.view = state.view || 'dashboard';
    self.show(state);
  });

  (function() {
    var state = $.deparam(location.hash.replace(/^#/, ''), true);
    //         if(state.assignment_id)
    //         	delete state.assignment_id;
    state.onhashchange = false;
    state.view = state.view || 'dashboard';
    self.show(state);
  })();


};

function add_login_script(workarea) {

  $(workarea).append(scb_auth.login({}));
  scb.utils.off_on(workarea, 'click', '.scb_f_login_close_button', function() {
    $('.scb_s_login_dialog').detach();
  });
  $('.scb_f_login_iframe').load(function() {
    var iframe = $('.scb_f_login_iframe').get(0);
    var content = (iframe.contentDocument || iframe.contentWindow);
    content.body.style.fontSize = '90%';
    content.body.style.fontFamily = 'Trebuchet MS, Helvetica, Arial, Verdana, sans-serif';
    var inputs = content.getElementsByTagName('button');
    $(inputs).css('font-family', 'Trebuchet MS, Helvetica, Arial, Verdana, sans-serif');
    var fieldset = content.querySelectorAll('fieldset');
    $(fieldset).children().wrap('<p></p>');
    var texts = content.querySelectorAll('input');
    $(texts).attr('placeholder', '');
    $(texts).css('font-family', 'Trebuchet MS, sans-serif');

    var iframe = $('.scb_f_login_iframe').contents();
    iframe.find('input[type="checkbox"]').css('height', '12px');
    iframe.find('input[type="radio"][value="student"]').attr('checked', 'checked');

    iframe.find('a:contains("Member")').click(function() {
      $('.scb_f_login_iframe').load(function() {
        var iframe = $('.scb_f_login_iframe').contents();
        $('.scb_s_login_form > div').text('Sign Up');
        $('.scb_s_login_dialog').addClass('scb_s_signup_dialog');
        $('.scb_f_login_iframe').css('height', '560px');
      });
    });
    iframe.find('a:contains("Password")').click(function() {
      $('.scb_f_login_iframe').load(function() {

        $('.scb_s_login_form > div').text('Reset Password');
      });
    });

    iframe.find('a:contains("Back")').click(function() {
      $('.scb_f_login_iframe').load(function() {

        $('.scb_s_login_form > div').text('Sign In');
      });
    });

    iframe.find(".auth_submit_button").click(function() {
      var mask = document.createElement('div');
      mask.className = 'overlay';
      $(mask).css({
        'width': '100%',
        'height': '100%',
        'position': 'fixed',
        'z-index': '993',
        'background': 'rgba(125,125,125,0.7)',
        'visibility': 'visible'
      });
      $('body').prepend(mask);
      var progress_icon = document.createElement('img');
      progress_icon.src = '../../../images/homepage/ajax_loader.gif';
      progress_icon.style.marginLeft = '50%';
      progress_icon.style.marginTop = '50%';

      $('.overlay').append(progress_icon);

      $('.scb_f_login_iframe').hide();
      $('.scb_f_login_iframe').load(function() {
        var profile = $('.scb_f_login_iframe').contents().get(0);
        if (profile.body.textContent.indexOf('confirmed') > 0) {
          parent.document.location.reload();

        } else {
          $(mask).remove();
          $('.scb_f_login_iframe').show();
          if ($('.scb_f_login_iframe').contents().find('.login_submit').length > 0) {
            $('.scb_f_login_iframe').contents().find('#errorMsg').html('Incorrect username or password. Try again');
          }

        }
      });
    });
  });
}
;
