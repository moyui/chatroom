const path = require('path');
const config = require('../config/webpack');
const entrys = require('../config/entrys');

const entry = {};

page.map((page) => {
    entry[page.entry.key] = page.entry.file;
});

const resolve = (dir) => {
    return path.join(__dirname, dir);
}

module.exports = {
   entry,
   output: {
       path: 
   } 
}