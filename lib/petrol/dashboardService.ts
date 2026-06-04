import { supabase } from "@/lib/supabase";

export const loadDashboard = async () => {
    const { data, error } = await supabase
        .from("rider_payments")
        .select("*");

    if (error) throw error;

    const totalRecords = data.length;

    const pendingCount = data.filter(
        (x) => x.payment_status === "Pending"
    ).length;

    const paidCount = data.filter(
        (x) => x.payment_status === "Paid"
    ).length;

    const pendingAmount = data
        .filter((x) => x.payment_status === "Pending")
        .reduce(
            (sum, row) =>
                sum + Number(row.total_incentive || 0),
            0
        );

    return {
        totalRecords,
        pendingCount,
        paidCount,
        pendingAmount,
        data,
    };
};