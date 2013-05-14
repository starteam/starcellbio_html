$(function () {
    var scbi = scbi || {};

    scbi.User = Backbone.Model.extend({
        urlRoot: '/api/v1/auth/user/'
    });

    scbi.UserCollection = Backbone.Collection.extend({
        model: scbi.User,

        url: function () {
            return '/api/v1/auth/user/?' + this.params();
        },

        initialize: function (data, options) {
            options = options || {}
            this.limit = options.limit || 20;
            this.offset = options.offset || 0;
            this.total = 0;
            this.hasMore = false;
        },
        params: function () {
            var p = {
                limit: this.limit,
                offset: this.offset
            };
            return jQuery.param(p);
        },
        parse: function (resp) {
            this.total = resp.meta.total_count;
            this.offset = resp.meta.offset + this.limit;
            //       this.hasMore = this.total > this.models.length;
            return resp.objects;
        }
    });

    scbi.ViewModel = function(options) {
        this.initialize.apply(this,arguments);
    };
    _.extend(scbi.ViewModel.prototype,{
        initialize: function() {}
    });
    scbi.ViewModel.extend=Backbone.View.extend;

    scbi.UserView = scbi.ViewModel.extend({
        initialize: function(options) {
            var c = new scbi.UserCollection(null, options);
            // prepopulate the collection
            c.fetch({add: true});
            this.users = kb.collectionObservable(c);
            window.users = c;
        },
    });

    var view = new scbi.UserView();
    ko.applyBindings(view);
    window.view = view;
//    var users = new scbi.UserCollection({});
//    users.fetch();
//
//    earth = new Backbone.Model({first_name: 'Planet', last_name: 'Earth'})
//    mars = new Backbone.Model({first_name: 'Planet', last_name: 'Mars'})
//    the_moon = new Backbone.Model({first_name: 'The', last_name: 'Moon'})
//
//    planets = new Backbone.Collection([earth, the_moon, mars])
//
//    var view_model = {
//        users: kb.collectionObservable(users, {view_model: kb.ViewModel}),
//        planets: kb.collectionObservable(planets, {view_model: kb.ViewModel})
//    };
//
//    window.scbi = scbi;
//    window.view_model = view_model;
//    window.users = users;
//
//        ko.applyBindings(view_model, $('#kb_collection2')[0]);
//        ko.applyBindings(view_model, $('#kb_collection')[0]);

});