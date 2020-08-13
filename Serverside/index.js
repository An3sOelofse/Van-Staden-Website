console.log("app is running...");

const sendToEmail = 'an3soelofse@gmail.com';

require('dotenv').config();
const express = require('express');
const fs = require('fs');
const nodemailer = require('nodemailer');
const port = process.env.PORT||3000;

let transporter = nodemailer.createTransport({
    
});

const { response, json } = require('express');
const app = express();
app.listen(port, () => console.log("server is running..."));
app.use(express.static("public"));
app.use(express.json());


let rawdata = fs.readFileSync('products.json');
let products = JSON.parse(rawdata);

/////////////////////////////////////
sendJSON("/cardInfo",products);

function sendJSON(path,data){
    app.get(path,(req,res) => {
        res.json(data);
    });
}
/////////////////////////////////////////
app.post("/sendData",receiveData);

function receiveData(request,response){
    console.log(request.body);
    response.json({
        status:'success'
    });
}
/////////////////////////////////////////

function sendEmail(address,messageString){

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sniper.target.diy.online',
            pass: 'an3soelofse'
        }
    });

    let mailoptions = {
        from: 'sniper.target.diy.online',
        to: address,
        subject: 'test',
        message: messageString
    }

    transporter.sendMail(mailoptions,(err,inf) =>{
        if(err)
    });


}
