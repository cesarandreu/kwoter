
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , shortId = require('shortid');

var app = express();

mongoose.connect('mongodb://localhost/kwoter');

var KwoterSchema = new mongoose.Schema({
  quote: String,
  author: String,
  url: String,
  source: String
});

var Kwoter = mongoose.model('Kwoter', KwoterSchema, 'kwoter', false);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  res.render('index', {error: false, length: false, nav: 'home'});
});

//Someone submits a new quote.
app.post('/', function(req, res) {

  //Checks if there's an actual quote and author.
  if(!req.body.quote || !req.body.author){
    res.render('index', {error: true, length: false, nav: 'home'});

  //Checks if it does not pass the character limit. 
  } else if(req.body.quote.length >= 500 || req.body.author.length >= 50){
    res.render('index', {error: false, length: true, nav: 'home'});

  } else{

  //Checks if the quote already exists.
    Kwoter.findOne({quote: req.body.quote, author: req.body.author}).exec(function(err, result) {
      if(err){
        console.log('Error: ' + err);
        res.render('index', {error: true, length: true, nav: 'home'});

      } else{

        //Redirects you to the quote's URL if it already exists.
        if(result){
          res.redirect('/q/'+result.url);

        //Otherwise it stores the quote in the database.
        } else{

          //Quote source
          var sourceText;
          if(req.body.source){
            sourceText = req.body.source;
          } else {
            sourceText = '';
          }

          //Quote URL
          //Need to add a check here to make sure that the quoteURL is not repeteated.
          var quoteURL = shortId.generate();

          var newQuote = new Kwoter({quote: req.body.quote, author: req.body.author, url: quoteURL, source: sourceText});
          newQuote.save(function(err) {
            if(err){
              console.log('Error: ' + err);
              res.render('index', {error: true, length: false, nav: 'home'});
            } else{
              res.redirect('/q/'+quoteURL);
            }
          });
        }
      }
    });
  }
});


app.get('/q/:id', function(req, res) {
  if(!req.params.id){
      res.render('quote', {exist: false, url: '', quote: '', author: '', host: req.host, source: '', nav: 'quote'});
  } else{
    Kwoter.findOne({url: req.params.id}).exec(function(err, result) {
      if(err){
        console.log('Error: ' + err);
        res.render('quote', {exist: false, url: '', quote: '', author: '', host: req.host, source: '', nav: 'quote'});
      } else{
        if(!result){
          res.render('quote', {exist: false, url: '', quote: '', author: '', host: req.host, source: '', nav: 'quote'});
        } else{
          res.render('quote', {exist: true, url: result.url, quote: result.quote, author: result.author, host: req.host, source: result.source, nav: 'quote'});
        }
      }
    });
  }

});

app.get('/about', function(req, res) {
  res.render('about', {nav: 'about'});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


