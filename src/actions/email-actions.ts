"use server";

import nodemailer from "nodemailer";

const ASTROLOGER_EMAIL = process.env.EMAIL_FROM || "astrologer@example.com";

// Interface for Contact Form data
export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Interface for person details
interface PersonDetails {
  name: string;
  email: string;
  phone: string;
  secondaryPhone?: string;
  dob: string;
  birthTime: string;
  birthPlace: string;
}

// Interface for partner details (simplified)
interface PartnerDetails {
  name: string;
  dob: string;
  birthTime: string;
  birthPlace: string;
}

// Interface for the entire Booking Form data
export interface BookingFormValues {
  person1: PersonDetails;
  person2?: PartnerDetails;
  serviceId: string;
  serviceTitle: string;
}

// Real email sending function using Nodemailer
async function sendEmail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  // For local development, you might want to use a service like Ethereal
  // or configure your own SMTP server details in .env.local
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to: to,
      subject: subject,
      text: body,
      html: body.replace(/\n/g, "<br/>"), // Simple conversion of newlines to <br> for HTML emails
    });

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    // This will now return a more specific error to the client
    return {
      success: false,
      message: "Failed to send email. Please check server configuration.",
    };
  }
}

// Server Action for handling the contact form submission
export async function handleContactSubmission(data: ContactFormValues) {
  try {
    // Email to the client
    const clientResult = await sendEmail({
      to: data.email,
      subject: "Message Received - VagyaTrisha",
      body: `Hi ${data.name},\n\nThank you for reaching out. We have received your message and will get back to you shortly.\n\nYour message:\n"${data.message}"\n\nBest regards,\nThe VagyaTrisha Team`,
    });

    if (!clientResult.success)
      throw new Error("Failed to send confirmation email to client.");

    // Email to the astrologer
    const astrologerResult = await sendEmail({
      to: ASTROLOGER_EMAIL,
      subject: `New Contact Form Inquiry from ${data.name}`,
      body: `You have a new inquiry from the website contact form:\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nMessage: ${data.message}`,
    });

    if (!astrologerResult.success)
      throw new Error("Failed to send notification email to astrologer.");

    return { success: true, message: "Emails sent successfully." };
  } catch (error) {
    console.error("Error handling contact submission:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      success: false,
      message: `Failed to send emails. ${errorMessage}`,
    };
  }
}

// Helper to format person details for email
function formatPersonDetails(person: PersonDetails, title: string): string {
  return `
${title}:
--------------------
Name: ${person.name}
Email: ${person.email}
Phone: ${person.phone}
Secondary Phone: ${person.secondaryPhone || "N/A"}
Date of Birth: ${person.dob}
Time of Birth: ${person.birthTime}
Place of Birth: ${person.birthPlace}
`;
}

// Helper to format partner details for email
function formatPartnerDetails(person: PartnerDetails, title: string): string {
  return `
${title}:
--------------------
Name: ${person.name}
Date of Birth: ${person.dob}
Time of Birth: ${person.birthTime}
Place of Birth: ${person.birthPlace}
`;
}

// Server Action for handling the booking form submission
export async function handleBookingSubmission(data: BookingFormValues) {
  try {
    let bookingDetails = formatPersonDetails(data.person1, "Client Details");

    if (data.serviceId === "synastry-reading" && data.person2) {
      bookingDetails += formatPartnerDetails(data.person2, "Partner's Details");
    }

    const clientEmailBody = `
Hi ${data.person1.name},

Thank you for your booking request for a "${data.serviceTitle}" reading. We have received your details.

We will review your information and contact you shortly to schedule your appointment.

Here are the details we received:
${bookingDetails}

Best regards,
The VagyaTrisha Team
        `;

    const astrologerEmailBody = `
You have a new booking request for a "${data.serviceTitle}" reading.

Here are the client's details:
${bookingDetails}

Please reach out to ${data.person1.name} at ${data.person1.email} or ${data.person1.phone} to schedule the session.
        `;

    // Email to the client
    const clientResult = await sendEmail({
      to: data.person1.email,
      subject: `Your "${data.serviceTitle}" Booking Request`,
      body: clientEmailBody,
    });

    if (!clientResult.success)
      throw new Error("Failed to send confirmation email to client.");

    // Email to the astrologer
    const astrologerResult = await sendEmail({
      to: ASTROLOGER_EMAIL,
      subject: `New Booking Request: ${data.serviceTitle} from ${data.person1.name}`,
      body: astrologerEmailBody,
    });

    if (!astrologerResult.success)
      throw new Error("Failed to send notification email to astrologer.");

    return { success: true, message: "Booking emails sent successfully." };
  } catch (error) {
    console.error("Error handling booking submission:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      success: false,
      message: `Failed to process booking. ${errorMessage}`,
    };
  }
}
