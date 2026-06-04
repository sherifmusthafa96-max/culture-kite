import { supabase } from "@/lib/supabase";

export const markAsPaid = async (
    id: number,
    paymentRef: string,
    paidBy: string
) => {
    return await supabase
        .from("rider_payments")
        .update({
            payment_status: "Paid",
            paid_date: new Date().toISOString(),
            payment_ref: paymentRef,
            paid_by: paidBy,
            payment_proof: paymentRef,
        })
        .eq("id", id);
};

export const markSelectedAsPaid = async (
    ids: number[],
    paymentRef: string,
    paidBy: string
) => {
    return await supabase
        .from("rider_payments")
        .update({
            payment_status: "Paid",
            paid_date: new Date().toISOString(),
            payment_ref: paymentRef,
            paid_by: paidBy,
        })
        .in("id", ids);
};