const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function conf(name, value) {

    console.log(chalk.bold.yellow('Warning: Restart the server after changing the variable!'));

    // Define the path to the config.json file
    const configPath = path.join(__dirname, '..', 'config.json');

    // If value is not provided, read and return the current value for the name
    if (value === undefined) {
        // Read the config.json file
        const configData = fs.readFileSync(configPath, 'utf8');
        const config = JSON.parse(configData);
        
        // Return the value for the given name
        return config[name];
    } else {
        // If value is provided, update the config.json file
        // Read existing config data
        let config = {};
        if (fs.existsSync(configPath)) {
            const configData = fs.readFileSync(configPath, 'utf8');
            config = JSON.parse(configData);
        }

        // Update the value for the given name
        config[name] = value;

        // Write the updated config data back to the file
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2)); // null and 2 are for formatting

        // Return a confirmation message
        return `${name} updated to ${value}`;
    }
}

module.exports = conf;
