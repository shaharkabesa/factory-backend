const express = require('express');
const cors = require('cors');
const app = express();



const PORT = 3000
const blogRoutes = require("./routes/blog");

app.use(express.json());

app.use(cors({
    origin: "*",
    methods: ["GET","POST"]
}));


app.use('/blog', blogRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on localhost at port:${PORT}`);
})