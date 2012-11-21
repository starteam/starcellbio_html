scb.components = scb.components || {};

scb.components.ModelFactory = function scb_components_ModelFactory(template) {
	var self = this;

	if(scb.utils.isDefined(template.model.western_blot)) {
		self.western_blot = new scb.components.WesternBlotModelFactory(template.model.western_blot, template);
	}
	if(scb.utils.isDefined(template.model.facs)) {
		self.facs = new scb.components.FACSModelFactory(template.model.facs, template);
	}
}