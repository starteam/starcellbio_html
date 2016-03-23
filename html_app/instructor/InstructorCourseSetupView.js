'use strict';

if (typeof (scb.ui) == 'undefined') {
  scb.ui = {};
}


scb.ui.static = scb.ui.static || {};
scb.ui.static.InstructorCourseSetupView = scb.ui.static.InstructorCourseSetupView || {};


scb.ui.static.InstructorCourseSetupView.ARROW_OFFSET = 15;
scb.ui.static.InstructorCourseSetupView.ARROW_DIVISION = 2;
scb.ui.static.InstructorCourseSetupView.HEADER_WIDTH = 579;
scb.ui.static.InstructorCourseSetupView.HEADER_OFFSET = 34;



scb.ui.static.InstructorCourseSetupView.parse = function(element) {
  var assignment_id = $(element).attr('assignment_id');


  var state = {
    assignment_id: assignment_id,
    view: 'assignments',
    skip_hash_update: true
  };
  var parsed = scb.ui.static.InstructorFrame.validate_state(state);

  return parsed;
}





scb.ui.static.InstructorCourseSetupView.scb_f_course_setup_course_name_value = function(element, workarea) {
  var parsed = scb.ui.static.InstructorCourseSetupView.parse(element);
  // 	parsed.assignment.course_name = $(element).val();

  var state = {
    assignment_id: parsed.assignment.id,
    view: 'course_setup',
    skip_hash_update: true
  };
  var parsed = scb.ui.static.InstructorFrame.validate_state(state);
  if (parsed.redisplay) {
    alert("INVALID ELEMENT!");
  }
  if (parsed.assignment) {
    parsed.assignment.course_name = $(element).val();
  }

  // 	scb.ui.static.InstructorFrame.refresh();


}

scb.ui.static.InstructorCourseSetupView.scb_f_course_setup_course_code_value = function(element, workarea) {
  var parsed = scb.ui.static.InstructorCourseSetupView.parse(element);
  parsed.assignment.course = $(element).val();
  var state = {
    assignment_id: parsed.assignment.id,
    view: 'course_setup',
    skip_hash_update: true
  };
  var parsed = scb.ui.static.InstructorFrame.validate_state(state);
  if (parsed.redisplay) {
    alert("INVALID ELEMENT!");
  }
  if (parsed.assignment) {
    parsed.assignment.course = $(element).val();
  }

  // 	scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorCourseSetupView.scb_f_course_setup_save_course_button = function(element, workarea) {
  var parsed = scb.ui.static.InstructorCourseSetupView.parse(element);
  scb.ui.static.InstructorFrame.pending_save(parsed);
  if (parsed.assignment.course && parsed.assignment.course_name != '') {
    parsed.assignment.course_prepared = true;
  } else {
    parsed.assignment.course_prepared = false;
  }
  if (parsed.assignment.course_prepared) {
    $.ajax({
      type: "POST",
      url: '../scb/create_course.js',
      data: JSON.stringify({
        course_code: parsed.assignment.course,
        course_name: parsed.assignment.course_name
      })
    }).done(function(e) {
      if (e == 'created') {
        var state = {
          assignment_id: parsed.assignment.id,
          view: 'assignment_setup',
          skip_hash_update: true
        };
        scb.ui.static.InstructorFrame.refresh(state);
      } else {
        if (parsed.assignment.is_new_course) {
          $('html').css('overflow', 'hidden');
          $('body').prepend(scb_experiment_setup.general_error_overlay());

          $.jqDialog.alert('This course has already been created. Select an already created course.', function() {
            $('html').css('overflow', 'visible');
            $('.error_overlay').remove() /* callback function for 'OK' button*/
          });
          $('.jqDialog_header').remove();
          $('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());
          $('#jqDialog_box').attr('role', 'alertdialog');
        } else {
          var state = {
            assignment_id: parsed.assignment.id,
            view: 'assignment_setup',
            skip_hash_update: true
          };
          scb.ui.static.InstructorFrame.refresh(state);
        }
      }
    });
  }



}

scb.ui.static.InstructorCourseSetupView.scb_f_course_setup_choose_existing_course = function(element, workarea) {
  var parsed = scb.ui.static.InstructorCourseSetupView.parse(element);
  parsed.assignment.is_new_course = false;
  scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorCourseSetupView.scb_f_course_setup_create_new_course = function(element, workarea) {
  var parsed = scb.ui.static.InstructorCourseSetupView.parse(element);
  parsed.assignment.is_new_course = true;
  scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorCourseSetupView.scb_f_course_setup_course_select = function(element, workarea) {
  var parsed = scb.ui.static.InstructorCourseSetupView.parse(element);
  parsed.assignment.is_new_course = false;

  var template_id = $(element).val();
  var assignment_template = parsed.assignment.parent.get(template_id);

  parsed.assignment.course_name = assignment_template.course_name;

  parsed.assignment.course = assignment_template.course;


  scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorCourseSetupView.register = function(workarea) {
  scb.utils.off_on(workarea, 'change', '.scb_f_course_setup_course_name_value', function(e) {
    scb.ui.static.InstructorCourseSetupView.scb_f_course_setup_course_name_value(this, e);
  });
  scb.utils.off_on(workarea, 'change', '.scb_f_course_setup_course_code_value', function(e) {
    scb.ui.static.InstructorCourseSetupView.scb_f_course_setup_course_code_value(this, e);
  });
  scb.utils.off_on(workarea, 'click', '.scb_f_course_setup_save_course_button', function(e) {
    scb.ui.static.InstructorCourseSetupView.scb_f_course_setup_save_course_button(this, e);
  });
  scb.utils.off_on(workarea, 'click', '.scb_f_course_setup_create_new_course', function(e) {
    scb.ui.static.InstructorCourseSetupView.scb_f_course_setup_create_new_course(this, e);
  });
  scb.utils.off_on(workarea, 'click', '.scb_f_course_setup_choose_existing_course', function(e) {
    scb.ui.static.InstructorCourseSetupView.scb_f_course_setup_choose_existing_course(this, e);
  });
  scb.utils.off_on(workarea, 'change', '.scb_s_course_setup_course_list  select', function(e) {
    scb.ui.static.InstructorAssignmentSetupView.scb_f_course_setup_course_select(this, e);
  });

};

scb.ui.InstructorCourseSetupView = function scb_ui_InstructorCourseSetupView(gstate) {
  var self = this;
  var assignments = new scb.AssignmentList(gstate.context.master_model.assignments, gstate.context);
  var courses = _.groupBy(assignments.list, function(assignment) {
    return (assignment.course);
  });
  self.show = function(state) {
    window.assignments = assignments;
    var workarea = gstate.workarea;
    var last_step = 1;
    var prev_step;

    //         var kind = 'select_course';

    if (assignments.selected.course_prepared) {
      //         	kind = 'create_assignment';
    }


    if (assignments.selected.experiments.selected != null) {
      prev_step = assignments.selected.experiments.selected.prev_step;
    } else {
      prev_step = null;
    }


    workarea.html(scb_instructor_course_setup.main({
      global_template: gstate.context.master_model,
      assignments: assignments,
      last_step: last_step,
      prev_step: prev_step,
      assignment: assignments.selected,
      context: gstate.context,
      courses: courses,
    }));

    document.title = "Assignments - StarCellBio"
    $('.scb_s_ref_info_link').click(function() {
      $('.scb_assignments_header_link_wrapper[value="Reference Material"]').click();
    });


    $('#main').css({
      position: 'absolute',
      left: ($(window).width() - $('#main').outerWidth()) / 2,
      top: 0
    });
    $(window).resize(function() {

      $('#main').css({
        position: 'absolute',
        left: ($(window).width() - $('#main').outerWidth()) / 2,
        top: ($(window).height() - $('#main').outerHeight()) / 2
      });

    });

  }

}