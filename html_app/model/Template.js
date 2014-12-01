'use strict';

if (typeof (scb.template ) == 'undefined') {
    scb.template = {};
}

scb.template.DEBUGGER = function scb_template_DEBUGGER(self, data, name) {
    _.each(data, function (value, key) {
        if (!_.contains(_.keys(self), key)) {
            scb.utils.accessor2_custom(self, key, function () {
                try {
                    throw new Error(name + " Read field " + key);
                } catch (e) {
                    console.info(e.message, e.stack);
                }
                return data[key];
            }, function (v) {
                data[key] = v;
            });
        }
    });
}

scb.TemplateWrapper = function scb_Template(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    _.each(data, function (value, key) {
        scb.Utils.initialize_accessor_field(self, data, key, value, null, context);
    });
}


scb.template.ui_experiment_setup = function scb_template_ui_experiment_setup(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    /*
     table - format of table - array - kind, title, editable, children: [table]
     */
    scb.Utils.initialize_accessor_field(self, data, 'table', [], null, context);
    /*
     actions - available actions - array - scb_f_experiment_setup_action_open_add_samples_dialog
     */
    scb.Utils.initialize_accessor_field(self, data, 'actions', [], null, context);

//    scb.Utils.initialize_accessor_field(self, data, 'techniques', [], null, context);
//    scb.Utils.initialize_accessor_field(self, data, 'gel_types', [], null, context);

    scb.template.DEBUGGER(self, data, "scb.template.ui_experiment_setup");
}

scb.template.ui_experimental_design = function scb_template_ui_experimental_design(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    scb.Utils.initialize_accessor_field(self, data, 'techniques', [], null, context);
    scb.Utils.initialize_accessor_field(self, data, 'gel_types', [], null, context);
    scb.template.DEBUGGER(self, data, "scb.template.ui_experimental_design");

}
scb.template.WesternBlot = function scb_TemplateUI_WesternBlot(data, context, parent) {
    /* this is used to format cell lines */
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    scb.Utils.initialize_accessor_field(self, data, 'format', '', null, context);
    scb.Utils.initialize_accessor_field(self, data, 'keys', {}, null, context);
    scb.template.DEBUGGER(self, data, "scb.template.WesternBlot");
}

scb.template.Microscopy = function scb_template_Microscopy(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    scb.Utils.initialize_accessor_field(self, data, 'disable_brightness', false, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'disable_blur', false, null, context);
    scb.template.DEBUGGER(self, data, "scb.template.Microscopy");

}

scb.template.UI = function scb_TemplateUI(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    scb.Utils.initialize_accessor_field(self, data, 'experimental_design', {}, scb.template.ui_experimental_design, context);
    scb.Utils.initialize_accessor_field(self, data, 'experiment_setup', {}, scb.template.ui_experiment_setup, context);
    scb.Utils.initialize_accessor_field(self, data, 'microscopy', {}, scb.template.Microscopy, context);
    /**
     add_multiple_dialog
     */
    scb.Utils.initialize_accessor_field(self, data, 'add_multiple_dialog', {}, null, context);
    /*
     western_blot
     */
    scb.Utils.initialize_accessor_field(self, data, 'western_blot', {}, scb.template.WesternBlot, context);

    _.each(data, function (value, key) {
        if (!_.contains(_.keys(self), key)) {
            scb.utils.accessor2_custom(self, key, function () {
                try {
                    throw new Error("scb.template.UI Read field '" + key + "'");
                } catch (e) {
                    console.info(e.message, e.stack, _.keys(self));
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
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
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
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    _.each(data, function (value, index) {
        self[index] = value;
    })
    self.length = data.length;
}

scb.template.CellLine = function scb_CellLine(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    scb.Utils.initialize_accessor_field(self, data, 'name', '', null, context);
    scb.template.DEBUGGER(self, data, "scb.template.CellLine");
}

scb.template.CellLines = function scb_CellLines(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    _.each(data, function (value, key) {
        scb.Utils.initialize_accessor_field(self, data, key, {}, scb.template.CellLine, context);
    });
}

scb.template.Drug = function scb_CellLine(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    scb.Utils.initialize_accessor_field(self, data, 'name', '', null, context);
    scb.Utils.initialize_accessor_field(self, data, 'concentrations', [], null, context);
    scb.template.DEBUGGER(self, data, "scb.template.Drug");
}


scb.template.Drugs = function scb_Drugs(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    _.each(data, function (value, key) {
        scb.Utils.initialize_accessor_field(self, data, key, {}, scb.template.Drug, context);
    });
}


scb.template.LysateKind = function scb_LysateKind(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    scb.Utils.initialize_accessor_field(self, data, 'name', '', null, context);
    scb.template.DEBUGGER(self, data, "scb.template.LysateKind");
}


scb.template.LysateKinds = function scb_LysateKinds(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    _.each(data, function (value, key) {
        scb.Utils.initialize_accessor_field(self, data, key, {}, scb.template.LysateKind, context);
    });
}

scb.template.PrimaryAntiBody = function scb_template_PrimaryAntiBody(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    scb.Utils.initialize_accessor_field(self, data, 'name', '', null, context);
    scb.Utils.initialize_accessor_field(self, data, 'secondary', '', null, context);
    scb.Utils.initialize_accessor_field(self, data, 'marks', [], null, context);
    scb.Utils.initialize_accessor_field(self, data, 'gel_name', '', null, context);
    scb.template.DEBUGGER(self, data, "scb.template.PrimaryAntiBody");
}

scb.template.PrimaryAntiBodies = function scb_template_PrimaryAntiBodies(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    scb.Utils.initialize_accessor_field(self, data, 'order', [], null, context);
    _.each(data, function (value, key) {
        if (key != 'order') {
            scb.Utils.initialize_accessor_field(self, data, key, {}, scb.template.PrimaryAntiBody, context);
        }
    });
}

scb.template.SecondaryAntiBody = function scb_template_SecondaryAntiBody(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    scb.Utils.initialize_accessor_field(self, data, 'name', '', null, context);
    scb.template.DEBUGGER(self, data, "scb.template.SecondaryAntiBody");
}

scb.template.SecondaryAntiBodies = function scb_template_SecondaryAntiBodies(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    _.each(data, function (value, key) {
        if (key != 'order') {
            scb.Utils.initialize_accessor_field(self, data, key, {}, scb.template.SecondaryAntiBody, context);
        }
    });
}

scb.template.Concentration = function scb_template_Concentration(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    scb.Utils.initialize_accessor_field(self, data, 'name', '', null, context);
    scb.Utils.initialize_accessor_field(self, data, 'value', 0, null, context);

}
scb.template.Concentrations = function scb_template_Concentrations(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    _.each(data, function (value, key) {
        scb.Utils.initialize_accessor_field(self, data, key, {}, scb.template.Concentration, context);
    });
}

scb.template.MicroscopyKindCondition = function scb_template_MicroscopyKindCondition(data,context, parent )
{
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    scb.Utils.initialize_accessor_field(self, data, 'name', null, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'short_name', null, null, context);
    scb.template.DEBUGGER(self, data, "scb.template.MicroscopyKindCondition");

}

scb.template.MicroscopyKindConditions = function scb_template_MicroscopyKindConditions(data, context, parent)
{
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    _.each(data, function (value, key) {
        scb.Utils.initialize_accessor_field(self, data, key, {}, scb.template.MicroscopyKindCondition, context);
    });
}

scb.template.MicroscopyKind = function scb_template_MicroscopyKind(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    scb.Utils.initialize_accessor_field(self, data, 'name', '', null , context);
    scb.Utils.initialize_accessor_field(self, data, 'conditions', {}, scb.template.MicroscopyKindConditions, context);
    scb.template.DEBUGGER(self, data, "scb.template.MicroscopyKind");
}

scb.template.MicroscopyKinds = function scb_template_MicroscopyKinds(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    _.each(data, function (value, key) {
        scb.Utils.initialize_accessor_field(self, data, key, {}, scb.template.MicroscopyKind, context);
    });
}

scb.template.Slides = function scb_template_Slides(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    _.each(data, function (value, key) {
        scb.Utils.initialize_accessor_field(self, data, key, '', null, context);
    });
}

scb.Template = function scb_Template(data, context, parent) {
    var self = this;
    scb.utils.value_hidden(self, '__data__', data);
    scb.utils.value_hidden(self, 'parent', parent);
    scb.Utils.initialize_accessor_field(self, data, 'instructions', [], scb.InstructionsList, context);
    scb.Utils.initialize_accessor_field(self, data, 'ui', {}, scb.template.UI, context);

    /*
     experiment_setup - text to display for experiment setup - scb_s_experiment_setup_instructions
     */
    scb.Utils.initialize_accessor_field(self, data, 'experiment_setup', null, null, context);
    /*
     cell_lines
     */
    scb.Utils.initialize_accessor_field(self, data, 'cell_lines', {}, scb.template.CellLines, context);
    /*
     drugs
     */
    scb.Utils.initialize_accessor_field(self, data, 'drugs', {}, scb.template.Drugs, context);
    /*
     lysate_kinds
     */
    scb.Utils.initialize_accessor_field(self, data, 'lysate_kinds', {}, scb.template.LysateKinds, context);
    /*
     primary_anti_body
     */
    scb.Utils.initialize_accessor_field(self, data, 'primary_anti_body', {}, scb.template.PrimaryAntiBodies, context);
    /*
     secondary_anti_body
     */
    scb.Utils.initialize_accessor_field(self, data, 'secondary_anti_body', {}, scb.template.SecondaryAntiBodies, context);
    /*
     concentrations
     */
    scb.Utils.initialize_accessor_field(self, data, 'concentrations', {}, scb.template.Concentrations, context);
    /*
     micro_kinds
     */
    scb.Utils.initialize_accessor_field(self, data, 'micro_kinds', {}, scb.template.MicroscopyKinds, context);
    /*
     slide_parser
     TODO: understand slide_parser
     scb_components_MicroscopyModelFactory.self.slide
     */
//    scb.Utils.initialize_accessor_field(self, data, 'slide_parser', {}, scb.template.MicroscopyKinds, context);
    /*
     slides
     */
    scb.Utils.initialize_accessor_field(self, data, 'slides', {}, scb.template.MicroscopySlides, context);
    /*
    experiment_temperatures !!!
    */
     */
    /*
     model - TODO: this will be a big one!
     */
    scb.Utils.initialize_accessor_field(self, data, 'model', {}, null, context);
    _.each(data, function (value, key) {
//    	scb.Utils.initialize_accessor_field(self,data,key,null,null,context);
        if (!_.contains(_.keys(self), key)) {
            scb.utils.accessor2_custom(self, key, function () {
                try {
                    throw new Error("scb.Template Read field " + key);
                } catch (e) {
                    console.info(e.message, e.stack);
                }
                return data[key];
            }, function (v) {
                data[key] = v;
            });
        }
    });
}

