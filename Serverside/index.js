console.log("app is running...");

const express = require('express');
const { response, json } = require('express');
const app = express();
app.listen(3000, () => console.log("server is running..."));
app.use(express.static("public"));
app.use(express.json());

const fs = require('fs');
let rawdata = fs.readFileSync('products.json');
let products = JSON.parse(rawdata);





sendJSON("/cardInfo",products);

function sendJSON(path,data){
    app.get(path,(req,res) => {
        res.json(data);
    });
}












app.post("/sendData",receiveData);

function receiveData(request,response){
    console.log(request.body);
    response.json({
        status:'success'
    });
}
