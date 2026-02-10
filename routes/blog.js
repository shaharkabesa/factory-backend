const express = require('express');
const mysql = require('mysql2');
let router = express.Router()

const connection = mysql.createConnection({
  host: "localhost",      // Your MySQL host
  user: "root",   // Your MySQL username
  password: "", // Your MySQL password
  database: "blogmanagement"  // Optional: Specify a database
});

connection.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database as ID ' + connection.threadId);
});



let mockData = [ {
    "id": 1,
    "Author": "Shahar",
    "Details": "This is the first blog mockup made by the creator shahar"
    },
    {
        "id": 2,
        "Author": "Lahan",
        "Details": "This is the second blog post made by the creator girlfriend"
    }
];


router.get("/", (req,res) => {
    console.log(req.body);
    res.json(mockData);
})


router.post('/AddBlog', (req, res)=> {
    let user_id = req.body.id;
    let Author = req.body.Author;
    let Details = req.body.Details;

    try {
        connection.query(`INSERT INTO blog(blog_author, blog_details) values("${Author}", "${Details}")`,(err, results, fields) => {
            
            if(results) {
                
            } else {
                console.log(err);
            }
        })
    } catch (err) {
        console.log("Failure: " + err);
    }


    console.log(req.body.id);
});


module.exports = router;