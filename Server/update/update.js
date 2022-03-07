//import express module
let express = require('express')
let multer = require("multer");
let jwt = require("jwt-simple")

//import database connection
let conn = require("../config/db_connection");
//get connection object
let connection = conn.getConnection()
//connect to database
connection.connect()
//create router instance
let router = express.Router()
let moment = require('moment')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })
//create rest api
router.post("/updateblog", upload.fields([{
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
    let obj = req.body
    let title = obj.title
    let blogDesc = obj.blogDesc
    let token = obj.token
    let image = '';

    console.log(req.files);

    if (req.files.image) {
        image = '../uploads' + '/' + req.files.bimage[0].originalname;

    }
    let audio = '';
    if (req.files.audio) {
        audio = '../uploads' + '/' + req.files.audio[0].originalname;

    }

    let video = '';
    if (req.files.video) {
        video = '../uploads' + '/' + req.files.video[0].originalname;

    }
    let decoded = jwt.decode(token, '12345');
    if (decoded.id) {

        connection.query(`update blogs set title = '${title}', blogDesc = "${blogDesc}", image = '${image}', audio = '${audio}' ,video = '${video}',modifiedat = '${moment().format("YYYY-MM-DD h:mm:ss")}' `, (err, result) => {
            if (err)
            throw err;
                // res.json({ 'update': 'error' })
            else
                res.json({ 'update': 'success' })
        })
    }
    else {
        res.json({ "id": "id not found" })
    }
})

// router.post("/updateUser", (req, res) => {
//     console.log(req.body)
//     let name = req.body.name
//     let email = req.body.email
//     let password = req.body.password;
//     connection.query(`update users set password ='${password}',email ='${email}' where name = '${name}'`, (err) => {
//         if (err)
//             res.json({ 'update': 'error' })
//         else
//             res.json({ 'update': 'success' })
//     })
// })


//export router
module.exports = router