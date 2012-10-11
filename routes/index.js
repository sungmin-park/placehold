require('coffee-script');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.placehold = require('./placehold');