//'use strict';
if (typeof (scb.Utils ) == 'undefined') {
    scb.Utils = {};
    scb.utils = scb.Utils;
}

scb.utils.generateUUID = function (name) {
    var prefix;
    if (typeof (name ) == 'undefined') {
        prefix = 'scb_';
    } else {
        prefix = name;
    }
    var token = Math.floor(Math.random() * 1000000000).toString(27) + Math.floor(Math.random() * 1000000000).toString(27);
    //+ Math.floor(Math.random() * 1000000000).toString(27);
    return prefix + token;
}

scb.utils.noop = function () {
};
/**
 * Special serializer
 * It will assume that stuff is:
 *         -- object
 *         -- string
 *         -- custom_object with data field for internal stuff
 *         -- it will be able to recreate things with calling constructor
 *
 */
scb.utils.print = function (data) {
    if (typeof (data) == 'object') {
        var name = data.__proto__.constructor.name;
        if (data.hasOwnProperty('data')) {
            var dump = {};
            for (var x in data.data) {
                dump[x] = scb_Utils.print(data.data[x]);
            }
            var ret = {};
            ret[name] = dump;
            return ret;
        } else if (name == 'Array') {
            var dump = [];
            for (var x in data) {
                dump.push(scb_Utils.print(data[x]));
            }
            var ret = {};
            ret['Array'] = dump;
            return ret;
        }
    } else if (typeof (data) == 'string') {
        return data;
    } else {
        return data.toString();
    }
}

scb.utils.initialize_accessor_field = function (self, data, name, default_value, proto, context) {
    scb.utils.initialize_field(data, name, default_value);
    if (proto == null) {
        scb.Utils.accessor2(self, name, data);
    }
    else {
        self[name] = new proto(data[name], context, self);
    }
}

scb.utils.initialize_field = function (obj, name, default_value) {
    if (typeof (obj) != 'undefined') {
        if (!obj.hasOwnProperty(name)) {
            obj[name] = default_value;
        }
        if (typeof (obj[name] ) == 'undefined') {
            obj[name] = default_value;
        }
    } else {
        console.info("OBJ is null!");
    }
}

scb.utils.accessor = function (obj, name, new_value) {
    var ret = obj[name];
    if (typeof (new_value) != 'undefined') {
        obj[name] = new_value;
    }
    return ret;
}

scb.utils.accessor_toString = function (fn) {
    fn.toString = function () {
        return fn();
    }
}

scb.utils.parse_time = function (str, unit) {
    var time = 0;
    var input = "" + str;
    input = input.trim();
    if (input.match('[nN][oO][wW]')) {
        return 0;
    }
    var daysRegex = new RegExp("([0-9\.]+) *d");
    if (true) {
        var match = input.match(hourRegex);
        if (match != null && match.length > 1) {
            time += parseFloat(match[1]) * 24 * 3600;
        }
    }
    var hourRegex = new RegExp("([0-9\.]+) *h");
    if (true) {
        var match = input.match(hourRegex);
        if (match != null && match.length > 1) {
            time += parseFloat(match[1]) * 3600;
        }
    }
    var minuteRegex = new RegExp("([0-9\.]+) *m");
    if (true) {
        var match = input.match(minuteRegex);
        if (match != null && match.length > 1) {
            time += parseFloat(match[1]) * 60;
        }
    }
    var secondRegex = new RegExp("([0-9\.]+) *s");
    if (true) {
        var match = input.match(secondRegex);
        if (match != null && match.length > 1) {
            time += parseFloat(match[1]) * 1;
        }
    }
    var hourSecondRegex = new RegExp("([0-9]+):([0-9]+)")
    if (true) {
        var match = input.match(hourSecondRegex);
        if (match != null && match.length > 1) {
            time += parseFloat(match[1]) * 3600 + parseFloat(match[2]) * 60;
        }
    }

    if (time == 0) {
        var funit = 60;
        if (unit == 'hours') {
            funit = 3600;
        }
        if (unit == 'seconds') {
            funit = 1;
        }
        time = parseFloat(input) * funit;
    }
    return time;
}

scb.utils.print_time = function (value) {
    var time = parseFloat(value);
    //var days = Math.floor(time / 86400);
    			var days = Math.floor((time % 604800) / 86400);

    var hours = Math.floor((time % 86400) / 3600);
    var minutes = Math.floor((time % 3600) / 60);
    var seconds = Math.floor(time % 60);
			var months = Math.floor(time /2592000);
			
			var weeks = Math.floor((time % 2592000) / 604800);
    var now = (time < 60 );
    return scb_common.format_time_detailed({
    	weeks: weeks,
        days:days,
        hours:hours,
        minutes:minutes,
        months: months,
        seconds:seconds,
        now:now
    }).trim();
}

scb.utils.print_time_w_seconds = function (value) {
    var time = parseFloat(value);
   	var days = Math.floor(time / 86400);
   	//var days = Math.floor((time % 604800) / 86400);

    var hours = Math.floor((time % 86400) / 3600);
    var minutes = Math.floor((time % 3600) / 60);
    var seconds = Math.floor(time % 60);

			var months = Math.floor(time /2592000);
			
			var weeks = Math.floor((time % 2592000) / 604800);

    var now = (time < 1 );
    return scb_common.format_time_detailed_w_sec({
        days:days,
        hours:hours,
        minutes:minutes,
        months:  months,
        seconds:seconds,
        now:now
    }).trim();
}


scb.utils.keys = function (map) {
    return _.map(map, function (v, k, l) {
        return k;
    });
}

scb.utils.get_attribute = function (object, attribute) {
    var ret = $(object).attr(attribute)
    if (typeof (ret) == 'undefined') {
        var undefined;
        $(object).parent().each(function (i, e) {
            ret = typeof (ret) == 'undefined' ? scb.Utils.get_attribute(e, attribute) : undefined
        });
        return ret;
    } else {
        return ret;
    }
}

scb.utils.clone_and_clear = function (obj) {
    var ret = JSON.parse(JSON.stringify(obj));
    delete ret.id;
    return ret;
}

scb.utils.position_div_over = function (t, div) {
    var offset = $(t).position();
    var top = offset.top + 3;
    var left = offset.left + 3;
    var width = parseFloat($(t).width()) + 6;
    var height = parseFloat($(t).height()) + 6;
    var top_offset = div.parent().position().top;
    div.css('position', 'absolute').css('top', (top - top_offset) + 'px').css('left', left + 'px').css('width', width + 'px').css('min-height', height + 'px').show().unbind('click');
}

scb.utils.isUndefined = function (a) {
    return typeof (a) == 'undefined' || a == null;
}

scb.utils.isDefined = function (a) {
    return typeof (a) != 'undefined';
}

scb.utils.accessor2 = function (obj, field, source) {
    Object.defineProperty(obj, field, { get:function () {
        return source[field];
    }, set:function (d) {
        source[field] = d;
    },enumerable:true});
}

scb.utils.value_hidden = function (obj, field, value) {
    Object.defineProperty(obj, field, { get:function () {
        return value;
    }, set:function (d) {
        value = d;
    },enumerable:false});
}

scb.utils.accessor2_with_setter = function (obj, field, source, setter) {
    Object.defineProperty(obj, field, { get:function () {
        return source[field];
    }, set:function (d) {
        source[field] = d;
        setter(d);
    }});
}
//JSON getter 
scb.utils.accessor2_getter_only = function (obj, field, source) {
    Object.defineProperty(obj, field, { get:function () {
        return source[field];
    }, set:function (d) {
        throw "READ ONLY FIELD";
    }});
}

scb.utils.accessor2_custom = function (obj, field, getter, setter) {
    Object.defineProperty(obj, field, { get:function () {
        return getter();
    }, set:function (d) {
        return setter(d);
    }});
}

scb.utils.read_only_exception = function () {
    throw "READ ONLY FIELD";
}

scb.utils.tools_hover = function (target, top) {
    scb.utils.off_on($(top), 'mouseenter', target, function () {
        $(this).addClass('highlight_editable_element');
        $('.experiment_row_treatment_tools', $(this)).show();
        $('.experiment_row_treatment_tools_spacer', $(this)).hide();
    });
    scb.utils.off_on($(top), 'mouseleave', target, function () {
        $(this).removeClass('highlight_editable_element');
        $('.experiment_row_treatment_tools', $(this)).hide();
        $('.experiment_row_treatment_tools_spacer', $(this)).show();
    });
}

scb.utils.tools_hover_off = function (target, top) {
    $(top).off('mouseenter', target);
    $(top).off('mouseleave', target);
}


scb.utils.find = function (list, id) {
    return _.find(list, function (s) {
        return s.id == id
    });
}

scb.utils.reject = function (list, id) {
    return _.reject(list, function (s) {
        return s.id == id
    });
}

scb.utils.wrap_list = function (obj, field, source, proto, context) {
    Object.defineProperty(obj, field, {
        get:function () {
            var ret = [];
            var list = source[field];
            for (var i in list) {
                var d = list[i];
                if (obj.sort_order == 'reverse') {
                    ret.unshift(new proto(d, context, obj));
                } else {
                    ret.push(new proto(d, context, obj));
                }
            }
            return ret;
        }, set:function (d) {
            throw 'READ ONLY FIELD';
        }});
    Object.defineProperty(obj, field + "_size", {
        get:function () {
            return source[field].length;
        }, set:function (d) {
            throw 'READ ONLY FIELD';
        }});
}

scb.utils.call_back = function (callback, state) {
    if (typeof (callback ) == 'function') {
        callback(state);
    }
}

scb.utils.off_on = function (jq, event, selector, fn) {
    $(jq).off(event, selector);
    $(jq).on(event, selector, fn);
}

scb.utils.any_key = function (map) {
    return Object.keys(map)[0];
}

scb.utils.get = function (root, accessors, _default) {
    if (accessors.length == 0) {
        return root;
    }
    var x = accessors.shift();
    if (root.hasOwnProperty(x)) {
        return scb.utils.get(root[x], accessors, _default);
    }
    return _default;
}
/// WORKS WITH ASCII ONLY - NEED TO FIX FOR HIGH CHARS
scb.utils.lzw_encode = function(s) {
    var d = new Date();

    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }

    var retrunedresult = out.join("");
    console.log("Input: " + s.length/1024 + "kb Output:"+ retrunedresult.length/1024 + "kb Rate: " +(s.length/retrunedresult.length) );
    console.log((new Date()).getTime() - d.getTime() + ' ms.');
    return retrunedresult;
}

scb.utils.lzw_decode = function(s) {
var dict = {};
var data = (s + "").split("");
var currChar = data[0];
var oldPhrase = currChar;
var out = [currChar];
var code = 256;
var phrase;
for (var i=1; i<data.length; i++) {
var currCode = data[i].charCodeAt(0);
if (currCode < 256) {
    if( currCode == 1 )
    {
        i++;
    }
phrase = data[i];
}
else {
phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
}
out.push(phrase);
currChar = phrase.charAt(0);
dict[code] = oldPhrase + currChar;
code++;
oldPhrase = phrase;
}
return out.join("");
}