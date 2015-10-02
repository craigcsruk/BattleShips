var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var fs = require('fs')

router.get('/books', function(req, res){
  var filename = process.argv[3]
  fs.readFile(filename, function(e, data) {
    if (e) return res.sendStatus(500)
    try {
      books = JSON.parse(data)
    } catch (e) {
      res.sendStatus(500)
    }
    res.json(books)
  })
})

router.put('/message/:id', function(req, res){
  var id = req.params.id
  var str = require('crypto')
    .createHash('sha1')
    .update(new Date().toDateString() + id)
    .digest('hex')
  res.send(str)
})

router.get('/search', function(req, res){
  var query = req.query
  res.send(query)
})

router.post('/form', function(req, res) {
  res.send(req.body.str.split('').reverse().join(''))
})

module.exports = router;
