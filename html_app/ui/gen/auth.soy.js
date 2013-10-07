// This file was automatically generated from auth.soy.
// Please don't edit this file by hand.

if (typeof scb_auth == 'undefined') { var scb_auth = {}; }


scb_auth.login = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_login_dialog\'><button class=\'scb_f_login_close_button\'>X</button><iframe src=\'/accounts/login/\' class=\'iframe\'></iframe><!-- SIGN-IN<form name="input" action="html_form_action.asp" method="get">Username: <input type="text" name="user"><input type="submit" value="Submit"></form><button class=\'scb_f_login_button\'>Login</button>--></div>');
  return opt_sb ? '' : output.toString();
};


scb_auth.signup = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_signup_dialog\'><button class=\'scb_f_signup_close_button\'>X</button><iframe src=\'/accounts/signup/\' class=\'iframe\'></iframe></div>');
  return opt_sb ? '' : output.toString();
};


scb_auth.logout = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_logout_dialog\'><button class=\'scb_f_logout_close_button\'>X</button><button class=\'scb_f_logout_button\'>Logout</button></div>');
  return opt_sb ? '' : output.toString();
};
