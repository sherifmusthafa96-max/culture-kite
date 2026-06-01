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
            jobLocation,
            currentLocation,
            resumeUrl,
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
                "mathan@culturekite.in",
                'info@culturekite.in'
            ],
            subject: "New Job Application Received",
            html: `
<div style="font-family: Arial, sans-serif; color:#333;">

  <img src="https://culturekite.in/logo.png" alt="Culture Kite" style="height:80px; margin-bottom:20px;" />

  <h2 style="color:#123A8D;">New Job Application Received</h2>

  <table border="1" cellpadding="10" cellspacing="0" style="border-collapse:collapse;">
    <tr><td><b>Name</b></td><td>${name}</td></tr>
    <tr><td><b>Email</b></td><td>${email}</td></tr>
    <tr><td><b>Phone</b></td><td>${phone}</td></tr>
    <tr><td><b>Company</b></td><td>${company}</td></tr>
    <tr><td><b>Role</b></td><td>${role}</td></tr>
    <tr><td><b>Job Location</b></td><td>${jobLocation}</td></tr>
    <tr>
  <td><b>Resume</b></td>
  <td>
    <a href="${resumeUrl}" target="_blank">
      Download Resume
    </a>
  </td>
</tr>

<tr><td><b>Current Location</b></td><td>${currentLocation}</td></tr>
<tr><td><b>Current Location</b></td><td>${currentLocation}</td></tr>

</table>

<br>

<p>
  Regards,<br>
  <strong>Culture Kite Recruitment Team</strong><br>
  📧 info@culturekite.in<br>
  📞 +91 9500038959
</p>

</div>
`,

        });

        console.log("ADMIN MAIL:", adminResult);

        // 👇 Candidate Email
        const candidateResult = await transporter.sendMail({
            from: "Culture Kite <musthafa@culturekite.in>",
            to: email,
            subject: "Application Received - Culture Kite",
            html: `
<div style="font-family: Arial, sans-serif; color:#333;">

  <img src="https://culturekite.in/logo.png"
       alt="Culture Kite"
       style="height:80px; margin-bottom:20px;" />

  <h2 style="color:#123A8D;">
    New Job Application Received
  </h2>

  <table border="1" cellpadding="10" cellspacing="0"
         style="border-collapse:collapse;">

    <tr><td><b>Name</b></td><td>${name}</td></tr>
    <tr><td><b>Email</b></td><td>${email}</td></tr>
    <tr><td><b>Phone</b></td><td>${phone}</td></tr>
    <tr><td><b>Company</b></td><td>${company}</td></tr>
    <tr><td><b>Role</b></td><td>${role}</td></tr>
    <tr><td><b>Job Location</b></td><td>${jobLocation}</td></tr>
    <tr><td><b>Current Location</b></td><td>${currentLocation}</td></tr>

    <tr>
      <td><b>Resume</b></td>
      <td>
        <a href="${resumeUrl}" target="_blank">
          Download Resume
        </a>
      </td>
    </tr>

  </table>

  <br>

  <p>
    Regards,<br>
    <strong>Culture Kite Recruitment Team</strong><br>
    📧 info@culturekite.in<br>
    📞 +91 9500038959
  </p>

</div>
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