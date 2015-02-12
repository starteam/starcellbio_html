// This file was automatically generated from homepage.soy.
// Please don't edit this file by hand.

if (typeof scb_homepage == 'undefined') { var scb_homepage = {}; }


scb_homepage.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_homepage_view\' >');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 0, last_step: opt_data.last_step}, output);
  scb_homepage.display_content(null, output);
  scb_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_homepage.display_header = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_header\' role=\'header\'><div alt=\'\' class=\'scb_s_header_line_top\' ></div><h1 class=\'scb_s_logo_h1\' aria-label=\'StarCellBio Home Page Link\' ><a aria-hidden=\'true\' href=\'', (opt_data.context.auth && opt_data.context.auth.logged_in) ? '#view=assignments' : '#view=homepage', '\'>StarCellBio<img class=\'scb_s_logo\' src=\'images/header/scb_logo.png\' role=\'banner\'></a></h1><span class=\'scb_s_header_tools\'><span class=\'scb_f_contact\' target=\'_blank\' role=\'link\'  aria-label=\'Contact\'><img class=\'scb_s_envelope_icon\' src=\'images/header/scb_envelope_icon.png\' alt=\'\' role=\'presentation\'><span class=\'scb_s_envelope_text scb_s_header_tools_text\'  role=\'presentation\'>CONTACT</span></span><img class=\'scb_s_header_vertical_line\' src=\'images/header/scb_vertical_divider.png\' alt=\'\' role=\'presentation\'><a class=\'scb_f_reference\' href=\'/static/ref_lib/full_library.html#\'   aria-label=\'Library\' target=\'_blank\'><img class=\'scb_s_cabinet_icon\' src=\'images/header/scb_cabinet_icon.png\' alt=\'\' role=\'presentation\'><span class=\'scb_s_cabinet_text scb_s_header_tools_text\' >LIBRARY</span></a><img class=\'scb_s_header_vertical_line\' src=\'images/header/scb_vertical_divider.png\' role=\'presentation\'><!--href=\'pdf/StarCellBio%20User%20Guide.pdf\' target=\'_blank\'--><span class=\'scb_f_user_guide\' role=\'link\'  aria-label=\'User Guide\' ><img class=\'scb_s_user_guide_icon\' src=\'images/header/scb_user_guide_icon.png\' role=\'presentation\'><span class=\'scb_s_user_guide_text scb_s_header_tools_text\' role=\'presentation\'  >USER GUIDE</span></span><img class=\'scb_s_header_vertical_line\' src=\'images/header/scb_vertical_divider.png\' role=\'presentation\'><a class=\'scb_f_video\' href=\'http://www.youtube.com/playlist?list=PLZhxzzyMIQIHhQ2TOGm3HNLA04ZsTmOLW\' role=\'link\'  aria-label=\'Videos\' ><img class=\'scb_s_video_icon\' src=\'images/header/scb_video_icon.png\' role=\'presentation\'><span class=\'scb_s_video_text scb_s_header_tools_text\' role=\'presentation\'  >VIDEOS</span></a><img class=\'scb_s_header_vertical_line\' src=\'images/header/scb_vertical_divider.png\' alt=\'\' role=\'presentation\'><a class=\'scb_f_login\' href=\'#view=assignments\' role=\'presentation\' aria-label=\'Sign In link\'><span class=\'scb_s_login_status\' aria-hidden=\'true\'>', (opt_data.context.auth && opt_data.context.auth.logged_in) ? 'SIGN OUT' : 'SIGN IN', '</span></a></span><div id=\'saving\'>Saving...<div id=\'saving_message\'>Saving Message...</div></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_homepage.display_content = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_homepage_content\' role=\'main\'><span class=\'scb_s_homepage_top\' role=\'welcome_to_starcellbio\'><span class=\'scb_s_homepage_top_left\'><span class=\'scb_s_homepage_top_left_text\'><b>Welcome to StarCellBio,</b><br/> a virtual experiment simulation <br/>tool that teaches the fundamental concepts of cell and molecular <br/>biology, experimental design, and analysis.</span><!--<span class=\'scb_s_homepage_see_more_button\' role=\'button\'><img src=\'images/homepage/SCB_Homepage_SeeMoreBTN.png\' alt=\'See More\'></span>--></span><span class=\'scb_s_homepage_top_right\' role=\'signup_area\'><!--<img class=\'scb_s_homepage_video_player\' src=\'images/homepage/player_background.png\' alt=\'Video Player Background\'  aria-label=\'Video Player Background\' >--><iframe width="100%" height="194" src="//www.youtube.com/embed/RqDHjjI-GHg" frameborder="0" allowfullscreen></iframe><a class=\'scb_no_underline\' href=\'#view=assignments\'><button class=\'scb_f_try_an_experiment scb_s_homepage_blue_actions\' role=\'button\'>Try an Experiment</button></a><img class=\'scb_s_homepage_blue_line\' src=\'images/homepage/horizontal_line.png\' alt=\'\'><!--            <button class=\'scb_f_create_instructors_account scb_s_homepage_blue_actions\' role=\'button\'>Create Instructors Account</button><img class=\'scb_s_homepage_blue_line\' src=\'images/homepage/horizontal_line.png\' alt=\'\'>-->            <button class=\'scb_f_create_student_account scb_s_homepage_blue_actions\' role=\'button\'>Create Student Account</button><br><!--            <button class=\'scb_f_instructor_resources scb_s_instructor_resources\' alt=\'INSTRUCTOR RESOURCES\'>INSTRUCTOR RESOURCES</button>--></span></span>');
  scb_homepage.display_experiment_design(null, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_homepage.display_experiment_design = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class=\'scb_s_homepage_bottom\'><span class=\'scb_s_homepage_experimental_design\' role=\'experimental_design\'><img class=\'scb_s_homepage_experimental_design_text\' src=\'images/homepage/experimental_design.png\' alt=\'Experimental Design\'><img class=\'scb_s_homepage_experimental_design_bar\' src=\'images/homepage/experimental_design_bar.png\' alt=\'\'><span class=\'scb_s_homepage_experimental_design_list\'><span class=\'scb_s_homepage_experimental_design_list_title\'>Each experiment consists of 7 steps:</span><div class=\'scb_s_homepage_experimental_design_list_items\'><div class=\'scb_s_homepage_experimental_design_bullet_item\' value=\'Design\' data-id="design" role="link" aria-controls=\'scb_s_homepage_experimental_design_list_info\'><span class=\'scb_s_homepage_experimental_design_bullet\' role="presentation" aria-hidden="true" >1.</span><span class=\'scb_s_homepage_experimental_design_item\'>Design</span></div><div class=\'scb_s_homepage_experimental_design_bullet_item\' value=\'SetUp\' data-id="setup" role="link" aria-controls=\'scb_s_homepage_experimental_design_list_info\'><span class=\'scb_s_homepage_experimental_design_bullet\' role="presentation" aria-hidden="true" >2.</span><span class=\'scb_s_homepage_experimental_design_item\'>Setup</span></div><div class=\'scb_s_homepage_experimental_design_bullet_item\' value =\'RunExperiment\' data-id="run_experiment" role="link" aria-controls=\'scb_s_homepage_experimental_design_list_info\'><span class=\'scb_s_homepage_experimental_design_bullet\' role="presentation" aria-hidden="true" >3.</span><span class=\'scb_s_homepage_experimental_design_item\'>Run Experiment</span></div><div class=\'scb_s_homepage_experimental_design_bullet_item\'  value=\'SelectTechniques\' data-id="select_technique" role="link" aria-controls=\'scb_s_homepage_experimental_design_list_info\'><span class=\'scb_s_homepage_experimental_design_bullet\' role="presentation" aria-hidden="true" >4.</span><span class=\'scb_s_homepage_experimental_design_item\'>Select Technique(s)</span></div><div class=\'scb_s_homepage_experimental_design_bullet_item\' value=\'RunTechniques\'  data-id="run_technique" role="link" aria-controls=\'scb_s_homepage_experimental_design_list_info\'><span class=\'scb_s_homepage_experimental_design_bullet\' role="presentation" aria-hidden="true" >5.</span><span class=\'scb_s_homepage_experimental_design_item\'>Run Technique(s)</span></div><div class=\'scb_s_homepage_experimental_design_bullet_item\' value=\'Analyze\' data-id="analyze" role="link" aria-controls=\'scb_s_homepage_experimental_design_list_info\'><span class=\'scb_s_homepage_experimental_design_bullet\' role="presentation" aria-hidden="true" >6.</span><span class=\'scb_s_homepage_experimental_design_item\'>Analyze</span></div><div class=\'scb_s_homepage_experimental_design_bullet_item\' value=\'Conclude\' data-id="conclude" role="link" aria-controls=\'scb_s_homepage_experimental_design_list_info\'><span class=\'scb_s_homepage_experimental_design_bullet\' role="presentation" aria-hidden="true" >7.</span><span class=\'scb_s_homepage_experimental_design_item\'>Conclude</span></div></div><img class=\'scb_s_homepage_experimental_design_list_bar\' src=\'images/homepage/experimental_design_bar.png\' alt=\'\'><span class=\'scb_s_homepage_experimental_design_list_info\' id=\'scb_s_homepage_experimental_design_list_info\' aria-live=\'off\'>Euismod tincidunt ut laoreet dolore magna kjowkd aliquam erat volu</span><span href="static/ref_lib/full_library.html#ExperimentalDesign" class=\'scb_s_homepage_learn_more scb_s_homepage_technique_learn_more learn_more_dynamic\' target=\'_blank\' aria-label=\'Learn more about this step\' role=\'button\'>LEARN MORE</span></span></span><span class=\'scb_s_homepage_technique\' role=\'techniques\'><span class=\'scb_s_homepage_technique_title\'><img src=\'images/homepage/techniques.png\'></span>');
  scb_homepage.display_techniques({techniques: ['wb', 'fc', 'micro']}, output);
  output.append('</span></span>');
  return opt_sb ? '' : output.toString();
};


scb_homepage.display_techniques = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var techList38 = opt_data.techniques;
  var techListLen38 = techList38.length;
  for (var techIndex38 = 0; techIndex38 < techListLen38; techIndex38++) {
    var techData38 = techList38[techIndex38];
    output.append((techData38 == 'wb') ? '<span class=\'scb_s_homepage_technique_wb\'><span class=\'scb_s_homepage_technique_title_image\' role=\'heading\' >Western Blot</span>Western blotting detects overall changes in the amount or chemical modifications of a particular protein.<a href="static/ref_lib/full_library.html#WesternBlotting" role=\'button\' class=\'scb_s_homepage_technique_learn_more\' target=\'_blank\' aria-label=\'Learn more about western blot\'>LEARN MORE</a></span><img class=\'scb_s_homepage_technique_bar\' src=\'images/homepage/experimental_design_bar.png\' role=\'presentation\' alt=\'\'>' : '', (techData38 == 'fc') ? '<span class=\'scb_s_homepage_technique_flow\'><span class=\'scb_s_homepage_technique_title_image\' role=\'heading\'>Flow Cytometry</span>Flow cytometry is used to count and analyze the size, shape and properties of individual cells within a heterogeneous population of cells.<a href="static/ref_lib/full_library.html#FlowCytometry" role=\'button\' class=\'scb_s_homepage_technique_learn_more\' target=\'_blank\' aria-label=\'Learn more about flow cytometry\'>LEARN MORE</a></span><img class=\'scb_s_homepage_technique_bar\' src=\'images/homepage/experimental_design_bar.png\' role=\'presentation\' alt=\'\'>' : '', (techData38 == 'micro') ? '<span class=\'scb_s_homepage_technique_micro\'><span class=\'scb_s_homepage_technique_title_image\' role=\'heading\'>Microscopy</span>Microscopy is used to study the shape, morphology and properties of cells, tissues or organisms that otherwise cannot be observed by eye.<a href="static/ref_lib/full_library.html#Microscopy" role=\'button\' class=\'scb_s_homepage_technique_learn_more\' target=\'_blank\' aria-label=\'Learn more about microscopy\'>LEARN MORE</a></span>' : '', '<!--<img class=\'scb_s_homepage_technique_more\' src=\'images/homepage/more_techniques.png\'>-->');
  }
  return opt_sb ? '' : output.toString();
};


scb_homepage.display_footer = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_footer\' role=\'footer\'><a href="http://web.mit.edu/" role=\'link\'><img class=\'scb_s_homepage_footer_logo\' src=\'images/homepage/mit_logo.png\' alt=\'MIT Logo\'></a><img class=\'scb_s_homepage_footer_divider\' role=\'presentation\'  src=\'images/homepage/small_divider.png\' alt=\'\'><a href=\'http://star.mit.edu/about.html\' role=\'link\'  aria-label=\'About Star\' target=\'_blank\'><span aria-hidden=\'true\' class=\'scb_s_homepage_footer_about\' src=\'images/homepage/about_star.png\'>About STAR</span></a><!--<img class=\'scb_s_homepage_footer_divider\' role=\'presentation\'  src=\'images/homepage/small_divider.png\' alt=\'\'><a href=\'http://star.mit.edu/cellbio/support.html\' role=\'link\' aria-label=\'Funding\'   target=\'_blank\'><span aria-hidden=\'true\' class=\'scb_s_homepage_footer_support\' src=\'images/homepage/support.png\'>Funding</span></a>--></div>');
  return opt_sb ? '' : output.toString();
};


scb_homepage.experimental_design_design = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('State the objective that the experiment will address your hypothesis for the experiment, and think about the technique that will best suit your experiment.');
  return opt_sb ? '' : output.toString();
};


scb_homepage.experimental_design_setup = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('Specify the strain(s), treatment(s), treatment concentration(s), treatment start time, treatment duration and collection time for your experiment.');
  return opt_sb ? '' : output.toString();
};


scb_homepage.experimental_design_run_experiment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('Perform your experiment and collect your samples.');
  return opt_sb ? '' : output.toString();
};


scb_homepage.experimental_design_select_technique = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('Select the appropriate experimental technique that is best suited for your experiment.');
  return opt_sb ? '' : output.toString();
};


scb_homepage.experimental_design_run_technique = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('Perform western blotting, flow cytometry and/or microscopy.');
  return opt_sb ? '' : output.toString();
};


scb_homepage.experimental_design_analyze = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('Analyze the results of your experiment.');
  return opt_sb ? '' : output.toString();
};


scb_homepage.experimental_design_conclude = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('Form a conclusion that addresses how your results fit your original hypothesis.');
  return opt_sb ? '' : output.toString();
};
