
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.about = function(req, res){
  res.render('about', { title: 'About Page' });
};
exports.blogpost = function(req, res){
  res.render('blogpost', { title: 'Blog Post' });
};
