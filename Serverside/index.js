require('dotenv').config();
const fs = require('fs');
const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const port = process.env.PORT||3000;


app.use(express.json());
app.use(express.static("public"));
app.listen(port, () => console.log("server is running..."));



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
        feedback:'Your Items were successfully received.'
    });
}

//sendEmail('an3soelofse@gmail.com','#Hackerman');
function sendEmail(address,messageString){

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let mailoptions = {
        from: process.env.EMAIL,
        to: address,
        subject: 'test',
        text: messageString
    }

    transporter.sendMail(mailoptions,(err,inf) =>{
        if(err){
            console.log('Email error: ',err);
        }
        else{
            console.log('email sent... ',inf);
        }
    });


}
