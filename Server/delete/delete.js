//import express module
let express = require('express')
let jwt = require("jwt-simple")

    //import database connection
let conn = require("../config/db_connection")
    //get connection object
let connection = conn.getConnection()
    //connect to database
connection.connect()
    //create router instance
let router = express.Router()
    //create rest api

router.post("/logout", (req, res) => {
    console.log(req.body);
    let token = req.body.token
    let email = req.body.email
    console.log(email);
    console.log(token);

    connection.query(`update users set token = 'null' where email = '${email}'`, (err, result) => {
        console.log('result : ', result.changedRows);
        if (err) {
            console.log("Wrong in logout")
            res.json('Something wrong')
        } else {
            console.log("Logout success token deleted")
            res.json({ 'logout': 'Success' })
        }
    })
})

// to delete the blog
router.post("/deleteblog", (req, res) => {
    let token = req.body.token
let decoded = jwt.decode(token, '12345');
if(decoded.id){  
        connection.query(`delete from blogs where userid = ${decoded.id} `, (err, result) => {
            console.log(result)
            if (err) {
                console.log(err)
                res.json({ 'error to delete': 'error' })
            } else
                res.json({ 'blog delete': 'success' })

        })
    }
    else{
        res.json({"id" : "id not found"})
    }

    })
    //export router
module.exports = router