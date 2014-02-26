'use strict';// strict mode to eliminate some common bugs

scb.LensMapProxy = { 
'original': null,
'display' :null,
'cache': null
};

scb.LensMap = function scb_LensMap(data, context, parent) {
    var self = this;
    self.parent = parent;
    scb.ModelHelpers.common_entry_code(self, data, context);
    scb.Utils.initialize_accessor_field(self, data, 'action', null, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'blur', null, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'brightness', null, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'cache_blur', null, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'cache_brightness', null, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'height', null, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'width', null, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'src', null, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'xparam', null, null, context);
        scb.Utils.initialize_accessor_field(self, data, 'mag', null, null, context);
        scb.Utils.initialize_accessor_field(self, data, 'if_type', null, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'yparam', null, null, context);
    
    var template = context.template;
    
    self.disable_blur = template.ui.microscopy.disable_blur;
        self.disable_brightness = template.ui.microscopy.disable_brightness;

    
	scb.utils.accessor2_custom(self, 'orig', function () {
            return scb.LensMapProxy.original;
    }, function (d) {
            scb.LensMapProxy.original = d;
    });
    scb.utils.accessor2_custom(self, 'cache', function () {
            return scb.LensMapProxy.cache;
    }, function (d) {
            scb.LensMapProxy.cache = d;
    });

	scb.utils.accessor2_custom(self, 'display', function () {
            return scb.LensMapProxy.display;
    }, function (d) {
            scb.LensMapProxy.display = d;
    });


}