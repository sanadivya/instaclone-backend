const express = require("express");
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { User, database } = require('./models/User');
const mongoose = require('mongoose');
//const users = require('./user.json');
const path = require("path");


const uri = `mongodb+srv://sanadivya:sanadivya@cluster0.dgjnmed.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(uri, (err) => {
    if (err) {
        console.log("Connection to mongodb failed");
    } else {
        console.log('Connection to mongodb success');
    }
})

const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    console.log("requested");
    res.json({
        message: "req success"
    })
})

app.post("/api", (req, res) => {
    //console.log(req.files.image_file.name);
    //res.json({
    //    message: "success"
    //})

    const { author, description, location } = req.body;
    const { image_file } = req.files;

    //console.log(author, description, location , image_file);
   // console.log(req.body );
    console.log(req.files.image_file);

    image_file.mv("./uploads/" + image_file.name, async (err) => {
        if (err) {
            res.json({ message: err });
        } else {
            // res.json({message:"Upload success"});
            const user = new User({
                ...{ author, description, location },
                image_file: image_file.name
            })
            try {
                const response = await user.save();
                res.json({ message: "Everything is fine", response });
            } catch (e) {
                res.json({ message: "something went wrong", response: e })
            }
        }
    })
})

app.get('/all', async (req,res)=>{
    res.json({result: await User.find().sort({createdAt: -1})});
})

app.get('/images/:filename', async(req,res)=>{
    res.sendFile(path.join(__dirname, `./uploads/${req.params.filename}`));
})

const port = 8081;
app.listen(port, console.log(`listening on ${port}`));