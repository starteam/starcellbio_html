'use strict';

if (typeof (scb.ui) == 'undefined') {
  scb.ui = {};
}


scb.ui.static = scb.ui.static || {};
scb.ui.static.InstructorWesternBlotPage5View = scb.ui.static.InstructorWesternBlotPage5View || {};



scb.ui.static.InstructorWesternBlotPage5View.parse = function(element) {
  var assignment_id = $(element).attr('assignment_id');


  var state = {
    assignment_id: assignment_id,
    view: 'assignments',
    skip_hash_update: true
  };
  var parsed = scb.ui.static.InstructorFrame.validate_state(state);

  return parsed;
}



scb.ui.static.InstructorWesternBlotPage5View.scb_f_western_blot_page5_save_assignment_button = function(element, workarea) {

  var parsed = scb.ui.static.InstructorWesternBlotPage4View.parse(element);

  scb.ui.static.InstructorFrame.pending_save(parsed);

  var view = '';
  if (_.contains(parsed.assignment.template.ui.experimental_design.techniques, 'facs')) {
    view = 'facs_page1';
  } else if (_.contains(parsed.assignment.template.ui.experimental_design.techniques, 'micro')) {
    view = 'microscopy_page1';
  } else {
    view = 'dashboard';
  }


  var state = {
    assignment_id: parsed.assignment.id,
    view: view,
    skip_hash_update: true
  };

  scb.ui.static.InstructorFrame.refresh(state);
}



scb.ui.static.InstructorWesternBlotPage5View.scb_f_western_blot_page5_radio_no = function(element, workarea) {

  var parsed = scb.ui.static.InstructorWesternBlotPage5View.parse(element);

  parsed.assignment.has_background_bands = false;

  scb.ui.static.InstructorFrame.refresh();
}

scb.ui.static.InstructorWesternBlotPage5View.scb_f_western_blot_page5_radio_yes = function(element, workarea) {

  var parsed = scb.ui.static.InstructorWesternBlotPage5View.parse(element);

  parsed.assignment.has_background_bands = true;

  scb.ui.static.InstructorFrame.refresh();
}


scb.ui.static.InstructorWesternBlotPage5View.scb_f_western_blot_page5_antibody_checkbox = function(element, workarea) {
  var parsed = scb.ui.static.InstructorWesternBlotPage5View.parse(element);
  var antibody_id = $(element).attr('anti_body_id');

  if ($(element).attr('checked')) {
    parsed.assignment.background_band_list[antibody_id] = 1;

  // 		parsed.assignment.background_band_list = _.uniq(parsed.assignment.background_band_list);
  } else {
    delete parsed.assignment.background_band_list[antibody_id];
  }
  scb.ui.static.InstructorFrame.refresh();
}


scb.ui.static.InstructorWesternBlotPage5View.scb_f_western_blot_page5_antibody_weight_edit = function(element, workarea) {
  var parsed = scb.ui.static.InstructorWesternBlotPage5View.parse(element);
  var antibody_id = $(element).attr('anti_body_id');
  var marks = parsed.assignment.template.primary_anti_body[antibody_id].marks;
  var mark_id = $(element).attr('mark_id') ? $(element).attr('mark_id') : Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

  var markExists = false;
  _.each(marks, function(mark) {
    if (mark_id == mark.id) {
      mark.weight = $(element).val();
      markExists = true;
    }
  });

  if (!markExists) {
    marks.push({
      id: mark_id,
      weight: $(element).val(),
      intensity: 0
    });
  }

  scb.ui.static.InstructorFrame.refresh();

}


scb.ui.static.InstructorWesternBlotPage5View.scb_f_western_blot_page5_antibody_intensity_edit = function(element, workarea) {
  var parsed = scb.ui.static.InstructorWesternBlotPage5View.parse(element);
  var antibody_id = $(element).attr('anti_body_id');
  var marks = parsed.assignment.template.primary_anti_body[antibody_id].marks;
  var mark_id = $(element).attr('mark_id') ? $(element).attr('mark_id') : Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

  var markExists = false;
  _.each(marks, function(mark) {
    if (mark_id == mark.id) {
      mark.intensity = $(element).val();
      markExists = true;
    }
  });

  if (!markExists) {
    marks.push({
      id: mark_id,
      weight: 0,
      intensity: $(element).val()
    });
  }

  scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorWesternBlotPage5View.scb_f_western_blot_page5_add_background_band = function(element, workarea) {
  var parsed = scb.ui.static.InstructorWesternBlotPage5View.parse(element);
  var antibody_id = $(element).attr('anti_body_id');
  var mark_id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

  var marks = parsed.assignment.template.primary_anti_body[antibody_id].marks;

  marks.push({
    id: mark_id,
    weight: 0,
    intensity: 0
  });
  scb.ui.static.InstructorFrame.refresh();


}





scb.ui.static.InstructorWesternBlotPage5View.register = function(workarea) {
  scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_page5_save_assignment_button', function(e) {
    scb.ui.static.InstructorWesternBlotPage5View.scb_f_western_blot_page5_save_assignment_button(this, e);
  });


  scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_page5_radio_no', function(e) {
    scb.ui.static.InstructorWesternBlotPage5View.scb_f_western_blot_page5_radio_no(this, e);
  });

  scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_page5_radio_yes', function(e) {
    scb.ui.static.InstructorWesternBlotPage5View.scb_f_western_blot_page5_radio_yes(this, e);
  });

  scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_page5_antibody_checkbox', function(e) {
    scb.ui.static.InstructorWesternBlotPage5View.scb_f_western_blot_page5_antibody_checkbox(this, e);
  });

  scb.utils.off_on(workarea, 'change', '.scb_f_western_blot_page5_antibody_intensity_edit', function(e) {
    scb.ui.static.InstructorWesternBlotPage5View.scb_f_western_blot_page5_antibody_intensity_edit(this, e);
  });

  scb.utils.off_on(workarea, 'change', '.scb_f_western_blot_page5_antibody_weight_edit', function(e) {
    scb.ui.static.InstructorWesternBlotPage5View.scb_f_western_blot_page5_antibody_weight_edit(this, e);
  });

  scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_page5_add_background_band', function(e) {
    scb.ui.static.InstructorWesternBlotPage5View.scb_f_western_blot_page5_add_background_band(this, e);
  });




};



scb.ui.static.InstructorWesternBlotPage5View.rows = function(dialog) {
  var rows = [];
  var headings = dialog.headings;
  _.each(dialog.order, function(strain) {
    _.each(dialog[strain].rows, function(row) {
      var insert_row = {
        treatment_id: row.treatment_id,
        row: []
      };
      _.each(row.cells, function(cell) {
        if (cell.kind == 'text') {
          insert_row.row.push(cell.text);
        } else {
          insert_row.row.push('cell_plate');
        }

      });
      rows.push(insert_row);
    });
  });

  return rows;
}

scb.ui.InstructorWesternBlotPage5View = function scb_ui_InstructorWesternBlotPage5View(gstate) {
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

    var kind = 'select_course';

    if (assignments.selected.course_prepared) {
      kind = 'create_assignment';
    }





    if (assignments.selected.experiments.selected != null) {
      prev_step = assignments.selected.experiments.selected.prev_step;
    } else {
      prev_step = null;
    }

    var rows = scb.ui.static.InstructorWesternBlotPage5View.rows(assignments.selected.template.ui.add_multiple_dialog);

    workarea.html(scb_instructor_western_blot_page5.main({
      global_template: gstate.context.master_model,
      assignments: assignments,
      last_step: last_step,
      prev_step: prev_step,
      kind: kind,
      headings: assignments.selected.template.ui.add_multiple_dialog.headings,
      rows: rows,
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