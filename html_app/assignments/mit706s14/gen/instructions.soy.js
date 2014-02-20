// This file was automatically generated from instructions.soy.
// Please don't edit this file by hand.

if (typeof scb_assignment_specific_mit706s14 == 'undefined') { var scb_assignment_specific_mit706s14 = {}; }


scb_assignment_specific_mit706s14.introduction = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_mit706s14_assignment_overview\' xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html"><h2>Goal</h2>The goal of this assignment is to increase understanding of cell biology techniques and their application by providing you with the opportunity to conduct and analyze data from your own cell biology experiments.<h2>StarCellBio</h2><p>To conduct your cell biology experiments, you will use StarCellBio, a cell and molecular experiment simulator launched from the edX course website.</p><h2>Due Date & Points</h2>Your completed experiments and answers to questions on the course website will be due on <b>Friday, March 14th by 11 AM</b>. <br/>This assignment is worth a total of _____ points.</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment_specific_mit706s14.background_information = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_mit706s14_assignment_overview\' xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html"><br/>You are characterizing a newly identified serine/threonine kinase, <b>Kinase X</b>, involved in cellular growth and differentiation. This kinase is part of a pathway, which is activated by the binding of an extracellular ligand to a receptor.<br/>You have identified four potential substrates (<b>Proteins A-D</b>) of Kinase X through an siRNA screen in mammalian cells, and would like to further characterize them. To this end, you conduct experiments in a mammalian cell line in which this pathway can be easily activated with the addition of the extracellular ligand.<br/>First, you monitor the protein levels of Proteins A-D upon addition of the activitating extracellular ligand, and compare them with those in which only growth media is added. You observe that within the time frame in which your experiment is conducted, Proteins A-D levels do not change upon the addition of ligand. Next, you decide to further investigate the effect of ligand addition and pathway activation by monitoring changes in Proteins A-D\'s phosphorylation and subcellular localization. To do this end you are provided with the following reagents:<br/><ol><li>The ligand that activates Kinase X\'s signaling pathway as well as an inhibitor of this pathway.</li><li>Commercially available protein-specific phospho antibodies generated against specific phosphorylation sites in Proteins A-D and Kinase X. These phosphorylation sites were previously identified in a protein wide analysis that uncovered sites commmonly phosphorylated upon activation of various signalining pathways. The protein-specific phospho antibodies only recognize the phosphorylated form of these protein residues.</li><li> Stably expressing wild-type mammalian cell lines, each expressing a GFP-potential substrate fusion protein (called "WT-GFP-Protein A", "WT-GFP-Protein B", etc.). In addition, the following stably expressing cell lines have also been provided to you, in which the subcellular localization of the protein being stably expressed in each of these cell lines does not change upon the addition of ligand or inhibitor. <br/><ul><li>WT-GFP = a wild-type mammalian cell line stably expressing Green Flouresecent Protein.</li><li>WT-GFP-Kinase = a wild-type mammanlian cell line stably expressing the Kinase X protein fused to GFP.</li><li>WT-GFP-Histone H2B = a wild-type mammalian cell line stably expressing the Histone H2B protein fused to GFP.</li><li>WT-GFP-p100 = a wild-type mammalian cell line stably expressing a protein with a molecular weight of 100 kDa fused to GFP.</li><li>WT-GFP-pTD = a wild-type mammalian cell line stably expressing a protein with a transmembrane domain and an internal signal sequence, fused to GFP.</li></ul></li></ol><p>Conduct the appropiate experiments within StarCellBio to determine the effects of pahtway activation on Proteins A-D phosphorylation and subcellular localization. Using the results you obtained from these experiments, answer the following questions concerning Proteins A-D and the signal transduction pathway in question.</p></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment_specific_mit706s14.question_1 = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_mit706s14_assignment_overview\' xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html"><br/>Using the conclusions from the data you have generated, for each potential substrate, describe the effect of this signal transduction pathway activation by indicating 1) whether it is phosphorylated, and 2) its subcellular localization in the absence and presence of ligand. Answer Question 1 within the MITx 7.06 site.</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment_specific_mit706s14.question_2 = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_mit706s14_assignment_overview\' xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html"><h2>Part A</h2><p>Addition of ligand results in the activation of the signal transduction pathway in question, and in the expression of genes important for cellular growth and differentiation. Given your experimental results, suggest the most likely order for Proteins A-D and Kinase X within this signal transduction pathway, beginning with the addition of ligand and ending with gene expression.<br/>Answer Question 2 Part A within the MITx 7.06 site.</p><h2>Part B</h2><p>At which point within the pathway does the inhibitor act?<br/>Answer Question 2 Part B within the MITx 7.06 site.</p><h2>Part C</h2><p>Explain the reasoning by which you ordered the signal transduction pathway using your experimental results to justify your explanation.<br/>Answer Question 2 Part C within the MITx 7.06 site.</p></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment_specific_mit706s14.experiment_setup = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul class=\'scb_assignment_specific_tufts_experiment_setup\'><li>To setup your experiment, select <b>Add Samples</b> in the experimental set-up table below. <br></li><li>Select all of the treatment protocols for your experiment within the <b>Add Samples</b> pop up window, and then click <b>Add Samples</b>.<!--        Select all of the treatment protocols for your experiment and then click <b>Add Multiple Treatments</b>. --></li></ul>');
  return opt_sb ? '' : output.toString();
};
