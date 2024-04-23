var express = require('express');
const { create } = require('node:domain');
var router = express.Router();
const fs = require('node:fs');
const { title } = require('node:process');

router.get("/",function(req,res){
  var filesArr = [];
  fs.readdir("./files",function(err,files){
     files.forEach(function(file){
       var data = fs.readFileSync(`./files/${file}`, "utf-8")
      filesArr.push({name: file , content: data})
   });
  
    res.render("index", {files: filesArr})
    })
});


router.post("/create",function(req,res){
  const fn = req.body.name.split(' ').join('') + '.txt';
  const content = req.body.content;
  fs.writeFile(`./files/${fn}`,content, function(err ,files){
    if(err) return res.status('500').send(err);
    else res.redirect('/')
  })
});

router.get(`/read/:filename`,function(req,res){
  const fn = req.params.filename;
  fs.readFile(`./files/${fn}`,function(err,data){
    if(err) return res.status('404').send(err);
    else res.render('read',{file : fn, content: data})
  })
 
});

router.get("/home/:filename",function(req,res){
  res.redirect('/')
});



router.get("/delete/:filename",function(req,res){
  fs.unlink(`./files/${req.params.filename}`,function(err){
    if(err) return res.status("502").send(err)
    else res.redirect('/')
  });
});

module.exports = router;
