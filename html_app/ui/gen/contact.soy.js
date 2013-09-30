// This file was automatically generated from contact.soy.
// Please don't edit this file by hand.

if (typeof scb_contact == 'undefined') { var scb_contact = {}; }


scb_contact.contact = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_contact_dialog\'><iframe src=\'/static/contact/contact.html\'></iframe><button class=\'scb_f_contact_close_button\'>Close</button></div>');
  return opt_sb ? '' : output.toString();
};
