const express = require('express');
let router = express.Router();
const db = require('../db.js');

if(db) {
    console.log("function loaded");
}
router.use(express.json())


router.get("/", async (req,res) => {
    let sql = "select * from blog";
    
    try {
    const response = await db.query(sql)
    
    res.json(response.rows);

    } catch (error) {
        res.json(error);

    }
    
})

router.get("/getblog/:id", async(req,res) => {
    let id = req.params.id;
    
    let data = [id];
    console.log(req.params.id);

    let sql = "select * from blog WHERE blog_id = $1";
    
    try {
    const response = await db.query(sql,data);
    
    res.json(response.rows);

    } catch (error) {
        res.json(error);

    }
    
})

console.log();

router.post('/AddBlog', async (req, res)=> {
    let Author = req.body.Author;
    let Details = req.body.Details
    let querydata = [Author,Details];
    let sql = `insert into blog("author_name", "details") values($1, $2)`;
    if(Author == "" || Details == "") { 
        res.json({"Status:" : "Author/Details Are empty please fill them"});
        return;
    }

    try {
        const response = await db.query(sql,querydata);
        console.log(response);

            
        res.json({
            "Status": "Added new blog",
            
        })
    
    } catch (err) {
        res.json({
            status: "Error",
            details: err
        })
    }
    

   
});


router.put("/updateblog",async (req,res) => {
    let blog_id = req.body.blog_id
    let author = req.body.author
    let details = req.body.details
    
    let querydata = [author, details, blog_id];
    let sql = "";
    switch(true) {
        case (!author):
            querydata = [details, blog_id]
            sql = `update blog SET details = $1 WHERE blog_id = $2;`
            break;
        case (!details):
            querydata = [author, blog_id]
            sql = "update blog SET author_name = $1 WHERE blog_id = $2;"
            break;
        case (blog_id == null || blog_id < 0):
            res.json("Wrong blog id");
            break;
        default:
            querydata = [author, details, blog_id];
            sql = "update blog SET author_name = $1, details = $2 WHERE blog_id = $3;"
            break;
    }
  
    const response = await db.query(sql, querydata); 
    
    res.json({

        status: "Updated blog list",
        res: response
    })
})


router.delete("/deleteblog", async (req,res) => {
    blog_id = parseInt(req.body.blog_id);
    let querydata = [blog_id]
    sql = `DELETE FROM blog WHERE blog_id = $1`
    try {
        const resposne = await db.query(sql,querydata);
        console.log(resposne);
        res.json({
            status: "Blog deleted"
        })
    } catch (err) {
      res.json( {status: "Blog deleted",
        error: err})
    }

    
})


module.exports = router;
