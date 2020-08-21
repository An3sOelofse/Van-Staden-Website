require('dotenv').config();
const fs = require('fs');
const nodemailer = require('nodemailer');
const express = require('express');
const { request } = require('express');
const app = express();


const port = process.env.PORT||3000;


app.use(express.json());
app.use(express.static("public"));
app.get("/get-product-data",sendProductList);
app.post("/send-cart-information",receiveCartInformation,formatEmailString,sendEmail);
app.post('/test-edit-password',checkPassword);
app.listen(port, () => console.log("server is running..."));


function sendProductList(req,res,next){
    let products = JSON.parse(fs.readFileSync('products.json'));
    res.json(products);
    next();
}

function receiveCartInformation(req,res,next){
    if(req.body){
        res.json({feedback:'Your Items were successfully received.'});
    }
    next();
}

function formatEmailString(req,res,next){
    let data = req.body
    let emailAddress = data.shift();
    

    let emailText = 'You have ordered these Items: \n';
    
    data.forEach(product => {
        let productline = 
        `
        ${product.name}  @ R${product.price}
        colour: ${product.colour}  size: ${product.size}
        Code: ${product.productCode}
        `
        emailText = emailText.concat(productline)
    });

    emailText = emailText.concat('\n\nWe will contact you shortly to provide our banking details and your receipt.');
    console.log(emailText);
    
    res.emailAddress = emailAddress;
    res.emailText = emailText;
    next();
}

function sendEmail(req,res,next){

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let mailoptions = {
        from: process.env.EMAIL,
        to: res.emailAddress,
        subject: 'You ordered these items from Sniper Target DIY',
        text: res.emailText
    }

    transporter.sendMail(mailoptions,(err,inf) =>{
        if(err){
            console.log('Email error: ',err);
        }
        else{
            console.log('email sent... ',inf);
        }
    });

    next();
}

function checkPassword(req,res,next){
    if(req.body.password === process.env.EDIT_PASSWORD){
        res.json({valid:true});
    }
    else{
        res.json({valid:false});
    }
    next();
}
