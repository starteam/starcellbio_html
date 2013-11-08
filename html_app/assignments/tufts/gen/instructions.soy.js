// This file was automatically generated from instructions.soy.
// Please don't edit this file by hand.

if (typeof scb_assignment_specific_tufts == 'undefined') { var scb_assignment_specific_tufts = {}; }


scb_assignment_specific_tufts.assignment_overview = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_tufts_assignment_overview\' xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html"><h2>Introduction</h2><p>For this homework, you will use the new program StarCellBio, which is a cell and molecular biology experiment simulator. Use the program to answer the following questions. This assignment will review material from previous labs and help you prepare for interpreting your final blots on April 11th.</p></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment_specific_tufts.assignment_detail = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_tufts_assignment_detail\'>Please use the program to design and interpret the following two questions.<br><h2>Questions</h2><div class=\'scb_objective_main\'></div><p></p><div class=\'scb_objective_number scb_objective_design\'><div>1</div></div><div class=\'scb_objective_text \'><p>Use the program to design an experiment to determine if the EGFR kinase inhibitor (erlotinib) blocks activation of the Ras pathway downstream of the EGFR. Print a copy of the final exposed blot(s), which should include a list of the samples you chose. Note: Not all samples should be used in this experiment. Use the samples that will directly answer the question asked. Make sure to include a loading control.</p></div><p></p><div class=\'scb_objective_number scb_objective_design\'><div>2</div></div><div class=\'scb_objective_text\'><p>Use the program to design an experiment to determine if Erk activation is required for EGFR phosphorylation. Print a copy of the final exposed blot(s), which should include a list of the samples you chose. Note: Not all samples should be used in this experiment. Use the samples that will directly answer the question asked. U0126 is a Mek inhibitor. Make sure to include a loading control.</p></div><p></p><br></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment_specific_tufts.experiment_setup = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul class=\'scb_assignment_specific_tufts_experiment_setup\'><li>To setup your experiment, select <b>Add Multiple Rows</b> in the experimental set-up table below. <br></li><li>Select all of the treatment protocols for your experiment within the <b>Add Multiple Rows</b> pop up window, and then click <b>Add Multiple Treatments</b>.<!--        Select all of the treatment protocols for your experiment and then click <b>Add Multiple Treatments</b>. --></li></ul>');
  return opt_sb ? '' : output.toString();
};
