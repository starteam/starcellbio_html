 'use strict';
scb.ModelHelpers = {};
scb.ModelHelpers.common_list_code = function (self, data, proto, context) {

    scb.utils.initialize_field(data, 'list', []);
    scb.utils.initialize_field(data, 'selected_id', null);
    scb.utils.initialize_field(data, 'counter', 1);

    scb.utils.initialize_field(self, 'selected', null);
    scb.utils.wrap_list(self, 'list', data, proto, context);

    if (!scb.utils.isDefined(self.selected_id)) {
        scb.utils.accessor2(self, 'selected_id', data);
    }
    scb.utils.accessor2_custom(self, 'selected', function () {
        var selected_id = self.selected_id;
        if (selected_id != null) {
            return new proto(scb.utils.find(data.list, selected_id), context, self);
        } else {
            return null;
        }
    }, scb.utils.read_only_exception);

    self.get = function (id) {
        var d = scb.utils.find(data.list, id);
        return scb.utils.isDefined(d) ? new proto(d, context, self) : null;
    }

    self.remove = function (id) {
        var new_list = scb.utils.reject(data.list, id);
        data.list.length = 0;
        for (var i in new_list) {
            data.list.push(new_list[i]);
        }
        if (id == data.selected_id) {
            data.selected_id = null;
        }
    }

    scb.utils.accessor2_custom(self, 'length', function () {
        return data.list.length;
    }, scb.utils.read_only_exception);

    self.__data__ = data;

}

scb.ModelHelpers.grouped_list = function(self,childs_field) {// is called from FacsLanes, childs_field == 'cell_treatment_id'
    scb.utils.accessor2_custom(self, 'grouped_list', function () {
        var list = self.list;
        var ret = _.groupBy(_.sortBy(list, function (e) {
            return e.created_at;
        }), function (e) {
            return e[childs_field];
        });
        return ret;
    }, scb.utils.read_only_exception);
}

scb.ModelHelpers.common_entry_code = function (self, data, context) {
    if(! data )
    {
        console.info( "HERE" ) ;
    }
    scb.Utils.initialize_field(data, 'id', scb.Utils.generateUUID(self.constructor.name + '_'));
    scb.Utils.initialize_field(data, 'name', data.id);
    scb.Utils.initialize_field(data, 'description', '');
    scb.Utils.initialize_field(data, 'created_at', (new Date()).getTime());

    scb.utils.accessor2_getter_only(self, 'id', data);
    scb.utils.accessor2(self, 'name', data);
    scb.utils.accessor2(self, 'description', data);

    self.__data__ = data;
}
