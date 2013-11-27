// This file was automatically generated from instructions.soy.
// Please don't edit this file by hand.

if (typeof scb_assignment_specific_decusability == 'undefined') { var scb_assignment_specific_decusability = {}; }


scb_assignment_specific_decusability.welcome_usability = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_mit706s13_assignment_overview\' xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html"><h2>Welcome</h2><p>Welcome to StarCellBio’s Usability Evaluation!</p><p>StarCellBio is a virtual experiment simulator in which the user can simulate cell and molecular biology experiments. The educational goal of StarCellBio is to teach fundamental concepts of cell and molecular biology, experimental design, and analysis.</p><h2>Brief Description of StarCellBio’s Usability Test</h2><p>During this usability test, you will use StarCellBio to explore the effects of temperature-sensitive mutations on the DNA content and expression of various proteins.</p><p>To measure DNA content, you will use an experimental technique called flow cytometry. Flow cytometry is used to count and quantitatively measure the size, shape and properties of individual cells within a heterogeneous population of cells.</p><p>To examine changes in protein expression, you will use an experimental technique called western blotting. Western blotting is a technique to detect overall changes to a particular protein of interest in an organism or cell. These changes can either be:<ol><li>changes in protein concentration, or</li><li>changes in the mobility of a protein due to small chemical modifications or change in stability.</li></ol></p></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment_specific_decusability.question_1 = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div><br/><div class=\'scb_objective_number scb_objective_design\'><div>1</div></div><div class=\'scb_objective_text\'>To further characterize the mutant strains, your advisor recommends that you first analyze the mutant strains\' DNA content by flow cytometry. She hopes that the results of the DNA content analysis will provide the necessary data to further characterize these cell cycle mutants and determine the arrest point at which the mutant strains are arresting.<p>Perform a flow cytometry experiment(s) to further characterize the DNA content of the Mutant 1 and Mutant 2 strains. What is the DNA content profile of the Mutant 1 and Mutant 2 strains? What is the effect, if any, of the mutations in the Mutant 1 and Mutant 2 strains on the DNA content?</p></div><p></p><p></p></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment_specific_decusability.question_2 = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div><br/><div class=\'scb_objective_number scb_objective_design\'><div>2</div></div><div class=\'scb_objective_text\'>You present your flow cytometry experiment results and analyses to your faculty advisor. She suggests that it will be beneficial to conduct other experiments to further characterize the mutant strains. She urges you to perform western blotting to determine the protein levels of key cell cycle proteins in the mutant strains when grown at the restrictive temperature and allows you to purchase many antibodies to complete a thorough western blotting analysis. Note: the <b>Reference Material</b>section contains more information about the available antibodies.<p>Perform a western blotting experiment(s) to further characterize protein expression of key cell cycle proteins in the Mutant 1 and Mutant 2 strains. What is the effect(s) of the mutations in the Mutant 1 and Mutant 2 strains on the protein levels of the cdk2, cyclin B, cyclin E, and pgk1 proteins?</p></div><p></p><p></p></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment_specific_decusability.intro_and_ref = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div><h2>Introduction</h2><p>The lab in which you are completing a UROP, studies the cell cycle in a newly identified budding yeast strain, called <i>S. cellbiae</i>. In prior experiments on cell cycle regulation in <i>S. cellbiae</i>, the lab discovered that <i>S. cellbiae</i> has homologs of of key cell cycle genes that function in the same manner to regulate the cell cycle as in higher eukaryotes.</p><p>A graduate student in the lab performed a genetic screen to isolate genes important for cell cycle progression. Since loss-of-function mutations in cell cycle genes often lead to lethality, the screen was designed to identify temperature-sensitive mutants, which means that they exhibit the wild-type phenotype at the permissive temperature (30 &deg;C) and the mutant phenotype at the restrictive temperature (37 &deg;C). The graduate student looked for strains that (a) fail to produce colonies at the restrictive temperature and (b) have mutant phenotypes when examined under the microscope following incubation at the restrictive temperature for different lengths of time. He identified two strains that accumulate in different phases of the cell cycle only when at the restrictive temperature. He named the two newly identified mutant strains, Mutant 1 and Mutant 2. Your UROP project is to further characterize these mutant strains using western blotting and flow cytometry.</p><br/><h2>Reference Information</h2><p>The <b>Reference Material</b>contains more information about the strains and treatments that are available to you within StarCellBio.</p>Within StarCellBio you will have access to the following:<br/><br/><ol><li>Wild-type, Mutant 1, and Mutant 2 haploid strains that are growing asynchronously.</li><li>Two temperatures, 30 &deg;C (permissive) and 37 &deg;C (restrictive), at which you can perform your experiments.</li></ol><br/><br/><p>In addition, the table below contains information regarding the antibodies that are available to you and the molecular weight of the proteins to which they bind. The following antibodies are available to you in StarCellBio: <br/><br/><table class=\'scb_s_objective_table\'><thead><td>Protein Name</td><td>Molecular Weight (kDa)</td></thead><tbody><tr><td>Cdk2</td><td>33</td></tr><tr><td>Cyclin B</td><td>58</td></tr><tr><td>Cyclin E</td><td>48</td></tr><tr><td>Pgk1 (loading control)</td><td>45</td></tr></tbody></table></p></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment_specific_decusability.experiment_setup = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul class=\'scb_assignment_specific_tufts_experiment_setup\'><li>To setup your experiment, select <b>Add Multiple Rows</b> in the experimental set-up table below. <br></li><li>Select all of the treatment protocols for your experiment within the <b>Add Multiple Rows</b> pop up window, and then click <b>Add Multiple Treatments</b>.</li></ul>');
  return opt_sb ? '' : output.toString();
};
