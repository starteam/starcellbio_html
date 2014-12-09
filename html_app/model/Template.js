'use strict';

scb.TemplateWrapper = function scb_Template(data, context, parent) {
    var self = this;
    self.parent = parent;
    _.each(data, function (value, key) {
        scb.Utils.initialize_accessor_field(self, data, key, value, null, context);
    });
}

if( typeof (scb.template ) == 'undefined') {
	scb.template = {};
}


scb.template.ui_experiment_setup = function scb_template_ui_experiment_setup(data,context,parent) {
    var self = this;
    self.parent = parent;
//    scb.Utils.initialize_accessor_field(self, data, 'techniques', [], null, context);
//    scb.Utils.initialize_accessor_field(self, data, 'gel_types', [], null, context);
    _.each(data, function (value, key) {
        if (!_.contains(_.keys(self), key)) {
            scb.utils.accessor2_custom(self, key, function () {
                try {
                    throw new Error("scb.template.scb_template_ui_experiment_setup Read field " + key);
                } catch (e) {
                    //console.info(e.message, e.stack);
                }
                return data[key];
            }, function (v) {
                data[key] = v;
            });
        }
    });

}

scb.template.ui_experimental_design = function scb_template_ui_experimental_design(data,context,parent) {
    var self = this;
    self.parent = parent;
    scb.Utils.initialize_accessor_field(self, data, 'techniques', [], null, context);
    scb.Utils.initialize_accessor_field(self, data, 'gel_types', [], null, context);
    _.each(data, function (value, key) {
        if (!_.contains(_.keys(self), key)) {
            scb.utils.accessor2_custom(self, key, function () {
                try {
                    throw new Error("scb.template.ui_experimental_design Read field " + key);
                } catch (e) {
                    //console.info(e.message, e.stack);
                }
                return data[key];
            }, function (v) {
                data[key] = v;
            });
        }
    });

}

scb.template.UI = function scb_TemplateUI(data, context, parent) {
    var self = this;
    self.parent = parent;
    scb.Utils.initialize_accessor_field(self, data, 'experimental_design', {}, scb.template.ui_experimental_design, context);
    scb.Utils.initialize_accessor_field(self, data, 'experiment_setup', {}, scb.template.ui_experiment_setup, context);

    _.each(data, function (value, key) {
        if (!_.contains(_.keys(self), key)) {
            scb.utils.accessor2_custom(self, key, function () {
                try {
                    throw new Error("scb.template.UI Read field '" + key + "'");
                } catch (e) {
                    //console.info(e.message, e.stack,_.keys(self));
                }
                return data[key];
            }, function (v) {
                data[key] = v;
            });
        }
    });

}

scb.Instructions = function scb_Instructions(data, context, parent) {
    //TODO: make this accessors (custom)
    var self = this;
    self.parent = parent;
    _.each(data, function (value, index) {
        self[index] = value;
    })
    self.length = data.length;
    self['title'] = data[0];
    self['text'] = data[1];
}

scb.InstructionsList = function scb_InstructionsList(data, context, parent) {
    var self = this;
    //TODO: make this accessors (custom)
    self.parent = parent;
    _.each(data, function (value, index) {
        self[index] = value;
    })
    self.length = data.length;
}

scb.Template = function scb_Template(data, context, parent) {
    var self = this;
    self.parent = parent;
    scb.Utils.initialize_accessor_field(self, data, 'instructions', [], scb.InstructionsList, context);
    scb.Utils.initialize_accessor_field(self, data, 'ui', {}, scb.template.UI, context);
    _.each(data, function (value, key) {
//    	scb.Utils.initialize_accessor_field(self,data,key,null,null,context);
        if (!_.contains(_.keys(self), key)) {
            scb.utils.accessor2_custom(self, key, function () {
                try {
                    throw new Error("scb.Template Read field " + key);
                } catch (e) {
                   // console.info(e.message, e.stack);
                }
                return data[key];
            }, function (v) {
                data[key] = v;
            });
        }
    });
}