import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            name,
            email,
            phone,
            company,
            role,
            location,
        } = body;

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        console.log("EMAIL_USER:", process.env.EMAIL_USER);
        console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
        console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
        await transporter.verify();
        console.log("SMTP VERIFIED");
        console.log("API HIT");
        console.log(process.env.EMAIL_USER);
        // 👇 Admin Email (Musthafa + Mathan)
        const adminResult = await transporter.sendMail({
            from: "Culture Kite <musthafa@culturekite.in>",
            to: [
                "admin@culturekite.in",
                "musthafa@culturekite.in",
                "mathan@culturekite.in"
            ],
            subject: "New Job Application Received",
            html: `
<h2>New Job Application Received</h2>

<table border="1" cellpadding="8" cellspacing="0">
<tr><td><b>Name</b></td><td>${name}</td></tr>
<tr><td><b>Email</b></td><td>${email}</td></tr>
<tr><td><b>Phone</b></td><td>${phone}</td></tr>
<tr><td><b>Company</b></td><td>${company}</td></tr>
<tr><td><b>Role</b></td><td>${role}</td></tr>
<tr><td><b>Location</b></td><td>${location}</td></tr>
</table>
`,
        });

        console.log("ADMIN MAIL:", adminResult);

        // 👇 Candidate Email
        const candidateResult = await transporter.sendMail({
            from: "Culture Kite <musthafa@culturekite.in>",
            to: email,
            subject: "Application Received - Culture Kite",
            html: `
<h2>Thank You for Applying!</h2>

<p>Hi ${name},</p>

<p>
Your application for
<b>${role}</b>
at
<b>${company}</b>
has been successfully received.
</p>

<p>
Our recruitment team will review your profile and contact you shortly.
</p>

<p>
Thank you for choosing Culture Kite.
</p>

<br>

<p>
Regards,<br>
Culture Kite Recruitment Team
</p>
`,
        });

        console.log("CANDIDATE MAIL:", candidateResult);

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error("MAIL ERROR:", err);
        return NextResponse.json(
            {
                success: false,
                error: String(err),
            },
            { status: 500 }
        );

    }
}