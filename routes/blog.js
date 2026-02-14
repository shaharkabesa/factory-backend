const express = require('express');
let router = express.Router();

router.use(express.json())

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

console.log();

router.post('/AddBlog', (req, res)=> {
    let new_id = (mockData[mockData.length -1].id) + 1;
    let Author = req.body.Author;
    let Details = req.body.Details;
    
    if(Author == "" || Details == "") { 
        res.json({"Status:" : "Author/Details Are empty please fill them"});
        return;
    }

    blog_obj =  {
        "id": new_id, 
        "Author": Author,
        "Details": Details
    }

    mockData.push(blog_obj);

    res.json({
        "Status": "Completed",
        "Updated List": mockData
    })
   
   
});

router.delete("/deleteblog", (req,res) => {
    let newData = mockData.filter((blog) => {
        blog.id = req.body.id
    })
    
    console.log(newData);
    res.send("Blog Deleted");
})

module.exports = router;
