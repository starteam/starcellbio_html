// This file was automatically generated from instructions.soy.
// Please don't edit this file by hand.

if (typeof scb_assignment_specific_mit706s14ps2 == 'undefined') { var scb_assignment_specific_mit706s14ps2 = {}; }


scb_assignment_specific_mit706s14ps2.page1 = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_mit706s14ps2_assignment_overview\' xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html"><h2>Goal</h2>The goal of this assignment is to increase understanding of cell biology techniques and their application by providing you with the opportunity to conduct and analyze data from your own cell biology experiments.<h2>StarCellBio</h2><p>To conduct your cell biology experiments, you will use StarCellBio, a cell and molecular experiment simulator, launched from the MITx 7.06r course website.</p><h2>Due Date & Points</h2>Your answers to the questions on the MITx 7.06r website will be due on <b>Friday, May 2nd by 11 AM</b>.<p/>This assignment is worth a total of <strong>30 points</strong>.</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment_specific_mit706s14ps2.page2 = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_mit706s14ps2_assignment_overview\' xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html"><h2>Background Information</h2><p>Your graduate thesis research is focused on the identification and characterization of novel regulators of the mitotic cell cycle. To identify such novel cycle cell regulators, you initiate a collaboration with the Broad Institute, which will provide access to their extensive RNAi library for an RNAi-based screen.</p><p>Before you screen all of the library’s siRNA constructs, you decide to perform a preliminary screen by treating Drosophila Schneider 2 (S2) cells, a cell line originally derived from Drosophila melanogaster embryos, with a subset of the RNAi library. You identify 5 different siRNA constructs (siRNA #1-5) that result in a cell cycle phenotype and that you would like to further characterize their effect on cell cycle progression.</p><p>For your experimental analyses, you have the following cell cycle specific drugs that provide known, expected results under appropriate conditions to which you may wish to compare your experimental samples involving the RNAi treatments.<ul><li><i>Serum-free media</i> = S2 cells grown in media that lacks serum, and therefore lacks all growth factors, which results in a cell cycle arrest in G1.</li><li><i>Hydroxyurea</i> = a drug that depletes the cell of deoxyribonucleotides (dNTPs), which results in a cell cycle arrest in S-phase.</li><li><i>Nocodazole</i> = a drug that inhibits polymerization of microtubules, which results in a cell cycle arrest in mitosis.</li></ul></p><h2>Experimental Analyses</h2><p>To characterize the effects of siRNA #1-5 on cell cycle progression, you perform the following analyses after each RNAi treatment:</p><p>I. You first analyze DNA content by flow cytometry.</p><p>II. Next, you visualize the cells’ DNA using immunofluorescence microscopy. Within StarCellBio, you will be able to perform one of the three following immunofluorescence analyses, as indicated within the microscopy setup page:<table class="scb_s_objective_table"><thead><td><b>Immunofluorescence Analysis</b></td><td><b>Description</b></td></thead><tbody><tr><td>DAPI (blue), α-tubulin (green), γ-tubulin (red)</td><td>DAPI (4\',6-diamidino-2-phenylindole, a fluorescent stain that binds to DNA), α-tubulin antibody (a marker of microtubules), and γ-tubulin antibody (a marker of spindle poles)</td></tr><tr><td>H2B (green), α-tubulin (red)</td><td>Histone 2B (H2B, a protein that colocalizes with DNA) antibody and an antibody to α-tubulin (a marker of microtubules)</td></tr><tr><td>H2B (green)</td><td>Histone 2B (H2B, a protein that colocalizes with DNA) antibody</td></tr></tbody></table></p><p>III. Then you visualize the expression and localization of the Mad2 protein. In StarCellBio, you may be able to perform the following immunofluorescence microscopy analysis, as indicated within the microscopy setup page:<table class="scb_s_objective_table"><thead><td><b>Immunofluorescence Analysis</b></td><td><b>Description</b></td></thead><tbody><tr><td>Mad2 (red), DAPI (blue)</td><td>An antibody to the Mad2 protein and DAPI (a fluorescent stain that binds to DNA)</td></tr></tbody></table></p><p>In StarCellBio, the Mad2 staining images have been selected to illustrate relative Mad2 expression and localization during <b>metaphase ONLY</b>.</p><p>IV. Last, you analyze several key cell cycle proteins by western blot. For the western blotting analysis, you have the following antibodies available to you, including an antibody against Pgk1, a protein whose levels do not change throughout the cell cycle.<table class="scb_s_objective_table"><thead><td><b>Antibody</b></td><td><b>Protein Detected</b></td><td><b>Expected Molecular Weight (kDa)</b></td></thead><tbody><tr><td>anti-Chk1</td><td>Chk1</td><td>54</td></tr><tr><td>anti-Cyclin B</td><td>Cyclin B</td><td>58</td></tr><tr><td>anti-Cyclin E</td><td>Cyclin E</td><td>48</td></tr><tr><td>anti-Pgk1</td><td>Pgk1 (loading control)</td><td>45</td></tr><tr><td>anti-Rad21/Scc1* </td><td>Rad21/Scc1 (subunit of cohesin)</td><td>68</td></tr></tbody></table></p><p><b>NOTE</b>: You can assume that all of these antibodies recognize the phosphorylated and unphosphorylated forms, if applicable, of each of the proteins. You will be able to see an appropriate shift in size for phosphorylated proteins on the western blot under the appropriate experimental conditions.</p><p>*The Rad21/Scc1 antibody recognizes a fragment of the Rad21 protein containing amino acids 423 – 501. Here is a schematic of the full length Rad21 protein (631 amino acids) with arrows indicating the amino acid positions of the two Separase cleavage sites:</p><img style =\'width:100%\' src=\'images/homepage/ps2_assignment.jpg\'/><p>Conduct the appropriate experiments within StarCellBio to characterize the effect of each RNAi treatment, siRNA #1-5, on cell cycle progression. Using the results that you obtain from these experiments, answer the following questions.</p></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment_specific_mit706s14ps2.page3 = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_mit706s14ps2_assignment_overview\' xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html"><h2>Questions 1-5</h2><p>Using your experimental results, answer all of the following questions within the MITx 7.06r website for each of the siRNA treatments.</p><p><b class=\'ps2_bold\'>A)</b> Using only your flow cytometry data, indicate the cell cycle progression phenotype(s), if any, you observe in the siRNA treated cells relative to control siRNA treated cells.</p><p><b class=\'ps2_bold\'>B)</b> Indicate the DNA phenotype(s) you observe in the cells following each of the siRNA treatments.</p><p><b class=\'ps2_bold\'>C)</b> Indicate the Mad2 expression and localization phenotype(s) you observe in the cells following each siRNA treatment.</p><p><b class=\'ps2_bold\'>D)</b> Indicate the following for each protein in the table after each siRNA treatment: (a) relative expression level in comparison to control siRNA treated cells, (b) the cleavage status, and (c) the phosphorylation status.</p><p><b class=\'ps2_bold\'>E)</b> Using all of your results and conclusions from parts A-D, describe the defect, if any, that you observe in siRNA treated cells. For each of the siRNAs, tour answer should include (i) the conclusion that you reached from observing the various phenotype(s) following each siRNA treatment, (ii) a likely target of the siRNA, and (iii) an explanation of how the siRNA treatment could account for the phenotype(s) you observed in the siRNA treated cells. Be sure to explain the reasoning by which you arrived at your conclusion and reference your experimental results in your explanations.</p><br/><br/><br/></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment_specific_mit706s14ps2.experiment_setup = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul class=\'scb_assignment_specific_tufts_experiment_setup\'><li>To setup your experiment, select <b>Add Samples</b> in the experimental set-up table below. <br></li><li>Select all of the treatment protocols for your experiment within the <b>Add Samples</b> pop up window, and then click <b>Add Samples</b>.<!--        Select all of the treatment protocols for your experiment and then click <b>Add Multiple Treatments</b>. --></li></ul>');
  return opt_sb ? '' : output.toString();
};
