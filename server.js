const http = require('http');
const fs = require('fs');

// Read configuration from JSON file
fs.readFile('config.json', 'utf-8', (err, data) => {
    if (err) {
        console.error("Error reading configuration file:", err);
        return;
    }
    try {
        // Parse JSON data
        const config = JSON.parse(data);

        // Start HTTP server using configuration
        http.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<!DOCTYPE html>');
            res.write('<html>');
            res.write('<head>');
            res.write('<title>'+config.name+' for '+config.db+'</title>'); // Set the title here
            res.write('</head>');
            res.write('<body>');
            res.write('<h1>Hi '+config.user+'</h1><br/>');
            res.write('<p>'+config.name+' Configuration Details:</p>');
            res.write('<pre>' + JSON.stringify(config, null, 2) + '</pre>'); // Display configuration details
            res.write('</body>');
            res.write('</html>');
            res.end();
        }).listen(config.port);

        console.log("Server started successfully at http://localhost:" + config.port);

        // opening the link
        // Use dynamic import to import the open function
        import('open').then(open => {
            // Open a link in the default browser
            open.default("http://localhost:" + config.port);

            // Alternatively, you can specify the browser to use:
            // open.default('https://example.com', { app: 'firefox' });
        }).catch(error => {
            console.error('Error opening link:', error);
        });


    } catch (error) {
        console.error('Error parsing configuration data:', error);
    }
});
