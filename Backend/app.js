const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const customerRoutes = require('./src/routes/customerRoutes');
const tailorRoutes = require('./src/routes/tailorRoutes');
const deliveryRoutes = require('./src/routes/deliveryRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const postRoutes = require('./src/routes/postRoutes');
const paymentManagementRoutes = require('./src/routes/paymentManagementRoutes');
const passwordRoutes = require('./src/routes/auth/passwordRoutes');
const customerAuthRoutes = require('./src/routes/auth/customerAuthRoutes');
const tailorAuthRoutes = require('./src/routes/auth/tailorAuthRoutes');
const deliveryAuthRoutes = require('./src/routes/auth/deliveryAuthRoutes');
const authRoutes = require('./src/routes/auth/authRoutes');
const errorHandler = require('./src/middlewares/errorHandler');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors({
  origin: true, // Allow all origins during development
  credentials: true
}));
app.use(express.json());

// Parse JSON when client sends body as text/plain (e.g. Postman with "Text" instead of "JSON")
app.use((req, res, next) => {
  if (req.body !== undefined && req.body !== null) return next();
  if (!['POST', 'PUT', 'PATCH'].includes(req.method)) return next();
  const ct = (req.headers['content-type'] || '').toLowerCase();
  // Only parse when body wasn't parsed (e.g. Postman sent "Text" instead of "JSON")
  if (!ct.includes('text/plain') && !ct.includes('text/')) return next();
  let data = '';
  req.on('data', (chunk) => { data += chunk; });
  req.on('end', () => {
    try {
      if (data && data.trim()) req.body = JSON.parse(data);
    } catch (e) { /* leave req.body undefined */ }
    next();
  });
});

app.use(morgan('dev'));

app.use('/api/auth/customer', customerAuthRoutes);
app.use('/api/auth/tailor', tailorAuthRoutes);
app.use('/api/auth/delivery', deliveryAuthRoutes);
app.use('/api/auth/password', passwordRoutes);
app.use('/api/auth', authRoutes);

app.use('/api/customers', customerRoutes);
app.use('/api/tailors', tailorRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/payments', paymentManagementRoutes);

// Privacy Policy endpoint - redirects to configured URL or serves a simple fallback
app.get('/privacy-policy', (req, res) => {
  const policyUrl = process.env.PRIVACY_POLICY_URL;
  if (policyUrl) {
    return res.redirect(302, policyUrl);
  }
  res.type('html').send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Privacy Policy</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 2rem; line-height: 1.6; }
          h1 { font-size: 1.5rem; }
        </style>
      </head>
      <body>
        <h1>Privacy Policy</h1>
        <p>The privacy policy URL is not configured. Please set the <code>PRIVACY_POLICY_URL</code> environment variable to your hosted policy page.</p>
      </body>
    </html>
  `);
});

// Uploads: ensure directory exists, then serve (and handle //uploads/... for some clients)
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
const uploadsStatic = express.static(uploadsPath);
app.use('/uploads', uploadsStatic);
app.use((req, res, next) => {
  if (req.path.startsWith('//uploads')) {
    const sub = req.path.slice(req.path.indexOf('uploads') + 7);
    req.url = (sub && sub[0] === '/') ? sub : '/' + (sub || '');
    return uploadsStatic(req, res, next);
  }
  next();
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    port: PORT,
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 for unmatched API routes (return JSON so clients get a clear response)
app.use('/api', (req, res, next) => {
  res.status(404).json({
    message: 'API route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Serve HTML page at root
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
        <br>
        <a href="/api/health" class="link">🏥 Server Health Check</a>
    </div>
</body>
</html>
  `);
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start server only after database connection
const startServer = async () => {
  try {
    await connectDB();
    
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`🌐 API available at http://localhost:${PORT}`);
      console.log(`🌐 API also available at http://0.0.0.0:${PORT}`);
    });
    
    // Handle server errors
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use!`);
        console.log(`🔧 To fix this, run: netstat -ano | findstr :${PORT}`);
        console.log(`🔧 Then kill the process: taskkill /PID <PID> /F`);
        process.exit(1);
      } else {
        console.error('❌ Server error:', error.message);
        process.exit(1);
      }
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
