const https = require('https');

const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main page
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>NeedleNet Backend</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f0f0f0; }
        .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; }
        .link { display: inline-block; margin: 10px 0; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; }
        .link:hover { background: #0056b3; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧵 NeedleNet Backend</h1>
        <p>Welcome to your NeedleNet backend server!</p>
        <a href="/tailor-test.html" class="link">📝 Take Tailor Test</a>
    </div>
</body>
</html>
  `);
});

const PORT = 5001;

// Create self-signed certificate for HTTPS
const options = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
};

https.createServer(options, app).listen(PORT, '0.0.0.0', () => {
  console.log(`✅ HTTPS Server running on port ${PORT}`);
  console.log(`🌐 Access at: https://localhost:${PORT}`);
  console.log(`🌐 Access at: https://192.168.1.2:${PORT}`);
  console.log(`⚠️ Note: You may see a security warning - click "Advanced" and "Proceed"`);
});

console.log('📝 To generate SSL certificates, run:');
console.log('openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes');
