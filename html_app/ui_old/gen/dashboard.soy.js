// This file was automatically generated from dashboard.soy.
// Please don't edit this file by hand.

if (typeof scb_ui == 'undefined') { var scb_ui = {}; }


scb_ui.dashboard = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'dashboard\'>Here will come list of available exercises<br>Also list of available previous sessions<br>Actually, this is everything that is not an experiment<br><input type=\'button\' class=\'create_new_session\' value=\'Create New Session\'></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.dashboard_sidebar = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<ul class=\'sidebar_list\'>');
  var sessionList6 = opt_data.session_list;
  var sessionListLen6 = sessionList6.length;
  for (var sessionIndex6 = 0; sessionIndex6 < sessionListLen6; sessionIndex6++) {
    var sessionData6 = sessionList6[sessionIndex6];
    output.append('<li><a href=\'#', soy.$$escapeHtml(sessionData6.id), '\' session=\'', soy.$$escapeHtml(sessionData6.id), '\' class=\'a_black_link select_session ', (opt_data.selected_session_id == sessionData6.id) ? 'dashboard_sidebar_selected_session' : '', '\'>', soy.$$escapeHtml(sessionData6.name), '</a></li>');
  }
  output.append('<ul>');
  return opt_sb ? '' : output.toString();
};
