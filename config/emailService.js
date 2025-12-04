const nodemailer = require('nodemailer');

// Load config from local file if exists, otherwise .env
let emailConfig;
try {
    emailConfig = require('./email-config.js');
    console.log("Email config loaded from file");
} catch {
    console.log("Email config file not found → using environment variables");
    emailConfig = {
        host: process.env.EMAIL_HOST || "smtp.gmail.com",
        port: parseInt(process.env.EMAIL_PORT || "465"),
        secure: process.env.EMAIL_SECURE === "false" ? false : true,
        auth: {
            user: process.env.EMAIL_USER,  // example: renthub.otp@gmail.com
            pass: process.env.EMAIL_PASSWORD // Gmail App Password
        }
    };
}

// Create Transporter
const transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: emailConfig.secure,
    auth: emailConfig.auth,
    connectionTimeout: 15000,
    socketTimeout: 15000
});

// OTP Generator
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// 1️⃣ Booking Confirmation Email
async function sendBookingConfirmationEmail(userEmail, userName, bookingDetails) {
    try {
        const mailOptions = {
            from: `"RentHub Booking" <${emailConfig.auth.user}>`,
            to: userEmail,
            subject: "Your Booking is Confirmed! - RentHub",
            html: `
        <h2>Hello ${userName || ""}!</h2>
        <p>Your booking has been <b>confirmed</b>.</p>
        <ul>
          <li><b>Vehicle:</b> ${bookingDetails.vehicleName}</li>
          <li><b>Type:</b> ${bookingDetails.vehicleType}</li>
          <li><b>Start Date:</b> ${bookingDetails.startDate}</li>
          <li><b>Start Time:</b> ${bookingDetails.startTime}</li>
          <li><b>Duration:</b> ${bookingDetails.duration} hours</li>
          <li><b>Total Amount:</b> ₹${bookingDetails.totalAmount}</li>
          <li><b>Advance Payment:</b> ₹${bookingDetails.advancePayment}</li>
          <li><b>Remaining Amount:</b> ₹${bookingDetails.remainingAmount}</li>
          <li><b>Confirmation Time:</b> ${bookingDetails.confirmationTime}</li>
        </ul>
        <p>Thank you for choosing RentHub!</p>
      `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("📧 Booking confirmation email sent:", result.messageId);
        return { success: true };
    } catch (error) {
        console.error("❌ Email error:", error.message);
        return { success: false, error: error.message };
    }
}

// 2️⃣ Password Reset OTP
async function sendPasswordResetOTP(userEmail, userName, otp) {
    try {
        const result = await transporter.sendMail({
            from: `"RentHub OTP" <${emailConfig.auth.user}>`,
            to: userEmail,
            subject: "Your RentHub OTP Code",
            html: `<h2>Hello ${userName || ""}!</h2><p>Your OTP is <b>${otp}</b></p>`
        });
        console.log("OTP Email sent:", result.messageId);
        return { success: true };
    } catch (err) {
        console.error("❌ OTP Email Error:", err.message);
        return { success: false, error: err.message };
    }
}

// 3️⃣ Registration OTP
async function sendRegistrationOTP(userEmail, userName, otp) {
    try {
        const result = await transporter.sendMail({
            from: `"RentHub Verification" <${emailConfig.auth.user}>`,
            to: userEmail,
            subject: "Verify your email — RentHub",
            html: `<h2>Hello ${userName || ""}!</h2><p>Your verification OTP is <b>${otp}</b></p>`
        });
        console.log("Registration OTP sent:", result.messageId);
        return { success: true };
    } catch (err) {
        console.error("❌ Registration OTP Email Error:", err.message);
        return { success: false, error: err.message };
    }
}

// 4️⃣ Refund Completion Email
async function sendRefundCompleteEmail(userEmail, userName, bookingId, amount, refundTime) {
    try {
        const result = await transporter.sendMail({
            from: `"RentHub Refund" <${emailConfig.auth.user}>`,
            to: userEmail,
            subject: "Your RentHub Refund is Complete",
            html: `<h2>Hello ${userName || ""}!</h2><p>Your refund of ₹${amount} (BookingID: ${bookingId}) has been credited on ${refundTime}.</p>`
        });
        console.log("Refund Email sent:", result.messageId);
        return { success: true };
    } catch (err) {
        console.error("❌ Refund Email Error:", err.message);
        return { success: false, error: err.message };
    }
}

// 5️⃣ SOS Link Email to User
async function sendSOSLinkEmail(userEmail, userName, sosLink) {
    try {
        const result = await transporter.sendMail({
            from: `"RentHub SOS" <${emailConfig.auth.user}>`,
            to: userEmail,
            subject: "SOS Activation for Your Ride",
            html: `<h2>Hello ${userName || ""}!</h2><p>Click link to activate SOS:</p><a href="${sosLink}">${sosLink}</a>`
        });
        console.log("SOS Link Email sent:", result.messageId);
        return { success: true };
    } catch (err) {
        console.error("❌ SOS Link Email Error:", err.message);
        return { success: false, error: err.message };
    }
}

// 6️⃣ SOS Alert Email to Admin
async function sendSOSAlertEmail(adminEmail, sosData) {
    try {
        const result = await transporter.sendMail({
            from: `"RentHub SOS Alert" <${emailConfig.auth.user}>`,
            to: adminEmail,
            subject: "⚠️ URGENT: SOS Alert from User",
            html: `<h2>SOS Triggered by ${sosData.userName}</h2><p>Booking ID: ${sosData.bookingId}</p><p>Location: ${sosData.googleMapsLink}</p>`
        });
        console.log("SOS Alert sent:", result.messageId);
        return { success: true };
    } catch (err) {
        console.error("❌ SOS Admin Email Error:", err.message);
        return { success: false, error: err.message };
    }
}

module.exports = {
    generateOTP,
    sendBookingConfirmationEmail,
    sendPasswordResetOTP,
    sendRegistrationOTP,
    sendRefundCompleteEmail,
    sendSOSLinkEmail,
    sendSOSAlertEmail
};