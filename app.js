const express=require('express');
const app=express();
const multer=require('multer');
const ejs=require('ejs');
const path=require('path');
app.use(express.static(__dirname+'/public'));
const expressLayout=require('express-ejs-layouts');
app.use(expressLayout);
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
const port=process.env.PORT || 3000;

app.get('/',(req,res)=>{
  res.render('index');
});



// const storage=multer.diskStorage({
//
//      destination:'./public/uploads',
//      filename:function(req,file,cb){
//
//             cb(null,file.fieldname+'-'+  Date.now()+path.extname(file.originalname));
//      }
//
// });
//
//
// const upload=multer({
//       storage:storage
// }).single('myImage');

// app.post('/upload',(req,res)=>{
//
//         upload(req,res,(err)=>{
//
//             if(err)
//             {
//               res.render('/',{
//                 msg:err
//               });
//             }
//             else{
//               console.log(req.file);
//               res.send('test');
//             }
//
//
//
//
//         })
//
//
//
// })

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize:3000000
  },
  fileFilter: (req,file,cb)=>{




      if(! file.originalname.toLowerCase().match(/\.(jpeg|jpg|png|gif)$/))
        {

          return cb(new Error('Only jpeg|jpg|png|gif files allowed'));

        }

         cb(null,true);


  }
}).single('myImage');




app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('index', {
        msg: err
      });
    } else {
    if(req.file==undefined)
    {

      res.render('index',{
        msg:'Please Select File'
            })
    }
    else {

        console.log(req.file);
        res.render('index', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
  }
});

});




app.listen(port,()=>{
  console.log(`server is up on port ${port}`);
})
