//REQUIREMENTS

const express = require('express');
const fs = require('fs');
const path = require('path');

//EXPRESS CONFIGURATION
const app = express();
const PORT = process.env.PORT || 3000;

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
