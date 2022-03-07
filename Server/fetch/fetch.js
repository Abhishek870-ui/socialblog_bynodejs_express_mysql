//import express module
let express = require('express')
const { json } = require('express/lib/response')

//import database connection
let conn = require("../config/db_connection")

//get connection object
let connection = conn.getConnection()

//connect to database
connection.connect()

//create router instance
let router = express.Router()

//this portion is used to fetch login details from database to login
router.post("/authUser", (req, res) => {
    let email = req.body.email
    let password = req.body.password

    //console.log(uname)
    //console.log(upwd)
    console.log("Body fetch ", req.body)
        //select id from users where name = rajat and password = 123456
    connection.query(`select id,email,password from users where email = '${email}'and password = '${password}'`, (err, recordsArray) => {
        if (recordsArray.length == 0) {
            res.json({ 'auth': 'failed' })
        } else {


            token = require("../token/token")({id:recordsArray[0].id},'12345');
            console.log("id from database : ", recordsArray)
            connection.query(`update users set token='${token}' where id = '${recordsArray[0].id}'`)
            let uCred = { 'auth': 'success', 'token': token };
            console.log("User credentials:- ", uCred);
            res.json(uCred)
        }
    })
})

// router.get("/", (req, res) => {
//         let name = req.body.name

//         connection.query(`select pic from users where name = '${name}'`, (err, recordsArray, fields) => {
//             if (err)
//                 res.json({ 'message': 'error' })
//             else
//                 res.json(recordsArray)
//         })
//     })

//this route is used to fetch all blogs who post the blog
router.get("/fetchBlog",(req,res)=>{

    connection.query(`select concat(u.fname," ",u.lname) as " full_name",u.email,u.pic,b.title,b.blogDesc,b.image,b.audio,b.video,b.created_at,b.modifiedat from users u inner join blogs b on u.id = b.userid order by b.created_at desc`,(err,recordsArray,fields)=>{
        if(err){
            throw err;
        }
        else
            res.json(recordsArray)
    })
    
})

//this route is used to get deatils of comment
router.get("/fetchComment",(req,res)=>{

    connection.query(`select concat(u.fname," ",u.lname) as " full name",u.email,u.pic,b.title,b.blogDesc,b.image,b.audio,b.created_at,b.modifiedat from users u inner join blogs b on u.id = b.userid order by b.created_at desc`,(err,recordsArray,fields)=>{
        if(err){
            throw err;
        }
        else
            res.json(recordsArray)
    })
    
})
    //export router
module.exports = router