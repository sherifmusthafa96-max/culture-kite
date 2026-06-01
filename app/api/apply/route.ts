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
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 👇 Admin Email (Musthafa + Mathan)
        await transporter.sendMail({
            from: "Culture Kite <no-reply@culturekite.in>",
            to: [
                "admin@culturekite.in",
                "Musthafa@culturekite.in",
                "Mathan@culturekite.in"
            ],
            subject: "New Job Application Received",
            html: `
        <h2>New Candidate Application</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Role:</b> ${role}</p>
        <p><b>Location:</b> ${location}</p>
      `,
        });

        // 👇 Candidate Email
        await transporter.sendMail({
            from: "Culture Kite <no-reply@culturekite.in>",
            to: email,
            subject: "Application Received - Culture Kite",
            html: `
        <h2>Thank You for Applying!</h2>
        <p>Hi ${name},</p>
        <p>Your application for <b>${role}</b> at <b>${company}</b> has been received.</p>
        <p>We will contact you soon.</p>
      `,
        });

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}