// This file was automatically generated from instructions.soy.
// Please don't edit this file by hand.

if (typeof scb_assignment_specific_mit706s13 == 'undefined') { var scb_assignment_specific_mit706s13 = {}; }


scb_assignment_specific_mit706s13.assignment_overview = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_mit706s13_assignment_overview\' xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">This assignment is due at beginning of lecture (9:30 am) on Thursday, April 25th, 2013 (Up to 5 points)<h2>Goal</h2>The goal of this assignment is to enhance learning of experimental design and analysis by providing you with the opportunity to design, perform and analyze your own cell and molecular biology experiments which complements the material you have learned in 7.06. For this purpose, you will use StarCellBio, a new cell and molecular biology experiment simulator.</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment_specific_mit706s13.assignment_detail = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_mit706s13_assignment_detail\'><h2>Introduction</h2><p>The lab in which you are completing a UROP, studies the cell cycle in a newly identified budding yeast strain, called <i>S. cellbiae</i>. In prior experiments on cell cycle regulation in <i>S. cellbiae</i>, the lab discovered that <i>S. cellbiae</i> has homologs of <i>CDK1</i> and <i>CDK2</i> that function in the same manner to regulate the cell cycle as in higher eukaryotes.</p><p>A graduate student in the lab performed a genetic screen to isolate genes important for cell cycle progression. Since loss-of-function mutations in cell cycle genes often lead to lethality, the screen was designed to identify temperature-sensitive mutants, which means that they exhibit the wild-type phenotype at the permissive temperature (30 &deg;C) and the mutant phenotype at the restrictive temperature (37 &deg;C). By looking for strains that (a) fail to produce colonies at the restrictive temperature and (b) have mutant phenotypes when examined under the microscope following incubation at the restrictive temperature for different lengths of time, the graduate student identified two strains that accumulate in different phases of the cell cycle. He named the two newly identified mutant strains, Mutant 1 and Mutant 2. Your UROP project is to further characterize these mutant strains by determining the cell cycle arrest point at which the mutant strains are arresting.</p><p>See the <b>Reference Information (below)</b> for more information about the strains, conditions and treatments that are available to you within StarCellBio.</p><h2>Questions</h2><div class=\'scb_objective_main\'></div><p></p><div class=\'scb_objective_number\'><div>1</div></div><div class=\'scb_objective_text\'><p>To further characterize the mutant strains, your advisor recommends that you first analyze the mutant strains\' DNA content by flow cytometry. While there are other more cost-prohibitive ways to characterize cell cycle mutants, using expensive reagents, such as antibodies, she would like to keep costs low. She hopes that the results of the DNA content analysis will provide the necessary data to further characterize these cell cycle mutants and determine the arrest point at which the mutant strains are arresting.</p><p>Perform a flow cytometry experiment(s) to further characterize the Mutant 1 and Mutant 2 strains. Based on your flow cytometry results and analysis, which cell cycle arrest point(s) are responsible for the phenotype you observe for the Mutant 1 and Mutant 2 strains? For each mutant strain, describe how the results of your flow cytometry experiments informed your conclusions.</p></div><p></p><div class=\'scb_objective_separator\'></div><p></p><div class=\'scb_objective_number\'><div>2</div></div><div class=\'scb_objective_text\'><p>You present your flow cytometry experiment results and analyses to your faculty advisor. She suggests that it will be beneficial to conduct other experiments to further characterize the mutant strains. She urges you to perform western blotting to determine the protein levels and mobility of key cell cycle proteins in the mutant strains when grown at the restrictive temperature and allows you to purchase many antibodies to complete a thorough western blotting analysis. See the <b>Reference Information</b> (below) for more information about these antibodies.</p><p>Perform a western blotting experiment(s) to further characterize the cell cycle defects in the Mutant 1 and Mutant 2 strains. Based on your western blotting results, which cell cycle arrest point(s) are responsible for the phenotype you observe for the Mutant 1 and Mutant 2 strains? For each mutant strain, describe how the results of your western blotting experiments informed your conclusions.</p></div><p></p><div class=\'scb_objective_separator\'></div><p></p><div class=\'scb_objective_number\'><div>3</div></div><div class=\'scb_objective_text\'>StarCellBio Feedback Survey. To receive up to 5 extra credit points on your Exam III score, you will also need to complete a feedback survey on this extra credit assignment and your StarCellBio experience. To complete the survey, follow this link: [insert link here]</div><p></p><div class=\'scb_objective_separator\'></div><h2>Reference Information</h2>Within StarCellBio you will have access to the following:<ol><li>Wild-type, Mutant 1, and Mutant 2 haploid strains that are growing asynchronously.</li><li>Two temperatures, 30 &deg;C (permissive) and 37 &deg;C (restrictive), at which you can perform your experiments.</li><li>Chemical treatments. a) Cell cycle specific drugs that provide known, expected results under appropriate conditions to which you may compare your experimental samples involving the mutant strains. The drugs are: alpha factor = a mating pheromone, which results in a cell cycle arrest in G1; hydroxyurea = a drug that depletes the cell of deoxyribonucleotides (dNTPs), which results in a cell cycle arrest in S-phase; and nocodazole = a drug that inhibits polymerization of microtubules, which results in a cell cycle arrest in mitosis. b) Protein Phosphatase 1 (PP1) = a phosphatase enzyme that removes phosphate groups from all phosphorylated-serine, -threonine and -tyrosine amino acids.</li><li>Antibodies that recognize the following proteins are available to you for western blotting experimental techniques in StarCellBio:<table class=\'scb_s_objective_table\'><thead><td>Protein</td><td>Molecular Weight (kDa)</td></thead><tbody><tr><td>Cdk1</td><td>34</td></tr><tr><td>Cdk2</td><td>33</td></tr><tr><td>Cdt1</td><td>65</td></tr><tr><td>Cyclin B</td><td>58</td></tr><tr><td>Cyclin E</td><td>48</td></tr><tr><td>Pgk1 (loading control)</td><td>45</td></tr><tr><td>Rad21/Scc1* (subunit of cohesin)</td><td>68</td></tr><tr><td>Securin</td><td>42</td></tr></tbody></table></li></ol><p>For these experiments in StarCellBio you can assume that all of these antibodies recognize the phosphorylated and un-phosphorylated forms, if applicable, of each of the proteins. In StarCellBio, you will be able to see an appropriate shift in size for phosphorylated proteins on the western blot under the appropriate experimental conditions.</p><p>*Note: The Rad21/Scc1 antibody recognizes a fragment containing amino acids 423 - 501 of the protein. Here is a schematic of the Rad21 protein (631 amino acids) with arrows indicating the amino acid positions of the two Separase cleavage sites:<br><img src=\'/static/assignments/mit706s13/assets/cleavage_sites.png\'></p></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment_specific_mit706s13.experiment_setup = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul class=\'scb_assignment_specific_tufts_experiment_setup\'><li>To setup your experiment, select <b>Add Multiple Rows</b> in the experimental set-up table below. <br></li><li>Select all of the treatment protocols for your experiment within the <b>Add Multiple Rows</b> pop up window, and then click <b>Add Multiple Treatments</b>.<!--        Select all of the treatment protocols for your experiment and then click <b>Add Multiple Treatments</b>. --></li></ul>');
  return opt_sb ? '' : output.toString();
};
