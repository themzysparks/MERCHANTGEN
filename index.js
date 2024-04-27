// Specify the timezone you want to get
const timezone = 'Africa/Lagos';
const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { auth } = require('google-auth-library');
// const currentDate = new Date().toLocaleString('en-US', { timeZone: timezone });
// const [monthStr, dayStr, yearStr] = currentDate.split(',')[0].split('/');
// const year = parseInt(yearStr);
// const month = parseInt(monthStr);
// const day = parseInt(dayStr);
// const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
// Function to read the initial date from a file



const searchText = 'No description provided';


function extractEmails(text) {
    const emailRegex = /[\w.-]+@[a-zA-Z-]+\.[a-zA-Z]{2,}/g;
    return text.match(emailRegex) || [];
  }

  async function checkWebpage() {
    try {
        // Function to read the initial date from a file
function readInitialDateFromFile() {
    if (fs.existsSync('initial_date.txt')) {
      const dateString = fs.readFileSync('initial_date.txt', 'utf-8');
      return new Date(dateString);
    } else {
      console.error('Error: Initial date file not found. Please create a file named "initial_date.txt" and write the initial date in the format "YYYY-MM-DD".');
      process.exit(1);
    }
  }
  
  // Get the initial date from the file
  let initialDate = readInitialDateFromFile();
  
  // Convert the initial date to the format required in the URL (YYYY-MM-DD)
  const initialDateFormatted = `${initialDate.getFullYear()}-${(initialDate.getMonth() + 1).toString().padStart(2, '0')}-${initialDate.getDate().toString().padStart(2, '0')}`;
  
  // URL with the initial date
  console.log(`https://www.merchantgenius.io/shop/date/${initialDateFormatted}`);
  
  const url = `https://www.merchantgenius.io/shop/date/${initialDateFormatted}`;
  //${formattedDate}
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);
  
      if ($('body').text().includes(searchText)) {
        console.log('Text found! Harvesting emails...');
        const emails = extractEmails($('body').text());
        console.log('Number of emails found:', emails.length);
        const gmails = emails.filter(email => email.includes('@gmail.'));
        const nonGmails = emails.filter(email => !email.includes('@gmail.'));
        const gmailsWithComEnding = gmails.map(email => {
            const atIndex = email.indexOf('@');
            const username = email.substring(0, atIndex).toLowerCase();
            return `${username}@gmail.com`;
        });
        
        // Convert non-Gmail addresses to lowercase
        const nonGmailsWithLowercase = nonGmails.map(email => email.toLowerCase());
        console.log('Number of Gmail addresses found:', gmailsWithComEnding.length);
        console.log('Gmail addresses with .com ending:');
        gmailsWithComEnding.forEach((email, index) => console.log(`${index + 1}. ${email}`));

        console.log('Number of non-Gmail addresses found:', nonGmailsWithLowercase.length);
        console.log('Non-Gmail addresses:');
        nonGmails.forEach((email, index) => console.log(`${index + 1}. ${email}`));

        // Merge Gmail addresses with .com ending and non-Gmail addresses
        const mergedEmails= [...gmailsWithComEnding, ...nonGmailsWithLowercase, 'themmydee24@gmail.com', 'daviekelvin7@gmail.com', 'jefftech076@gmail.com', liamgreyson73@gmail.com'];
        const mergedEmailstest = ['themmydee24@gmail.com', 'daviekelvin7@gmail.com' ];

        console.log('Number of merged emails:', mergedEmails.length);
        console.log('Merged email addresses:');
        mergedEmails.forEach((email, index) => console.log(`${index + 1}. ${email}`));
        
// Define your email accounts
const emailAccounts = [
  {
    email: 'daviekelvin7@gmail.com',
    password: 'swuhvnqzwzbbikzx',
    index: 0 // Index to keep track of which email to use next
  },
  {
    email: 'themmydee24@gmail.com',
    password: 'tsfxpxqfxitrqvxk',
    index: 1
  },
  {
    email: 'liamgreyson73@gmail.com',
    password: 'hlbeneyowpwzmbey',
    index: 2
  }
];

// Create transporters for each email account
const transporters = emailAccounts.map(account => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: account.email,
      pass: account.password
    }
  });
});

// Function to get the next email account and update its index
function getNextEmailAccount() {
  const account = emailAccounts.find(account => account.index === counter);
  account.index = (account.index + 1) % emailAccounts.length;
  return account;
}

// Counter to keep track of which account and message to use next
let counter = 0;

// Sample messages (you can replace them with your actual messages)
const messages = [
  'Hi there, I;m Davie by name as a pro shopify expert and Marketing Expert. \nI was able to reach out to you through your store mail, I can definitely see you as a new brand just getting started The purpose, I;m here is to share my insights through my research on your store, Whereby I found out that there are some needs to be fix and add to your store to help in making your store completely functional I\'d love to share my ideas and recommendations for the growth of your store. \nYour feedback is an honor! \nThanks \nDavie.',
  'Hello!\n I\'m Davie, a Shopify and Marketing Expert. \n I stumbled upon your store via email and noticed that you\'re a new brand. \nAfter some research, I found areas that could use improvement to make your store fully functional. \nI\'m here to share my insights and recommendations to help your store grow. \nYour feedback would be greatly appreciated. \nThank you, Davie.',
  'Hi,\nit\'s Davie, a pro in Shopify and Marketing. \nI came across your store email and noticed you\'re new to the scene. \nAfter digging into your store, I found a few things that could be fixed and added to make it run smoothly. \nI\'m here to offer my insights and recommendations to help your store reach its full potential. \nYour thoughts would mean a lot to me! \nThanks, Davie.'
];

/// Function to send email
async function sendEmail(account, transporter, message, recipientEmail) {
    // Email content
    const mailOptions = {
      from: account.email, // Sender address
      to: recipientEmail, // Recipient address
      subject: 'FROM YOUR STORE', // Subject line
      text: message // Message body
    };
  
    try {
      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent from ${account.email} to ${recipientEmail}:`, info.response);
    } catch (error) {
      console.error(`Error sending email from ${account.email} to ${recipientEmail}:`, error);
    }
  }
  let successfulDeliveries = 0;
  // Function to iterate through email accounts and send emails
  async function sendEmails() {
    let messageIndex = 0;
    let accountIndex = 0;
    for (const recipientEmail of mergedEmails) {
      const account = emailAccounts[accountIndex];
      const transporter = transporters[accountIndex];
      const message = messages[messageIndex];
      await sendEmail(account, transporter, message, recipientEmail);
      successfulDeliveries++;
      messageIndex = (messageIndex + 1) % messages.length; // Move to the next message
      accountIndex = (accountIndex + 1) % emailAccounts.length; // Move to the next account
      
    }
     // Check if all emails were successfully delivered
  if (successfulDeliveries === mergedEmails.length) {
    console.log('All emails were successfully delivered!');
    // You can also update Google Sheet here if needed

// Function to send summary email
async function sendSummaryEmail(successfulDeliveries) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'daviekelvin7@gmail.com', // Your Gmail address
        pass: 'swuhvnqzwzbbikzx' // Your Gmail password
      }
    });

    const mailOptions = {
      from: 'daviekelvin7@gmail.com',
      to: 'themmydee24@gmail.com', // Your Gmail address
      subject: 'MERCHANT GENIUS MAIL SENT',
      text: `All ${successfulDeliveries} mails were successfully delivered!`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Summary email sent:', info.response);
    function writeInitialDateToFile(date) {
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        fs.writeFileSync('initial_date.txt', formattedDate, 'utf-8');
      }
      const currentDate = readInitialDateFromFile();
if (currentDate) {
  const newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() + 1); // Increment date by one day
  writeInitialDateToFile(newDate);
  console.log('Updated initial date in file:', newDate);
  checkWebpage();
} else {
  console.error('No initial date found in file.');
}
  } catch (error) {
    console.error('Error sending summary email:', error);
  }
}

// After sending all emails, call the sendSummaryEmail function
sendSummaryEmail(successfulDeliveries);



  }

  }
  
  // Call the function to send emails
  sendEmails();
        // Send emails to WhatsApp using Twilio (to be implemented)
      } else { console.clear();

        console.log('Text not found. Checking again in 10 seconds...');
        setTimeout(checkWebpage, 2000); // Check again after 10 seconds
      }
    } catch (error) {
      console.error('Error fetching webpage:', error);
    }
  }

checkWebpage();
