console.log("app is running...");

const express = require('express');
const app = express();
app.listen(3000, () => console.log("server is running..."));
app.use(express.static("public"));
