// This file was automatically generated from notebook.soy.
// Please don't edit this file by hand.

if (typeof scb_notebook == 'undefined') { var scb_notebook = {}; }


scb_notebook.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_notebook_view\' >');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 10, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  scb_notebook.display_details(opt_data, output);
  scb_homepage.display_footer({global_template: opt_data.t, assignment: opt_data.assignment}, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_notebook.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_notebook_container\' role=\'main\'><div class=\'scb_notebook_details_view\'><div class=\'scb_s_notebook_all_tabs\'><div class=\'scb_notebook_details_view_inner\'>');
  scb_notebook.display_sections(opt_data, output);
  output.append('<button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\' class=\'scb_f_notebook_add_section_button scb_s_notebook_add_section_button scb_s_notebook_image_insert_button\'>Add Section +</button></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_notebook.display_sections = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\'  section_id=\'', soy.$$escapeHtml(opt_data.section.id), '\'>');
  var sectionList49 = opt_data.notebook.sections.list;
  var sectionListLen49 = sectionList49.length;
  for (var sectionIndex49 = 0; sectionIndex49 < sectionListLen49; sectionIndex49++) {
    var sectionData49 = sectionList49[sectionIndex49];
    output.append('<div class="scb_s_notebook_section" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\'  section_id=\'', soy.$$escapeHtml(sectionData49.id), '\'><input type=\'text\' class=\'scb_s_notebook_section_name_edit\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' value=\'', soy.$$escapeHtml(opt_data.experiment.name), '\'  title=\'', soy.$$escapeHtml(opt_data.experiment.name), '\' aria-label=\'Section Name\' role=\'textbox\'><br/><br/>');
    var elementList67 = sectionData49.elements;
    var elementListLen67 = elementList67.length;
    for (var elementIndex67 = 0; elementIndex67 < elementListLen67; elementIndex67++) {
      var elementData67 = elementList67[elementIndex67];
      output.append((elementData67.type == 'text') ? '<div class=\'scb_s_notebook_text_section\'>' + elementData67.data + '</div>' : '');
    }
    if (sectionData49.id == opt_data.notebook.sections.selected_id) {
      output.append('<div class=\'scb_s_notebook_section_button_wrapper\'><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\'  section_id=\'', soy.$$escapeHtml(sectionData49.id), '\' class=\'scb_f_notebook_text_button scb_s_notebook_text_button scb_s_navigation_button\'>Text</button><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\'  section_id=\'', soy.$$escapeHtml(sectionData49.id), '\' class=\'scb_f_notebook_image_button scb_s_notebook_image_button scb_s_navigation_button\'>Image</button></div>');
      if (opt_data.notebook.edit_text) {
        scb_notebook.text_edit({assignment: opt_data.assignment, experiment: opt_data.experiment, notebook: opt_data.notebook, section: sectionData49}, output);
      }
      if (opt_data.notebook.edit_image) {
        scb_notebook.image_edit({assignment: opt_data.assignment, experiment: opt_data.experiment, notebook: opt_data.notebook, section: sectionData49}, output);
      }
    }
    output.append('</div>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_notebook.text_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\' class=\'scb_s_notebook_element_edit_wrapper\'><textarea class=\'scb_s_notebook_text_edit\'></textarea><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\' section_id=\'', soy.$$escapeHtml(opt_data.section.id), '\' class=\'scb_f_notebook_save_text_button scb_s_notebook_save_text_button scb_s_navigation_button\'>SAVE</button></div>');
  return opt_sb ? '' : output.toString();
};


scb_notebook.image_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div  assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\' section_id=\'', soy.$$escapeHtml(opt_data.section.id), '\' class=\'scb_s_notebook_element_edit_wrapper\'>');
  var eList137 = opt_data.assignment.experiments.list;
  var eListLen137 = eList137.length;
  for (var eIndex137 = 0; eIndex137 < eListLen137; eIndex137++) {
    var eData137 = eList137[eIndex137];
    output.append(soy.$$escapeHtml(eData137.name), '<br/>Experiment Design <br/>', (eData137.cell_treatment_list.list.length > 0) ? 'Experiment Setup<br/>' : '');
    var wbList143 = eData137.western_blot_list.list;
    var wbListLen143 = wbList143.length;
    for (var wbIndex143 = 0; wbIndex143 < wbListLen143; wbIndex143++) {
      var wbData143 = wbList143[wbIndex143];
      if (wbData143.is_transfered) {
        output.append(soy.$$escapeHtml(wbData143.name), '<br/>');
        var gelList148 = wbData143.gel_list.list;
        var gelListLen148 = gelList148.length;
        for (var gelIndex148 = 0; gelIndex148 < gelListLen148; gelIndex148++) {
          var gelData148 = gelList148[gelIndex148];
          output.append((gelData148.is_developed) ? soy.$$escapeHtml(gelData148.name) + '<br/>' : '');
        }
      }
    }
    var fList155 = eData137.facs_list.list;
    var fListLen155 = fList155.length;
    for (var fIndex155 = 0; fIndex155 < fListLen155; fIndex155++) {
      var fData155 = fList155[fIndex155];
      if (fData155.samples_finished) {
        output.append(soy.$$escapeHtml(fData155.name), '<br/>');
        var sampleList160 = fData155.lanes_list.list;
        var sampleListLen160 = sampleList160.length;
        for (var sampleIndex160 = 0; sampleIndex160 < sampleListLen160; sampleIndex160++) {
          var sampleData160 = sampleList160[sampleIndex160];
          output.append((sampleData160.canvas_metadata) ? soy.$$escapeHtml(sampleData160.id) + '<br/>' : '');
        }
      }
    }
    var mList167 = eData137.microscopy_list.list;
    var mListLen167 = mList167.length;
    for (var mIndex167 = 0; mIndex167 < mListLen167; mIndex167++) {
      var mData167 = mList167[mIndex167];
      if (mData167.samples_finished) {
        output.append(soy.$$escapeHtml(mData167.name), '<br/>');
        var sampleList172 = mData167.lanes_list.list;
        var sampleListLen172 = sampleList172.length;
        for (var sampleIndex172 = 0; sampleIndex172 < sampleListLen172; sampleIndex172++) {
          var sampleData172 = sampleList172[sampleIndex172];
          output.append((sampleData172.lens_map.src) ? soy.$$escapeHtml(sampleData172.id) + '<br/>' : '');
        }
      }
    }
  }
  output.append('<div class=\'scb_s_notebook_image_dialog_button_wrapper\'><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\' section_id=\'', soy.$$escapeHtml(opt_data.section.id), '\' class=\'scb_f_notebook_image_insert_open_button scb_s_notebook_image_insert_open_button scb_s_notebook_image_insert_button\'>Insert and Open</button><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\' section_id=\'', soy.$$escapeHtml(opt_data.section.id), '\' class=\'scb_f_notebook_image_insert_close_button scb_s_notebook_image_insert_close_button scb_s_notebook_image_insert_button\'>Insert and Close</button><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\'  section_id=\'', soy.$$escapeHtml(opt_data.section.id), '\' class=\'scb_f_notebook_image_close_button scb_s_notebook_image_close_button scb_s_notebook_image_insert_button\'>Close</button></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_notebook.experiment_design = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\' section_id=\'', soy.$$escapeHtml(opt_data.section.id), '\' class=\'scb_f_notebook_image_insert_close_button scb_s_notebook_image_insert_close_button scb_s_notebook_image_insert_button\'>Insert and Close</button>');
  return opt_sb ? '' : output.toString();
};
