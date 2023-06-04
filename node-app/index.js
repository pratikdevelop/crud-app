const express = require("express");
const app = express();
const path = require('path');

require('dotenv').config(path.join(__dirname,".env"))
const port = process.env.PORT_NUMBER || 5000;
const  { v4 }  = require('uuid'); 
const { addDoc, collection, setDoc, deleteDoc, doc, query, onSnapshot} = require("firebase/firestore");
const {db} = require('./config');
app.set("view engine", "ejs");
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
app.get("/", async (req, res) => {
    const data =
     await query(collection(db, "test_data"));
    const databaseInfo = [];
    const dataIds = []
    onSnapshot(data, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            databaseInfo.push(doc.data());
            dataIds.push(doc.id)
        });
        console.log(databaseInfo)
        res.render("index", {databaseInfo});
    });
});

app.post("/add-user", async (req, res) => {
    req.body[`id`] = v4();
    try {
        const ref = collection(db, "test_data")
        const response = await addDoc(ref, req.body)
        console.log(response);
    } catch(err) {
        console.log(err)
    }

});
app.listen(port, () => {
    console.log(`port listining on http://localhost:${port}`);
});
