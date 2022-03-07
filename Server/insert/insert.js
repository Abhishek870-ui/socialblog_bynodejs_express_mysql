//import express and mongodb modules
let express = require("express")
let multer = require("multer");
let jwt = require("jwt-simple")

//import database connection
let conn = require("../config/db_connection")

//get connection object
let connection = conn.getConnection()


//connect to database
connection.connect()
    //create router instance
let router = express.Router()
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })
    //this part for insert register user details into database
// router.post("/registerUser", upload.single('pic'), (req, res) => {
//     let obj = req.body;
//     let name = obj.name;
//     let email = obj.email;
//     let password = obj.password;
//     let pic = '../uploads' + '/' + req.file.originalname;
//     console.log(req.file)
//     connection.query(`insert into users(name,email,password,pic) values ('${name}', '${email}', '${password}', '${pic}')`, (err) => {
//         if (err) throw err;
//         else
//         res.json({"insert" : "success"})
//             // res.redirect("http://localhost:8080/login.html")
//     })
// })


//this part is used to insertt user registration details in the database

router.post("/registerUser",  (req, res) => {
    let obj = req.body;
    let fname = obj.fname;
    let lname = obj.lname;
    let email = obj.email;
    let password = obj.password;
    console.log(req.body)
    connection.query(`insert into users(fname,lname,email,password) values ('${fname}','${lname}', '${email}', '${password}')`, (err) => {
        if (err) throw err;
        else
        res.json({"insert" : "success"})
            // res.redirect("http://localhost:8080/login.html")
    })
})

//this part to insert blogs into database 
router.post("/bloginsert", upload.fields([{
        name: 'image',
        maxCount: 1
    },
    {
        name: 'audio',
        maxCount: 1
    },
    {
        name: 'video',
        maxCount: 1

    }
]), (req, res) => {
    console.log(req.body);
    console.log(req.files);
    let obj = req.body
    let title = obj.title
    let blogDesc = obj.blogDesc
    let token = obj.token
    let image = '';
    if (req.files.image) {
        image = '../uploads' + '/' + req.files.image[0].originalname;

    }
    let audio = '';
    if (req.files.audio) {
        audio = '../uploads' + '/' + req.files.audio[0].originalname;

    }

let decoded = jwt.decode(token, '12345');

  if(decoded.id){

    connection.query(`insert into blogs(userid,title,blogDesc,image,audio,video) values (${decoded.id},'${title}','${blogDesc}','${image}','${audio}','${video}')`, (err) => {
        if (err) throw err;
        else {
            res.json({ "insert": "success" })
        }
    })
  }

else{
    res.json({"id" : "id not found"})
}
})


//this part for insert comment
router.post("/insertComment",  (req, res) => {
    let obj = req.body;
    let token = obj.token
    
    let comment = obj.comment;
    console.log(req.body)
    let decoded = jwt.decode(token, '12345');
    console.log(decoded)
    if(decoded.id){
  
      connection.query(`insert into comments(userid,blogid,comment) values (${decoded.id},${globalblogsObject.id},'${comment}')`, (err) => {
          if (err) throw err;
          else {
              res.json({ "insert": "success" })
          }
      })
    }
  
  else{
      res.json({"id" : "id not found"})
  }
  })

//export router
module.exports = router