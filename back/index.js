require('dotenv').config(); 
const cors = require('cors');
const express = require('express');
const app = express(); 

const PORT = process.env.PORT || 5000; 

const router = require('./app/router'); 

app.use(cors({
	origin : 'http://localhost:3000'
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(router);

app.listen(PORT,()=>{
	console.log(`listening on ${PORT}`);
});
