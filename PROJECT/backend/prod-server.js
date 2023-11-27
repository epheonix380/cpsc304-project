const express = require('express');
const appController = require('./appController');

// Load environment variables from .env file
// Ensure your .env file has the required database credentials.
const loadEnvFile = require('./utils/envUtil');
const envVariables = loadEnvFile('./.env');

const app = express();
const PORT = envVariables.PORT || 65534;  // Adjust the PORT if needed (e.g., if you encounter a "port already occupied" error)

// Middleware setup
app.use(express.static('../frontend/build')); // Use when testing REACT on department servers
// app.use(express.static('./public')); // Use for debugging
app.use(express.json());             // Parse incoming JSON payloads
try {
    var cors = require('cors');
    app.use(cors());
} catch (err) {
    console.log("Unable to enable cors")
}

// If you prefer some other file as default page other than 'index.html',
//      you can adjust and use the bellow line of code to
//      route to send 'DEFAULT_FILE_NAME.html' as default for root URL
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/DEFAULT_FILE_NAME.html');
// });


// mount the router
app.use('/admin', express.static("./public"));
app.use('/', appController);


// ----------------------------------------------------------
// Starting the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

