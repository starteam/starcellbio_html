// This file was automatically generated from usability_test.soy.
// Please don't edit this file by hand.

if (typeof scb_model_usability == 'undefined') { var scb_model_usability = {}; }


scb_model_usability.abstract = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h1 xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">Introduction</h1><p>Welcome to StarCellBio’s Usability Evaluation!</p><p>StarCellBio is a virtual experiment simulator in which the user can simulate cell and molecular biology experiments. The educational goal of StarCellBio is to teach fundamental concepts of cell and molecular biology, experimental design, and analysis.</p><h1>Brief Description of StarCellBio’s Usability Test</h1><p>During this usability test, you will use StarCellBio to explore the effects of multiple drug treatments on the expression of various proteins. To determine changes in protein expression, you will use an experimental technique called western blotting. Western blotting is a technique to detect overall changes to a particular protein of interest in an organism or cell. These changes can either be:<ol><li>changes in protein concentration, or</li><li>changes in the mobility of a protein due to small chemical modifications or change in stability.</li></ol></p>');
  return opt_sb ? '' : output.toString();
};


scb_model_usability.instructions = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h1>SCB Usability Test Assignment</h1><p>Your new lab is studying vulva (the egg-laying organ) development in the nematode (a roundworm) <i>C. elegans</i>. You screen a chemical library to determine if any of the chemicals within the library affect vulva development. To perform the screen, you treat developing worms with each of the drugs contained within the library and then analyze the adult worms for a mutant vulva phenotype. Through your chemical screen, you identify four new drugs that all affect vulva development. You name the new drugs Vulvarine 1, 2, 3 and 4.</p><p>Treatment of developing worms with the Vulvarine drugs result in the following phenotypes:</p><ul><li> Treatment of wild-type worms with increasing amounts of Vulvarine 1 or Vulvarine 2 results in worms that lack a vulva, called a vulvaless phenotype.</li><li> Treatment of wild-type worms with increasing amounts of Vulvarine 3 or Vulvarine 4 results in worms that have multiple vulva organs, called a multivulva phenotype.</li></ul><p>You would like to determine how these drugs affect vulva development in <i>C. elegans</i> by determining if proteins that are implicated in the vulva development pathway are affected by the drug treatments. Your advisor tells you that we know at least several proteins involved in the vulva development pathway. She advises you to start by determining if known vulva development proteins are affected in either their levels or mobility by the Vulvarine drug treatments through western blots. The end of the assignment (Reference Material) contains the name and size of the known vulva development proteins in <i>C. elegans</i>.</p><p>The following reagents are available to you for your experiments:</p><ul><li> Vulvarines 1-4, each at various concentrations.</li><li> The buffer in which the 4 drugs is diluted.</li><li> A rabbit anti-tubulin primary antibody. Levels of tubulin protein are not altered by the drug treatments and can serve as a control to ensure for equal loading of protein in all of the wells of your western gels.</li></ul><h1>Questions</h1><div class=\'scb_objective_main\'></div><p><div class=\'scb_objective_number\'><div>1</div></div><div class=\'scb_objective_text\'>Determine the effects of increasing concentrations of Vulvarine 1 on the:<ul><li>Dpy-5 protein</li><li>let-23 protein</li><li>protein of your choosing</li></ul>If there is an effect on either protein expression or mobility, please indicate the critical concentration of Vulvarine 1 at which you first observe the effect.</div></p><div class=\'scb_objective_separator\'></div><p><div class=\'scb_objective_number\'><div>2</div></div><div class=\'scb_objective_text\'>Determine the effects of increasing concentrations of Vulvarines 2, 3 and 4 on the:<ul><li>lin-1 protein</li><li>lin-15 protein</li><li>let-60 protein</li></ul>If there is an effect on either protein expression or mobility, please indicate the critical concentration of Vulvarine 2, 3 or 4 at which you first observe the effect.</div></p><div class=\'scb_objective_separator\'></div><!--<h1>THANK YOU FOR YOUR TIME!</h1>--><h1>Reference Material</h1><table><thead><td>Protein Name</td><td>Molecular Weight (kDa)</td></thead><tbody><tr><td>Dpy-5</td><td>20</td></tr><tr><td>Lon-2</td><td>100</td></tr><tr><td>Sma-4</td><td>75</td></tr><tr><td>lin-1</td><td>48.5</td></tr><tr><td>lin-15A</td><td>79</td></tr><tr><td>lin-15B</td><td>158</td></tr><tr><td>let-23</td><td>150</td></tr><tr><td>let-60</td><td>21</td></tr><tr><td>Tubulin (control)</td><td>50</td></tr></tbody></table>');
  return opt_sb ? '' : output.toString();
};


scb_model_usability.setup_video_box = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id=\'slider\'><div class="slides_container"><a target="_blank"><img role=\'presentation\' class=\'scb_s_experiment_setup_video_box_img\' src=\'static/usability_test/Wild-type.jpg\'><span>Vulva phenotypes in <i>C. elegans</i></span></a><a target="_blank"><img  role=\'presentation\' class=\'scb_s_experiment_setup_video_box_img\' src=\'static/usability_test/Multivulva.jpg\' ><span>Vulva phenotypes in <i>C. elegans</i></span></a><a target="_blank"><img  role=\'presentation\' class=\'scb_s_experiment_setup_video_box_img\'  src=\'static/usability_test/Vulvaless.jpg\' ><span>Vulva phenotypes in <i>C. elegans</i></span></a></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_model_usability.setup_video_text = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span>Vulva phenotypes in C. elegans.&nbsp;</span>');
  return opt_sb ? '' : output.toString();
};


scb_model_usability.experiment_setup = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul class=\'scb_s_experiment_setup_list\'><li>For each treatment protocol, select the treatment and treatment dose.</li><li>Once you finish setting up your experiment treatment, select Run Experiment.</li></ul>');
  return opt_sb ? '' : output.toString();
};
