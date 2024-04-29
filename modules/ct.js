const fs = require('fs');
const path = require('path');

function ct(table_name, columns_list) {
    // Define the file path
    const filePath = path.join(__dirname, '..', 'tables', `${table_name}.json`);

    // Check if the file already exists
    if (fs.existsSync(filePath)) {
        throw new Error(`${table_name} already exists`);
    }

    // Create a JSON object
    const data = { table: table_name, columns: columns_list, rows: [] };

    // Convert the JSON object to a string
    const jsonData = JSON.stringify(data, null, 2); // null and 2 are for formatting

    // Write the JSON data to the file
    fs.writeFileSync(filePath, jsonData);

    return `${table_name} created`;
}

module.exports = ct;
