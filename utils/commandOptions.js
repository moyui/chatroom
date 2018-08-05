const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'publicPath', type: String }, 
    { name: 'subDirectory', type: String },
];

module.exports = commandLineArgs(optionDefinitions);