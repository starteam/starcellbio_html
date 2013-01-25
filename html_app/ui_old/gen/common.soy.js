// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof scb_util == 'undefined') { var scb_util = {}; }


scb_util.icon_with_text = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'icon_with_text\'><img class=\'', soy.$$escapeHtml(opt_data.cls), '\' src=\'', soy.$$escapeHtml(opt_data.src), '\' alt=\'', soy.$$escapeHtml(opt_data.text), '\' width=\'24px\'/><br>', soy.$$escapeHtml(opt_data.text), '</div>');
  return opt_sb ? '' : output.toString();
};


scb_util.small_icon_without_text = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'icon_with_text\'><img class=\'', soy.$$escapeHtml(opt_data.cls), '\' src=\'', soy.$$escapeHtml(opt_data.src), '\' alt=\'', soy.$$escapeHtml(opt_data.text), '\' width=\'16px\'/></div>');
  return opt_sb ? '' : output.toString();
};


scb_util.select_from_dict = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<select class=\'', soy.$$escapeHtml(opt_data.associated_class), '\' model2_id=\'', soy.$$escapeHtml(opt_data.model2_id), '\'>');
  var kList26 = soy.$$getMapKeys(opt_data.map);
  var kListLen26 = kList26.length;
  for (var kIndex26 = 0; kIndex26 < kListLen26; kIndex26++) {
    var kData26 = kList26[kIndex26];
    output.append('<option model_id=\'', soy.$$escapeHtml(kData26), '\' ', (kData26 == opt_data.model_id) ? 'selected=\'selected\'' : '', ' >', soy.$$escapeHtml(opt_data.map[kData26][opt_data.map_name]), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_util.select_from_obj = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<select class=\'', soy.$$escapeHtml(opt_data.associated_class), '\' model2_id=\'', soy.$$escapeHtml(opt_data.model2_id), '\'>');
  var kList44 = soy.$$getMapKeys(opt_data.map);
  var kListLen44 = kList44.length;
  for (var kIndex44 = 0; kIndex44 < kListLen44; kIndex44++) {
    var kData44 = kList44[kIndex44];
    output.append('<option model_id=\'', soy.$$escapeHtml(opt_data.map[kData44][opt_data.model_id]), '\' ', (opt_data.selected_id == opt_data.map[kData44][opt_data.model_id]) ? 'selected=\'selected\'' : '', ' >', soy.$$escapeHtml(opt_data.map[kData44][opt_data.map_name]), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_util.display_header_name = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t\t\t<div class=\'experiment_name\'>', soy.$$escapeHtml(opt_data.name_label), ' <div class=\'', soy.$$escapeHtml(opt_data.name_class), '\'>', soy.$$escapeHtml(opt_data.name), '<div class=\'experiment_row_treatment_tools\'>');
  scb_util.small_icon_without_text({src: 'icons/actions/Edit.png', text: 'Edit', cls: opt_data.icon_class}, output);
  output.append('</div><div class=\'experiment_row_treatment_tools_spacer\'></div></div><button class=\'', soy.$$escapeHtml(opt_data.remove_class), ' red\' style=\'position:fixed; right:10px\'>', soy.$$escapeHtml(opt_data.remove_title), '</button></div>');
  return opt_sb ? '' : output.toString();
};
