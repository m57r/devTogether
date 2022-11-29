require('dotenv').config(); 
const express = require('express');
const app = express(); 

const PORT = process.env.PORT || 5000; 

const router = require('./app/router'); 

app.use(router);

app.listen(PORT,()=>{
	console.log(`listening on ${PORT}`);
});

