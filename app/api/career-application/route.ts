import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            name,
            phone,
            email,
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

        await transporter.verify();

        const adminResult = await transporter.sendMail({
            from: "Culture Kite <info@culturekite.in>",
            to: [
                "admin@culturekite.in",
                "musthafa@culturekite.in",
                "mathan@culturekite.in",
                "info@culturekite.in",
            ],
            subject: "New Career Application Received",
            html: `
      <div style="font-family: Arial, sans-serif; color:#333;">

        <img
          src="https://culturekite.in/logo.png"
          alt="Culture Kite"
          style="height:80px; margin-bottom:20px;"
        />

        <h2 style="color:#123A8D;">
          New Career Application Received
        </h2>

        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse:collapse;">
          <tr>
            <td><b>Name</b></td>
            <td>${name}</td>
          </tr>

          <tr>
            <td><b>Phone</b></td>
            <td>${phone}</td>
          </tr>

          <tr>
            <td><b>Resume</b></td>
            <td>
              <a href="${resumeUrl}" target="_blank">
                View Resume
              </a>
            </td>
          </tr>
        </table>

        <br/>

        <p>
          Regards,<br/>
          <strong>Culture Kite Recruitment Team</strong><br/>
          📧 info@culturekite.in<br/>
          📞 +91 9500038959
        </p>

      </div>    
      `,
        });
        if (email && email.includes("@")) {
            await transporter.sendMail({
                from: "Culture Kite <info@culturekite.in>",
                to: email,
                subject: "Career Application Received - Culture Kite",
                html: `
    <div style="font-family: Arial, sans-serif; color:#333;">

      <img
        src="https://culturekite.in/logo.png"
        alt="Culture Kite"
        style="height:80px; margin-bottom:20px;"
      />

      <h2 style="color:#123A8D;">
        Thank You for Applying!
      </h2>

      <p>
        Hi <strong>${name}</strong>,
      </p>

      <p>
        Your career application has been successfully received by
        <strong>Culture Kite</strong>.
      </p>

      <p>
        Our recruitment team will review your profile and resume.
        If your profile matches our current requirements,
        we will contact you shortly.
      </p>

      <p>
        Thank you for your interest in joining our workforce network.
      </p>

      <br/>

      <p>
        Regards,<br/>
        <strong>Culture Kite Recruitment Team</strong><br/>
        📧 info@culturekite.in<br/>
        📞 +91 9500038959
      </p>

    </div>
    `,
            });
        }

        console.log("ADMIN MAIL:", adminResult);

        return NextResponse.json({
            success: true,
        });

    } catch (err) {
        console.error("CAREER APPLICATION ERROR:", err);

        return NextResponse.json(
            {
                success: false,
                error: String(err),
            },
            {
                status: 500,
            }
        );
    }
}