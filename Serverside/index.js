require('dotenv').config();
const fs = require('fs');
const nodemailer = require('nodemailer');
const express = require('express');
const readline = require('readline');
const formidable = require('formidable');
const { request } = require('express');
const app = express();

let imagesToBeRenamed = [];


const port = process.env.PORT||3000;


app.use(express.json());
app.use(express.static("public"));
app.get("/get-product-data",sendProductList);
app.get("/editor/product-list-data.csv",(req,res) => {res.sendFile('product-list-data.csv',{root:'./'});} );
app.post("/send-cart-information",receiveCartInformation,formatEmailString,sendEmail);
app.post('/test-edit-password',checkPassword);
app.post('/editor/csv-upload',(req,res) => {
    let form = new formidable.IncomingForm();
    form.parse(req,(err, fields, files) => {
        let oldpath = files.filetoupload.path;
        let newpath = './product-list-data.csv';
        fs.rename(oldpath, newpath, (err) => {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
    });    
});
app.listen(port, () => console.log("server is running..."));

async function sendProductList(req,res,next){
    let products = await processLineByLine();
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
        res.valid = true;
    }
    else{
        res.json({valid:false});
        res.valid = false;
    }
    next();
}

function writeProductDataCSV(data){
    console.log('writing file');
    let string = '%';
    data.forEach(p => {
        let productString = '';
        if(string == '%'){
            string = '';
            productString =`${p.name};Code;Image;ColourImage`;
        }
        else{
            productString =`\n${p.name};Code;Image;ColourImage`;
        }
        for(let i = 0;i < p.sizes.length;i++){
           productString =  productString.concat(`;${p.sizes[i]}`);
        }
        for(let i = 0;i < p.colours.length; i++){
            productString =  productString.concat(`\n${p.colours[i]};${p.productNumber[i]};;`);
            for(let j = 0;j < p.sizes.length; j++){
                productString =  productString.concat(`;${(p.prices[i])?p.prices[i][j]:0}`);
            }
        }
        let tagArray = ['-','-','-','-','-'];
        if(p.ladies){tagArray[0] = 'L'}
        if(p.youth){tagArray[1] = 'Y'}
        if(p.kids){tagArray[2] = 'K'}
        if(p.hats){tagArray[3] = 'H'}
        if(p.accessories){tagArray[4] = 'A'}

        productString = productString.concat(`\nTAGS;${tagArray[0]};${tagArray[1]};${tagArray[2]};${tagArray[3]};${tagArray[4]}`);

        string = string.concat(`${productString}\n`);
    });


    fs.writeFile('./product-list-data.csv',string,err =>{
        if(err){
            console.log(err);
        }
        else{
            console.log('file saved');
        }
    });
}

async function processLineByLine() {
  const fileStream = fs.createReadStream('./product-list-data.csv');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let objectline = 0;
  let data = [];
  let product = {
        name:'',
        colours:[],
        productNumber:[],
        ladies:false,
        youth:false,
        kids:false,
        hats:false,
        accessories:false,
        sizes:[],
        prices:[[]]
    }

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    let lineArray = line.split(";");
    
    
    if(lineArray[0] != ''){

        if(objectline == 0){
            product.name = lineArray[0];
            for(let i = 4; i < lineArray.length; i++){
                product.sizes[i - 4] = lineArray[i];
            }
            objectline++;
        }
        else if(lineArray[0] == 'TAGS'){
            for(let i = 1; i < 6; i++){
                if(lineArray[i] === 'L'){product.ladies = true}
                else if(lineArray[i] === 'Y'){product.youth = true}
                else if(lineArray[i] === 'K'){product.kids = true}
                else if(lineArray[i] === 'H'){product.hats = true}
                else if(lineArray[i] === 'A'){product.accessories = true}
            }
        }
        else if(objectline > 0){
            product.colours[objectline-1] = lineArray[0];
            product.productNumber[objectline-1] = lineArray[1];
            product.prices.push([]);
            for(let i = 4; i < lineArray.length; i++){
                product.prices[objectline-1].push(lineArray[i]);
            }
            objectline++;
        }

    }
    else{
        objectline = 0;
        product.prices.pop();
        data.push(product);
        product = {
            name:'',
            colours:[],
            productNumber:[],
            ladies:false,
            youth:false,
            kids:false,
            hats:false,
            accessories:false,
            sizes:[],
            prices:[[]]
        }
        
    }

  }
  return data;

}
