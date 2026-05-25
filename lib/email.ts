import { Resend } from "resend";
import { env } from "@/env";

export type ContactSubmission = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
  services: string[];
};

export type CareerSubmission = {
  name: string;
  email: string;
  phone: string;
  location: string;
  position: string;
  description: string;
  resumeFileName?: string;
  resumeContent?: Buffer;
  resumeContentType?: string;
};

const defaultFromName = env.RESEND_FROM_NAME || "Design Hub";
const defaultFromEmail = env.RESEND_FROM_EMAIL || env.ADMIN_EMAIL;

const getResendClient = () => {
  if (!env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  return new Resend(env.RESEND_API_KEY);
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatHtml = (value: string) => escapeHtml(value).replace(/\n/g, "<br />");

const buildField = (label: string, value: string) => `
  <div style="margin-bottom: 16px;">
    <div style="font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 4px;">${label}</div>
    <div style="font-size: 15px; color: #0f172a; line-height: 1.7;">${formatHtml(value || "Not provided")}</div>
  </div>`;

const buildCustomerEmail = (title: string, body: string, footer: string) => `
  <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px; color: #0f172a;">
    <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #e2e8f0;">
      <div style="background: linear-gradient(135deg, #26336F 0%, #101735 100%); padding: 28px 24px; color: #ffffff;">
        <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px; color: #fca5a5;">Design Hub</p>
        <h1 style="margin: 0; font-size: 28px; line-height: 1.1;">${escapeHtml(title)}</h1>
      </div>
      <div style="padding: 24px;">
        ${body}
      </div>
      <div style="padding: 0 24px 24px; font-size: 13px; color: #475569;">${footer}</div>
    </div>
  </div>`;

const buildAdminEmail = (title: string, fields: string) => `
  <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px; color: #0f172a;">
    <div style="max-width: 700px; margin: 0 auto; background: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #e2e8f0;">
      <div style="background: linear-gradient(135deg, #DF1B25 0%, #7f1d1d 100%); padding: 24px; color: #ffffff;">
        <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px; color: #fecaca;">New submission</p>
        <h1 style="margin: 0; font-size: 28px; line-height: 1.1;">${escapeHtml(title)}</h1>
      </div>
      <div style="padding: 24px;">${fields}</div>
    </div>
  </div>`;

const sendEmail = async (payload: {
  to: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}) => {
  const resend = getResendClient();

  return resend.emails.send({
    from: `${defaultFromName} <${defaultFromEmail}>`,
    ...payload,
  });
};

export const sendContactEmails = async (data: ContactSubmission) => {
  const adminFields = [
    buildField("Name", data.name),
    buildField("Email", data.email),
    buildField("Phone", data.phone),
    buildField("Subject", data.subject),
    buildField("Services", data.services.length ? data.services.join(", ") : "Not selected"),
    buildField("Description", data.description),
  ].join("");

  const customerText = `Hi ${data.name},\n\nThank you for contacting Design Hub. We have received your request and an account executive will review it shortly.\n\nSelected services: ${data.services.length ? data.services.join(", ") : "Not selected"}\n\nWe will get back to you soon.\n\nBest regards,\nDesign Hub Team`;

  const customerHtml = buildCustomerEmail(
    "Your request is in our queue",
    `<p style="font-size: 15px; line-height: 1.8; margin-top: 0;">Hi ${escapeHtml(data.name)},</p>
      <p style="font-size: 15px; line-height: 1.8;">Thank you for reaching out to Design Hub. Our team has received your request and will review it within 24 business hours.</p>
      ${buildField("Subject", data.subject)}
      ${buildField("Services", data.services.length ? data.services.join(", ") : "Not selected")}`,
    "If you need immediate support, call us at +91 98843 44503 or email info@designhub.in."
  );

  await Promise.all([
    sendEmail({
      to: data.email,
      replyTo: data.email,
      subject: "Thank you for contacting Design Hub",
      html: customerHtml,
      text: customerText,
    }),
    sendEmail({
      to: env.ADMIN_EMAIL,
      replyTo: data.email,
      subject: `New contact inquiry from ${data.name}`,
      html: buildAdminEmail("Contact Inquiry", adminFields),
      text: `New contact inquiry from ${data.name}\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nSubject: ${data.subject}\nServices: ${data.services.length ? data.services.join(", ") : "Not selected"}\nDescription: ${data.description}`,
    }),
  ]);
};

export const sendCareerEmails = async (data: CareerSubmission) => {
  const adminFields = [
    buildField("Name", data.name),
    buildField("Email", data.email),
    buildField("Phone", data.phone),
    buildField("Location", data.location),
    buildField("Position", data.position),
    buildField("Description", data.description),
    data.resumeFileName ? buildField("Resume", data.resumeFileName) : "",
  ].join("");

  const customerText = `Hi ${data.name},\n\nThank you for applying to Design Hub. We have received your application for ${data.position}. Our HR team will review your profile and get back to you soon.\n\nBest regards,\nDesign Hub Team`;

  const customerHtml = buildCustomerEmail(
    "Application received",
    `<p style="font-size: 15px; line-height: 1.8; margin-top: 0;">Hi ${escapeHtml(data.name)},</p>
      <p style="font-size: 15px; line-height: 1.8;">Thank you for applying to Design Hub. We have received your application for <strong>${escapeHtml(data.position)}</strong>. Our HR team will review your profile and get back to you shortly.</p>
      ${buildField("Location", data.location)}
      ${buildField("Position", data.position)}`,
    "We will contact you if your profile is a strong match for the role."
  );

  const attachments = data.resumeContent && data.resumeFileName
    ? [
        {
          filename: data.resumeFileName,
          content: data.resumeContent,
          contentType: data.resumeContentType,
        },
      ]
    : undefined;

  await Promise.all([
    sendEmail({
      to: data.email,
      replyTo: data.email,
      subject: "Your Design Hub application is in progress",
      html: customerHtml,
      text: customerText,
    }),
    sendEmail({
      to: env.ADMIN_EMAIL,
      replyTo: data.email,
      subject: `New career application from ${data.name}`,
      html: buildAdminEmail("Career Application", adminFields),
      text: `New career application from ${data.name}\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nLocation: ${data.location}\nPosition: ${data.position}\nDescription: ${data.description}${data.resumeFileName ? `\nResume: ${data.resumeFileName}` : ""}`,
      attachments,
    }),
  ]);
};
