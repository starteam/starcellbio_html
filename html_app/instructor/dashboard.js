$(function () {
    var scbi = scbi || {};

    scbi.ViewModel = function (options) {
        this.initialize.apply(this, arguments);
    };
    _.extend(scbi.ViewModel.prototype, {
        initialize: function () {
        }
    });
    scbi.ViewModel.extend = Backbone.View.extend;


    scbi.User = Backbone.RelationalModel.extend({
        urlRoot: '/api/v1/auth/user/'
    });

    scbi.UserCollection = Backbone.Collection.extend({
        model: scbi.User,

        url: new scbi.User().urlRoot,

        parse: function (resp) {
            return resp.objects;
        }
    });

    scbi.Course = Backbone.RelationalModel.extend({
        urlRoot: '/api/v1/scb/course/',

        relations: [
            {
                type: Backbone.HasOne,
                key: 'owner',
                relatedModel: scbi.User,
                reverseRelation: {
                    key: 'courses',
                    includeInJSON: false
                }
            }
        ]

    });


    scbi.CourseCollection = Backbone.Collection.extend({
        model: scbi.Course,

        url: new scbi.Course().urlRoot,

        parse: function (resp) {
            return resp.objects;
        },
    });


    scbi.Assignment = Backbone.RelationalModel.extend({
        urlRoot: '/api/v1/scb/assignment/',

        relations: [
            {
                type: Backbone.HasOne,
                key: 'course',
                relatedModel: scbi.Course,
                reverseRelation: {
                    key: 'assignments'
                }
            }
        ]
    });

    scbi.AssignmentCollection = Backbone.Collection.extend({
        model: scbi.Assignment,

        url: new scbi.Assignment().urlRoot,

        parse: function (resp) {
            return resp.objects;
        }
    });

    scbi.Views = scbi.ViewModel.extend({
        initialize: function (options) {
            options = options ? options : {};
            var users = new scbi.UserCollection(null, options);
            users.fetch({add: true});
            this.users = kb.collectionObservable(users);
            scbi.users = users;

            var courses = new scbi.CourseCollection(null, options);
            courses.fetch({add: true});
            this.courses = kb.collectionObservable(courses);
            scbi.courses = courses;

            var assignments = new scbi.AssignmentCollection(null, options);
            assignments.fetch({add: true});
            this.assignments = kb.collectionObservable(assignments);
            scbi.assignments = assignments;

        }
    });

    scbi.courseChange = function (modelView, event) {
        var model = modelView.model();
        var ret = model.save(model.attributes, {
            error: function (a, b, c) {
                var json = { error_message: "Error communicating to the server!"};
                try {
                    json = JSON.parse(b.responseText);
                } catch (e) {
                }
                ;
                alert(json.error_message);
                a.fetch({
                    success: function () {
                    }
                });
            }
        });
        window.ret = ret;
        console.info(ret);
    }

    var view = new scbi.Views();
    ko.applyBindings(view);
    window.view = view;
    window.scbi = scbi;


})
;