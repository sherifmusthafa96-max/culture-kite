import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Zoho SMTP
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function GET() {
    try {
        // 1. Fetch all pending payments
        const { data, error } = await supabase
            .from("rider_payments")
            .select("*")
            .eq("payment_status", "Pending");

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const pendingCount = data?.length || 0;

        let subject = "";
        let html = "";

        // 2. Decide email content
        if (pendingCount > 0) {
            const totalPending = data.reduce(
                (sum, r) => sum + Number(r.total_incentive || 0),
                0
            );

            subject = `⚠ Payment Pending Alert - ${pendingCount} Riders`;

            html = `
        <h2>Pending Payment Alert</h2>
        <p><b>Total Pending Riders:</b> ${pendingCount}</p>
        <p><b>Total Pending Amount:</b> ₹${totalPending}</p>

        <h3>Pending List:</h3>
        <ul>
          ${data
                    .slice(0, 20)
                    .map(
                        (r) => `
              <li>
                ${r.rider_name} - ₹${r.total_incentive} (${r.week})
              </li>
            `
                    )
                    .join("")}
        </ul>
      `;
        } else {
            subject = `✅ All Payments Completed - No Pending`;

            html = `
        <h2>Great News 🎉</h2>
        <p>All rider payments are completed.</p>
        <p>No pending amount found in system.</p>
      `;
        }

        // 3. Send Email (Aiswarya)
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: "aiswarya@culturekite.in",
            subject,
            html,
        });

        return NextResponse.json({
            success: true,
            pendingCount,
        });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}