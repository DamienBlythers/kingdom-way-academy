import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { welcomeEmailTemplate } from "@/lib/email-templates";

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const emailContent = welcomeEmailTemplate({
      userName: name || email,
      userEmail: email,
    });

    await resend.emails.send({
      from: "Kingdom Way Academy <onboarding@resend.dev>",
      to: email,
      subject: emailContent.subject,
      html: emailContent.html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[WELCOME_EMAIL]", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
