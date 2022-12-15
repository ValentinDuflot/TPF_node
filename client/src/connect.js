const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

mongoose.set('strictQuery',false);
mongoose.connect('mongodb://localhost:27017/TPF');

const port = 3000;