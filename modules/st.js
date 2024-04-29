const fs = require('fs');
const path = require('path');

function st(callback) {
    const folderPath = path.resolve(__dirname, '../tables/');
    // console.log(folderPath);
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            // callback(err, null);
            return;
        }
        
        var tables = [];
        
        files.forEach(file => {
            let table_name = file;
            table_name = table_name.replace('.json', '')
            tables.push(table_name);
        });

        tables.map((tname) => {
            console.log(tname);
        })
    });
}

module.exports = st;
