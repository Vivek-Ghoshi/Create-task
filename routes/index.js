var express = require('express');
var router = express.Router();
const fs = require('node:fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readdir("./files",function(err,files){
    if(!files){
      res.status("404").send(err)
     }
     else res.render('index', { title:"Create notes", files });
  })
});
router.post("/create", function(req,res){
  var filename = req.body.name.split(' ').join('') + '.txt'
  fs.writeFile(`./files/${filename}`,req.body.description,function(err,files){
    if(err){
      res.status('404').send(err)
    } else res.redirect('/')
  })
});

module.exports = router;
