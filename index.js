const express = require("express");
//const mongoose = require('mongoose');
const URL = require('./models/urlmodel');
const urlRoute = require('./routes/urlroutes'); 
const {connectToMongoDB} = require("./config/connection");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 8001;

console.log(process.env.MONGO_URI);
const connectdb =  connectToMongoDB(process.env.MONGO_URI);


app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortId",  async (req, res) => {
    const shortId = req.params.shortId;
    const entry =  await URL.findOneAndUpdate({
        shortId
    }, { $push: {
        visitHistory: {
            timestamp: Date.now() 
        },
    },

    });
    res.redirect(entry.redirectURL)
});

app.listen( PORT, ()=> console.log(`server started at: ${PORT}`))