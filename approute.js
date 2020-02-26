exports.route = function(app, controller){
    var controllerObject = require('./controllers/' + controller);

    app.get('/'+controller, controllerObject.index);

    app.get('/'+controller + '/add', controllerObject.addForm);
    app.post('/'+controller + '/add', controllerObject.create);

    app.get('/'+controller + '/del/:bid', controllerObject.deleteForm);
    app.post('/'+controller+'/del', controllerObject.delete);

    app.get('/'+controller + '/edit/:bid', controllerObject.editForm);
    app.put('/'+controller + '/edit', controllerObject.edit);

    
    app.get('/'+controller + '/:bid', controllerObject.show);
};