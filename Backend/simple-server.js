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

const PORT = 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Simple Server running on port ${PORT}`);
  console.log(`🌐 Access at: http://localhost:${PORT}`);
  console.log(`🌐 Access at: http://192.168.1.2:${PORT}`);
  console.log(`📱 Note: Camera may not work on other devices with HTTP`);
  console.log(`💡 For camera access, use localhost on your laptop`);
});
