const fs = require('fs');
const path = require('path');

function at(table_name, alterations) {
    // Define the file path
   let count = alterations.length;

    return `${table_name} altered`;
}

module.exports = at;
