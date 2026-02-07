const express = require('express');
const cors = require('cors');


const app = express();

const PORT = 3000

app.use(cors({
    origin: "*",
    methods: ["GET","POST"]
}));



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



app.get('/data', (req,res) => {
    console.log(req);
    res.json(mockData);
}); 

app.post('/AddBlog', (req, res)=> {
    res.json(mockData);
    console.log(req);
});


app.listen(PORT, () => {
    console.log(`Server is running on localhost at port:${PORT}`);
})