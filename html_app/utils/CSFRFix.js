$(document).ajaxSend(function (event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});

if (typeof (scb.Utils ) == 'undefined') {
    scb.Utils = {};
    scb.utils = scb.Utils;
}

scb.utils.server = scb.utils.server || {};

scb.utils.getCsfrToken = function () {
    var name = 'csrftoken';
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

scb.utils.server.is_auth = function (callback) {
scb.utils.call_back(callback, {
                success: true,
                data: {}
            });
    return;
    $.ajax({url: '/scb/is_auth/', data: '', type: 'GET', success: function (a, b, c) {
        if (b == "success") {
            var ret = JSON.parse(a);
            console.info(ret);
            scb.utils.call_back(callback, {
                success: true,
                data: ret
            });
        }
        else {
            scb.utils.call_back(callback, {
                success: false,
                data: { user: null }
            });
        }
    }});
}

scb.utils.server.call = function (data, callback) {
    scb.utils.call_back(callback, {
                success: true,
                data: {}
            });
    return;
    $.ajax({url: '/scb/is_auth/', type: data ? 'POST' : 'GET',
        data: data,
//        context: document.body,
//        cache: false,
//        dataType: "application/json",
        processData: false,
        success: function (a, b) {
            if (b == "success") {
                var ret = a;
                console.info(ret);
                if (ret.command && ret.command.load) {
                    ret.data = window[ret.command.load];
                }
                scb.utils.call_back(callback, {
                    success: true,
                    data: ret.data,
                    user: ret.user
                });
            }
            else {
                scb.utils.call_back(callback, {
                    success: false,
                    data: null,
                    user: null
                });
            }
        }, error: function (a, b, c) {
            console.info(a);
            console.info(b);
            console.info(c);

            scb.utils.call_back(callback, {
                success: false,
                data: null,
                user: null
            });
        }

    });
}