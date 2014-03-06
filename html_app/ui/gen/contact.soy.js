// This file was automatically generated from contact.soy.
// Please don't edit this file by hand.

if (typeof scb_contact == 'undefined') { var scb_contact = {}; }


scb_contact.contact = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_contact_dialog\'><div class=\'scb_s_feedback_form\'> Feedback Form<button class=\'scb_f_contact_close_button\'>&#215;</button></div><iframe class=\'scb_s_contact_iframe\' src=\'/static/contact/contact.html\'></iframe></div>');
  return opt_sb ? '' : output.toString();
};
