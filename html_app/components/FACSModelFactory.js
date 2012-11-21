scb.components = scb.components || {};

scb.components.FACSModelFactory = function scb_components_FACSModelFactory(model, template) {
	var self = this;

	if (scb.utils.isDefined(model.dna)) {
		self.dna = function(state) {
			// here we need to compute how this actually works
			/* I think:
				- Model will initiate random stuff when it starts
				- Here we will move model depending on drugs
				- And finish with collection time
				- Visualizer will count from here and draw DNA curve
			*/
		}
	}

	self.compute = function(state) {
		return self.dna(state);
	}
}