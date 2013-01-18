// This file was automatically generated from western_blot_gel.soy.
// Please don't edit this file by hand.

if (typeof scb_western_blot_gel == 'undefined') { var scb_western_blot_gel = {}; }


scb_western_blot_gel.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_view_gel\'>');
  scb_homepage.display_header(opt_data, output);
  output.append('HERE I AM BABY');
  scb_western_blot.display_details(opt_data, output);
  scb_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};
