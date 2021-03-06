// create app, configurations and api routes
var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    swig = require('swig'),
    path = require('path')

var app = express();

// setValue and getValue are merely alias
// for app.set and app.get used in the less
// common way of setting application variables.  // Taken from FSG
app.setValue = app.set.bind(app);
app.getValue = function(mypath) {
    return app.get(mypath);
};

// Set middlewares
//// Show activity in console
app.use(logger('dev'));
//// Parse cookies
app.use(cookieParser());
//// Parse our POST and PUT bodies.
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set view render engine
// Set view render engine
app.engine('html', swig.renderFile);
app.setValue('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Set root directory path
app.setValue('root', path.join(__dirname, '../../'));


// Allowing 'index.html' to access files in the following folders
var root = app.getValue('root');
app.use(express.static(path.join(root, './node_modules')));
app.use(express.static(path.join(root, './public')));
app.use(express.static(path.join(root, './browser')));

// Views cache
app.setValue('view cache', true);

// Set cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// All data routes will be prefaced with /api
app.use('/api', require('./router'));

// All get routes that go through the pipeline, past /api, will get the single page layout
app.get('/*', (req, res) => {
    res.render('index');
});

// function get(artist, callback) {        
    
//    request('http://itunes.apple.com/search?term='+ artist + '&attribute=artistTerm&entity=album&limit=300', function(err, response, body) {     
        
//      callback( JSON.parse(body) )       
//    })       
    
//  }      
    
//  app.get('/stocks', function(req,res,next){       
                
//  })     
    

module.exports = app;