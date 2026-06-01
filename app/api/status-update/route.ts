import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    try {

        const { id, status } = await req.json();

        const { data: application } = await supabase
            .from("applications")
            .select("*")
            .eq("id", id)
            .single();

        if (!application) {
            return NextResponse.json(
                { success: false },
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

        let message = "";

        switch (status) {

            case "Under Review":
                message =
                    "Your application is currently under review by our recruitment team.";
                break;

            case "Shortlisted":
                message =
                    "Congratulations! Your profile has been shortlisted.";
                break;

            case "Interview Scheduled":
                message =
                    "Your interview has been scheduled. Our team will contact you shortly.";
                break;

            case "Selected":
                message =
                    "Congratulations! You have been selected.";
                break;

            case "Rejected":
                message =
                    "Thank you for your interest. At this time we will not be moving forward.";
                break;

            default:
                message =
                    "Your application status has been updated.";
        }

        await transporter.sendMail({
            from: "Culture Kite <musthafa@culturekite.in>",
            to: application.email,
            subject: `Application Status Updated - ${status}`,
            html: `
                <h2>Hello ${application.name}</h2>

                <p>
                    Your application for
                    <b>${application.role}</b>
                    at
                    <b>${application.company}</b>
                    has been updated.
                </p>

                <h3>Status: ${status}</h3>

                <p>${message}</p>

                <br/>

                <p>
                    Regards,<br/>
                    Culture Kite Recruitment Team
                </p>
            `,
        });

        return NextResponse.json({
            success: true,
        });

    } catch (err) {

        console.error(err);

        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}