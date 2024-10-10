const nodemailer = require('nodemailer');
const sendEmail = require('../utils/sendEmail');

jest.mock('nodemailer');


// suppress console.log for tests, in this
console.log = () => {};
console.error = () => {};


describe('Email Service', () => {
    it('should send an email successfully', async () => {
      // Mock the sendMail function
      const sendMailMock = jest.fn().mockResolvedValue({}); // Mock successful response
      nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });
  
      const email = 'test@example.com';
      const subject = 'Test Subject';
      const text = '<p>This is a test email</p>';
  
      await sendEmail(email, subject, text);
  
      // Verify sendMail was called with the correct parameters
      expect(sendMailMock).toHaveBeenCalledWith({
        from: process.env.USER_email,
        to: email,
        subject: subject,
        html: text,
      });
    });
  
    it('should handle errors when sending email', async () => {
      const sendMailMock = jest.fn().mockRejectedValue(new Error('Send failed'));
      nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });
  
      const email = 'test@example.com';
      const subject = 'Test Subject';
      const text = '<p>This is a test email</p>';
  
      await expect(sendEmail(email, subject, text)).resolves.toBeUndefined(); 
  
      // Verify sendMail was called
      expect(sendMailMock).toHaveBeenCalled();
    });
  });