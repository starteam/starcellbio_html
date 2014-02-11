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
    
//     self.rows_state = function (exp) {
//         var skip_placeholders = false;
//         if (_.keys(context.template.micro_kinds).length == 1) {
//             skip_placeholders = true;
//         }
//         var experiment = exp || self.parent.parent;
//         var grouped_rows = self.lanes_list.grouped_list;
//         var rows = [];
//         _.each(experiment.cell_treatment_list.list, function (e) {
//             if (grouped_rows[e.id]) {
//                 _.each(grouped_rows[e.id], function (ee, index) {
//                     rows.push({
//                         kind:'existing',
//                         cell_treatment:e,
//                         lane:ee,
//                         display_sample:index == 0,
//                         is_sample_enabled:self.is_cell_treatment_enabled[e.id],
//                         index:index,
//                         is_valid:self.is_cell_treatment_enabled[e.id] && ee && ee.slide_conditions,
//                         display_text: e.format_row()
//                     });
//                 	
//                 });
//                 if (!skip_placeholders) {
//                     rows.push({
//                         kind:'placeholder',
//                         display_sample:false,
//                         cell_treatment:e,
//                         is_sample_enabled:self.is_cell_treatment_enabled[e.id],
//                         is_valid:false
//                     });
//                 }
//             } else {
//                 rows.push({
//                     kind:'new',
//                     row_type:'new',
//                     display_sample:true,
//                     cell_treatment:e,
//                     is_sample_enabled:self.is_cell_treatment_enabled[e.id],
//                     is_valid:false,
//                     display_text: e.format_row()
//                 })
//             }
//         });
//         var count = 0;
//         _.each(rows, function (e) {
//             if (e.is_valid) count++;
//         });
//         rows = _.sortBy(rows, function(obj){ if(obj.kind=='existing')return obj.lane.order_id; else return;});
//         return {rows:rows, valid:count};
//     }



}