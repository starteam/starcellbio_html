'use strict';

scb.CellTreatmentList = function scb_CellTreatmentList(data, context, parent) {
	var self = this;
	self.parent = parent;

	scb.ModelHelpers.common_list_code(self, data, scb.CellTreatment, context);

	self.start = function(d) {
		d = ( typeof (d) == 'undefined' ? {} : d);
		var ret = new scb.CellTreatment(d, context, self);
		data.list.push(d);
		return ret;
	}

	self.duplicate = function(id) {
        var new_list = [];
        var list = data.list ;
        for( var i in list )
        {
            var elem = list[i];
            new_list.push(elem)
            if( id == elem.id)
            {
                var new_elem = scb.Utils.clone_and_clear(elem);
                new_list.push( new_elem );
            }
        }
        data.list = new_list;
//		return self.start(scb.Utils.clone_and_clear(scb.utils.find(data.list,id)));
	}
}

scb.CellTreatment = function scb_CellTreatment(data, context, parent) {
	var self = this;
	self.parent = parent;

	scb.ModelHelpers.common_entry_code(self, data, context);

	scb.Utils.initialize_accessor_field(self,data,'cell_line','',null,context);
	scb.Utils.initialize_accessor_field(self,data,'treatment_list',{},scb.TreatmentList,context);
	scb.Utils.initialize_accessor_field(self,data,'stimulation_time','',null,context);
	scb.Utils.initialize_accessor_field(self,data,'collection_schedule_list',{},scb.CollectionScheduleList, context);
	scb.Utils.initialize_accessor_field(self,data,'identifier','',null,context);

    self.format_row = function()
    {
        var display_text = self.name;
        var template = context.template;
        if( template.ui.western_blot.format )
        {
            var orig_template = template.ui.western_blot.format;
            var new_text = '' + orig_template
            var keys = template.ui.western_blot.keys;
            var resolve = function(value)
            {
                var ret = self;
                var success = true;
                _.each(value.attr,function(e){
                    if(!_.isUndefined(ret[e]))
                    {
                        ret = ret[e];
                    }
                    else
                    {
                        success = false;
                    }
                });
                var text = template;
                if(value.hasOwnProperty('map')){
                    _.each(value.map,function(e){
                        if(!_.isUndefined(text[e]))
                        {
                            text = text[e];
                        }
                        if(e=='%KEY%' && !_.isUndefined(text[ret]))
                        {
                            text = text[ret];
                        }
                    });
                }else{
                    text = ret;
                }

                if(! success && scb.utils.isDefined(value.default) )
                {
                    text = value.default;
                }
                return text;
            }
            _.each(keys, function(value,key,keys){
                var regexp = new RegExp(key);
                new_text = new_text.replace( regexp , resolve(value));
            });
            display_text = new_text == orig_template ? display_text : new_text;
            display_text = display_text.replace(/(, *)+/g, ", ");
        }
        return display_text;
    };

	scb.Utils.accessor_toString(self.cell_line);
}