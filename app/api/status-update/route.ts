import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
    try {
        const {
            id,
            status,
            interview_date,
            interview_time,
        } = await req.json();

        const supabaseUrl =
            process.env.NEXT_PUBLIC_SUPABASE_URL;

        const serviceRoleKey =
            process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !serviceRoleKey) {
            console.error("Supabase ENV Missing");

            return NextResponse.json(
                {
                    success: false,
                    error: "Supabase ENV Missing",
                },
                { status: 500 }
            );
        }

        const supabase = createClient(
            supabaseUrl,
            serviceRoleKey
        );

        const { data: application, error } =
            await supabase
                .from("applications")
                .select("*")
                .eq("id", id)
                .single();

        if (error || !application) {
            console.error(error);

            return NextResponse.json(
                {
                    success: false,
                    error: "Application not found",
                },
                { status: 404 }
            );
        }

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

        let message = "";

        switch (status) {

            case "Interview Scheduled":

                message = `
        Your interview has been scheduled.

        <br/><br/>

        <strong>Date:</strong>
        ${interview_date}

        <br/>

        <strong>Time:</strong>
        ${interview_time}
    `;

                break;

            case "Shortlisted":
                message =
                    "Congratulations! Your profile has been shortlisted.";
                break;
        }
        console.log("EMAIL TO:", application.email);
        console.log("STATUS:", status);
        const mailResult =

            await transporter.sendMail({
                from: "Culture Kite <info@culturekite.in>",
                to: application.email,
                subject: `Application Status Updated - ${status}`,
                html: `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">

    <div style="text-align:center;margin-bottom:20px;">
       <img
  src="https://culturekite.in/logo.webp"
  alt="Culture Kite"
  style="height:80px; width:auto; margin-bottom:20px;"
/>
    </div>

    <h2>Hello ${application.name},</h2>

    <p>
        Your application for
        <strong>${application.role}</strong>
        at
        <strong>${application.company}</strong>
        has been updated.
    </p>

    <h3>Status: ${status}</h3>

    <p>${message}</p>

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
        console.log("MAIL SENT SUCCESSFULLY");
        console.log("STATUS MAIL:", mailResult);

        return NextResponse.json({
            success: true,
        });

    } catch (err: any) {
        console.error("FULL ERROR:", err);

        return NextResponse.json(
            {
                success: false,
                error: String(err),
            },
            { status: 500 }
        );
    }
}