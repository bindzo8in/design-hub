import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendCareerEmails } from "@/lib/email";

const careerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a valid phone number."),
  location: z.string().trim().min(2, "Please enter your location."),
  position: z.string().trim().min(2, "Please select a position."),
  description: z.string().trim().min(10, "Please share a brief introduction."),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const parsed = careerSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      position: formData.get("position"),
      description: formData.get("description"),
    });

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Invalid form data.";
      return NextResponse.json({ success: false, message }, { status: 400 });
    }

    const resume = formData.get("resume");
    let resumeContent: Buffer | undefined;
    let resumeContentType: string | undefined;
    let resumeFileName: string | undefined;

    if (resume instanceof File) {
      resumeFileName = resume.name;
      resumeContentType = resume.type || "application/octet-stream";
      resumeContent = Buffer.from(await resume.arrayBuffer());
    }

    await sendCareerEmails({
      ...parsed.data,
      resumeFileName,
      resumeContent,
      resumeContentType,
    });

    return NextResponse.json(
      { success: true, message: "Your application has been submitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Career email send failed", error);

    return NextResponse.json(
      {
        success: false,
        message: "We couldn't submit your application right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
