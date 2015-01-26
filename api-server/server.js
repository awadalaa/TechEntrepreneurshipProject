var express         = require('express');
var favicon         = require('serve-favicon');
// var methodOverride  = require('method-override');
var path            = require('path');
var passport        = require('passport');
var bodyParser      = require('body-parser');
var config          = require('./libs/config');
var log             = require('./libs/log')(module);
var oauth2          = require('./libs/oauth2');
var PostModel       = require('./libs/mongoose').PostModel;
var logger = require('morgan');
var app = express();

//app.use(favicon(__dirname + '/client/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

// app.use(methodOverride('X-HTTP-Method-Override'));

app.get('/api', passport.authenticate('bearer', { session: false }), function (req, res) {
    res.send('API is running');
});

app.get('/api/posts', passport.authenticate('bearer', { session: false }), function(req, res) {
    return PostModel.find(function (err, posts) {
        if (!err) {
            return res.send(posts);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.post('/api/posts', passport.authenticate('bearer', { session: false }), function(req, res) {
    var post = new PostModel({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        images: req.body.images
    });

    post.save(function (err) {
        if (!err) {
            log.info("post created");
            return res.send({ status: 'OK', post:post });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
    });
});

app.get('/api/posts/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
    console.log('here we are in posts/id');
    console.log(req.params.id);
    return PostModel.findById(req.params.id, function (err, post) {
        if(!post) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', post:post });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.put('/api/posts/:id', passport.authenticate('bearer', { session: false }), function (req, res){
    return PostModel.findById(req.params.id, function (err, post) {
        if(!post) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }

        post.title = req.body.title;
        post.description = req.body.description;
        post.author = req.body.author;
        post.images = req.body.images;
        return post.save(function (err) {
            if (!err) {
                log.info("post updated");
                return res.send({ status: 'OK', post:post });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                log.error('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });
});

app.delete('/api/posts/:id', passport.authenticate('bearer', { session: false }), function (req, res){
    return PostModel.findById(req.params.id, function (err, post) {
        if(!post) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return post.remove(function (err) {
            if (!err) {
                log.info("post removed");
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });
});

app.post('/oauth/token', oauth2.token);

app.get('/api/userInfo',
    passport.authenticate('bearer', { session: false }),
        function(req, res) {
            // req.authInfo is set using the `info` argument supplied by
            // `BearerStrategy`.  It is typically used to indicate scope of the token,
            // and used in access control checks.  For illustrative purposes, this
            // example simply returns the scope in the response.
            res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope })
        }
);

app.get('/ErrorExample', function(req, res, next){
    next(new Error('Random error!'));
});

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, "client")));

require('./libs/auth');

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

app.listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});