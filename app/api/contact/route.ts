import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmails } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a valid phone number."),
  subject: z.string().trim().min(3, "Please enter a subject."),
  description: z.string().trim().min(10, "Please add a few more details."),
  services: z.array(z.string()).default([]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Invalid form data.";
      return NextResponse.json({ success: false, message }, { status: 400 });
    }

    await sendContactEmails(parsed.data);

    return NextResponse.json(
      { success: true, message: "Your message has been sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact email send failed", error);

    return NextResponse.json(
      {
        success: false,
        message: "We couldn't send your request right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
