import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, organization, message } = result.data;

    // TODO: Integrate actual email sending service here (e.g., Resend, SendGrid, SMTP)
    // Example:
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL_TO,
    //   subject: `New Contact from ${name} (${organization})`,
    //   text: message,
    //   replyTo: email,
    // });
    
    // Simulating network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const emailTo = process.env.CONTACT_EMAIL_TO || "support@civicpulse.ai";
    console.log(`[API/Contact] Sending email to ${emailTo} from ${email}`);
    console.log("Contact form submitted:", { name, email, organization, message });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
