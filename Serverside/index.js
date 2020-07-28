console.log("app is running...");

const express = require('express');
const { response } = require('express');
const app = express();
app.listen(3000, () => console.log("server is running..."));
app.use(express.static("public"));
app.use(express.json());
app.post("/sendData",receiveData);

function receiveData(request,response){
    console.log(request.body);
    response.json({
        status:'success'
    });
}
