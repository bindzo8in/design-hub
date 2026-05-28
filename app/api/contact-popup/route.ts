import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { sendPopupContactEmails } from "@/lib/email";

const popupSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),

  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number."),

  subject: z
    .string()
    .trim()
    .min(5, "Please tell us about your project."),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = popupSchema.safeParse(body);

    if (!parsed.success) {
      const message =
        parsed.error.issues[0]?.message || "Invalid form data.";

      return NextResponse.json(
        {
          success: false,
          message,
        },
        {
          status: 400,
        },
      );
    }

    await sendPopupContactEmails(parsed.data);

    return NextResponse.json(
      {
        success: true,
        message: "Request submitted successfully.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Popup inquiry failed", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send request right now.",
      },
      {
        status: 500,
      },
    );
  }
}