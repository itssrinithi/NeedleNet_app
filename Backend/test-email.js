const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
  console.log('🧪 Testing Email Configuration...');
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***SET***' : '❌ NOT SET');
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('❌ Email credentials not configured!');
    console.log('Please add to your .env file:');
    console.log('EMAIL_USER=your-gmail@gmail.com');
    console.log('EMAIL_PASS=your-app-password');
    return;
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Test email
    const mailOptions = {
      from: `NeedleNet <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself as test
      subject: '🧪 NeedleNet Email Test',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>✅ Email Test Successful!</h2>
          <p>If you received this email, your email configuration is working correctly.</p>
          <p>Time: ${new Date().toLocaleString()}</p>
        </div>
      `
    };

    console.log('📧 Sending test email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', result.messageId);
    console.log('Check your inbox for the test email.');
    
  } catch (error) {
    console.log('❌ Email test failed:');
    console.log('Error:', error.message);
    
    if (error.message.includes('Invalid login')) {
      console.log('💡 This usually means:');
      console.log('   - Wrong email/password');
      console.log('   - Need to use App Password instead of regular password');
      console.log('   - 2-Factor Authentication not enabled');
    }
    
    if (error.message.includes('Username and Password not accepted')) {
      console.log('💡 Try enabling "Less secure app access" in Gmail settings');
    }
  }
}

testEmail();
