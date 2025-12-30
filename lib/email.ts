import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD, // Use App Password for Gmail
  },
});

// Verify transporter configuration
export const verifyEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log('Email server is ready to send messages');
    return true;
  } catch (error) {
    console.error('Email server verification failed:', error);
    return false;
  }
};

// Email templates
export const emailTemplates = {
  donationConfirmation: (donorName: string, amount: number, paymentMethod: string) => ({
    subject: 'Thank You for Your Donation - HopeForUA',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .amount-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
            .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>HopeForUA</h1>
              <p>Thank You for Your Generous Donation</p>
            </div>
            <div class="content">
              <p>Dear ${donorName},</p>
              
              <p>We are incredibly grateful for your generous donation of <strong>$${amount.toLocaleString()}</strong> to HopeForUA.</p>
              
              <div class="amount-box">
                <p style="margin: 0;"><strong>Donation Details:</strong></p>
                <p style="margin: 5px 0;">Amount: $${amount.toLocaleString()}</p>
                <p style="margin: 5px 0;">Payment Method: ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}</p>
              </div>
              
              <p>Your contribution will make a real difference in the lives of those we serve. Every dollar you've donated helps us continue our mission of providing hope and support to individuals and communities in need.</p>
              
              <p>We are committed to transparency and will keep you updated on how your donation is being used to create positive change. You can view our impact reports on our website.</p>
              
              <p>Thank you for being part of our mission. Together, we are making a difference.</p>
              
              <p>With gratitude,<br>
              <strong>The HopeForUA Team</strong></p>
              
              <div class="footer">
                <p>HopeForUA Foundation</p>
                <p>Email: hopeeforua@gmail.com | Phone: +12136096521</p>
                <p>&copy; ${new Date().getFullYear()} HopeForUA. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Thank You for Your Donation - HopeForUA
      
      Dear ${donorName},
      
      We are incredibly grateful for your generous donation of $${amount.toLocaleString()} to HopeForUA.
      
      Donation Details:
      - Amount: $${amount.toLocaleString()}
      - Payment Method: ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}
      
      Your contribution will make a real difference in the lives of those we serve. Every dollar you've donated helps us continue our mission of providing hope and support to individuals and communities in need.
      
      We are committed to transparency and will keep you updated on how your donation is being used to create positive change. You can view our impact reports on our website.
      
      Thank you for being part of our mission. Together, we are making a difference.
      
      With gratitude,
      The HopeForUA Team
      
      HopeForUA Foundation
      Email: hopeeforua@gmail.com | Phone: +12136096521
    `,
  }),

  newsletterSubscription: (subscriberEmail: string) => ({
    subject: 'Welcome to HopeForUA Newsletter',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>HopeForUA</h1>
              <p>Welcome to Our Newsletter</p>
            </div>
            <div class="content">
              <p>Thank you for subscribing to the HopeForUA newsletter!</p>
              
              <p>We're excited to have you join our community. You'll now receive regular updates about:</p>
              
              <ul>
                <li>Our latest projects and initiatives</li>
                <li>Impact reports and success stories</li>
                <li>Upcoming events and opportunities to get involved</li>
                <li>Ways you can continue to support our mission</li>
              </ul>
              
              <p>Your support means everything to us, and we're grateful to have you as part of the HopeForUA family.</p>
              
              <p>If you have any questions or would like to learn more about our work, please don't hesitate to reach out to us.</p>
              
              <p>Thank you for your interest in HopeForUA!</p>
              
              <p>Best regards,<br>
              <strong>The HopeForUA Team</strong></p>
              
              <div class="footer">
                <p>HopeForUA Foundation</p>
                <p>Email: hopeeforua@gmail.com | Phone: +12136096521</p>
                <p>&copy; ${new Date().getFullYear()} HopeForUA. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Welcome to HopeForUA Newsletter
      
      Thank you for subscribing to the HopeForUA newsletter!
      
      We're excited to have you join our community. You'll now receive regular updates about:
      - Our latest projects and initiatives
      - Impact reports and success stories
      - Upcoming events and opportunities to get involved
      - Ways you can continue to support our mission
      
      Your support means everything to us, and we're grateful to have you as part of the HopeForUA family.
      
      If you have any questions or would like to learn more about our work, please don't hesitate to reach out to us.
      
      Thank you for your interest in HopeForUA!
      
      Best regards,
      The HopeForUA Team
      
      HopeForUA Foundation
      Email: hopeeforua@gmail.com | Phone: +12136096521
    `,
  }),

  contactFormSubmission: (name: string, email: string, subject: string, message: string) => ({
    // Email to the user (confirmation)
    userConfirmation: {
      subject: 'We Received Your Message - HopeForUA',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .message-box { background: white; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 5px; }
              .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>HopeForUA</h1>
                <p>We Received Your Message</p>
              </div>
              <div class="content">
                <p>Dear ${name},</p>
                
                <p>Thank you for contacting HopeForUA. We have received your message and will get back to you as soon as possible.</p>
                
                <div class="message-box">
                  <p style="margin: 0;"><strong>Your Message:</strong></p>
                  <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
                  <p style="margin: 10px 0;">${message.replace(/\n/g, '<br>')}</p>
                </div>
                
                <p>Our team typically responds within 24-48 hours. If your inquiry is urgent, please feel free to call us at +12136096521.</p>
                
                <p>We appreciate your interest in HopeForUA and look forward to assisting you.</p>
                
                <p>Best regards,<br>
                <strong>The HopeForUA Team</strong></p>
                
                <div class="footer">
                  <p>HopeForUA Foundation</p>
                  <p>Email: hopeeforua@gmail.com | Phone: +12136096521</p>
                  <p>&copy; ${new Date().getFullYear()} HopeForUA. All rights reserved.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        We Received Your Message - HopeForUA
        
        Dear ${name},
        
        Thank you for contacting HopeForUA. We have received your message and will get back to you as soon as possible.
        
        Your Message:
        Subject: ${subject}
        ${message}
        
        Our team typically responds within 24-48 hours. If your inquiry is urgent, please feel free to call us at +12136096521.
        
        We appreciate your interest in HopeForUA and look forward to assisting you.
        
        Best regards,
        The HopeForUA Team
        
        HopeForUA Foundation
        Email: hopeeforua@gmail.com | Phone: +12136096521
      `,
    },
    // Email to admin (notification)
    adminNotification: {
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .info-box { background: white; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 5px; }
              .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Contact Form Submission</h1>
                <p>HopeForUA Website</p>
              </div>
              <div class="content">
                <p>A new contact form submission has been received:</p>
                
                <div class="info-box">
                  <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                  <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                  <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
                  <p style="margin: 10px 0;"><strong>Message:</strong></p>
                  <p style="margin: 5px 0;">${message.replace(/\n/g, '<br>')}</p>
                </div>
                
                <p>Please respond to this inquiry as soon as possible.</p>
                
                <div class="footer">
                  <p>HopeForUA Foundation</p>
                  <p>Email: hopeeforua@gmail.com | Phone: +12136096521</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        New Contact Form Submission - HopeForUA
        
        A new contact form submission has been received:
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
        
        Please respond to this inquiry as soon as possible.
      `,
    },
  }),
};

// Send email function
export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  text: string
) => {
  try {
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.error('SMTP credentials not configured');
      return { success: false, error: 'Email service not configured' };
    }

    const mailOptions = {
      from: `"HopeForUA" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send donation confirmation email
export const sendDonationConfirmation = async (
  donorEmail: string,
  donorName: string,
  amount: number,
  paymentMethod: string
) => {
  const template = emailTemplates.donationConfirmation(donorName, amount, paymentMethod);
  return await sendEmail(donorEmail, template.subject, template.html, template.text);
};

// Send newsletter subscription confirmation
export const sendNewsletterConfirmation = async (subscriberEmail: string) => {
  const template = emailTemplates.newsletterSubscription(subscriberEmail);
  return await sendEmail(subscriberEmail, template.subject, template.html, template.text);
};

// Send contact form emails (to user and admin)
export const sendContactFormEmails = async (
  name: string,
  email: string,
  subject: string,
  message: string
) => {
  const templates = emailTemplates.contactFormSubmission(name, email, subject, message);
  
  // Send confirmation to user
  const userResult = await sendEmail(
    email,
    templates.userConfirmation.subject,
    templates.userConfirmation.html,
    templates.userConfirmation.text
  );

  // Send notification to admin
  const adminEmail = process.env.ADMIN_EMAIL || 'hopeeforua@gmail.com';
  const adminResult = await sendEmail(
    adminEmail,
    templates.adminNotification.subject,
    templates.adminNotification.html,
    templates.adminNotification.text
  );

  return {
    userEmail: userResult,
    adminEmail: adminResult,
  };
};

