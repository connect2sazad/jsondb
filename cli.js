const { exec } = require('child_process');

const conf = require('./modules/conf');
const ct = require('./modules/ct');
const at = require('./modules/at');
const st = require('./modules/st');

// Prompt the user
process.stdout.write('jsondb> ');

// Listen for user input
process.stdin.on('data', (data) => {
    const command = data.toString().trim(); // Convert the input to a string and remove any trailing whitespace

    // Execute the command
    executeCommand(command);

    // Prompt the user again
    process.stdout.write('\njsondb> ');
});

// Handle errors
process.stdin.on('error', (err) => {
    console.error('Error reading input:', err);
});

// Function to execute the command
function executeCommand(command) {
    try {
        // Execute the command using eval
        eval(command);
    } catch (error) {
        if (error instanceof ReferenceError) {
            console.error('Error: No such command like \'' + command + '\' found!');
        } else {
            console.error('Error executing command:', error);
        }
    }
}

// Function to start the server
function server() {
    try {
        serverProcess = exec('node server.js', (error, stdout, stderr) => {
            if (error) {
                console.error('Error starting server:', error);
                return;
            }
            console.log('Server started successfully:', stdout);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

function config(name, value){
    console.log(conf(name, value));
}

// Function to clear the console
function clear() {
    try {
        exec('clear', (error, stdout, stderr) => {
            if (error) {
                console.error('Error clearing console:', error);
            }
        });
    } catch (error) {
        console.error('Error clearing console:', error);
    }
}

function show_tables(){
    // st((err, tables) => {
    //     if (err) {
    //         console.error('Error:', err);
    //         return;
    //     }
        
    //     console.log('Tables:', tables);
    // });
    st();
}

// Example function
function create_table(table, columns) {
    console.log(ct(table, columns));
}

function alter_table(table) {
    console.log(at(table));
}

// Function to exit the program
function exit() {
    console.log('Exited jsondb');
    process.exit();
}
