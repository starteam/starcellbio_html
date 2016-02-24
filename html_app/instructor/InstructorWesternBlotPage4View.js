'use strict';

if (typeof (scb.ui) == 'undefined') {
  scb.ui = {};
}


scb.ui.static = scb.ui.static || {};
scb.ui.static.InstructorWesternBlotPage4View = scb.ui.static.InstructorWesternBlotPage4View || {};



scb.ui.static.InstructorWesternBlotPage4View.parse = function(element) {
  var assignment_id = $(element).attr('assignment_id');


  var state = {
    assignment_id: assignment_id,
    view: 'assignments',
    skip_hash_update: true
  };
  var parsed = scb.ui.static.InstructorFrame.validate_state(state);

  return parsed;
}



scb.ui.static.InstructorWesternBlotPage4View.rows = function(dialog) {
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


scb.ui.static.InstructorWesternBlotPage4View.scb_f_western_blot_page4_save_assignment_button = function(element, workarea) {

  var parsed = scb.ui.static.InstructorWesternBlotPage4View.parse(element);

  scb.ui.static.InstructorFrame.pending_save(parsed);


  var state = {
    assignment_id: parsed.assignment.id,
    view: 'western_blot_page5',
    skip_hash_update: true
  };

  scb.ui.static.InstructorFrame.refresh(state);
}




scb.ui.static.InstructorWesternBlotPage4View.register = function(workarea) {
  scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_page4_save_assignment_button', function(e) {
    scb.ui.static.InstructorWesternBlotPage4View.scb_f_western_blot_page4_save_assignment_button(this, e);
  });







};



scb.ui.static.InstructorWesternBlotPage4View.rows = function(dialog) {
  var rows = [];
  var headings = dialog.headings;
  _.each(dialog.order, function(strain) {
    _.each(dialog[strain].rows, function(row) {
      var insert_row = {
        treatment_id: row.treatment_id,
        row: ''
      };

      var cells = _.filter(row.cells, function(cell) {
        return cell.kind == 'text';
      });
      cells = _.map(cells, function(cell) {
        return cell.text.replace(/\s+/g, '');
      });
      insert_row.row = cells.join();

      rows.push(insert_row);
    });
  });

  return rows;
}


scb.ui.static.InstructorWesternBlotPage4View.scb_f_western_blot_page4_exposure_slider = function(e, ui) {
  var element = this;
  if ($(this).hasClass('scb_f_western_blot_page4_exposure_slider')) {
    var parsed = scb.ui.static.InstructorWesternBlotPage4View.parse(element);
    var antibody_id = $(element).attr('antibody_id');
    var treatment_id = $(element).attr('treatment_id');
    var drug_id = '';
    var cell_line_id = '';
    _.each(parsed.assignment.template.ui.add_multiple_dialog, function(cell_line, value, list) {
      if (value != 'order') {
        _.each(cell_line.rows, function(row) {
          if (row.treatment_id == treatment_id) {
            cell_line_id = row.cell_treatments.X[0].cell_line
            drug_id = row.cell_treatments.X[0].treatment_list.list[0].drug_list.list[0].drug_id;
          }
        });
      }
    });



    _.each(parsed.assignment.template.model.western_blot, function(parser) {
      var parser_exists = false;
      _.each(parser.parser_fixed, function(cell_parser) {
        if (cell_parser.cell_line == cell_line_id && cell_parser.drug == drug_id) {
          parser_exists = true;
          var marker_exists = false;
          _.each(cell_parser.above_marks, function(mark) {
            if (mark.primary_anti_body[0] == antibody_id) {
              marker_exists = true;
              mark.intensity = ui.value;
            }
          });
          if (!marker_exists) {
            cell_parser.above_marks.push({
              name: parsed.assignment.template.primary_anti_body[antibody_id].name,
              weight: $(element).attr('weight'),
              intensity: ui.value,
              primary_anti_body: [antibody_id]
            });
          }

        }

      });
      if (!parser_exists) {
        parser.parser_fixed.push({
          transfer_function: 'delta',
          cutoff: 1,
          drug: drug_id,
          cell_line: cell_line_id,
          above_marks: [{
            name: parsed.assignment.template.primary_anti_body[antibody_id].name,
            weight: $(this).attr('weight'),
            intensity: ui.value,
            primary_anti_body: [antibody_id]
          }]
        });
      }
    });

  }


}

scb.ui.static.InstructorWesternBlotPage4View.scb_f_western_blot_page4_adjust_sliders = function(assignment) {
  console.log(assignment);
  var strain_combos = [];

  _.each(assignment.template.ui.add_multiple_dialog, function(cell_line, value, list) {
    if (value != 'order') {
      _.each(cell_line.rows, function(row) {
        strain_combos.push({
          treatment_id: row.treatment_id,
          cell_line: row.cell_treatments.X[0].cell_line,
          drug: row.cell_treatments.X[0].treatment_list.list[0].drug_list.list[0].drug_id
        });
        console.log(row.treatment_id);
      });
    }
  });
  _.each($('.scb_f_western_blot_page4_exposure_slider'), function(slider) {
    var treatment_id = $(slider).attr('treatment_id');
    var antibody_id = $(slider).attr('antibody_id');
    _.each(strain_combos, function(combo) {
      if (treatment_id == combo.treatment_id) {
        _.each(assignment.template.model.western_blot, function(parser) {
          _.each(parser.parser_fixed, function(cell_parser) {
            if (cell_parser.cell_line == combo.cell_line && cell_parser.drug == combo.drug) {
              _.each(cell_parser.above_marks, function(mark) {
                if (mark.primary_anti_body[0] == antibody_id) {
                  $(slider).slider('value', mark.intensity);
                }
              });
            }

          });
        });
      /////
      }
    });
  });
}

scb.ui.InstructorWesternBlotPage4View = function scb_ui_InstructorWesternBlotPage4View(gstate) {
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

    var rows = scb.ui.static.InstructorWesternBlotPage4View.rows(assignments.selected.template.ui.add_multiple_dialog);

    workarea.html(scb_instructor_western_blot_page4.main({
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
    $('.scb_f_western_blot_page4_exposure_slider').slider({
      range: "min",
      value: 15,
      min: 0,
      max: 30,
      step: 3,
      stop: scb.ui.static.InstructorWesternBlotPage4View.scb_f_western_blot_page4_exposure_slider
    });

    scb.ui.static.InstructorWesternBlotPage4View.scb_f_western_blot_page4_adjust_sliders(assignments.selected);

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