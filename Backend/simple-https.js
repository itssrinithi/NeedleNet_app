const https = require('https');
const express = require('express');
const path = require('path');

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

// Create a simple self-signed certificate
const crypto = require('crypto');
const { execSync } = require('child_process');

// Generate certificate if it doesn't exist
try {
  if (!require('fs').existsSync('cert.pem')) {
    console.log('🔐 Generating SSL certificate...');
    execSync('openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"', { stdio: 'inherit' });
    console.log('✅ Certificate generated!');
  }
} catch (error) {
  console.log('⚠️ Could not generate certificate automatically');
  console.log('📝 Please run: openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes');
  process.exit(1);
}

const options = {
  key: require('fs').readFileSync('key.pem'),
  cert: require('fs').readFileSync('cert.pem')
};

https.createServer(options, app).listen(PORT, '0.0.0.0', () => {
  console.log(`✅ HTTPS Server running on port ${PORT}`);
  console.log(`🌐 Access at: https://localhost:${PORT}`);
  console.log(`🌐 Access at: https://192.168.1.2:${PORT}`);
  console.log(`📱 Camera will work on ALL devices!`);
  console.log(`⚠️ If you see security warning, click "Advanced" and "Proceed"`);
});
